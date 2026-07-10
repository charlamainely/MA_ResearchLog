const canvas = document.getElementById("ascii-rain");
const context = canvas.getContext("2d");
const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const navLinks = Array.from(document.querySelectorAll(".nav-pill"));
const trackedSections = Array.from(document.querySelectorAll(".content-section"));
const heroSection = document.getElementById("top");

const glyphs = "01[]{}<>/\\|!;:+=-*#@&CARE.CODE.CULTURE";

const artists = {
  "jade-sia": {
    name: "JADE SIA",
    title: "Art Director & Researcher\nLASALLE College of the Arts (MA Design), Singapore",
    description:
      "Jade Sia is an award-winning designer with a decade of global experience in branding and motion graphics. Her practice is defined by a blend of technical precision and visual fluidity, crafting narratives that resonate on both strategic and emotional levels.\n\nCurrently pursuing a Master of Design at LASALLE College of the Arts, Jade is pivoting her expertise into spatial and speculative design. Her project, The Family Hub, introduces a systemic approach to urban care, merging technical guidelines, digital narratives, and physical prototypes. By reimagining public infrastructure as an integrated system of empathy, she seeks to redefine how design can foster social equity and human connection.\n\nWebsite: https://www.thesiaaa.com/",
    imageLabel: "JADE",
    imageSrc: "./images/artists/artist_jadesia.png"
  },
  "khuu-thuy-linh": {
    name: "KHUU THUY LINH",
    title: "Design-based Researcher\nLASALLE College of the Arts, Singapore",
    description:
      "Starting out from the field of communication design, Linh's practice is based mainly in the digital world, where she communicates innovative concepts through thoughtful digital products. Contrary to how the corporate world puts it, design has never been the last step for every product. To Linh, design is also a way to understand the world. Taking a Master's in Design program in the time of uncertainty and AI dominance, she explores how design can do more when it is expected to be less. That is when she delves into tangible user interfaces, design fiction, and experience design and adapts them to examine one of the complexities caused by AI technology: its invisible water-consuming nature. It is an ongoing process which aims to illuminate an effective communication strategy to inform the public about a problem that they are contributing to but are not directly affected by.",
    imageLabel: "LINH",
    imageSrc: "./images/artists/artist_khuuthuylinh.png"
  },
  "ly-du-khanh-han": {
    name: "LY DU KHANH HAN",
    title: "Interdisciplinary Designer & Researcher\nLASALLE College of the Arts (MA Design), Singapore",
    description:
      "Ly Du Khanh Han is a Vietnamese designer-researcher and interdisciplinary creative based in Singapore, currently pursuing an MA in Design at LASALLE College of the Arts. Han's research investigates the design of play as a mode of engagement and participation, particularly how play can function as a methodological tool for community-driven approaches to archiving and cultural continuity.\n\nAcross their broader practice, Han works at the intersection of screenwriting, animation, and game design, with a longstanding interest in how interactivity reshapes narrative form. With experience in creative coding and interactive prototyping, Han's practice bridges narrative research and implementation, treating tools and systems as spaces for experimental inquiry.\n\nWebsite: www.haaanly.com",
    imageLabel: "HAN",
    imageSrc: "./images/artists/artist_lydukhanhhan.png"
  },
  "matsurah-maidin": {
    name: "MASTURAH MAIDIN",
    title: "Designer, Researcher\nLASALLE College of the Arts (MA Design), Singapore",
    description:
      "Masturah is an Experience Designer and Design Researcher whose 15-year career resists the silos of the tech industry. She works fluidly between product strategy, data analytics, and visual craft, not just as a generalist, but as a translator who believes great design lives in the gaps between business logic and human behavior. Her portfolio includes high-impact work for multinational clients and agile brand-builds for startups. Her deepest commitment lies in mentorship and the messy, collaborative process of making.\n\nHer current practice is shaped by her MA in Design at LASALLE College of the Arts, where she researches Colloquial Malay as a Negotiated Cultural Identity. This inquiry challenges the dominance of standardised interfaces, proposing instead that vernacular language and local nuance are critical infrastructure for decolonised, resonant design. Her exhibited work explores how spatial design, interaction design and visual narrative can carry the weight of cultural negotiation in an increasingly globalised digital landscape.",
    imageLabel: "MASTURAH",
    imageSrc: "./images/artists/artist_matsurah.png"
  },
  "mega-mario": {
    name: "MEGA MARIO",
    title: "Design-based Researcher\nLASALLE College of the Arts (MA Design), Singapore",
    description:
      "Mega Mario is an Indonesian designer and producer based in Singapore, currently pursuing a Master of Arts in Design at LASALLE College of the Arts. With over nine years of experience across packaging design, brand identity, social media content, and editorial video production, her practice bridges commercial and research-based design.\n\nHer current research explores the relationship between design, environment, and knowledge systems, focusing on soil as a form of knowledge within agricultural contexts in Indonesia. She investigates how soil is understood through embodied experience and how this knowledge can be supported and shared through design.\n\nWorking through field research and material experimentation, Mega develops sensory tools and installations that engage with soil as both substance and narrative. Her ongoing project, Under The Surface, proposes a living archive for preserving and exchanging soil knowledge across generations.",
    imageLabel: "MARIO",
    imageSrc: "./images/artists/artist_megamario.png"
  },
  "pann-lim": {
    name: "PANN LIM",
    title: "Creative Director\nKinetic Singapore",
    description:
      "Pann Lim is the Co-Founder and Creative Director of Kinetic Singapore. He believes that design without an idea is a sin, a belief that has guided his work for nearly three decades. Passionate about design, advertising and communication, Pann has won over 550 industry awards, including Gold Pencils at The One Show and a Yellow Pencil at D&AD. Under his leadership, Kinetic was ranked fifth in the world for Design Agency by D&AD in 2022. He was named Creative Director of the Year by the Institute of Advertising Singapore in 2012 and has received the President's Design Award, Singapore's highest design honour, four times, including Designer of the Year in 2013. Pann has been Jury President and judge at D&AD, Adfest and the Kancil Awards and chaired the Singapore Creative Circle Awards in 2016.\n\nIn 2011, he started Holycrap, a family art collective with his wife and two kids, and published Rubbish Famzine, which gained a devoted following. Issues 1 to 12 were acquired by the Singapore Art Museum for their permanent design collection. Pann continues to mentor young designers through talks and advisory roles at design schools. While pursuing his MA at LASALLE College of the Arts, University of the Arts Singapore, he developed the Eleven Dimensions of the Human Soul of Design, a framework for design practice that defines what remains irreplaceably human in the age of A.I.",
    imageLabel: "PANN",
    imageSrc: "./images/artists/artist_pannlim.png"
  }
};

const schedule = {
  "2026-08-08": {
    type: "workshops",
    slots: [
      {
        time: "10:00 AM - 12:00 PM",
        title: "The Life and Death of The Human Soul of Design",
        host: "by Pann Lim",
        description:
          "In an age where generative A.I. is reshaping the creative industry, the question of what makes a designer irreplaceable has never been more urgent. This talk explores why human creative practice matters now more than ever, introducing the Eleven Dimensions of the Human Soul of Design, a framework developed through academic research and professional practice that defines the qualities A.I. cannot replicate.\n\nA live talk with Q&A.",
        link: "#"
      },
      {
        time: "1:30 PM - 2:30 PM",
        title: "Soil Knowledge and Gallery",
        host: "by Mega Mario",
        description:
          "Soil plays an important role in farming, yet much of what is known about it is learned through touch, experience, and time. This workshop will explores how soil can be understood as a form of knowledge by translating its conditions into sensory and interactive experiences.\n\nBy making this knowledge more visible and shareable, it supports to passing the soil knowledge across generations and encourages more mindful ways of caring for the land.",
        link: "#"
      },
      {
        time: "3:00 PM - 4:00 PM",
        title: "Uncovering Intergenerational Tensions through Play",
        host: "by Ly Du Khanh Han",
        description:
          "Communication within the family space can often be challenging, with members opting for more surface level and safe topics. This workshop will explore how playful interactions can be an entryway to more insightful and honest conversations between different generations in the family, recognising communication patterns and strategies.\n\nThe goal is to allow family to connect on a deeper level, and create opportunities to transmit intergenerational memory and knowledge.",
        link: "#"
      },
      {
        time: "4:30 PM - 5:30 PM",
        title: "Thirsting4Content: AI Videos' Water Crisis",
        host: "by Khuu Thuy Linh",
        description:
          "The workshop is set out not only to provide information about how thirsty the AI-generated videos are but also to convince people that they are part of the problem if they enjoy such content on social media.\n\nTo engage the audience, the workshop consists of a variety of activities, including a slide presentation on the phenomenon, group discussions through interaction with prototypes, the creation of new narratives from the situation, and a concluding co-created poster mapping the complexities in participants' ways of understanding. Each activity is designed and evaluated differently to measure how effective the approach is in changing people's perception.",
        link: "#"
      }
    ]
  },
  "2026-08-09": {
    type: "open",
    openLabel: "9:00 AM - 5:00 PM",
    title: "Exhibition Open to Public",
    host: "",
    description:
      "Public access day. Visitors are welcome to explore the exhibition freely during opening hours.",
    link: "#"
  },
  "2026-08-10": {
    type: "open",
    openLabel: "9:00 AM - 5:00 PM",
    title: "Exhibition Open to Public",
    host: "",
    description:
      "Public access day. The exhibition remains open throughout the day for self-guided viewing.",
    link: "#"
  },
  "2026-08-11": {
    type: "open",
    openLabel: "9:00 AM - 5:00 PM",
    title: "Exhibition Open to Public",
    host: "",
    description:
      "Final public access day. Visitors can drop in during opening hours and move through the full exhibition.",
    link: "#"
  }
};

let columns = [];
let cellSize = 18;
let columnSpacing = 24;
let rowSpacing = 24;
let animationFrame = null;
let lastTick = 0;

const artistButtons = Array.from(document.querySelectorAll(".artist-option"));
const artistName = document.getElementById("artist-name");
const artistTitle = document.getElementById("artist-title");
const artistDescription = document.getElementById("artist-description");
const artistImage = document.getElementById("artist-image");
const artistImagePhoto = document.getElementById("artist-image-photo");
const artistImageLabel = document.getElementById("artist-image-label");
const artistImageLoader = document.getElementById("artist-image-loader");

const dayButtons = Array.from(document.querySelectorAll(".day-pill"));
const slotList = document.getElementById("event-slot-list");
const eventTitle = document.getElementById("event-title");
const eventHost = document.getElementById("event-host");
const eventDescription = document.getElementById("event-description");
const eventReadMore = document.getElementById("event-read-more");
const eventRegister = document.getElementById("event-register");

let selectedDay = "2026-08-08";
let selectedSlotIndex = 2;
let descriptionExpanded = false;
let artistTypingToken = 0;
let eventTypingToken = 0;
let activeArtistTyping = null;
let activeEventTyping = null;
let artistImageLoadToken = 0;

function randomGlyph() {
  return glyphs[Math.floor(Math.random() * glyphs.length)];
}

function updateNavState() {
  const headerOffset = 110;
  const heroBottom = heroSection.offsetTop + heroSection.offsetHeight - headerOffset;
  const position = window.scrollY + headerOffset;

  if (position < heroBottom) {
    document.body.classList.add("is-hero-nav");
    navLinks.forEach((link) => link.classList.remove("is-active"));
    return;
  }

  document.body.classList.remove("is-hero-nav");

  let activeId = trackedSections[0]?.id;

  trackedSections.forEach((section) => {
    if (position >= section.offsetTop) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const targetId = link.getAttribute("href")?.slice(1);
    link.classList.toggle("is-active", targetId === activeId);
  });
}

function buildGlyphStack(length) {
  return Array.from({ length }, () => randomGlyph());
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;");
}

function buildTypingUnits(text) {
  return Array.from(text, (character) => {
    if (character === "\n") {
      return "<br>";
    }

    return escapeHtml(character);
  });
}

function typeTextInto(element, text, speed, token, onComplete) {
  const units = buildTypingUnits(text);
  let index = 0;

  function tick() {
    if (token.cancelled) {
      return;
    }

    index += 1;
    element.innerHTML = units.slice(0, index).join("");

    if (index < units.length) {
      window.setTimeout(tick, speed);
      return;
    }

    if (onComplete) {
      onComplete();
    }
  }

  element.innerHTML = "";

  if (units.length === 0) {
    if (onComplete) {
      onComplete();
    }
    return;
  }

  tick();
}

function createTypingToken(counterName) {
  if (counterName === "artist") {
    if (activeArtistTyping) {
      activeArtistTyping.cancelled = true;
    }

    artistTypingToken += 1;
    activeArtistTyping = { id: artistTypingToken, cancelled: false };
    return activeArtistTyping;
  }

  if (activeEventTyping) {
    activeEventTyping.cancelled = true;
  }

  eventTypingToken += 1;
  activeEventTyping = { id: eventTypingToken, cancelled: false };
  return activeEventTyping;
}

function animateArtistContent(artist) {
  const token = createTypingToken("artist");
  const activeId = token.id;

  artistName.textContent = "";
  artistTitle.innerHTML = "";
  artistDescription.innerHTML = "";
  artistImageLabel.textContent = artist.imageLabel;
  artistImagePhoto.src = artist.imageSrc || "";
  artistImagePhoto.alt = artist.imageSrc ? `${artist.name} portrait` : "";
  artistImage.classList.toggle("has-image", Boolean(artist.imageSrc));
  triggerArtistImageLoad();

  typeTextInto(artistName, artist.name, 18, token, () => {
    if (token.cancelled || activeId !== artistTypingToken) {
      return;
    }

    typeTextInto(artistTitle, artist.title, 10, token, () => {
      if (token.cancelled || activeId !== artistTypingToken) {
        return;
      }

      typeTextInto(artistDescription, artist.description, 3, token);
    });
  });

  return token;
}

function triggerArtistImageLoad() {
  artistImageLoadToken += 1;
  const token = artistImageLoadToken;

  if (mediaQuery.matches) {
    artistImageLoader.innerHTML = "";
    return;
  }

  artistImageLoader.innerHTML = "";

  const cellCount = 28 * 28;

  for (let index = 0; index < cellCount; index += 1) {
    const pixel = document.createElement("span");
    const delay = Math.floor(Math.random() * 520);
    const duration = 120 + Math.floor(Math.random() * 260);
    const alpha = (0.72 + Math.random() * 0.28).toFixed(2);

    pixel.className = "artist-image-pixel";
    pixel.style.setProperty("--pixel-delay", `${delay}ms`);
    pixel.style.setProperty("--pixel-duration", `${duration}ms`);
    pixel.style.setProperty("--pixel-alpha", alpha);
    artistImageLoader.appendChild(pixel);
  }

  window.setTimeout(() => {
    if (token !== artistImageLoadToken) {
      return;
    }

    artistImageLoader.innerHTML = "";
  }, 1000);
}

function animateEventContent(title, host, description, options = {}) {
  const token = createTypingToken("event");
  const activeId = token.id;

  eventTitle.textContent = "";
  eventHost.textContent = "";
  eventDescription.innerHTML = "";

  eventDescription.classList.toggle("is-collapsed", Boolean(options.collapsed));
  eventReadMore.hidden = Boolean(options.hideReadMore);
  eventReadMore.textContent = descriptionExpanded ? "show less" : "read more";

  typeTextInto(eventTitle, title, 16, token, () => {
    if (token.cancelled || activeId !== eventTypingToken) {
      return;
    }

    const typeDescription = () => {
      if (token.cancelled || activeId !== eventTypingToken) {
        return;
      }

      typeTextInto(eventDescription, description, 3, token);
    };

    if (!host) {
      typeDescription();
      return;
    }

    typeTextInto(eventHost, host, 10, token, typeDescription);
  });

  return token;
}

function createColumn(index, height) {
  const tail = 10 + Math.floor(Math.random() * 12);
  const y = Math.random() * height;

  return {
    baseX: index * columnSpacing + (Math.random() * 4 - 2),
    y,
    speed: 0.95 + Math.random() * 1.65,
    tail,
    sway: 2 + Math.random() * 6,
    drift: 0.003 + Math.random() * 0.008,
    glyphStack: buildGlyphStack(tail),
    lastRow: Math.floor(y / rowSpacing),
    changeInterval: 55 + Math.random() * 95,
    changeAccumulator: Math.random() * 80
  };
}

function resetColumn(column, height) {
  column.y = -Math.random() * height * 0.4;
  column.speed = 0.95 + Math.random() * 1.65;
  column.tail = 10 + Math.floor(Math.random() * 12);
  column.sway = 2 + Math.random() * 6;
  column.drift = 0.003 + Math.random() * 0.008;
  column.glyphStack = buildGlyphStack(column.tail);
  column.lastRow = Math.floor(column.y / rowSpacing);
  column.changeInterval = 55 + Math.random() * 95;
  column.changeAccumulator = 0;
}

function advanceColumnGlyphs(column) {
  const currentRow = Math.floor(column.y / rowSpacing);
  const steps = currentRow - column.lastRow;

  if (steps <= 0) {
    return;
  }

  for (let index = 0; index < steps; index += 1) {
    column.glyphStack.unshift(randomGlyph());
  }

  column.glyphStack = column.glyphStack.slice(0, column.tail);
  column.lastRow = currentRow;
}

function mutateColumnGlyphs(column, delta) {
  column.changeAccumulator += delta;

  while (column.changeAccumulator >= column.changeInterval) {
    column.changeAccumulator -= column.changeInterval;

    const mutableCount = Math.max(1, Math.floor(column.glyphStack.length * 0.35));
    const start = Math.floor(Math.random() * mutableCount);
    const span = 1 + Math.floor(Math.random() * 2);

    for (let index = start; index < Math.min(start + span, column.glyphStack.length); index += 1) {
      column.glyphStack[index] = randomGlyph();
    }
  }
}

function setCanvasSize() {
  const ratio = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  cellSize = width < 640 ? 12 : width < 960 ? 14 : 15;
  columnSpacing = width < 640 ? 16 : width < 960 ? 18 : 20;
  rowSpacing = width < 640 ? 16 : width < 960 ? 18 : 21;
  const count = Math.ceil(width / columnSpacing);

  columns = Array.from({ length: count }, (_, index) => createColumn(index, height));
}

function drawColumn(column, height, delta) {
  const x = Math.round(column.baseX + Math.sin(column.y * column.drift) * column.sway);

  for (let step = 0; step < column.tail; step += 1) {
    const glyph = column.glyphStack[step] || randomGlyph();
    const y = Math.round(column.y - step * rowSpacing);
    const alpha = Math.max(0.14, 1 - step / (column.tail + 1));

    context.fillStyle = `rgba(252, 251, 148, ${alpha})`;
    context.fillText(glyph, x, y);
  }

  column.y += column.speed;
  mutateColumnGlyphs(column, delta);
  advanceColumnGlyphs(column);

  if (column.y - column.tail * rowSpacing > height) {
    resetColumn(column, height);
  }
}

function render(timestamp) {
  if (timestamp - lastTick < 48) {
    animationFrame = window.requestAnimationFrame(render);
    return;
  }

  const delta = lastTick === 0 ? 48 : timestamp - lastTick;
  lastTick = timestamp;

  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  context.font = `600 ${cellSize}px "Google Sans Code", monospace`;
  context.textBaseline = "top";

  columns.forEach((column) => drawColumn(column, canvas.clientHeight, delta));
  animationFrame = window.requestAnimationFrame(render);
}

function stopAnimation() {
  if (animationFrame) {
    window.cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
}

function paintStaticFrame() {
  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  context.fillStyle = "rgba(186, 116, 216, 0.32)";
  context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  context.font = `600 ${cellSize}px "Google Sans Code", monospace`;
  context.textBaseline = "top";

  columns.forEach((column) => {
    for (let step = 0; step < Math.min(column.tail, 10); step += 1) {
      context.fillStyle = `rgba(252, 251, 148, ${0.18 + step * 0.04})`;
      const x = Math.round(column.baseX + Math.sin(column.y * column.drift) * column.sway);
      const y = Math.round(column.y + step * rowSpacing);
      context.fillText(column.glyphStack[step] || randomGlyph(), x, y);
    }
  });
}

function syncAnimationMode() {
  stopAnimation();
  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  if (mediaQuery.matches) {
    paintStaticFrame();
    return;
  }

  lastTick = 0;
  animationFrame = window.requestAnimationFrame(render);
}

function renderArtist(artistId) {
  const artist = artists[artistId];

  artistButtons.forEach((button) => {
    const selected = button.dataset.artist === artistId;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-selected", String(selected));
  });

  animateArtistContent(artist);
}

function renderOpenDay(day) {
  slotList.innerHTML = "";

  const staticItem = document.createElement("div");
  staticItem.className = "event-slot-static";
  staticItem.textContent = day.openLabel;
  slotList.appendChild(staticItem);

  eventRegister.textContent = "visit exhibition";
  eventRegister.href = day.link;
  animateEventContent(day.title, "", day.description, {
    collapsed: false,
    hideReadMore: true
  });
}

function renderWorkshopDay(day) {
  slotList.innerHTML = "";

  day.slots.forEach((slot, index) => {
    const button = document.createElement("button");
    button.className = "event-slot-button";
    if (index === selectedSlotIndex) {
      button.classList.add("is-selected");
    }
    button.type = "button";
    button.textContent = slot.time;
    button.dataset.index = String(index);
    button.addEventListener("click", () => {
      selectedSlotIndex = index;
      descriptionExpanded = false;
      renderEvents();
    });
    slotList.appendChild(button);
  });

  const slot = day.slots[selectedSlotIndex];
  eventRegister.textContent = "register now!";
  eventRegister.href = slot.link;
  animateEventContent(slot.title, slot.host, slot.description, {
    collapsed: !descriptionExpanded,
    hideReadMore: false
  });
}

function renderEvents() {
  const day = schedule[selectedDay];

  dayButtons.forEach((button) => {
    const selected = button.dataset.day === selectedDay;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-selected", String(selected));
  });

  if (day.type === "open") {
    renderOpenDay(day);
    return;
  }

  renderWorkshopDay(day);
}

artistButtons.forEach((button) => {
  button.addEventListener("click", () => {
    renderArtist(button.dataset.artist);
  });
});

dayButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedDay = button.dataset.day;
    selectedSlotIndex = 0;
    descriptionExpanded = false;
    renderEvents();
  });
});

eventReadMore.addEventListener("click", () => {
  descriptionExpanded = !descriptionExpanded;
  eventDescription.classList.toggle("is-collapsed", !descriptionExpanded);
  eventReadMore.textContent = descriptionExpanded ? "show less" : "read more";
});

setCanvasSize();
syncAnimationMode();
renderArtist("ly-du-khanh-han");
renderEvents();
updateNavState();

window.addEventListener("resize", () => {
  setCanvasSize();
  syncAnimationMode();
  updateNavState();
});

mediaQuery.addEventListener("change", syncAnimationMode);
window.addEventListener("scroll", updateNavState, { passive: true });
