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
const mobileQuery = window.matchMedia("(max-width: 640px)");

const cardChoices = Array.from(document.querySelectorAll(".card-choice")).map((button) => ({
  button,
  motion: button.querySelector(".card-motion"),
  card: button.querySelector(".card"),
  titleVi: button.querySelector(".card-title-vi"),
  titleEn: button.querySelector(".card-title-en"),
  questionVi: button.querySelector(".card-question-vi"),
  questionEn: button.querySelector(".card-question-en"),
  active: false
}));

const phaseMessages = {
  ready: "Shuffle to deal three cards",
  choose: "Choose one card",
  answer: "Everyone answers"
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const animationTiming = {
  shuffle: prefersReducedMotion.matches ? 1 : 600,
  exit: prefersReducedMotion.matches ? 1 : 450,
  enter: prefersReducedMotion.matches ? 1 : 500,
  stagger: prefersReducedMotion.matches ? 0 : 110
};

let players = [];
let currentPlayerIndex = 0;
let fullDeck = [];
let deck = [];
let discard = [];
let dealtCards = [];
let selectedCard = null;
let phase = "setup";
let isAnimating = false;
let carouselIndex = 0;

function shuffle(array) {
  const copy = array.slice();
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function createFullDeck() {
  if (!window.QUESTION_SETS) {
    return [];
  }

  return Object.values(window.QUESTION_SETS).flatMap((questions) =>
    questions.map((question) => ({ ...question }))
  );
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
    const remove = document.createElement("button");

    label.textContent = name;
    remove.type = "button";
    remove.setAttribute("aria-label", `Remove ${name}`);
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
  phaseLabel.textContent = phaseMessages[nextPhase] || "";
  deckHint.textContent = nextPhase === "ready" ? "Click the deck to deal 3 cards" : "";
  updateControls();
}

function getVisibleSlots() {
  return cardChoices.filter((slot) => !slot.button.classList.contains("is-hidden"));
}

function setCarouselIndex(nextIndex) {
  const slots = getVisibleSlots();
  if (!slots.length) {
    return;
  }

  carouselIndex = ((nextIndex % slots.length) + slots.length) % slots.length;

  if (mobileQuery.matches && cardTrack) {
    cardTrack.style.transform = `translateX(-${carouselIndex * 100}%)`;
  }
}

function updateCarousel() {
  if (!mobileQuery.matches) {
    if (cardTrack) {
      cardTrack.style.transform = "";
    }
    carouselPrevButton.disabled = true;
    carouselNextButton.disabled = true;
    return;
  }

  const slots = getVisibleSlots();
  if (!slots.length) {
    carouselPrevButton.disabled = true;
    carouselNextButton.disabled = true;
    return;
  }

  if (carouselIndex >= slots.length) {
    carouselIndex = 0;
  }

  setCarouselIndex(carouselIndex);

  const canMove = phase === "choose" && !isAnimating && slots.length > 1;
  carouselPrevButton.disabled = !canMove;
  carouselNextButton.disabled = !canMove;
}

function updateControls() {
  deckButton.disabled = phase !== "ready" || isAnimating;

  cardChoices.forEach((slot) => {
    const selectable = phase === "choose" && slot.active && !isAnimating;
    slot.button.classList.toggle("is-disabled", !selectable);
  });

  nextTurnButton.disabled = phase !== "answer" || isAnimating || !isRoundComplete();
  updateCarousel();
}

function setCardContent(slot, question) {
  if (!question) {
    slot.titleVi.textContent = "";
    slot.titleEn.textContent = "";
    slot.questionVi.textContent = "";
    slot.questionEn.textContent = "";
    slot.active = false;
    return;
  }

  slot.titleVi.textContent = question.titleVi || "";
  slot.titleEn.textContent = question.titleEn || "";
  slot.questionVi.textContent = question.questionVi || "";
  slot.questionEn.textContent = question.questionEn || "";
  slot.active = true;
}

function resetCardSlots() {
  cardChoices.forEach((slot) => {
    slot.button.style.gridColumn = "";
    slot.button.classList.remove("is-selected", "is-muted", "is-disabled");
    slot.button.classList.add("is-hidden");
    slot.motion.classList.remove("is-exit", "is-enter");
    slot.card.classList.remove("is-flipped");
    setCardContent(slot, null);
  });

  carouselIndex = 0;
  updateCarousel();
}

function animateDeal(cards, onDone) {
  cardChoices.forEach((slot, index) => {
    slot.button.classList.remove("is-hidden", "is-selected", "is-muted");
    setCardContent(slot, cards[index] || null);
    slot.motion.classList.remove("is-exit", "is-enter");
    slot.card.classList.remove("is-flipped");
    void slot.motion.offsetWidth;

    window.setTimeout(() => {
      slot.motion.classList.add("is-enter");

      window.setTimeout(() => {
        slot.motion.classList.remove("is-enter");
      }, animationTiming.enter);
    }, index * animationTiming.stagger);
  });

  const totalDuration = (cardChoices.length - 1) * animationTiming.stagger + animationTiming.enter;
  window.setTimeout(() => {
    if (onDone) {
      onDone();
    }
  }, totalDuration);
}

function hideRoundPanel() {
  roundPanel.classList.add("hidden");
  roundPanel.classList.remove("is-complete", "in-grid");
  answerList.innerHTML = "";
  roundStatus.textContent = "0/0 answered";
}

function renderAnswerChecklist() {
  answerList.innerHTML = "";

  players.forEach((name, index) => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    const text = document.createElement("span");

    label.className = "answer-item";
    checkbox.type = "checkbox";
    checkbox.id = `answer-${index}`;
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

  const checkboxes = answerList.querySelectorAll("input[type='checkbox']");
  if (!checkboxes.length) {
    return false;
  }

  return Array.from(checkboxes).every((checkbox) => checkbox.checked);
}

function updateRoundStatus() {
  const checkboxes = answerList.querySelectorAll("input[type='checkbox']");
  const total = checkboxes.length;
  const answered = Array.from(checkboxes).filter((checkbox) => checkbox.checked).length;

  roundStatus.textContent = `${answered}/${total} answered`;
  roundPanel.classList.toggle("is-complete", total > 0 && answered === total);

  if (phase === "answer") {
    phaseLabel.textContent = answered === total && total > 0 ? "Round complete" : phaseMessages.answer;
  }

  updateControls();
}

function startGame() {
  fullDeck = createFullDeck();
  resetDeck();
  currentPlayerIndex = 0;
  dealtCards = [];
  selectedCard = null;

  setCurrentPlayer();
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

  const chosenCard = dealtCards[index];
  if (!chosenCard) {
    return;
  }

  isAnimating = true;
  updateControls();
  selectedCard = chosenCard;

  const chosenSlot = cardChoices[index];
  chosenSlot.button.classList.add("is-selected");

  const returnedCards = dealtCards.filter((_, cardIndex) => cardIndex !== index);
  if (returnedCards.length) {
    deck = shuffle(deck.concat(returnedCards));
  }

  cardChoices.forEach((slot, slotIndex) => {
    if (slotIndex === index) {
      return;
    }

    slot.button.classList.add("is-muted", "is-disabled");
    slot.motion.classList.add("is-exit");

    window.setTimeout(() => {
      slot.motion.classList.remove("is-exit");
      slot.button.classList.add("is-hidden");
      slot.card.classList.remove("is-flipped");
      setCardContent(slot, null);
    }, animationTiming.exit);
  });

  renderAnswerChecklist();

  window.setTimeout(() => {
    if (!mobileQuery.matches && index !== 0) {
      chosenSlot.button.style.gridColumn = "1";
    }

    chosenSlot.card.classList.add("is-flipped");
    roundPanel.classList.remove("hidden");

    if (!mobileQuery.matches) {
      roundPanel.classList.add("in-grid");
    }

    carouselIndex = 0;
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
  selectedCard = null;
  dealtCards = [];

  setCurrentPlayer();
  resetCardSlots();
  hideRoundPanel();
  setPhase("ready");
}

function cycleCarousel(direction) {
  if (!mobileQuery.matches || phase !== "choose" || isAnimating) {
    return;
  }

  const slots = getVisibleSlots();
  if (slots.length <= 1) {
    return;
  }

  setCarouselIndex(carouselIndex + direction);
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
  if (!players.length) {
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
if (mobileQuery.addEventListener) {
  mobileQuery.addEventListener("change", updateCarousel);
} else if (mobileQuery.addListener) {
  mobileQuery.addListener(updateCarousel);
}

cardChoices.forEach((slot, index) => {
  slot.button.addEventListener("click", () => handleChoose(index));
});

updateStartState();
resetCardSlots();
