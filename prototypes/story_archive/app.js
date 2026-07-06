import { APPROVED_STORIES } from "./data/stories.js";
import {
  createPendingStoryInSupabase,
  fetchApprovedStoriesFromSupabase,
  isSupabaseEnabled,
  shouldIncludeSeedStories
} from "./supabase-api.js";

const STORAGE_KEY = "story-archive-submissions-v1";
const ADMIN_FLAG_KEY = "story-archive-admin-visible-v1";
const REMOTE_MODE = isSupabaseEnabled();

function assetUrl(path) {
  return new URL(path, import.meta.url).href;
}

const STORY_HINTS = [
  "Think of a family object that only makes sense inside your household. What story sits behind it?",
  "Recall a meal where something small revealed a larger family feeling. What happened?",
  "Describe a moment when you understood a parent or grandparent differently than before.",
  "Write about a family ritual that seems ordinary but carries meaning when you look closely.",
  "Think of a misunderstanding that still says something true about how your family relates."
];

const narrativeFocusOptions = [
  {
    value: "what",
    label: "WHAT",
    displayTitle: "Keepsake",
    description: "Objects, actions & events",
    asset: assetUrl("./assets/stamp_what.png")
  },
  {
    value: "why",
    label: "WHY",
    displayTitle: "Reason",
    description: "Meanings, motives & significance",
    asset: assetUrl("./assets/stamp_why.png")
  },
  {
    value: "where",
    label: "WHERE",
    displayTitle: "Places",
    description: "Physical spaces or locations",
    asset: assetUrl("./assets/stamp_where.png")
  },
  {
    value: "when",
    label: "WHEN",
    displayTitle: "Moments",
    description: "Special occasions or memorable times",
    asset: assetUrl("./assets/stamp_when.png")
  },
  {
    value: "who",
    label: "WHO",
    displayTitle: "Person",
    description: "Specific characters & relationships",
    asset: assetUrl("./assets/stamp_who.png")
  },
  {
    value: "how",
    label: "HOW",
    displayTitle: "Gestures",
    description: "Rituals, habits or way of doing things",
    asset: assetUrl("./assets/stamp_how.png")
  }
];

const toneOptions = [
  { value: "positive", label: "POSITIVE", descriptor: "Warm & affirming" },
  { value: "neutral", label: "NEUTRAL", descriptor: "Steady & reflective" },
  { value: "negative", label: "NEGATIVE", descriptor: "Heavy or unresolved" }
];

const closenessOptions = [
  {
    value: "distant",
    label: "Distant",
    statement: "There’s some distance between us.",
    asset: assetUrl("./assets/family-distance-01.png"),
    orbLeft: "24%",
    orbRight: "76%"
  },
  {
    value: "not-close",
    label: "Not close",
    statement: "We are not close right now.",
    asset: assetUrl("./assets/family-distance-02.png"),
    orbLeft: "29%",
    orbRight: "71%"
  },
  {
    value: "complicated",
    label: "Complicated",
    statement: "It feels complicated.",
    asset: assetUrl("./assets/family-distance-03.png"),
    orbLeft: "35%",
    orbRight: "65%"
  },
  {
    value: "somewhat-close",
    label: "Somewhat close",
    statement: "It feels normal being with my family.",
    asset: assetUrl("./assets/family-distance-04.png"),
    orbLeft: "41%",
    orbRight: "59%"
  },
  {
    value: "close",
    label: "Close",
    statement: "We are close and speak often.",
    asset: assetUrl("./assets/family-distance-05.png"),
    orbLeft: "45%",
    orbRight: "55%"
  },
  {
    value: "very-close",
    label: "Very close",
    statement: "We share everything with each other.",
    asset: assetUrl("./assets/family-distance-06.png"),
    orbLeft: "48%",
    orbRight: "52%"
  }
];

const dom = {
  body: document.body,
  appShell: document.getElementById("appShell"),
  mobileMenuToggle: document.getElementById("mobileMenuToggle"),
  topNav: document.getElementById("topNav"),
  navButtons: [...document.querySelectorAll("[data-view-target]")],
  views: [...document.querySelectorAll("[data-view]")],
  stepPanels: [...document.querySelectorAll("[data-receive-step]")],
  stepMarkers: [...document.querySelectorAll("[data-step-marker]")],
  receivePhotoStage: document.getElementById("receivePhotoStage"),
  familyPhotoPreview: document.getElementById("familyPhotoPreview"),
  familyPhotoFrames: document.getElementById("familyPhotoFrames"),
  receiveClosenessLabel: document.getElementById("receiveClosenessLabel"),
  receiveClosenessText: document.getElementById("receiveClosenessText"),
  receiveFurtherButton: document.getElementById("receiveFurtherButton"),
  receiveCloserButton: document.getElementById("receiveCloserButton"),
  receiveStampGrid: document.getElementById("receiveStampGrid"),
  receiveToneGrid: document.getElementById("receiveToneGrid"),
  reviewPostcard: document.getElementById("reviewPostcard"),
  reviewStampImage: document.getElementById("reviewStampImage"),
  reviewPhotoCard: document.getElementById("reviewPhotoCard"),
  receiveSummary: document.getElementById("receiveSummary"),
  sendPostcardButton: document.getElementById("sendPostcardButton"),
  sendingStage: document.getElementById("sendingStage"),
  sendStatus: document.getElementById("sendStatus"),
  receiveResultsMeta: document.getElementById("receiveResultsMeta"),
  receiveResults: document.getElementById("receiveResults"),
  receiveEmptyState: document.getElementById("receiveEmptyState"),
  submissionForm: document.getElementById("submissionForm"),
  storyHintButton: document.getElementById("storyHintButton"),
  storyHintOutput: document.getElementById("storyHintOutput"),
  submissionClosenessOptions: document.getElementById("submissionClosenessOptions"),
  submissionFocusOptions: document.getElementById("submissionFocusOptions"),
  submissionToneOptions: document.getElementById("submissionToneOptions"),
  focusValidationMessage: document.getElementById("focusValidationMessage"),
  submissionStatus: document.getElementById("submissionStatus"),
  submissionConfirmation: document.getElementById("submissionConfirmation"),
  submissionConfirmationText: document.getElementById("submissionConfirmationText"),
  submitAnotherButton: document.getElementById("submitAnotherButton"),
  galleryFilters: document.getElementById("galleryFilters"),
  galleryFiltersToggle: document.getElementById("galleryFiltersToggle"),
  galleryFiltersWrap: document.getElementById("galleryFiltersWrap"),
  galleryFocusFilter: document.getElementById("galleryFocusFilter"),
  galleryToneFilter: document.getElementById("galleryToneFilter"),
  galleryClosenessFilter: document.getElementById("galleryClosenessFilter"),
  resetGalleryFilters: document.getElementById("resetGalleryFilters"),
  galleryMeta: document.getElementById("galleryMeta"),
  galleryGrid: document.getElementById("galleryGrid"),
  galleryEmptyState: document.getElementById("galleryEmptyState"),
  adminViewButton: document.querySelector(".nav-link-admin"),
  adminToggleButton: document.getElementById("adminToggleButton"),
  adminMeta: document.getElementById("adminMeta"),
  adminList: document.getElementById("adminList"),
  adminEmptyState: document.getElementById("adminEmptyState"),
  storyDialog: document.getElementById("storyDialog"),
  storyDialogContent: document.getElementById("storyDialogContent")
};

const defaultPostcardState = {
  familyCloseness: "distant",
  selectedNarrativeFocus: "",
  tone: ""
};

const defaultSubmissionState = {
  familyCloseness: "somewhat-close",
  tone: "positive"
};

const state = {
  activeView: "home",
  receiveStep: 1,
  mobileMenuOpen: false,
  galleryFiltersOpen: true,
  postcard: { ...defaultPostcardState },
  remoteApprovedStories: [],
  remoteLoadState: REMOTE_MODE ? "loading" : "disabled",
  galleryFilters: {
    focus: "all",
    tone: "all",
    familyCloseness: "all"
  },
  adminVisible: shouldShowAdminPanel()
};

function shouldShowAdminPanel() {
  if (REMOTE_MODE) return false;
  const params = new URLSearchParams(window.location.search);
  return params.get("admin") === "1" || window.localStorage.getItem(ADMIN_FLAG_KEY) === "true";
}

function setMobileMenu(open) {
  state.mobileMenuOpen = open;
  dom.body.classList.toggle("mobile-nav-open", open);
  dom.mobileMenuToggle?.setAttribute("aria-expanded", String(open));
  dom.mobileMenuToggle?.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
}

function setGalleryFiltersOpen(open) {
  state.galleryFiltersOpen = open;
  dom.galleryFiltersWrap.hidden = !open;
  dom.galleryFiltersToggle?.setAttribute("aria-expanded", String(open));
}

function sortByNewest(a, b) {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

function safeReadStorage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Could not read stored submissions", error);
    return [];
  }
}

function safeWriteStorage(stories) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
}

function getLocalStories() {
  return safeReadStorage().slice().sort(sortByNewest);
}

function mergeStoriesById(...storyLists) {
  const merged = new Map();

  storyLists.flat().forEach((story) => {
    if (!story?.id) return;
    merged.set(story.id, story);
  });

  return [...merged.values()].sort(sortByNewest);
}

function getApprovedStories() {
  const seedStories = shouldIncludeSeedStories() ? APPROVED_STORIES : [];
  const localApprovedStories = REMOTE_MODE ? [] : getLocalStories().filter((story) => story.status === "approved");
  return mergeStoriesById(seedStories, state.remoteApprovedStories, localApprovedStories);
}

function getPendingStories() {
  if (REMOTE_MODE) return [];
  return getLocalStories().filter((story) => story.status === "pending");
}

function getStoryById(storyId) {
  return mergeStoriesById(
    shouldIncludeSeedStories() ? APPROVED_STORIES : [],
    state.remoteApprovedStories,
    REMOTE_MODE ? [] : getLocalStories()
  ).find((story) => story.id === storyId);
}

function createStoryId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return `local-${window.crypto.randomUUID()}`;
  }

  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

async function refreshApprovedStories() {
  if (!REMOTE_MODE) return;

  state.remoteLoadState = "loading";

  try {
    state.remoteApprovedStories = await fetchApprovedStoriesFromSupabase();
    state.remoteLoadState = "ready";
  } catch (error) {
    state.remoteLoadState = "error";
    console.error("Could not fetch approved stories from Supabase.", error);
  }

  renderGallery();

  if (state.activeView === "receive" && state.receiveStep === 5) {
    renderReceiveResults();
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getClosenessMeta(value) {
  return closenessOptions.find((option) => option.value === value) || closenessOptions[0];
}

function getClosenessIndex(value) {
  return closenessOptions.findIndex((option) => option.value === value);
}

function getFocusMeta(value) {
  return narrativeFocusOptions.find((option) => option.value === value) || narrativeFocusOptions[0];
}

function getToneMeta(value) {
  return toneOptions.find((option) => option.value === value) || toneOptions[0];
}

function fillSelect(select, allLabel, options, labelKey = "label") {
  const optionHtml = options.map((option) => `
    <option value="${option.value}">${escapeHtml(option[labelKey])}</option>
  `).join("");

  select.innerHTML = `<option value="all">${escapeHtml(allLabel)}</option>${optionHtml}`;
}

function renderOptionControls() {
  dom.familyPhotoFrames.innerHTML = closenessOptions.map((option) => `
    <div class="family-photo-layer" data-closeness-frame="${option.value}">
      <img src="${option.asset}" alt="${escapeHtml(option.label)} family closeness illustration">
    </div>
  `).join("");

  dom.receiveStampGrid.innerHTML = narrativeFocusOptions.map((option) => `
    <button
      type="button"
      class="stamp-button"
      data-focus-select="${option.value}"
      role="radio"
      aria-checked="false"
      aria-label="${escapeHtml(option.displayTitle)}"
    >
      <div class="stamp-art">
        <img src="${option.asset}" alt="${escapeHtml(option.label)} stamp">
      </div>
      <div class="stamp-copy">
        <strong>${escapeHtml(option.displayTitle)}</strong>
        <span>${escapeHtml(option.description)}</span>
      </div>
    </button>
  `).join("");

  dom.receiveToneGrid.innerHTML = toneOptions.map((option) => `
    <button
      type="button"
      class="tone-card"
      data-tone="${option.value}"
      data-tone-select="${option.value}"
      role="radio"
      aria-checked="false"
    >
      <strong>${escapeHtml(option.label)}</strong>
      <span>${escapeHtml(option.descriptor)}</span>
    </button>
  `).join("");

  dom.submissionClosenessOptions.innerHTML = closenessOptions.map((option) => `
    <label class="closeness-option">
      <input type="radio" name="familyCloseness" value="${option.value}" ${option.value === defaultSubmissionState.familyCloseness ? "checked" : ""} required>
      <span class="closeness-option-node" aria-hidden="true"></span>
      <span>
        <strong>${escapeHtml(option.label)}</strong>
        <span>${escapeHtml(option.statement)}</span>
      </span>
    </label>
  `).join("");

  dom.submissionFocusOptions.innerHTML = narrativeFocusOptions.map((option) => `
    <label class="check-option">
      <input type="checkbox" name="narrativeFocuses" value="${option.value}">
      <span class="check-box" aria-hidden="true"></span>
      <span class="check-copy">
        <strong>${escapeHtml(option.label.charAt(0) + option.label.slice(1).toLowerCase())}</strong>
        <span>${escapeHtml(option.description)}</span>
      </span>
    </label>
  `).join("");

  dom.submissionToneOptions.innerHTML = toneOptions.map((option) => `
    <label class="tone-option">
      <input type="radio" name="tone" value="${option.value}" ${option.value === defaultSubmissionState.tone ? "checked" : ""} required>
      <span class="check-box" aria-hidden="true"></span>
      <span class="tone-copy">
        <strong>${escapeHtml(option.label.charAt(0) + option.label.slice(1).toLowerCase())}</strong>
      </span>
    </label>
  `).join("");

  fillSelect(dom.galleryFocusFilter, "All narrative focuses", narrativeFocusOptions, "displayTitle");
  fillSelect(dom.galleryToneFilter, "All tones", toneOptions, "label");
  fillSelect(dom.galleryClosenessFilter, "All closeness levels", closenessOptions, "label");
}

function updateReceiveCloseness(value) {
  const meta = getClosenessMeta(value);
  const currentIndex = getClosenessIndex(meta.value);
  state.postcard.familyCloseness = meta.value;

  dom.receiveClosenessLabel.textContent = meta.label;
  dom.receiveClosenessText.textContent = meta.statement;
  dom.receivePhotoStage.style.setProperty("--focus-left-x", meta.orbLeft);
  dom.receivePhotoStage.style.setProperty("--focus-right-x", meta.orbRight);
  dom.receivePhotoStage.setAttribute("aria-label", `${meta.label}. ${meta.statement}`);

  [...dom.familyPhotoFrames.querySelectorAll("[data-closeness-frame]")].forEach((frame) => {
    frame.classList.toggle("is-active", frame.dataset.closenessFrame === meta.value);
  });

  dom.receiveFurtherButton.disabled = currentIndex === 0;
  dom.receiveCloserButton.disabled = currentIndex === closenessOptions.length - 1;
}

function changeReceiveClosenessBy(delta) {
  const currentIndex = getClosenessIndex(state.postcard.familyCloseness);
  const nextIndex = Math.min(Math.max(currentIndex + delta, 0), closenessOptions.length - 1);
  updateReceiveCloseness(closenessOptions[nextIndex].value);
}

function updateReceiveFocus(value) {
  state.postcard.selectedNarrativeFocus = value;

  [...dom.receiveStampGrid.querySelectorAll("[data-focus-select]")].forEach((button) => {
    const isSelected = button.dataset.focusSelect === value;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-checked", String(isSelected));
  });

  updateReceiveStepValidity();
}

function updateReceiveTone(value) {
  state.postcard.tone = value;

  [...dom.receiveToneGrid.querySelectorAll("[data-tone-select]")].forEach((button) => {
    const isSelected = button.dataset.toneSelect === value;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-checked", String(isSelected));
  });

  updateReceiveStepValidity();
}

function renderReceiveSummary() {
  const closeness = getClosenessMeta(state.postcard.familyCloseness);
  const focus = getFocusMeta(state.postcard.selectedNarrativeFocus);
  const tone = getToneMeta(state.postcard.tone);

  dom.reviewPostcard.dataset.tone = tone.value;
  dom.reviewStampImage.src = focus.asset;
  dom.reviewStampImage.alt = `${focus.label} stamp`;
  dom.reviewPhotoCard.innerHTML = `
    <img
      src="${closeness.asset}"
      alt="${escapeHtml(closeness.label)} family illustration"
      class="review-photo-image"
    >
  `;

  dom.receiveSummary.innerHTML = `
    <div class="review-summary-block">
      <strong>Closeness:</strong>
      <p>${escapeHtml(closeness.label)} — ${escapeHtml(closeness.statement)}</p>
    </div>
    <div class="review-summary-block">
      <strong>Narrative focus:</strong>
      <p>${escapeHtml(focus.displayTitle)} — ${escapeHtml(focus.description)}</p>
    </div>
    <div class="review-summary-block">
      <strong>Mood:</strong>
      <p>${escapeHtml(tone.label.charAt(0) + tone.label.slice(1).toLowerCase())} — ${escapeHtml(tone.descriptor)}</p>
    </div>
  `;
}

function updateStepper() {
  dom.stepMarkers.forEach((marker) => {
    const markerStep = Number(marker.dataset.stepMarker);
    marker.classList.toggle("is-current", markerStep === state.receiveStep);
    marker.classList.toggle("is-complete", markerStep < state.receiveStep);
  });

  dom.stepPanels.forEach((panel) => {
    panel.hidden = Number(panel.dataset.receiveStep) !== state.receiveStep;
  });

  if (state.receiveStep === 4) {
    renderReceiveSummary();
  }

  updateReceiveStepValidity();
}

function setReceiveStep(step) {
  state.receiveStep = step;
  updateStepper();
}

function updateReceiveStepValidity() {
  const step2Next = dom.appShell.querySelector('[data-receive-step="2"] [data-step-next="3"]');
  const step3Next = dom.appShell.querySelector('[data-receive-step="3"] [data-step-next="4"]');

  if (step2Next) {
    step2Next.disabled = !state.postcard.selectedNarrativeFocus;
  }

  if (step3Next) {
    step3Next.disabled = !state.postcard.tone;
  }

  if (dom.sendPostcardButton) {
    dom.sendPostcardButton.disabled = !state.postcard.selectedNarrativeFocus || !state.postcard.tone;
  }
}

function resetPostcardExperience() {
  state.postcard = { ...defaultPostcardState };
  updateReceiveCloseness(state.postcard.familyCloseness);
  updateReceiveFocus(state.postcard.selectedNarrativeFocus);
  updateReceiveTone(state.postcard.tone);
  dom.sendStatus.textContent = "";
  dom.receiveResultsMeta.textContent = "";
  dom.receiveResults.innerHTML = "";
  dom.receiveEmptyState.hidden = true;
  dom.sendingStage.classList.remove("is-sending");
  setReceiveStep(1);
}

function matchScore(story, criteria) {
  let score = 0;
  if (story.tone === criteria.tone) score += 1;
  if (story.familyCloseness === criteria.familyCloseness) score += 1;
  if (story.narrativeFocuses.includes(criteria.selectedNarrativeFocus)) score += 1;
  return score;
}

function findMatchingStories(criteria) {
  const approvedStories = getApprovedStories();
  const exact = [];
  const soft = [];
  const focusOnly = [];

  approvedStories.forEach((story) => {
    const score = matchScore(story, criteria);

    if (score === 3) {
      exact.push({ story, matchType: "Exact match" });
      return;
    }

    if (score === 2) {
      soft.push({ story, matchType: "Soft match" });
      return;
    }

    if (story.narrativeFocuses.includes(criteria.selectedNarrativeFocus)) {
      focusOnly.push({ story, matchType: "Focus match" });
    }
  });

  const results = [...exact];

  if (results.length < 3) {
    results.push(...soft);
  }

  if (results.length === 0) {
    results.push(...focusOnly);
  }

  return results;
}

function storyPreview(storyText) {
  const trimmed = storyText.trim();
  return trimmed.length > 132 ? `${trimmed.slice(0, 129)}...` : trimmed;
}

function buildStoryCard(match, context) {
  const story = match.story;
  const tone = getToneMeta(story.tone);
  const closeness = getClosenessMeta(story.familyCloseness);
  const showMatch = context === "results" && match.matchType !== "Archive story";
  const focusTags = story.narrativeFocuses.map((focusValue) => {
    const meta = getFocusMeta(focusValue);
    return `<span class="story-tag story-tag-focus">${escapeHtml(meta.label.charAt(0) + meta.label.slice(1).toLowerCase())}</span>`;
  }).join("");

  return `
    <button
      type="button"
      class="story-card ${showMatch ? "story-card-has-match" : "story-card-no-match"}"
      data-story-open="${story.id}"
    >
      ${showMatch ? `<span class="match-pill">${escapeHtml(match.matchType)}</span>` : ""}
      <div class="story-card-body">
        <p class="story-card-preview">${escapeHtml(storyPreview(story.storyText))}</p>
      </div>
      <div class="story-card-footer">
        <div class="story-card-top-tags">
          <span class="story-tag story-tag-closeness">${escapeHtml(closeness.label)}</span>
          <span class="tone-badge" data-tone="${story.tone}">${escapeHtml(tone.label.charAt(0) + tone.label.slice(1).toLowerCase())}</span>
        </div>
        <div class="focus-tag-row">${focusTags}</div>
      </div>
    </button>
  `;
}

function renderReceiveResults() {
  const matches = findMatchingStories(state.postcard);
  dom.receiveResults.innerHTML = matches.map((match) => buildStoryCard(match, "results")).join("");

  if (matches.length > 0) {
    dom.receiveResultsMeta.textContent = `${matches.length} envelope${matches.length === 1 ? "" : "s"} arrived. Exact matches appear first, followed by softer similarities when needed.`;
    dom.receiveEmptyState.hidden = true;
  } else {
    dom.receiveResultsMeta.textContent = "";
    dom.receiveEmptyState.hidden = false;
  }
}

function applyGalleryFilters(stories) {
  return stories.filter((story) => {
    if (state.galleryFilters.focus !== "all" && !story.narrativeFocuses.includes(state.galleryFilters.focus)) {
      return false;
    }

    if (state.galleryFilters.tone !== "all" && story.tone !== state.galleryFilters.tone) {
      return false;
    }

    if (state.galleryFilters.familyCloseness !== "all" && story.familyCloseness !== state.galleryFilters.familyCloseness) {
      return false;
    }

    return true;
  });
}

function renderGallery() {
  const stories = applyGalleryFilters(getApprovedStories());
  dom.galleryGrid.innerHTML = stories.map((story) => buildStoryCard({ story, matchType: "Archive story" }, "gallery")).join("");
  if (REMOTE_MODE && state.remoteLoadState === "loading") {
    dom.galleryMeta.textContent = "Loading approved stories from Supabase...";
  } else if (REMOTE_MODE && state.remoteLoadState === "error") {
    dom.galleryMeta.textContent = `${stories.length} approved stor${stories.length === 1 ? "y" : "ies"} shown. Supabase could not be reached, so only fallback stories are visible.`;
  } else {
    dom.galleryMeta.textContent = `${stories.length} approved stor${stories.length === 1 ? "y" : "ies"} shown.`;
  }
  dom.galleryEmptyState.hidden = stories.length > 0;
}

function renderAdminPanel() {
  if (REMOTE_MODE) {
    dom.adminList.innerHTML = "";
    dom.adminMeta.textContent = "Moderation is now handled in Supabase. Use the dashboard to approve or reject pending stories.";
    dom.adminEmptyState.hidden = false;
    dom.adminEmptyState.querySelector("h4").textContent = "Supabase moderation is active.";
    dom.adminEmptyState.querySelector("p").textContent = "This local review panel is disabled while the project is connected to Supabase.";
    return;
  }

  const pendingStories = getPendingStories();
  dom.adminList.innerHTML = pendingStories.map((story) => {
    const focusList = story.narrativeFocuses.map((focusValue) => getFocusMeta(focusValue).label).join(", ");
    const closeness = getClosenessMeta(story.familyCloseness).label;
    return `
      <article class="admin-card">
        <h4>Anonymous submission</h4>
        <p><strong>Language:</strong> ${escapeHtml(story.language)}</p>
        <p><strong>Closeness:</strong> ${escapeHtml(closeness)}</p>
        <p><strong>Focus:</strong> ${escapeHtml(focusList)}</p>
        <p><strong>Tone:</strong> ${escapeHtml(getToneMeta(story.tone).label.charAt(0) + getToneMeta(story.tone).label.slice(1).toLowerCase())}</p>
        <p>${escapeHtml(story.storyText)}</p>
        <div class="admin-actions">
          <button type="button" class="admin-action" data-admin-action="approved" data-story-id="${story.id}">Approve locally</button>
          <button type="button" class="admin-action" data-admin-action="rejected" data-story-id="${story.id}">Reject locally</button>
          <button type="button" class="admin-action" data-story-open="${story.id}">Read as letter</button>
        </div>
      </article>
    `;
  }).join("");

  dom.adminMeta.textContent = `${pendingStories.length} pending local submission${pendingStories.length === 1 ? "" : "s"}.`;
  dom.adminEmptyState.hidden = pendingStories.length > 0;
}

function renderStoryDialog(storyId) {
  const story = getStoryById(storyId);
  if (!story) return;

  const focusTags = story.narrativeFocuses.map((focusValue) => {
    const meta = getFocusMeta(focusValue);
    return `<span class="story-tag story-tag-focus">${escapeHtml(meta.label.charAt(0) + meta.label.slice(1).toLowerCase())}</span>`;
  }).join("");

  const paragraphs = story.storyText
    .split(/\n+/)
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");

  dom.storyDialogContent.innerHTML = `
    <header class="letter-header">
      <div class="letter-meta">
        <span class="tone-badge" data-tone="${story.tone}">${escapeHtml(getToneMeta(story.tone).label.charAt(0) + getToneMeta(story.tone).label.slice(1).toLowerCase())}</span>
        <span class="story-tag story-tag-closeness">${escapeHtml(getClosenessMeta(story.familyCloseness).label)}</span>
        <span class="story-tag story-tag-focus">${escapeHtml(story.language)}</span>
        ${focusTags}
      </div>
    </header>
    <div class="letter-body">${paragraphs}</div>
  `;

  if (dom.storyDialog.open) {
    dom.storyDialog.close();
  }

  if (typeof dom.storyDialog.showModal === "function") {
    dom.storyDialog.showModal();
  } else {
    dom.storyDialog.setAttribute("open", "true");
  }
}

function setView(viewName) {
  if (viewName === "admin" && !state.adminVisible) {
    viewName = "home";
  }

  setMobileMenu(false);
  state.activeView = viewName;
  dom.body.dataset.view = viewName;

  dom.views.forEach((view) => {
    view.hidden = view.dataset.view !== viewName;
  });

  dom.navButtons.forEach((button) => {
    const isMatch = button.dataset.viewTarget === viewName;
    button.classList.toggle("is-active", isMatch);
  });

  if (window.location.hash !== `#${viewName}`) {
    window.location.hash = viewName;
  }

  const heading = document.querySelector(`[data-view="${viewName}"] h2`);
  if (heading) heading.focus?.();

  if (viewName === "gallery") renderGallery();
  if (viewName === "admin") renderAdminPanel();
}

function updateAdminVisibility() {
  dom.adminViewButton.hidden = !state.adminVisible;
  dom.adminToggleButton.hidden = !state.adminVisible;

  if (!state.adminVisible && state.activeView === "admin") {
    setView("home");
  }
}

function toggleAdminVisibility(forceVisible) {
  if (REMOTE_MODE) return;
  state.adminVisible = typeof forceVisible === "boolean" ? forceVisible : !state.adminVisible;
  window.localStorage.setItem(ADMIN_FLAG_KEY, String(state.adminVisible));
  updateAdminVisibility();
}

function resetSubmissionForm() {
  dom.submissionForm.reset();
  const defaultCloseness = dom.submissionForm.querySelector(`input[name="familyCloseness"][value="${defaultSubmissionState.familyCloseness}"]`);
  const defaultTone = dom.submissionForm.querySelector(`input[name="tone"][value="${defaultSubmissionState.tone}"]`);
  if (defaultCloseness) defaultCloseness.checked = true;
  if (defaultTone) defaultTone.checked = true;
  dom.focusValidationMessage.textContent = "";
  dom.submissionStatus.textContent = "";
  dom.storyHintOutput.hidden = true;
  dom.storyHintOutput.textContent = "";
}

function validateFocusSelection() {
  const checked = [...dom.submissionForm.querySelectorAll('input[name="narrativeFocuses"]:checked')];
  const allFocusInputs = [...dom.submissionForm.querySelectorAll('input[name="narrativeFocuses"]')];

  allFocusInputs.forEach((input) => {
    input.disabled = checked.length >= 3 && !input.checked;
  });

  if (checked.length === 0) {
    dom.focusValidationMessage.textContent = "Choose at least one narrative focus.";
  } else if (checked.length >= 3) {
    dom.focusValidationMessage.textContent = "You have reached the maximum of three narrative focuses.";
  } else {
    dom.focusValidationMessage.textContent = "";
  }
}

function insertStoryHint() {
  const hint = STORY_HINTS[Math.floor(Math.random() * STORY_HINTS.length)];
  dom.storyHintOutput.hidden = false;
  dom.storyHintOutput.textContent = hint;
}

async function submitStory(event) {
  event.preventDefault();

  const formData = new FormData(dom.submissionForm);
  const storyText = (formData.get("storyText") || "").toString().trim();
  const familyCloseness = (formData.get("familyCloseness") || "").toString();
  const narrativeFocuses = formData.getAll("narrativeFocuses").map(String);
  const tone = (formData.get("tone") || "").toString();
  const language = (formData.get("language") || "").toString();
  const consent = formData.get("consent") === "on";
  const errors = [];

  if (!storyText) errors.push("Story text is required.");
  if (!familyCloseness) errors.push("Family closeness is required.");
  if (narrativeFocuses.length < 1 || narrativeFocuses.length > 3) errors.push("Choose between 1 and 3 narrative focuses.");
  if (!tone) errors.push("Tone is required.");
  if (!language) errors.push("Language is required.");
  if (!consent) errors.push("Consent is required.");

  if (errors.length > 0) {
    dom.submissionStatus.textContent = errors.join(" ");
    return;
  }

  const newStory = {
    id: createStoryId(),
    storyText,
    narrativeFocuses,
    tone,
    familyCloseness,
    displayName: "Anonymous",
    language,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  const submitButton = dom.submissionForm.querySelector('button[type="submit"]');
  if (submitButton) submitButton.disabled = true;

  try {
    if (REMOTE_MODE) {
      dom.submissionStatus.textContent = "Sending your story to the archive...";
      await createPendingStoryInSupabase(newStory);
      dom.submissionConfirmationText.textContent = "It has been sent to Supabase with a pending status and will only appear publicly after review.";
      await refreshApprovedStories();
    } else {
      const localStories = getLocalStories();
      localStories.push(newStory);
      safeWriteStorage(localStories);
      dom.submissionConfirmationText.textContent = "It has been saved locally in this browser with a pending status.";
      renderAdminPanel();
    }

    dom.submissionStatus.textContent = "";
    dom.submissionForm.hidden = true;
    dom.submissionConfirmation.hidden = false;
  } catch (error) {
    console.error("Could not submit story.", error);
    dom.submissionStatus.textContent = error instanceof Error
      ? error.message
      : "Could not send your story right now. Please try again.";
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
}

function approveOrRejectLocalStory(storyId, nextStatus) {
  const localStories = getLocalStories();
  const updatedStories = localStories.map((story) => {
    if (story.id !== storyId) return story;
    return { ...story, status: nextStatus };
  });

  safeWriteStorage(updatedStories);
  renderAdminPanel();
  renderGallery();
}

function bootFromLocation() {
  const hashView = window.location.hash.replace("#", "");
  const validViews = new Set(["home", "receive", "submit", "gallery", "admin"]);
  setView(validViews.has(hashView) ? hashView : "home");
}

function bindEvents() {
  dom.mobileMenuToggle?.addEventListener("click", () => {
    setMobileMenu(!state.mobileMenuOpen);
  });

  dom.navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.resetPostcard === "true") {
        resetPostcardExperience();
      } else if (button.dataset.viewTarget === "receive" && state.receiveStep === 5) {
        resetPostcardExperience();
      }

      if (button.id === "submitAnotherButton") return;
      setView(button.dataset.viewTarget);
    });
  });

  dom.receiveFurtherButton.addEventListener("click", () => {
    changeReceiveClosenessBy(-1);
  });

  dom.receiveCloserButton.addEventListener("click", () => {
    changeReceiveClosenessBy(1);
  });

  dom.receivePhotoStage.addEventListener("wheel", (event) => {
    if (state.activeView !== "receive" || state.receiveStep !== 1) return;
    event.preventDefault();
    changeReceiveClosenessBy(event.deltaY > 0 ? -1 : 1);
  }, { passive: false });

  dom.appShell.addEventListener("click", (event) => {
    const homeCard = event.target.closest("[data-home-target]");
    if (homeCard && !event.target.closest(".card-arrow")) {
      setView(homeCard.dataset.homeTarget);
      return;
    }

    const nextStep = event.target.closest("[data-step-next]");
    if (nextStep) {
      if (nextStep.disabled) return;
      setReceiveStep(Number(nextStep.dataset.stepNext));
      return;
    }

    const prevStep = event.target.closest("[data-step-prev]");
    if (prevStep) {
      setReceiveStep(Number(prevStep.dataset.stepPrev));
      return;
    }

    const focusSelect = event.target.closest("[data-focus-select]");
    if (focusSelect) {
      updateReceiveFocus(focusSelect.dataset.focusSelect);
      return;
    }

    const toneSelect = event.target.closest("[data-tone-select]");
    if (toneSelect) {
      updateReceiveTone(toneSelect.dataset.toneSelect);
      return;
    }

    const openStory = event.target.closest("[data-story-open]");
    if (openStory) {
      renderStoryDialog(openStory.dataset.storyOpen);
      return;
    }

    const adminAction = event.target.closest("[data-admin-action]");
    if (adminAction) {
      approveOrRejectLocalStory(adminAction.dataset.storyId, adminAction.dataset.adminAction);
    }
  });

  dom.appShell.addEventListener("keydown", (event) => {
    const homeCard = event.target.closest("[data-home-target]");
    if (!homeCard) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setView(homeCard.dataset.homeTarget);
    }
  });

  dom.sendPostcardButton.addEventListener("click", () => {
    if (dom.sendPostcardButton.disabled) return;
    dom.sendStatus.textContent = "Sending postcard...";
    dom.sendPostcardButton.disabled = true;
    dom.sendingStage.classList.remove("is-sending");
    void dom.sendingStage.offsetWidth;
    dom.sendingStage.classList.add("is-sending");

    window.setTimeout(() => {
      dom.sendStatus.textContent = "The archive has answered.";
      renderReceiveResults();
      setReceiveStep(5);
      dom.sendPostcardButton.disabled = false;
    }, 1200);
  });

  dom.storyHintButton.addEventListener("click", insertStoryHint);
  dom.submissionForm.addEventListener("submit", submitStory);
  dom.galleryFiltersToggle?.addEventListener("click", () => {
    setGalleryFiltersOpen(!state.galleryFiltersOpen);
  });

  dom.submissionForm.addEventListener("change", (event) => {
    if (event.target.name === "narrativeFocuses") {
      validateFocusSelection();
    }
  });

  dom.submitAnotherButton.addEventListener("click", () => {
    dom.submissionConfirmation.hidden = true;
    dom.submissionForm.hidden = false;
    resetSubmissionForm();
  });

  dom.galleryFilters.addEventListener("change", () => {
    state.galleryFilters = {
      focus: dom.galleryFocusFilter.value,
      tone: dom.galleryToneFilter.value,
      familyCloseness: dom.galleryClosenessFilter.value
    };
    renderGallery();
  });

  dom.resetGalleryFilters.addEventListener("click", () => {
    state.galleryFilters = {
      focus: "all",
      tone: "all",
      familyCloseness: "all"
    };
    dom.galleryFocusFilter.value = "all";
    dom.galleryToneFilter.value = "all";
    dom.galleryClosenessFilter.value = "all";
    renderGallery();
  });

  dom.adminToggleButton.addEventListener("click", () => {
    setView("admin");
  });

  window.addEventListener("hashchange", bootFromLocation);
  window.addEventListener("resize", () => {
    if (window.innerWidth > 720 && state.mobileMenuOpen) {
      setMobileMenu(false);
    }
  });

  window.addEventListener("keydown", (event) => {
    const activeTag = document.activeElement?.tagName?.toLowerCase();
    const isTypingTarget = ["input", "textarea", "select"].includes(activeTag);
    const shouldToggleAdmin = (event.metaKey || event.ctrlKey) && event.shiftKey && event.key.toLowerCase() === "a";

    if (shouldToggleAdmin) {
      event.preventDefault();
      toggleAdminVisibility();
      return;
    }

    if (event.key === "Escape" && dom.storyDialog.open) {
      dom.storyDialog.close?.();
      return;
    }

    if (event.key === "Escape" && state.mobileMenuOpen) {
      setMobileMenu(false);
      return;
    }

    if (isTypingTarget) return;

    if (state.activeView === "receive" && state.receiveStep === 1) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        changeReceiveClosenessBy(-1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        changeReceiveClosenessBy(1);
      }
    }
  });
}

async function init() {
  renderOptionControls();
  updateReceiveCloseness(state.postcard.familyCloseness);
  updateReceiveFocus(state.postcard.selectedNarrativeFocus);
  updateReceiveTone(state.postcard.tone);
  updateStepper();
  updateAdminVisibility();
  resetSubmissionForm();
  validateFocusSelection();
  renderGallery();
  renderAdminPanel();
  bindEvents();
  bootFromLocation();

  if (REMOTE_MODE) {
    await refreshApprovedStories();
  }
}

init();
