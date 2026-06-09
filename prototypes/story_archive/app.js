import { APPROVED_STORIES } from "./data/stories.js";

const STORAGE_KEY = "story-archive-submissions-v1";
const ADMIN_FLAG_KEY = "story-archive-admin-visible-v1";

const narrativeFocusOptions = [
  { value: "what", label: "What", stampLabel: "Keepsake", prompt: "Objects, actions, or events." },
  { value: "why", label: "Why", stampLabel: "Reason", prompt: "Meaning, motive, or significance." },
  { value: "where", label: "Where", stampLabel: "Place", prompt: "Homes, streets, villages, and rooms." },
  { value: "when", label: "When", stampLabel: "Moment", prompt: "Seasons, festivals, and turning points." },
  { value: "who", label: "Who", stampLabel: "Person", prompt: "Specific relatives and relationships." },
  { value: "how", label: "How", stampLabel: "Gesture", prompt: "Rituals, habits, and ways of caring." }
];

const toneOptions = [
  { value: "positive", label: "Positive", descriptor: "Warm and affirming", marker: "Dot pattern" },
  { value: "neutral", label: "Neutral", descriptor: "Steady and reflective", marker: "Ruled lines" },
  { value: "negative", label: "Negative", descriptor: "Heavy or unresolved", marker: "Diagonal hatch" }
];

const closenessOptions = [
  {
    value: "very-close",
    sliderValue: 1,
    label: "My family feels very close to me",
    shortLabel: "Very close",
    preview: { blur: 0.2, scale: 1.08, opacity: 1 }
  },
  {
    value: "close",
    sliderValue: 2,
    label: "We are close, even if not perfect",
    shortLabel: "Close",
    preview: { blur: 0.45, scale: 1.04, opacity: 0.98 }
  },
  {
    value: "somewhat-close",
    sliderValue: 3,
    label: "We are somewhat close",
    shortLabel: "Somewhat close",
    preview: { blur: 0.8, scale: 1.01, opacity: 0.93 }
  },
  {
    value: "complicated",
    sliderValue: 4,
    label: "It feels complicated",
    shortLabel: "Complicated",
    preview: { blur: 1.4, scale: 0.99, opacity: 0.86 }
  },
  {
    value: "distant",
    sliderValue: 5,
    label: "There is some distance between us",
    shortLabel: "Distant",
    preview: { blur: 2.1, scale: 0.96, opacity: 0.73 }
  },
  {
    value: "not-close",
    sliderValue: 6,
    label: "We are not close right now",
    shortLabel: "Not close",
    preview: { blur: 3.1, scale: 0.93, opacity: 0.58 }
  }
];

const dom = {
  appShell: document.getElementById("appShell"),
  navButtons: [...document.querySelectorAll("[data-view-target]")],
  views: [...document.querySelectorAll("[data-view]")],
  stepPanels: [...document.querySelectorAll("[data-receive-step]")],
  stepMarkers: [...document.querySelectorAll("[data-step-marker]")],
  familyPhotoPreview: document.getElementById("familyPhotoPreview"),
  receiveClosenessRange: document.getElementById("receiveClosenessRange"),
  receiveClosenessButtons: document.getElementById("receiveClosenessButtons"),
  receiveClosenessText: document.getElementById("receiveClosenessText"),
  receiveStampGrid: document.getElementById("receiveStampGrid"),
  receiveToneGrid: document.getElementById("receiveToneGrid"),
  receiveSummary: document.getElementById("receiveSummary"),
  sendPostcardButton: document.getElementById("sendPostcardButton"),
  sendingStage: document.getElementById("sendingStage"),
  sendStatus: document.getElementById("sendStatus"),
  receiveResultsMeta: document.getElementById("receiveResultsMeta"),
  receiveResults: document.getElementById("receiveResults"),
  receiveEmptyState: document.getElementById("receiveEmptyState"),
  submissionForm: document.getElementById("submissionForm"),
  submissionClosenessOptions: document.getElementById("submissionClosenessOptions"),
  submissionFocusOptions: document.getElementById("submissionFocusOptions"),
  submissionToneOptions: document.getElementById("submissionToneOptions"),
  focusValidationMessage: document.getElementById("focusValidationMessage"),
  submissionStatus: document.getElementById("submissionStatus"),
  submissionConfirmation: document.getElementById("submissionConfirmation"),
  submitAnotherButton: document.getElementById("submitAnotherButton"),
  galleryFilters: document.getElementById("galleryFilters"),
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
  familyCloseness: "close",
  selectedNarrativeFocus: "what",
  tone: "positive"
};

const state = {
  activeView: "home",
  receiveStep: 1,
  postcard: { ...defaultPostcardState },
  galleryFilters: {
    focus: "all",
    tone: "all",
    familyCloseness: "all"
  },
  adminVisible: shouldShowAdminPanel()
};

function shouldShowAdminPanel() {
  const params = new URLSearchParams(window.location.search);
  return params.get("admin") === "1" || window.localStorage.getItem(ADMIN_FLAG_KEY) === "true";
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

function getApprovedStories() {
  return [...APPROVED_STORIES, ...getLocalStories().filter((story) => story.status === "approved")].sort(sortByNewest);
}

function getPendingStories() {
  return getLocalStories().filter((story) => story.status === "pending");
}

function getStoryById(storyId) {
  return [...APPROVED_STORIES, ...getLocalStories()].find((story) => story.id === storyId);
}

function createStoryId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return `local-${window.crypto.randomUUID()}`;
  }

  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
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

function getFocusMeta(value) {
  return narrativeFocusOptions.find((option) => option.value === value) || narrativeFocusOptions[0];
}

function getToneMeta(value) {
  return toneOptions.find((option) => option.value === value) || toneOptions[0];
}

function renderOptionControls() {
  dom.receiveClosenessButtons.innerHTML = closenessOptions.map((option) => `
    <button
      type="button"
      class="token-button"
      data-closeness-select="${option.value}"
      role="radio"
      aria-checked="false"
    >
      <strong>${escapeHtml(option.shortLabel)}</strong>
      <span>${escapeHtml(option.label)}</span>
    </button>
  `).join("");

  dom.receiveStampGrid.innerHTML = narrativeFocusOptions.map((option) => `
    <button
      type="button"
      class="stamp-button"
      data-focus-select="${option.value}"
      role="radio"
      aria-checked="false"
    >
      <span class="stamp-letter">${escapeHtml(option.label)}</span>
      <strong>${escapeHtml(option.stampLabel)}</strong>
      <span>${escapeHtml(option.prompt)}</span>
      <span class="stamp-chip">Narrative focus: ${escapeHtml(option.label)}</span>
    </button>
  `).join("");

  dom.receiveToneGrid.innerHTML = toneOptions.map((option) => `
    <button
      type="button"
      class="tone-button"
      data-tone="${option.value}"
      data-tone-select="${option.value}"
      role="radio"
      aria-checked="false"
    >
      <strong>${escapeHtml(option.label)}</strong>
      <span>${escapeHtml(option.descriptor)}</span>
      <span>${escapeHtml(option.marker)}</span>
    </button>
  `).join("");

  dom.submissionClosenessOptions.innerHTML = closenessOptions.map((option, index) => `
    <label class="statement-card">
      <input type="radio" name="familyCloseness" value="${option.value}" ${index === 1 ? "checked" : ""} required>
      <span>
        <strong>${escapeHtml(option.shortLabel)}</strong>
        <span>${escapeHtml(option.label)}</span>
      </span>
    </label>
  `).join("");

  dom.submissionFocusOptions.innerHTML = narrativeFocusOptions.map((option) => `
    <label class="checkbox-card">
      <input type="checkbox" name="narrativeFocuses" value="${option.value}">
      <span>
        <strong>${escapeHtml(option.label)}</strong>
        <span>${escapeHtml(option.prompt)}</span>
      </span>
    </label>
  `).join("");

  dom.submissionToneOptions.innerHTML = toneOptions.map((option, index) => `
    <label class="tone-button" data-tone="${option.value}">
      <input type="radio" name="tone" value="${option.value}" ${index === 0 ? "checked" : ""} required>
      <strong>${escapeHtml(option.label)}</strong>
      <span>${escapeHtml(option.descriptor)}</span>
      <span>${escapeHtml(option.marker)}</span>
    </label>
  `).join("");

  fillSelect(dom.galleryFocusFilter, "All narrative focuses", narrativeFocusOptions, "focus");
  fillSelect(dom.galleryToneFilter, "All tones", toneOptions, "tone");
  fillSelect(dom.galleryClosenessFilter, "All closeness levels", closenessOptions, "familyCloseness");
}

function fillSelect(select, allLabel, options, type) {
  const labelKey = type === "familyCloseness" ? "label" : "label";
  const valueKey = "value";
  const optionHtml = options.map((option) => `
    <option value="${option[valueKey]}">${escapeHtml(option[labelKey])}</option>
  `).join("");

  select.innerHTML = `<option value="all">${escapeHtml(allLabel)}</option>${optionHtml}`;
}

function updateReceiveCloseness(value) {
  const meta = getClosenessMeta(value);
  state.postcard.familyCloseness = meta.value;
  dom.receiveClosenessRange.value = String(meta.sliderValue);
  dom.receiveClosenessText.textContent = meta.label;
  dom.familyPhotoPreview.style.setProperty("--focus-blur", `${meta.preview.blur}px`);
  dom.familyPhotoPreview.style.setProperty("--focus-scale", String(meta.preview.scale));
  dom.familyPhotoPreview.style.setProperty("--focus-opacity", String(meta.preview.opacity));

  [...dom.receiveClosenessButtons.querySelectorAll("[data-closeness-select]")].forEach((button) => {
    const isSelected = button.dataset.closenessSelect === meta.value;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-checked", String(isSelected));
  });
}

function updateReceiveFocus(value) {
  state.postcard.selectedNarrativeFocus = value;
  [...dom.receiveStampGrid.querySelectorAll("[data-focus-select]")].forEach((button) => {
    const isSelected = button.dataset.focusSelect === value;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-checked", String(isSelected));
  });
}

function updateReceiveTone(value) {
  state.postcard.tone = value;
  [...dom.receiveToneGrid.querySelectorAll("[data-tone-select]")].forEach((button) => {
    const isSelected = button.dataset.toneSelect === value;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-checked", String(isSelected));
  });
}

function renderReceiveSummary() {
  const closeness = getClosenessMeta(state.postcard.familyCloseness);
  const focus = getFocusMeta(state.postcard.selectedNarrativeFocus);
  const tone = getToneMeta(state.postcard.tone);

  dom.receiveSummary.innerHTML = `
    <dt>Family closeness</dt>
    <dd>${escapeHtml(closeness.label)}</dd>
    <dt>Narrative focus</dt>
    <dd>${escapeHtml(focus.label)}: ${escapeHtml(focus.prompt)}</dd>
    <dt>Tone</dt>
    <dd>${escapeHtml(tone.label)}: ${escapeHtml(tone.descriptor)}</dd>
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
}

function setReceiveStep(step) {
  state.receiveStep = step;
  updateStepper();
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
  return trimmed.length > 126 ? `${trimmed.slice(0, 123)}...` : trimmed;
}

function buildStoryCard(match) {
  const story = match.story;
  const tone = getToneMeta(story.tone);
  const closeness = getClosenessMeta(story.familyCloseness);
  const focusTags = story.narrativeFocuses.map((focusValue) => {
    const meta = getFocusMeta(focusValue);
    return `<span class="story-tag">${escapeHtml(meta.label)}</span>`;
  }).join("");

  return `
    <button type="button" class="envelope-button" data-story-open="${story.id}">
      <div class="envelope-top">
        <div class="story-card-heading">
          <div class="story-card-meta">
            <span class="match-pill">${escapeHtml(match.matchType || "Archive story")}</span>
            <span class="tone-badge" data-tone="${story.tone}">${escapeHtml(tone.label)}</span>
          </div>
          <h4>Letter from ${escapeHtml(story.displayName || "Anonymous")}</h4>
          <p class="story-card-preview">${escapeHtml(storyPreview(story.storyText))}</p>
        </div>
      </div>
      <div class="envelope-bottom">
        <div class="tag-row">${focusTags}</div>
        <p class="story-closeness-note">${escapeHtml(closeness.label)}</p>
      </div>
    </button>
  `;
}

function renderReceiveResults() {
  const matches = findMatchingStories(state.postcard);
  dom.receiveResults.innerHTML = matches.map(buildStoryCard).join("");

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
  dom.galleryGrid.innerHTML = stories.map((story) => buildStoryCard({ story, matchType: "Archive story" })).join("");

  dom.galleryMeta.textContent = `${stories.length} approved stor${stories.length === 1 ? "y" : "ies"} shown.`;
  dom.galleryEmptyState.hidden = stories.length > 0;
}

function renderAdminPanel() {
  const pendingStories = getPendingStories();
  dom.adminList.innerHTML = pendingStories.map((story) => {
    const focusList = story.narrativeFocuses.map((focus) => getFocusMeta(focus).label).join(", ");
    const closeness = getClosenessMeta(story.familyCloseness).label;
    return `
      <article class="admin-card">
        <h4>${escapeHtml(story.displayName || "Anonymous")}</h4>
        <p><strong>Language:</strong> ${escapeHtml(story.language)}</p>
        <p><strong>Closeness:</strong> ${escapeHtml(closeness)}</p>
        <p><strong>Focus:</strong> ${escapeHtml(focusList)}</p>
        <p><strong>Tone:</strong> ${escapeHtml(getToneMeta(story.tone).label)}</p>
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
  const statusLabel = story.status.charAt(0).toUpperCase() + story.status.slice(1);

  const focusTags = story.narrativeFocuses.map((focusValue) => {
    const meta = getFocusMeta(focusValue);
    return `<span class="story-tag">${escapeHtml(meta.label)}</span>`;
  }).join("");

  const paragraphs = story.storyText
    .split(/\n+/)
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");

  dom.storyDialogContent.innerHTML = `
    <header class="letter-header">
      <div class="letter-heading-top">
        <span class="match-pill">${escapeHtml(statusLabel)} story</span>
        <span class="tone-badge" data-tone="${story.tone}">${escapeHtml(getToneMeta(story.tone).label)}</span>
      </div>
      <h2 id="storyDialogTitle">Letter from ${escapeHtml(story.displayName || "Anonymous")}</h2>
      <div class="letter-meta">
        <span class="story-tag">${escapeHtml(getClosenessMeta(story.familyCloseness).label)}</span>
        <span class="story-tag">${escapeHtml(story.language)}</span>
        ${focusTags}
      </div>
    </header>
    <div class="letter-body">${paragraphs}</div>
    <p class="signature">With care, ${escapeHtml(story.displayName || "Anonymous")}</p>
  `;

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

  state.activeView = viewName;
  dom.views.forEach((view) => {
    view.hidden = view.dataset.view !== viewName;
  });

  dom.navButtons.forEach((button) => {
    const isMatch = button.dataset.viewTarget === viewName;
    button.classList.toggle("is-active", isMatch);
  });

  window.location.hash = viewName;
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
  state.adminVisible = typeof forceVisible === "boolean" ? forceVisible : !state.adminVisible;
  window.localStorage.setItem(ADMIN_FLAG_KEY, String(state.adminVisible));
  updateAdminVisibility();
}

function resetSubmissionForm() {
  dom.submissionForm.reset();
  const defaultCloseness = dom.submissionForm.querySelector('input[name="familyCloseness"][value="close"]');
  const defaultTone = dom.submissionForm.querySelector('input[name="tone"][value="positive"]');
  if (defaultCloseness) defaultCloseness.checked = true;
  if (defaultTone) defaultTone.checked = true;
  dom.focusValidationMessage.textContent = "";
  dom.submissionStatus.textContent = "";
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

function submitStory(event) {
  event.preventDefault();

  const formData = new FormData(dom.submissionForm);
  const storyText = (formData.get("storyText") || "").toString().trim();
  const displayName = (formData.get("displayName") || "").toString().trim() || "Anonymous";
  const language = (formData.get("language") || "").toString();
  const familyCloseness = (formData.get("familyCloseness") || "").toString();
  const narrativeFocuses = formData.getAll("narrativeFocuses").map(String);
  const tone = (formData.get("tone") || "").toString();
  const consent = formData.get("consent") === "on";

  const errors = [];

  if (!storyText) errors.push("Story text is required.");
  if (!familyCloseness) errors.push("Family closeness is required.");
  if (narrativeFocuses.length < 1 || narrativeFocuses.length > 3) {
    errors.push("Choose between 1 and 3 narrative focuses.");
  }
  if (!tone) errors.push("Tone is required.");
  if (!consent) errors.push("Consent is required.");

  if (errors.length > 0) {
    dom.submissionStatus.textContent = errors.join(" ");
    return;
  }

  const localStories = getLocalStories();
  localStories.push({
    id: createStoryId(),
    storyText,
    narrativeFocuses,
    tone,
    familyCloseness,
    displayName,
    language,
    status: "pending",
    createdAt: new Date().toISOString()
  });

  safeWriteStorage(localStories);
  dom.submissionStatus.textContent = "";
  dom.submissionForm.hidden = true;
  dom.submissionConfirmation.hidden = false;
  renderAdminPanel();
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
  dom.navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.resetPostcard === "true") {
        resetPostcardExperience();
      } else if (button.dataset.viewTarget === "receive" && state.receiveStep === 5) {
        resetPostcardExperience();
      }

      setView(button.dataset.viewTarget);
    });
  });

  dom.receiveClosenessRange.addEventListener("input", (event) => {
    const sliderValue = Number(event.target.value);
    const match = closenessOptions.find((option) => option.sliderValue === sliderValue) || closenessOptions[0];
    updateReceiveCloseness(match.value);
  });

  dom.appShell.addEventListener("click", (event) => {
    const nextStep = event.target.closest("[data-step-next]");
    if (nextStep) {
      setReceiveStep(Number(nextStep.dataset.stepNext));
      return;
    }

    const prevStep = event.target.closest("[data-step-prev]");
    if (prevStep) {
      setReceiveStep(Number(prevStep.dataset.stepPrev));
      return;
    }

    const closenessSelect = event.target.closest("[data-closeness-select]");
    if (closenessSelect) {
      updateReceiveCloseness(closenessSelect.dataset.closenessSelect);
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

  dom.sendPostcardButton.addEventListener("click", () => {
    dom.sendStatus.textContent = "Sending postcard...";
    dom.sendingStage.classList.remove("is-sending");
    void dom.sendingStage.offsetWidth;
    dom.sendingStage.classList.add("is-sending");

    window.setTimeout(() => {
      dom.sendStatus.textContent = "The archive has answered.";
      renderReceiveResults();
      setReceiveStep(5);
    }, 1200);
  });

  dom.submissionForm.addEventListener("submit", submitStory);

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

  window.addEventListener("keydown", (event) => {
    const shouldToggle = (event.metaKey || event.ctrlKey) && event.shiftKey && event.key.toLowerCase() === "a";
    if (shouldToggle) {
      event.preventDefault();
      toggleAdminVisibility();
    }

    if (event.key === "Escape" && dom.storyDialog.hasAttribute("open")) {
      dom.storyDialog.close?.();
    }
  });
}

function init() {
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
}

init();
