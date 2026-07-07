import { STORY_ARCHIVE_SUPABASE } from "./supabase-config.js";

const DEFAULT_TABLE = "stories";
const VALID_STATUSES = new Set(["pending", "approved", "rejected"]);

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
    promptText: row.prompt_text || "",
    showPrompt: row.show_prompt === true,
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
    prompt_text: story.promptText || "",
    show_prompt: Boolean(story.showPrompt && String(story.promptText || "").trim()),
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

function buildHeaders({ write = false, accessToken = "" } = {}) {
  const config = getConfig();
  const headers = {
    apikey: config.anonKey,
    Authorization: `Bearer ${accessToken || config.anonKey}`
  };

  if (write) {
    headers["Content-Type"] = "application/json";
    headers.Prefer = "return=minimal";
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

function buildAuthEndpoint(path) {
  const config = getConfig();
  return new URL(`${config.url}/auth/v1/${path}`).toString();
}

function parseAdminSession(payload) {
  return {
    accessToken: payload.access_token,
    refreshToken: payload.refresh_token,
    expiresAt: Date.now() + (Number(payload.expires_in) || 3600) * 1000,
    user: payload.user
      ? {
          id: payload.user.id,
          email: payload.user.email || ""
        }
      : null
  };
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
    select: "id,story_text,prompt_text,show_prompt,narrative_focuses,tone,family_closeness,display_name,language,status,created_at",
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

  const response = await fetch(buildEndpoint(new URLSearchParams()), {
    method: "POST",
    headers: buildHeaders({ write: true }),
    body: JSON.stringify(buildStoryPayload(story))
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  return story;
}

export async function signInAdminWithPassword({ email, password }) {
  if (!isSupabaseEnabled()) {
    throw new Error("Supabase is not configured yet.");
  }

  const config = getConfig();
  const response = await fetch(buildAuthEndpoint("token?grant_type=password"), {
    method: "POST",
    headers: {
      apikey: config.anonKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  return parseAdminSession(await response.json());
}

export async function refreshAdminSession(refreshToken) {
  if (!isSupabaseEnabled()) {
    throw new Error("Supabase is not configured yet.");
  }

  const config = getConfig();
  const response = await fetch(buildAuthEndpoint("token?grant_type=refresh_token"), {
    method: "POST",
    headers: {
      apikey: config.anonKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ refresh_token: refreshToken })
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  return parseAdminSession(await response.json());
}

export async function signOutAdmin(accessToken) {
  if (!isSupabaseEnabled() || !accessToken) return;

  const config = getConfig();
  await fetch(buildAuthEndpoint("logout"), {
    method: "POST",
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${accessToken}`
    }
  });
}

export async function fetchPendingStoriesFromSupabase(accessToken) {
  if (!isSupabaseEnabled()) return [];

  const params = new URLSearchParams({
    select: "id,story_text,prompt_text,show_prompt,narrative_focuses,tone,family_closeness,display_name,language,status,created_at",
    status: "eq.pending",
    order: "created_at.desc"
  });

  const response = await fetch(buildEndpoint(params), {
    method: "GET",
    headers: buildHeaders({ accessToken })
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  const rows = await response.json();
  return Array.isArray(rows) ? rows.map(parseStoryRow) : [];
}

export async function fetchAllStoriesFromSupabase(accessToken) {
  if (!isSupabaseEnabled()) return [];

  const params = new URLSearchParams({
    select: "id,story_text,prompt_text,show_prompt,narrative_focuses,tone,family_closeness,display_name,language,status,created_at",
    order: "created_at.desc"
  });

  const response = await fetch(buildEndpoint(params), {
    method: "GET",
    headers: buildHeaders({ accessToken })
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  const rows = await response.json();
  return Array.isArray(rows) ? rows.map(parseStoryRow) : [];
}

export async function updateStoryStatusInSupabase(storyId, status, accessToken) {
  if (!isSupabaseEnabled()) {
    throw new Error("Supabase is not configured yet.");
  }

  if (!VALID_STATUSES.has(status)) {
    throw new Error("Unsupported story status.");
  }

  const params = new URLSearchParams({
    id: `eq.${storyId}`
  });

  const response = await fetch(buildEndpoint(params), {
    method: "PATCH",
    headers: buildHeaders({ write: true, accessToken }),
    body: JSON.stringify({ status })
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }
}

export async function updateStoryInSupabase(storyId, updates, accessToken) {
  if (!isSupabaseEnabled()) {
    throw new Error("Supabase is not configured yet.");
  }

  if (updates.status && !VALID_STATUSES.has(updates.status)) {
    throw new Error("Unsupported story status.");
  }

  const payload = {};

  if (typeof updates.storyText === "string") payload.story_text = updates.storyText;
  if (typeof updates.promptText === "string") payload.prompt_text = updates.promptText;
  if (typeof updates.showPrompt === "boolean") payload.show_prompt = updates.showPrompt;
  if (Array.isArray(updates.narrativeFocuses)) payload.narrative_focuses = updates.narrativeFocuses;
  if (typeof updates.tone === "string") payload.tone = updates.tone;
  if (typeof updates.familyCloseness === "string") payload.family_closeness = updates.familyCloseness;
  if (typeof updates.displayName === "string") payload.display_name = updates.displayName;
  if (typeof updates.language === "string") payload.language = updates.language;
  if (typeof updates.status === "string") payload.status = updates.status;

  const params = new URLSearchParams({
    id: `eq.${storyId}`
  });

  const response = await fetch(buildEndpoint(params), {
    method: "PATCH",
    headers: buildHeaders({ write: true, accessToken }),
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }
}
