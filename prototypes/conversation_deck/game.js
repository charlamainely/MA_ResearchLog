const setupPanel = document.getElementById("setup");
const gamePanel = document.getElementById("game");
const playerNameInput = document.getElementById("player-name");
const addPlayerButton = document.getElementById("add-player");
const playerList = document.getElementById("player-list");
const startGameButton = document.getElementById("start-game");

const deckButton = document.getElementById("deck");
const deckHint = document.querySelector(".deck-hint");
const currentPlayerLabel = document.getElementById("current-player");
const phaseLabel = document.getElementById("phase-label");
const followupPlayerLabel = document.getElementById("followup-player");

const cardMotion = document.getElementById("card-motion");
const card = document.getElementById("question-card");
const cardCategory = document.getElementById("card-category");
const cardTitleVi = document.getElementById("card-title-vi");
const cardTitleEn = document.getElementById("card-title-en");
const cardQuestionVi = document.getElementById("card-question-vi");
const cardQuestionEn = document.getElementById("card-question-en");

const skipButton = document.getElementById("skip-btn");
const answeredButton = document.getElementById("answered-btn");
const nextTurnButton = document.getElementById("next-turn-btn");

const categoryLabels = {
  starter: "Starter",
  storytelling: "Storytelling",
  reflection: "Reflection"
};

const phaseMessages = {
  ready: "Shuffle to draw a card",
  question: "Answer the question",
  followup: "Follow-up moment"
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const animationTiming = {
  shuffle: prefersReducedMotion.matches ? 1 : 600,
  exit: prefersReducedMotion.matches ? 1 : 450,
  enter: prefersReducedMotion.matches ? 1 : 500,
  flipDelay: prefersReducedMotion.matches ? 0 : 120
};

let players = [];
let currentPlayerIndex = 0;
let deck = [];
let discard = [];
let phase = "setup";
let isAnimating = false;

function shuffle(array) {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildDeck() {
  if (!window.QUESTION_SETS) {
    return [];
  }

  const flattened = [];
  Object.entries(window.QUESTION_SETS).forEach(([category, questions]) => {
    questions.forEach((question) => {
      flattened.push({ ...question, category });
    });
  });

  discard = [];
  return shuffle(flattened);
}

function drawQuestion() {
  if (deck.length === 0) {
    deck = discard.length ? shuffle(discard) : buildDeck();
    discard = [];
  }

  const question = deck.pop();
  if (question) {
    discard.push(question);
  }
  return question;
}

function renderPlayers() {
  playerList.innerHTML = "";
  players.forEach((name, index) => {
    const item = document.createElement("li");
    const label = document.createElement("span");
    label.textContent = name;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "x";
    remove.addEventListener("click", () => {
      players.splice(index, 1);
      renderPlayers();
      updateStartState();
    });

    item.appendChild(label);
    item.appendChild(remove);
    playerList.appendChild(item);
  });
}

function updateStartState() {
  startGameButton.disabled = players.length === 0;
}

function setCurrentPlayer() {
  currentPlayerLabel.textContent = players[currentPlayerIndex] || "--";
}

function setPhase(nextPhase) {
  phase = nextPhase;
  phaseLabel.textContent = phaseMessages[phase] || "";
  deckHint.textContent = phase === "ready" ? "Click the deck to shuffle and draw" : "";
  updateControls();
}

function updateControls() {
  deckButton.disabled = phase !== "ready" || isAnimating;
  skipButton.disabled = phase !== "question" || isAnimating;
  answeredButton.disabled = phase !== "question" || isAnimating;
  nextTurnButton.disabled = phase !== "followup" || isAnimating;
}

function setCardContent(question) {
  if (!question) {
    cardCategory.textContent = "Starter";
    cardTitleVi.textContent = "Tieu de (VI)";
    cardTitleEn.textContent = "Title (EN)";
    cardQuestionVi.textContent = "Cau hoi (VI)";
    cardQuestionEn.textContent = "Question (EN)";
    card.dataset.category = "starter";
    return;
  }

  const category = question.category || "starter";
  cardCategory.textContent = categoryLabels[category] || "Starter";
  cardTitleVi.textContent = question.titleVi || "";
  cardTitleEn.textContent = question.titleEn || "";
  cardQuestionVi.textContent = question.questionVi || "";
  cardQuestionEn.textContent = question.questionEn || "";
  card.dataset.category = category;
}

function animateCardIn(question, onDone) {
  setCardContent(question);
  cardMotion.classList.remove("is-exit", "is-enter");
  card.classList.remove("is-flipped");
  void cardMotion.offsetWidth;
  cardMotion.classList.add("is-enter");
  window.setTimeout(() => {
    card.classList.add("is-flipped");
  }, animationTiming.flipDelay);

  window.setTimeout(() => {
    cardMotion.classList.remove("is-enter");
    if (onDone) {
      onDone();
    }
  }, animationTiming.enter);
}

function animateSkip(question, onDone) {
  cardMotion.classList.add("is-exit");
  window.setTimeout(() => {
    cardMotion.classList.remove("is-exit");
    animateCardIn(question, onDone);
  }, animationTiming.exit);
}

function startGame() {
  deck = buildDeck();
  currentPlayerIndex = 0;
  setCurrentPlayer();
  setCardContent(null);
  card.classList.remove("is-flipped");
  cardMotion.classList.remove("is-exit", "is-enter");
  followupPlayerLabel.textContent = "--";
  setupPanel.classList.add("hidden");
  gamePanel.classList.remove("hidden");
  setPhase("ready");
}

function handleDraw() {
  if (phase !== "ready" || isAnimating) {
    return;
  }

  isAnimating = true;
  updateControls();
  deckButton.classList.add("is-shuffling");

  window.setTimeout(() => {
    deckButton.classList.remove("is-shuffling");
  }, animationTiming.shuffle);

  const question = drawQuestion();
  animateCardIn(question, () => {
    isAnimating = false;
    setPhase("question");
  });
}

function handleSkip() {
  if (phase !== "question" || isAnimating) {
    return;
  }

  isAnimating = true;
  updateControls();
  const question = drawQuestion();
  animateSkip(question, () => {
    isAnimating = false;
    updateControls();
  });
}

function pickFollowupPlayer() {
  if (players.length <= 1) {
    return players[currentPlayerIndex] || "--";
  }

  const options = players.filter((_, index) => index !== currentPlayerIndex);
  const index = Math.floor(Math.random() * options.length);
  return options[index];
}

function handleAnswered() {
  if (phase !== "question" || isAnimating) {
    return;
  }

  followupPlayerLabel.textContent = pickFollowupPlayer();
  setPhase("followup");
}

function handleNextTurn() {
  if (phase !== "followup" || isAnimating) {
    return;
  }

  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  setCurrentPlayer();
  followupPlayerLabel.textContent = "--";
  card.classList.remove("is-flipped");
  setPhase("ready");
}

addPlayerButton.addEventListener("click", () => {
  const name = playerNameInput.value.trim();
  if (!name) {
    return;
  }
  players.push(name);
  playerNameInput.value = "";
  renderPlayers();
  updateStartState();
  playerNameInput.focus();
});

playerNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addPlayerButton.click();
  }
});

startGameButton.addEventListener("click", () => {
  if (players.length === 0) {
    return;
  }
  startGame();
});

deckButton.addEventListener("click", handleDraw);
skipButton.addEventListener("click", handleSkip);
answeredButton.addEventListener("click", handleAnswered);
nextTurnButton.addEventListener("click", handleNextTurn);

updateStartState();
