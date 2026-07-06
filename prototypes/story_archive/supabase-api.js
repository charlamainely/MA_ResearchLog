import { STORY_ARCHIVE_SUPABASE } from "./supabase-config.js";

const DEFAULT_TABLE = "stories";

function getConfig() {
  const url = String(STORY_ARCHIVE_SUPABASE.url || "").trim().replace(/\/$/, "");
  const anonKey = String(STORY_ARCHIVE_SUPABASE.anonKey || "").trim();
  const table = String(STORY_ARCHIVE_SUPABASE.table || DEFAULT_TABLE).trim() || DEFAULT_TABLE;

  return {
    enabled: Boolean(STORY_ARCHIVE_SUPABASE.enabled && url && anonKey),
    url,
    anonKey,
    table,
    includeSeedStories: STORY_ARCHIVE_SUPABASE.includeSeedStories !== false
  };
}

function parseStoryRow(row) {
  return {
    id: row.id,
    storyText: row.story_text,
    narrativeFocuses: Array.isArray(row.narrative_focuses) ? row.narrative_focuses : [],
    tone: row.tone,
    familyCloseness: row.family_closeness,
    displayName: row.display_name || "Anonymous",
    language: row.language,
    status: row.status,
    createdAt: row.created_at
  };
}

function buildStoryPayload(story) {
  return {
    id: story.id,
    story_text: story.storyText,
    narrative_focuses: story.narrativeFocuses,
    tone: story.tone,
    family_closeness: story.familyCloseness,
    display_name: story.displayName || "Anonymous",
    language: story.language,
    status: story.status,
    created_at: story.createdAt
  };
}

async function readErrorMessage(response) {
  const text = await response.text();

  if (!text) {
    return `Supabase request failed with status ${response.status}.`;
  }

  try {
    const parsed = JSON.parse(text);
    return parsed.message || parsed.error_description || parsed.error || text;
  } catch {
    return text;
  }
}

function buildHeaders({ write = false } = {}) {
  const config = getConfig();
  const headers = {
    apikey: config.anonKey,
    Authorization: `Bearer ${config.anonKey}`
  };

  if (write) {
    headers["Content-Type"] = "application/json";
    headers.Prefer = "return=representation";
  }

  return headers;
}

function buildEndpoint(params) {
  const config = getConfig();
  const url = new URL(`${config.url}/rest/v1/${config.table}`);
  params.forEach((value, key) => {
    url.searchParams.set(key, value);
  });
  return url.toString();
}

export function isSupabaseEnabled() {
  return getConfig().enabled;
}

export function shouldIncludeSeedStories() {
  return getConfig().includeSeedStories;
}

export async function fetchApprovedStoriesFromSupabase() {
  if (!isSupabaseEnabled()) return [];

  const params = new URLSearchParams({
    select: "id,story_text,narrative_focuses,tone,family_closeness,display_name,language,status,created_at",
    status: "eq.approved",
    order: "created_at.desc"
  });

  const response = await fetch(buildEndpoint(params), {
    method: "GET",
    headers: buildHeaders()
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  const rows = await response.json();
  return Array.isArray(rows) ? rows.map(parseStoryRow) : [];
}

export async function createPendingStoryInSupabase(story) {
  if (!isSupabaseEnabled()) {
    throw new Error("Supabase is not configured yet.");
  }

  const params = new URLSearchParams({
    select: "id,story_text,narrative_focuses,tone,family_closeness,display_name,language,status,created_at"
  });

  const response = await fetch(buildEndpoint(params), {
    method: "POST",
    headers: buildHeaders({ write: true }),
    body: JSON.stringify(buildStoryPayload(story))
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  const rows = await response.json();
  return Array.isArray(rows) && rows[0] ? parseStoryRow(rows[0]) : null;
}
