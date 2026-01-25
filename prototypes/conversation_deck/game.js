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

const nextTurnButton = document.getElementById("next-turn-btn");
const roundPanel = document.getElementById("round-panel");
const roundStatus = document.getElementById("round-status");
const answerList = document.getElementById("answer-list");
const carouselPrevButton = document.getElementById("carousel-prev");
const carouselNextButton = document.getElementById("carousel-next");
const cardTrack = document.getElementById("card-track");
const carouselQuery = window.matchMedia("(max-width: 640px)");

const cardChoices = Array.from(document.querySelectorAll(".card-choice")).map((button) => ({
  button,
  motion: button.querySelector(".card-motion"),
  card: button.querySelector(".card"),
  category: button.querySelector(".category"),
  titleVi: button.querySelector(".card-title-vi"),
  titleEn: button.querySelector(".card-title-en"),
  questionVi: button.querySelector(".card-question-vi"),
  questionEn: button.querySelector(".card-question-en"),
  active: false
}));

const categoryLabels = {
  starter: "Starter",
  storytelling: "Storytelling",
  reflection: "Reflection"
};

const phaseMessages = {
  ready: "Shuffle to deal three cards",
  choose: "Pick one prompt",
  answer: "Everyone answers"
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const animationTiming = {
  shuffle: prefersReducedMotion.matches ? 1 : 600,
  exit: prefersReducedMotion.matches ? 1 : 450,
  enter: prefersReducedMotion.matches ? 1 : 500,
  flipDelay: prefersReducedMotion.matches ? 0 : 120,
  stagger: prefersReducedMotion.matches ? 0 : 120
};

let players = [];
let currentPlayerIndex = 0;
let deck = [];
let discard = [];
let fullDeck = [];
let dealtCards = [];
let selectedCard = null;
let phase = "setup";
let isAnimating = false;
let carouselIndex = 0;

function shuffle(array) {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function createFullDeck() {
  if (!window.QUESTION_SETS) {
    return [];
  }

  const flattened = [];
  Object.entries(window.QUESTION_SETS).forEach(([category, questions]) => {
    questions.forEach((question) => {
      flattened.push({ ...question, category });
    });
  });

  return flattened;
}

function resetDeck() {
  deck = shuffle(fullDeck);
  discard = [];
}

function ensureDeckCount(count) {
  if (deck.length >= count) {
    return;
  }

  if (discard.length) {
    deck = shuffle(deck.concat(discard));
    discard = [];
  }

  if (deck.length < count && fullDeck.length) {
    deck = shuffle(fullDeck);
  }
}

function dealCards(count) {
  ensureDeckCount(count);
  const cards = [];
  while (cards.length < count && deck.length) {
    cards.push(deck.pop());
  }
  return cards;
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
  deckHint.textContent = phase === "ready" ? "Click the deck to deal three cards" : "";
  updateControls();
}

function updateControls() {
  const canDeal = phase === "ready" && !isAnimating;
  deckButton.disabled = !canDeal;

  const canChoose = phase === "choose" && !isAnimating;
  cardChoices.forEach((slot) => {
    if (phase === "choose") {
      const selectable = canChoose && slot.active;
      slot.button.classList.toggle("is-disabled", !selectable);
      return;
    }

    if (phase === "ready") {
      slot.button.classList.add("is-disabled");
      return;
    }

    slot.button.classList.remove("is-disabled");
  });

  const roundComplete = isRoundComplete();
  nextTurnButton.disabled = phase !== "answer" || isAnimating || !roundComplete;

  updateCarousel();
}

function getCarouselSlots() {
  return cardChoices.filter((slot) => !slot.button.classList.contains("is-hidden"));
}

function setActiveCarouselIndex(nextIndex) {
  const slots = getCarouselSlots();
  if (!slots.length) {
    return;
  }

  const normalized = ((nextIndex % slots.length) + slots.length) % slots.length;
  carouselIndex = normalized;
  if (cardTrack && carouselQuery.matches) {
    const offset = 100 * carouselIndex;
    cardTrack.style.transform = `translateX(-${offset}%)`;
  }
}

function updateCarousel() {
  const slots = getCarouselSlots();
  if (!carouselQuery.matches) {
    if (cardTrack) {
      cardTrack.style.transform = "";
    }
    carouselPrevButton.disabled = true;
    carouselNextButton.disabled = true;
    return;
  }

  if (!slots.length) {
    carouselPrevButton.disabled = true;
    carouselNextButton.disabled = true;
    return;
  }

  if (carouselIndex >= slots.length) {
    carouselIndex = 0;
  }

  setActiveCarouselIndex(carouselIndex);

  const arrowsDisabled = phase !== "choose" || isAnimating || slots.length <= 1;
  carouselPrevButton.disabled = arrowsDisabled;
  carouselNextButton.disabled = arrowsDisabled;
}

function cycleCarousel(direction) {
  if (!carouselQuery.matches) {
    return;
  }

  if (phase !== "choose" || isAnimating) {
    return;
  }

  const slots = getCarouselSlots();
  if (slots.length <= 1) {
    return;
  }

  setActiveCarouselIndex(carouselIndex + direction);
}

function setCardContent(slot, question) {
  if (!question) {
    slot.category.textContent = "Starter";
    slot.titleVi.textContent = "Tieu de (VI)";
    slot.titleEn.textContent = "Title (EN)";
    slot.questionVi.textContent = "Cau hoi (VI)";
    slot.questionEn.textContent = "Question (EN)";
    slot.card.dataset.category = "starter";
    slot.active = false;
    return;
  }

  const category = question.category || "starter";
  slot.category.textContent = categoryLabels[category] || "Starter";
  slot.titleVi.textContent = question.titleVi || "";
  slot.titleEn.textContent = question.titleEn || "";
  slot.questionVi.textContent = question.questionVi || "";
  slot.questionEn.textContent = question.questionEn || "";
  slot.card.dataset.category = category;
  slot.active = true;
}

function resetCardSlots() {
  cardChoices.forEach((slot) => {
    slot.button.style.gridColumn = "";
    slot.button.classList.remove(
      "is-selected",
      "is-muted",
      "is-disabled",
      "is-hidden"
    );
    slot.motion.classList.remove("is-exit", "is-enter");
    slot.card.classList.remove("is-flipped");
    setCardContent(slot, null);
  });
  carouselIndex = 0;
  updateCarousel();
}

function animateDeal(cards, onDone) {
  cardChoices.forEach((slot, index) => {
    const question = cards[index];
    setCardContent(slot, question);
    slot.button.classList.remove("is-selected", "is-muted");
    slot.motion.classList.remove("is-exit", "is-enter");
    slot.card.classList.remove("is-flipped");
    void slot.motion.offsetWidth;

    const delay = index * animationTiming.stagger;
    window.setTimeout(() => {
      slot.motion.classList.add("is-enter");
      window.setTimeout(() => {
        if (question) {
          slot.card.classList.add("is-flipped");
        }
      }, animationTiming.flipDelay);

      window.setTimeout(() => {
        slot.motion.classList.remove("is-enter");
      }, animationTiming.enter);
    }, delay);
  });

  const total = (cardChoices.length - 1) * animationTiming.stagger + animationTiming.enter;
  window.setTimeout(() => {
    if (onDone) {
      onDone();
    }
  }, total);
}

function hideRoundPanel() {
  roundPanel.classList.add("hidden");
  roundPanel.classList.remove("is-complete");
  roundPanel.classList.remove("in-grid");
  answerList.innerHTML = "";
  roundStatus.textContent = "0/0 answered";
}

function renderAnswerChecklist() {
  answerList.innerHTML = "";
  players.forEach((name, index) => {
    const label = document.createElement("label");
    label.className = "answer-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `answer-${index}`;

    const text = document.createElement("span");
    text.textContent = name;

    label.appendChild(checkbox);
    label.appendChild(text);
    answerList.appendChild(label);
  });
}

function isRoundComplete() {
  if (phase !== "answer") {
    return false;
  }

  const checks = answerList.querySelectorAll("input[type=checkbox]");
  if (!checks.length) {
    return false;
  }

  return Array.from(checks).every((input) => input.checked);
}

function updateRoundStatus() {
  const checks = answerList.querySelectorAll("input[type=checkbox]");
  const total = checks.length;
  const checked = Array.from(checks).filter((input) => input.checked).length;
  roundStatus.textContent = `${checked}/${total} answered`;

  const complete = total > 0 && checked === total;
  roundPanel.classList.toggle("is-complete", complete);
  if (phase === "answer") {
    phaseLabel.textContent = complete ? "Round complete" : phaseMessages.answer;
  }

  updateControls();
}

function startGame() {
  fullDeck = createFullDeck();
  resetDeck();
  currentPlayerIndex = 0;
  setCurrentPlayer();
  dealtCards = [];
  selectedCard = null;
  resetCardSlots();
  hideRoundPanel();
  setupPanel.classList.add("hidden");
  gamePanel.classList.remove("hidden");
  setPhase("ready");
}

function handleDeal() {
  if (phase !== "ready" || isAnimating) {
    return;
  }

  if (!fullDeck.length) {
    phaseLabel.textContent = "No cards available";
    return;
  }

  isAnimating = true;
  updateControls();
  deckButton.classList.add("is-shuffling");

  window.setTimeout(() => {
    deckButton.classList.remove("is-shuffling");
  }, animationTiming.shuffle);

  hideRoundPanel();
  selectedCard = null;
  dealtCards = dealCards(3);

  animateDeal(dealtCards, () => {
    isAnimating = false;
    carouselIndex = 0;
    setPhase("choose");
  });
}

function handleChoose(index) {
  if (phase !== "choose" || isAnimating) {
    return;
  }

  const chosen = dealtCards[index];
  if (!chosen) {
    return;
  }

  isAnimating = true;
  updateControls();
  selectedCard = chosen;
  const returnedCards = dealtCards.filter((_, cardIndex) => cardIndex !== index);
  if (returnedCards.length) {
    deck = shuffle(deck.concat(returnedCards));
  }

  cardChoices.forEach((slot, slotIndex) => {
    if (slotIndex === index) {
      slot.button.classList.add("is-selected");
      return;
    }

    slot.button.classList.add("is-muted", "is-disabled");
    slot.motion.classList.add("is-exit");
    window.setTimeout(() => {
      slot.motion.classList.remove("is-exit");
      slot.card.classList.remove("is-flipped");
      slot.button.classList.add("is-hidden");
      setCardContent(slot, null);
    }, animationTiming.exit);
  });

  renderAnswerChecklist();
  window.setTimeout(() => {
    carouselIndex = 0;
    roundPanel.classList.remove("hidden");
    if (!carouselQuery.matches && index !== 0) {
      cardChoices[index].button.style.gridColumn = "1";
    }
    if (!carouselQuery.matches) {
      roundPanel.classList.add("in-grid");
    }
    setPhase("answer");
    updateRoundStatus();
    isAnimating = false;
    updateControls();
  }, animationTiming.exit);
}

function handleNextTurn() {
  if (phase !== "answer" || isAnimating || !isRoundComplete()) {
    return;
  }

  if (selectedCard) {
    discard.push(selectedCard);
  }

  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  setCurrentPlayer();
  selectedCard = null;
  dealtCards = [];
  resetCardSlots();
  hideRoundPanel();
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

deckButton.addEventListener("click", handleDeal);
nextTurnButton.addEventListener("click", handleNextTurn);
answerList.addEventListener("change", updateRoundStatus);
carouselPrevButton.addEventListener("click", () => cycleCarousel(-1));
carouselNextButton.addEventListener("click", () => cycleCarousel(1));
window.addEventListener("resize", updateCarousel);
if (carouselQuery.addEventListener) {
  carouselQuery.addEventListener("change", updateCarousel);
} else if (carouselQuery.addListener) {
  carouselQuery.addListener(updateCarousel);
}

cardChoices.forEach((slot, index) => {
  slot.button.addEventListener("click", () => handleChoose(index));
});

updateStartState();
updateCarousel();
