const state = {
  lang: localStorage.getItem("gg_online_lang") || "vi",
  room: null,
  playerId: localStorage.getItem("gg_online_player_id") || "",
  roomCode: localStorage.getItem("gg_online_room_code") || "",
  generations: {},
  stepChoice: 1,
  playerDetailsOpen: false,
  source: null
};

const AVATAR_BY_GENERATION = {
  "war-time": "./ui/avatars/avatar_boomer.png",
  subsidy: "./ui/avatars/avatar_genx.png",
  reform: "./ui/avatars/avatar_millenial.png",
  "digital-native": "./ui/avatars/avatar_genz.png"
};

const refs = {
  landingScreen: document.getElementById("landingScreen"),
  roomScreen: document.getElementById("roomScreen"),
  heroCopy: document.getElementById("heroCopy"),
  createTitle: document.getElementById("createTitle"),
  createSubtitle: document.getElementById("createSubtitle"),
  joinTitle: document.getElementById("joinTitle"),
  joinSubtitle: document.getElementById("joinSubtitle"),
  createForm: document.getElementById("createForm"),
  joinForm: document.getElementById("joinForm"),
  createNameInput: document.getElementById("createNameInput"),
  joinNameInput: document.getElementById("joinNameInput"),
  createGenerationSelect: document.getElementById("createGenerationSelect"),
  joinGenerationSelect: document.getElementById("joinGenerationSelect"),
  createGenerationPicker: document.getElementById("createGenerationPicker"),
  joinGenerationPicker: document.getElementById("joinGenerationPicker"),
  joinRoomCodeInput: document.getElementById("joinRoomCodeInput"),
  roomTitle: document.getElementById("roomTitle"),
  roomMeta: document.getElementById("roomMeta"),
  roomCodeValue: document.getElementById("roomCodeValue"),
  roomCodeValueInline: document.getElementById("roomCodeValueInline"),
  startGameBtn: document.getElementById("startGameBtn"),
  endGameBtn: document.getElementById("endGameBtn"),
  sideEraDeckBtn: document.getElementById("sideEraDeckBtn"),
  sideLifeDeckBtn: document.getElementById("sideLifeDeckBtn"),
  activePlayerAvatar: document.getElementById("activePlayerAvatar"),
  activePlayerName: document.getElementById("activePlayerName"),
  activePlayerGenerationTag: document.getElementById("activePlayerGenerationTag"),
  activePlayerAge: document.getElementById("activePlayerAge"),
  activeStatsGrid: document.getElementById("activeStatsGrid"),
  activeOccupation: document.getElementById("activeOccupation"),
  activeHobby: document.getElementById("activeHobby"),
  activeHousing: document.getElementById("activeHousing"),
  activeRelationship: document.getElementById("activeRelationship"),
  activeChildren: document.getElementById("activeChildren"),
  activeUpkeep: document.getElementById("activeUpkeep"),
  tagWrap: document.getElementById("tagWrap"),
  playerDetailsToggle: document.getElementById("playerDetailsToggle"),
  playerDetailsBody: document.getElementById("playerDetailsBody"),
  turnHint: document.getElementById("turnHint"),
  turnTitle: document.getElementById("turnTitle"),
  spaceCardTitle: document.getElementById("spaceCardTitle"),
  spaceCardDesc: document.getElementById("spaceCardDesc"),
  stepBlock1: document.getElementById("stepBlock1"),
  stepBlock2: document.getElementById("stepBlock2"),
  stepBlock3: document.getElementById("stepBlock3"),
  startTurnBtn: document.getElementById("startTurnBtn"),
  submitStepsBtn: document.getElementById("submitStepsBtn"),
  endTurnBtn: document.getElementById("endTurnBtn"),
  rosterList: document.getElementById("rosterList"),
  logList: document.getElementById("logList"),
  modalBackdrop: document.getElementById("modalBackdrop"),
  modalCard: document.getElementById("modalCard"),
  langViBtn: document.getElementById("langViBtn"),
  langEnBtn: document.getElementById("langEnBtn")
};

const TEXT = {
  vi: {
    hero: "Một bản thử nghiệm online co-op của Đứng Núi Này Trông Núi Nọ. Tạo phòng, chia sẻ mã và để từng người chơi tham gia từ thiết bị riêng.",
    createTitle: "Tạo phòng mới",
    createSubtitle: "Dùng khi bạn là người mở phiên chơi.",
    joinTitle: "Vào phòng có sẵn",
    joinSubtitle: "Dùng mã phòng để tham gia từ thiết bị khác.",
    nameLabel: "Tên / nickname",
    generationLabel: "Thế hệ",
    roomCodeLabel: "Mã phòng",
    createRoom: "Tạo phòng",
    joinRoom: "Vào phòng",
    roomHeader: "Phòng trực tuyến",
    roomCodeCaption: "Mã phòng",
    startGame: "Bắt đầu chơi",
    endGame: "Kết thúc ván",
    startTurn: "Bắt đầu lượt",
    submitSteps: "Xác nhận số bước",
    endTurn: "Kết thúc lượt",
    activePlayer: "Người đang chơi",
    turnTitle: "Tờ khai lượt đi",
    rosterTitle: "Tất cả người chơi",
    rosterEyebrow: "Người chơi",
    logTitle: "Diễn biến ván chơi",
    logEyebrow: "Nhật ký",
    age: "Tuổi",
    space: "Ô hiện tại",
    phase: "Trạng thái",
    occupation: "Nghề nghiệp",
    hobby: "Sở thích",
    housing: "Nơi ở",
    relationship: "Quan hệ",
    children: "Gia đình",
    upkeep: "Chi phí mỗi lượt",
    noUpkeep: "Không có chi phí duy trì.",
    showDetails: "Xem thêm thông tin",
    hideDetails: "Thu gọn thông tin",
    waitForTurn: "Hãy đợi đến lượt của bạn.",
    canStart: "Bắt đầu lượt để nhận chi phí và thu nhập định kỳ.",
    canStep: "Chọn 1, 2 hoặc 3 bước rồi xác nhận.",
    canResolve: "Xử lý nội dung ô hiện tại rồi kết thúc lượt.",
    lobbyWaiting: "Chờ mọi người vào phòng, sau đó người tạo phòng có thể bắt đầu.",
    createError: "Không tạo được phòng.",
    joinError: "Không vào được phòng.",
    reconnectError: "Không kết nối được tới phòng.",
    confirm: "Xác nhận",
    choose: "Chọn",
    results: "Tổng kết cuộc đời",
    finished: "Về đích",
    logEmpty: "Chưa có sự kiện nào."
  },
  en: {
    hero: "An online co-op MVP of Greener Grass. Create a room, share the code, and let each player join from their own device.",
    createTitle: "Create a new room",
    createSubtitle: "Use this when you are hosting the session.",
    joinTitle: "Join an existing room",
    joinSubtitle: "Enter the room code to join from another device.",
    nameLabel: "Name / nickname",
    generationLabel: "Generation",
    roomCodeLabel: "Room code",
    createRoom: "Create room",
    joinRoom: "Join room",
    roomHeader: "Online room",
    roomCodeCaption: "Room code",
    startGame: "Start game",
    endGame: "End game",
    startTurn: "Start turn",
    submitSteps: "Confirm steps",
    endTurn: "End turn",
    activePlayer: "Active player",
    turnTitle: "Turn sheet",
    rosterTitle: "All players",
    rosterEyebrow: "Players",
    logTitle: "Game log",
    logEyebrow: "Log",
    age: "Age",
    space: "Current space",
    phase: "Phase",
    occupation: "Occupation",
    hobby: "Hobby",
    housing: "Housing",
    relationship: "Relationship",
    children: "Family",
    upkeep: "Per-turn upkeep",
    noUpkeep: "No ongoing upkeep.",
    showDetails: "Show more details",
    hideDetails: "Hide details",
    waitForTurn: "Wait for your turn.",
    canStart: "Start the turn to apply upkeep and recurring income.",
    canStep: "Choose 1, 2, or 3 steps and confirm.",
    canResolve: "Resolve the current space and then end the turn.",
    lobbyWaiting: "Wait for everyone to join, then the room host can start.",
    createError: "Could not create room.",
    joinError: "Could not join room.",
    reconnectError: "Could not reconnect to the room.",
    confirm: "Confirm",
    choose: "Choose",
    results: "Life ending summary",
    finished: "Finished",
    logEmpty: "No events yet."
  }
};

function t(key) {
  return TEXT[state.lang][key] || key;
}

function generationLabel(key) {
  const config = state.generations[key] || {};
  return state.lang === "en" ? (config.en || key) : (config.vi || key);
}

function generationColor(key) {
  return (state.generations[key] && state.generations[key].color) || "#40c2ff";
}

function playerById(playerId) {
  return (state.room?.players || []).find((player) => player.id === playerId) || null;
}

function activePlayer() {
  return playerById(state.room?.currentPlayerId);
}

function isMyTurn() {
  return Boolean(state.room && state.playerId && state.room.currentPlayerId === state.playerId);
}

function statLabel(key) {
  const labels = state.lang === "en"
    ? { health: "Health", happiness: "Happiness", money: "Wealth", experience: "Experience" }
    : { health: "Sức khoẻ", happiness: "Hạnh phúc", money: "Tiền bạc", experience: "Kinh nghiệm" };
  return labels[key] || key;
}

function statIcon(key) {
  const file = {
    happiness: "icon_happy.png",
    health: "icon_health.png",
    money: "icon_wealth.png",
    experience: "icon_experience.png"
  }[key] || `icon_${key}.png`;
  return `./assets/icons/${file}`;
}

function phaseBadge(room) {
  const labels = state.lang === "en"
    ? {
        lobby: "Lobby",
        await_start: "Start",
        await_steps: "Move",
        await_prompt: "Resolve",
        await_end: "Finish",
        finished: "Finished"
      }
    : {
        lobby: "Phòng chờ",
        await_start: "Bắt đầu",
        await_steps: "Di chuyển",
        await_prompt: "Xử lý",
        await_end: "Kết lượt",
        finished: "Về đích"
      };
  return labels[room.phase] || labels[room.status] || "-";
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || `Request failed: ${response.status}`);
  }
  return payload;
}

function populateGenerationSelects() {
  const keys = Object.keys(state.generations);
  const options = keys
    .map((key) => `<option value="${key}">${generationLabel(key)}</option>`)
    .join("");
  refs.createGenerationSelect.innerHTML = options;
  refs.joinGenerationSelect.innerHTML = options;
  if (!refs.createGenerationSelect.value && keys.length) {
    refs.createGenerationSelect.value = keys[0];
  }
  if (!refs.joinGenerationSelect.value && keys.length) {
    refs.joinGenerationSelect.value = keys[0];
  }
  syncGenerationPickers();
}

function renderGenerationPicker(container, selected, onSelect) {
  const keys = Object.keys(state.generations);
  container.innerHTML = keys.map((key) => `
    <button
      class="generation-option ${selected === key ? "selected" : ""}"
      type="button"
      data-generation="${key}"
      style="--generation-color:${generationColor(key)}"
    >
      <img src="${AVATAR_BY_GENERATION[key] || AVATAR_BY_GENERATION["war-time"]}" alt="${generationLabel(key)}" />
      <span>${generationLabel(key)}</span>
    </button>
  `).join("");
  container.querySelectorAll("[data-generation]").forEach((button) => {
    button.addEventListener("click", () => {
      onSelect(button.getAttribute("data-generation"));
    });
  });
}

function syncGenerationPickers() {
  renderGenerationPicker(refs.createGenerationPicker, refs.createGenerationSelect.value, (value) => {
    refs.createGenerationSelect.value = value;
    syncGenerationPickers();
  });
  renderGenerationPicker(refs.joinGenerationPicker, refs.joinGenerationSelect.value, (value) => {
    refs.joinGenerationSelect.value = value;
    syncGenerationPickers();
  });
}

function applyLanguage() {
  document.body.classList.toggle("in-room", !refs.roomScreen.classList.contains("hidden"));
  refs.heroCopy.textContent = t("hero");
  refs.createTitle.textContent = t("createTitle");
  refs.createSubtitle.textContent = t("createSubtitle");
  refs.joinTitle.textContent = t("joinTitle");
  refs.joinSubtitle.textContent = t("joinSubtitle");
  document.getElementById("nameLabelCreate").textContent = t("nameLabel");
  document.getElementById("nameLabelJoin").textContent = t("nameLabel");
  document.getElementById("generationLabelCreate").textContent = t("generationLabel");
  document.getElementById("generationLabelJoin").textContent = t("generationLabel");
  document.getElementById("roomCodeLabel").textContent = t("roomCodeLabel");
  refs.createForm.querySelector("button").textContent = t("createRoom");
  refs.joinForm.querySelector("button").textContent = t("joinRoom");
  document.getElementById("roomHeaderEyebrow").textContent = t("roomHeader");
  document.getElementById("roomCodeCaption").textContent = t("roomCodeCaption");
  document.getElementById("roomCodeCaptionInline").textContent = t("roomCodeCaption");
  refs.startGameBtn.textContent = t("startGame");
  refs.endGameBtn.textContent = t("endGame");
  refs.startTurnBtn.textContent = t("startTurn");
  refs.submitStepsBtn.textContent = t("submitSteps");
  refs.endTurnBtn.textContent = t("endTurn");
  document.getElementById("turnEyebrow").textContent = t("activePlayer");
  refs.turnTitle.textContent = t("turnTitle");
  document.getElementById("rosterEyebrow").textContent = t("rosterEyebrow");
  document.getElementById("rosterTitle").textContent = t("rosterTitle");
  document.getElementById("logEyebrow").textContent = t("logEyebrow");
  document.getElementById("logTitle").textContent = t("logTitle");
  document.getElementById("ageLabel").textContent = t("age");
  document.getElementById("occupationLabel").textContent = t("occupation");
  document.getElementById("hobbyLabel").textContent = t("hobby");
  document.getElementById("housingLabel").textContent = t("housing");
  document.getElementById("relationshipLabel").textContent = t("relationship");
  document.getElementById("childrenLabel").textContent = t("children");
  document.getElementById("upkeepLabel").textContent = t("upkeep");
  document.getElementById("step1Title").textContent = state.lang === "en" ? "Step 1: Start turn" : "Bước 1: Bắt đầu lượt";
  document.getElementById("step2Title").textContent = state.lang === "en" ? "Step 2: Enter steps and confirm" : "Bước 2: Nhập số bước đi và xác nhận";
  document.getElementById("step3Title").textContent = state.lang === "en" ? "Step 3: Review the space" : "Bước 3: Xem nội dung của ô";
  refs.langViBtn.classList.toggle("active", state.lang === "vi");
  refs.langEnBtn.classList.toggle("active", state.lang === "en");
  populateGenerationSelects();
  syncPlayerDetailsPanel();
  render();
}

function saveSession(roomCode, playerId) {
  state.roomCode = roomCode;
  state.playerId = playerId;
  localStorage.setItem("gg_online_room_code", roomCode);
  localStorage.setItem("gg_online_player_id", playerId);
}

function clearSession() {
  localStorage.removeItem("gg_online_room_code");
  localStorage.removeItem("gg_online_player_id");
}

async function createRoom(event) {
  event.preventDefault();
  try {
    const payload = await requestJson("/api/rooms", {
      method: "POST",
      body: JSON.stringify({
        name: refs.createNameInput.value.trim(),
        generation: refs.createGenerationSelect.value
      })
    });
    saveSession(payload.room.code, payload.playerId);
    await connectRoom();
  } catch (error) {
    alert(error.message || t("createError"));
  }
}

async function joinRoom(event) {
  event.preventDefault();
  try {
    const payload = await requestJson(`/api/rooms/${refs.joinRoomCodeInput.value.trim().toUpperCase()}/join`, {
      method: "POST",
      body: JSON.stringify({
        name: refs.joinNameInput.value.trim(),
        generation: refs.joinGenerationSelect.value
      })
    });
    saveSession(payload.room.code, payload.playerId);
    await connectRoom();
  } catch (error) {
    alert(error.message || t("joinError"));
  }
}

function connectEvents() {
  if (state.source) {
    state.source.close();
  }
  state.source = new EventSource(`/api/rooms/${state.roomCode}/events`);
  state.source.addEventListener("snapshot", (event) => {
    const previousRoom = state.room;
    state.room = JSON.parse(event.data);
    const latestLog = state.room?.log?.[state.room.log.length - 1];
    if (
      previousRoom &&
      previousRoom.status !== "lobby" &&
      state.room?.status === "lobby" &&
      latestLog &&
      latestLog.type === "game_reset"
    ) {
      if (state.source) {
        state.source.close();
        state.source = null;
      }
      clearSession();
      state.room = null;
      refs.roomScreen.classList.add("hidden");
      refs.landingScreen.classList.remove("hidden");
      document.body.classList.remove("in-room");
      refs.modalBackdrop.classList.add("hidden");
      refs.modalCard.innerHTML = "";
      refs.modalCard.className = "modal-card";
      render();
      return;
    }
    render();
  });
  state.source.addEventListener("error", () => {
    console.warn("Room stream disconnected.");
  });
}

async function connectRoom() {
  try {
    const snapshot = await requestJson(`/api/rooms/${state.roomCode}/state`);
    state.room = snapshot;
    connectEvents();
    refs.landingScreen.classList.add("hidden");
    refs.roomScreen.classList.remove("hidden");
    document.body.classList.add("in-room");
    render();
  } catch (error) {
    clearSession();
    alert(error.message || t("reconnectError"));
  }
}

async function sendAction(payload) {
  await requestJson(`/api/rooms/${state.roomCode}/actions`, {
    method: "POST",
    body: JSON.stringify({
      ...payload,
      playerId: state.playerId
    })
  });
}

function renderStats(player) {
  refs.activeStatsGrid.innerHTML = ["happiness", "health", "experience", "money"]
    .map((stat) => (
      `<div class="stat-card">
        <div class="stat-card-left">
          <img src="${statIcon(stat)}" alt="" />
          <span>${statLabel(stat)}</span>
        </div>
        <strong>${player.stats[stat]}</strong>
      </div>`
    ))
    .join("");
}

function renderCompactEffect(effect) {
  if (!effect || effect.kind !== "stat") {
    return "";
  }
  const amount = effect.amount > 0 ? `+${effect.amount}` : `${effect.amount}`;
  const suffix = effect.suffix ? `<span class="upkeep-suffix">${effect.suffix}</span>` : "";
  return `
    <span class="upkeep-stat">
      <img src="${statIcon(effect.stat)}" alt="" />
      <span>${amount}</span>
    </span>
    ${suffix}
  `;
}

function renderUpkeepSummary(rows) {
  if (!rows || !rows.length) {
    return `<span class="status-value-line">${t("noUpkeep")}</span>`;
  }
  return rows.map((row) => {
    const label = state.lang === "en" ? row.labelEn : row.labelVi;
    const effects = state.lang === "en" ? (row.effectsEn || []) : (row.effectsVi || []);
    return `
      <span class="status-value-line upkeep-row">
        <span class="upkeep-row-label">${label}:</span>
        <span class="upkeep-row-values">${effects.map((effect) => renderCompactEffect(effect)).join("")}</span>
      </span>
    `;
  }).join("");
}

function renderTags(tags) {
  return (tags || []).map((tag) => `
    <span class="tag ${tag.tone || "neutral"}">${state.lang === "en" ? tag.en : tag.vi}</span>
  `).join("");
}

function isMobileLayout() {
  return window.matchMedia("(max-width: 920px)").matches;
}

function syncPlayerDetailsPanel() {
  if (!refs.playerDetailsToggle || !refs.playerDetailsBody) {
    return;
  }
  if (!isMobileLayout()) {
    refs.playerDetailsToggle.classList.add("hidden");
    refs.playerDetailsBody.classList.remove("collapsed");
    refs.playerDetailsToggle.setAttribute("aria-expanded", "true");
    refs.playerDetailsToggle.textContent = t("hideDetails");
    return;
  }
  refs.playerDetailsToggle.classList.remove("hidden");
  refs.playerDetailsBody.classList.toggle("collapsed", !state.playerDetailsOpen);
  refs.playerDetailsToggle.setAttribute("aria-expanded", state.playerDetailsOpen ? "true" : "false");
  refs.playerDetailsToggle.textContent = state.playerDetailsOpen ? t("hideDetails") : t("showDetails");
}

function renderRoster(players) {
  refs.rosterList.innerHTML = players
    .map((player) => `
      <article class="roster-card">
        <div class="roster-main">
          <div class="roster-card-top">
            <h3>${player.name}${player.finished ? ` · ${t("finished")}` : ""}</h3>
            <div class="roster-gen-chip" style="background:${generationColor(player.generation)}">${generationLabel(player.generation)}</div>
          </div>
          <div class="roster-stats">
            ${["happiness", "health", "experience", "money"].map((stat) => `
              <div class="roster-stat">
                <img src="${statIcon(stat)}" alt="" />
                <strong>${player.stats[stat]}</strong>
              </div>
            `).join("")}
          </div>
        </div>
      </article>
    `)
    .join("");
}

function renderLogs(log) {
  if (!log || !log.length) {
    refs.logList.innerHTML = `<div class="log-entry">${t("logEmpty")}</div>`;
    return;
  }
  refs.logList.innerHTML = log
    .slice()
    .reverse()
    .map((entry) => `
      <article class="log-entry">
        <time>${new Date(entry.at).toLocaleTimeString()}</time>
        <div>${entry.message}</div>
      </article>
    `)
    .join("");
}

function phaseText(room) {
  const current = isMyTurn();
  if (room.status === "lobby") return t("lobbyWaiting");
  if (room.status === "finished") return t("results");
  if (!current) return t("waitForTurn");
  if (room.phase === "await_start") return t("canStart");
  if (room.phase === "await_steps") return t("canStep");
  if (room.phase === "await_prompt" && room.prompt?.kind === "draw") {
    return state.lang === "en" ? "Draw from the highlighted deck." : "Hãy rút lá bài từ bộ đang được đánh dấu.";
  }
  if (room.phase === "await_end" || room.phase === "await_prompt") return t("canResolve");
  return "";
}

function openPrompt(prompt) {
  if (!prompt) {
    refs.modalBackdrop.classList.add("hidden");
    refs.modalBackdrop.classList.remove("deck-draw-prompt");
    refs.modalCard.innerHTML = "";
    refs.modalCard.className = "modal-card";
    return;
  }
  refs.modalBackdrop.classList.remove("hidden");
  refs.modalBackdrop.classList.remove("deck-draw-prompt");
  const canAct = isMyTurn();
  const title = state.lang === "en" ? (prompt.titleEn || prompt.titleVi || "") : (prompt.titleVi || prompt.titleEn || "");
  const description = state.lang === "en" ? (prompt.descriptionEn || prompt.descriptionVi || "") : (prompt.descriptionVi || prompt.descriptionEn || "");
  const question = state.lang === "en" ? (prompt.questionEn || prompt.questionVi || "") : (prompt.questionVi || prompt.questionEn || "");
  const effectLines = state.lang === "en" ? (prompt.effectsEn || []) : (prompt.effectsVi || []);

  if (prompt.kind === "draw") {
    refs.modalBackdrop.classList.add("deck-draw-prompt");
    refs.modalCard.className = "modal-card draw-hint-modal";
    refs.modalCard.innerHTML = `
      <div class="prompt-head">
        <h3>${title}</h3>
      </div>
      <div class="prompt-description">${description}</div>
    `;
    return;
  }

  if (prompt.kind === "choice" || prompt.kind === "occupation" || prompt.kind === "hobby") {
    const current = activePlayer();
    const generationPill = prompt.kind === "choice" && current
      ? `<div class="modal-sub generation-sub" style="background:${generationColor(current.generation)}">${generationLabel(current.generation)}</div>`
      : "";
    const isCheckpoint = prompt.kind === "choice";
    refs.modalCard.className = `modal-card ${isCheckpoint ? "checkpoint-modal" : "choice-modal picker-modal"}`;
    refs.modalCard.innerHTML = `
      <div class="modal-head">
        <h4>${title}</h4>
        ${generationPill}
      </div>
      <div class="modal-subtext">${description}</div>
      <div class="option-grid option-count-${Math.max(2, Math.min(3, (prompt.options || []).length || 3))}">
        ${(prompt.options || []).map((option) => {
          const label = state.lang === "en" ? (option.labelEn || option.labelVi) : (option.labelVi || option.labelEn);
          const effects = state.lang === "en" ? (option.effectsEn || []) : (option.effectsVi || []);
          const requirement = state.lang === "en" ? (option.requirementEn || "") : (option.requirementVi || "");
          return `
            <button class="option-btn ${option.disabled ? "locked" : ""}" type="button" data-option-id="${option.id}" ${!canAct || option.disabled ? "disabled" : ""}>
              <div class="option-title">${label}</div>
              <div class="option-footnote">
                <span class="upkeep-label">${state.lang === "en" ? "Effects" : "Ảnh hưởng mỗi lượt:"}</span>
                <div class="option-effect-list">
                  ${effects.map((effect) => renderEffectLine(effect)).join("")}
                </div>
              </div>
              ${requirement ? `
                <div class="requirement-note">${requirement}</div>
                <div class="locked-badge">${state.lang === "en" ? "Locked" : "Chưa đủ điều kiện"}</div>
              ` : ""}
            </button>
          `;
        }).join("")}
      </div>
    `;
    refs.modalCard.querySelectorAll("[data-option-id]").forEach((button) => {
      button.addEventListener("click", async () => {
        const optionId = button.getAttribute("data-option-id");
        if (prompt.kind === "occupation") {
          await sendAction({ type: "pick_occupation", occupationId: optionId });
          return;
        }
        if (prompt.kind === "hobby") {
          await sendAction({ type: "pick_hobby", hobbyId: optionId });
          return;
        }
        await sendAction({ type: "choose_option", optionId });
      });
    });
    return;
  }

  const typeMeta = promptTypeMeta(prompt);
  refs.modalCard.className = "modal-card info-overlay-modal";
  refs.modalCard.innerHTML = `
    <div class="info-overlay-shell">
      <div class="info-overlay-card">
        <div class="info-overlay-type" style="background:${typeMeta.color}">${typeMeta.label}</div>
        <h3 class="info-overlay-title">${title}</h3>
        <div class="info-overlay-description">${description}</div>
        <div class="info-overlay-box-stack">
          ${effectLines.length ? `
            <div class="info-overlay-box effect-box">
              <div class="info-overlay-box-title">${state.lang === "en" ? "Effects" : "Tác dụng"}</div>
              <div class="info-overlay-box-body">
                <div class="option-effect-list">
                  ${effectLines.map((effect) => renderEffectLine(effect)).join("")}
                </div>
              </div>
            </div>
          ` : ""}
          ${question ? `
            <div class="info-overlay-box question-box">
              <div class="info-overlay-box-title">${state.lang === "en" ? "Answer this question" : "Trả lời câu hỏi này"}</div>
              <div class="info-overlay-box-body">${question}</div>
            </div>
          ` : ""}
        </div>
      </div>
      <button class="info-overlay-confirm" id="promptConfirmBtn" type="button" ${!canAct ? "disabled" : ""}>${t("confirm")}</button>
    </div>
  `;
  document.getElementById("promptConfirmBtn").addEventListener("click", async () => {
    await sendAction({ type: "ack_prompt" });
  });
}

function renderEffectLine(effect) {
  if (effect.kind === "text") {
    return `<div class="effect-line">${state.lang === "en" ? effect.en : effect.vi}</div>`;
  }
  const amount = effect.amount > 0 ? `+${effect.amount}` : `${effect.amount}`;
  const suffix = effect.suffix ? ` ${effect.suffix}` : "";
  return `
    <div class="effect-line">
      <img class="effect-icon" src="${statIcon(effect.stat)}" alt="" />
      <span>${statLabel(effect.stat)} ${amount}${suffix}</span>
    </div>
  `;
}

function promptTypeMeta(prompt) {
  const sourceType = prompt?.source?.type || "";
  if (sourceType === "life_card" || sourceType === "life_card_intro") {
    return {
      label: state.lang === "en" ? "Life Event" : "Sự kiện cuộc đời",
      color: "var(--blue)"
    };
  }
  if (sourceType === "era_card") {
    return {
      label: state.lang === "en" ? "Social Event" : "Sự kiện xã hội",
      color: "var(--orange)"
    };
  }
  return {
    label: state.lang === "en" ? "Your Space" : "Ô của bạn",
    color: "var(--yellow)"
  };
}

function renderResults(players) {
  const canReset = state.room && state.room.hostPlayerId === state.playerId;
  refs.modalCard.className = "modal-card results-modal";
  refs.modalBackdrop.classList.remove("hidden");
  refs.modalCard.innerHTML = `
    <div class="prompt-head">
      <h3>${t("results")}</h3>
    </div>
    <div class="summary-grid">
      ${players.map((player) => {
        const labels = player.labels || {};
        const summary = player.summary || {};
        return `
          <article class="summary-card">
            <h3>${player.name}</h3>
            <p><strong>${t("occupation")}:</strong> ${labels.occupationVi ? (state.lang === "en" ? labels.occupationEn : labels.occupationVi) : "-"}</p>
            <p><strong>${t("hobby")}:</strong> ${labels.hobbyVi ? (state.lang === "en" ? labels.hobbyEn : labels.hobbyVi) : "-"}</p>
            <p><strong>${t("housing")}:</strong> ${state.lang === "en" ? labels.housingEn : labels.housingVi}</p>
            <p><strong>${t("relationship")}:</strong> ${state.lang === "en" ? labels.relationshipEn : labels.relationshipVi}</p>
            <p><strong>${t("children")}:</strong> ${state.lang === "en" ? labels.childrenEn : labels.childrenVi}</p>
            <p><strong>${state.lang === "en" ? "Highest stat" : "Chỉ số cao nhất"}:</strong> ${statLabel(summary.highestStat || "happiness")}</p>
          </article>
        `;
      }).join("")}
    </div>
    ${canReset ? `
      <div class="modal-actions">
        <button class="info-overlay-confirm" id="resultsResetBtn" type="button">${t("endGame")}</button>
      </div>
    ` : ""}
  `;
  const resetBtn = document.getElementById("resultsResetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", async () => {
      try {
        await sendAction({ type: "reset_game" });
      } catch (error) {
        alert(error.message || "Could not reset the room.");
      }
    });
  }
}

function render() {
  if (!state.room) {
    return;
  }

  refs.roomTitle.textContent = state.lang === "en" ? "Online co-op session" : "Phiên đồng chơi online";
  refs.roomMeta.textContent = state.lang === "en"
    ? `${state.room.players.length} player(s) joined`
    : `${state.room.players.length} người chơi đã vào phòng`;
  refs.roomCodeValue.textContent = state.room.code;
  refs.roomCodeValueInline.textContent = state.room.code;

  const active = activePlayer();
  const selfPlayer = playerById(state.playerId) || active;
  if (active && selfPlayer) {
    const currentDescription = state.lang === "en" ? state.room.currentNodeDescriptionEn : state.room.currentNodeDescriptionVi;
    refs.activePlayerName.textContent = selfPlayer.name;
    refs.activePlayerGenerationTag.textContent = generationLabel(selfPlayer.generation);
    refs.activePlayerGenerationTag.style.background = generationColor(selfPlayer.generation);
    refs.activePlayerAvatar.src = AVATAR_BY_GENERATION[selfPlayer.generation] || AVATAR_BY_GENERATION["war-time"];
    refs.activePlayerAge.textContent = state.lang === "en" ? `Age ${selfPlayer.age}` : `${selfPlayer.age} tuổi`;
    refs.activeOccupation.textContent = state.lang === "en" ? selfPlayer.labels.occupationEn : selfPlayer.labels.occupationVi;
    refs.activeHobby.textContent = state.lang === "en" ? selfPlayer.labels.hobbyEn : selfPlayer.labels.hobbyVi;
    refs.activeHousing.textContent = state.lang === "en" ? selfPlayer.labels.housingEn : selfPlayer.labels.housingVi;
    refs.activeRelationship.textContent = state.lang === "en" ? selfPlayer.labels.relationshipEn : selfPlayer.labels.relationshipVi;
    refs.activeChildren.textContent = state.lang === "en" ? selfPlayer.labels.childrenEn : selfPlayer.labels.childrenVi;
    refs.activeUpkeep.innerHTML = renderUpkeepSummary(selfPlayer.upkeepRows || []);
    refs.tagWrap.innerHTML = renderTags(selfPlayer.tags || []);
    document.getElementById("turnEyebrow").textContent = active.name;
    refs.spaceCardTitle.textContent = state.lang === "en" ? state.room.currentNodeLabelEn : state.room.currentNodeLabelVi;
    refs.spaceCardDesc.textContent = currentDescription || (state.lang === "en" ? "This space has no extra description yet." : "Ô này chưa có mô tả bổ sung.");
    renderStats(selfPlayer);
  }

  refs.startGameBtn.disabled = !state.room || state.room.hostPlayerId !== state.playerId || state.room.status !== "lobby";
  refs.endGameBtn.disabled = !state.room || state.room.hostPlayerId !== state.playerId;
  refs.startTurnBtn.disabled = !isMyTurn() || state.room.phase !== "await_start";
  refs.submitStepsBtn.disabled = !isMyTurn() || state.room.phase !== "await_steps";
  refs.endTurnBtn.disabled = !isMyTurn() || state.room.phase !== "await_end";
  const drawDeck = state.room.prompt?.kind === "draw" ? state.room.prompt.source?.deck : "";
  refs.sideEraDeckBtn.disabled = !(isMyTurn() && drawDeck === "era");
  refs.sideLifeDeckBtn.disabled = !(isMyTurn() && drawDeck === "life");
  refs.sideEraDeckBtn.classList.toggle("target", drawDeck === "era");
  refs.sideLifeDeckBtn.classList.toggle("target", drawDeck === "life");
  refs.turnHint.textContent = phaseText(state.room);

  refs.stepBlock1.className = "turn-step";
  refs.stepBlock2.className = "turn-step";
  refs.stepBlock3.className = "turn-step";
  if (state.room.phase === "await_start") {
    refs.stepBlock1.classList.add("active-step");
  } else if (state.room.phase === "await_steps") {
    refs.stepBlock1.classList.add("done-step");
    refs.stepBlock2.classList.add("active-step");
  } else if (state.room.phase === "await_prompt" || state.room.phase === "await_end" || state.room.status === "finished") {
    refs.stepBlock1.classList.add("done-step");
    refs.stepBlock2.classList.add("done-step");
    refs.stepBlock3.classList.add("active-step");
  }

  renderRoster(state.room.players || []);
  renderLogs(state.room.log || []);
  syncPlayerDetailsPanel();

  document.querySelectorAll(".step-btn").forEach((button) => {
    const step = Number(button.getAttribute("data-step"));
    button.classList.toggle("active", step === state.stepChoice);
    button.disabled = !isMyTurn() || state.room.phase !== "await_steps";
  });

  if (state.room.status === "finished") {
    renderResults(state.room.players || []);
    return;
  }

  openPrompt(state.room.prompt);
}

async function bootstrap() {
  const meta = await requestJson("/api/meta");
  state.generations = meta.generations || {};
  populateGenerationSelects();
  applyLanguage();

  refs.createForm.addEventListener("submit", createRoom);
  refs.joinForm.addEventListener("submit", joinRoom);
  refs.startGameBtn.addEventListener("click", async () => {
    await sendAction({ type: "start_game" });
  });
  refs.startTurnBtn.addEventListener("click", async () => {
    await sendAction({ type: "start_turn" });
  });
  refs.endGameBtn.addEventListener("click", async () => {
    try {
      await sendAction({ type: "reset_game" });
    } catch (error) {
      alert(error.message || "Could not reset the room.");
    }
  });
  refs.submitStepsBtn.addEventListener("click", async () => {
    await sendAction({ type: "submit_steps", steps: state.stepChoice });
  });
  refs.endTurnBtn.addEventListener("click", async () => {
    await sendAction({ type: "end_turn" });
  });
  refs.playerDetailsToggle.addEventListener("click", () => {
    state.playerDetailsOpen = !state.playerDetailsOpen;
    syncPlayerDetailsPanel();
  });
  refs.sideEraDeckBtn.addEventListener("click", async () => {
    if (refs.sideEraDeckBtn.disabled) return;
    await sendAction({ type: "draw_card", deck: "era" });
  });
  refs.sideLifeDeckBtn.addEventListener("click", async () => {
    if (refs.sideLifeDeckBtn.disabled) return;
    await sendAction({ type: "draw_card", deck: "life" });
  });
  document.querySelectorAll(".step-btn").forEach((button) => {
    button.addEventListener("click", () => {
      state.stepChoice = Number(button.getAttribute("data-step")) || 1;
      render();
    });
  });
  refs.langViBtn.addEventListener("click", () => {
    state.lang = "vi";
    localStorage.setItem("gg_online_lang", "vi");
    applyLanguage();
  });
  refs.langEnBtn.addEventListener("click", () => {
    state.lang = "en";
    localStorage.setItem("gg_online_lang", "en");
    applyLanguage();
  });
  window.addEventListener("resize", syncPlayerDetailsPanel);

  if (state.roomCode && state.playerId) {
    await connectRoom();
  }
}

bootstrap().catch((error) => {
  console.error(error);
  alert(error.message || "Failed to start client.");
});
