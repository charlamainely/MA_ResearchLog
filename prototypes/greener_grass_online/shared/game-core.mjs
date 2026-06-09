import fs from "node:fs/promises";
import path from "node:path";

export const STAT_KEYS = ["health", "happiness", "money", "experience"];
export const BASE_STATS = {
  health: 6,
  happiness: 6,
  money: 6,
  experience: 1
};

export const GENERATIONS = {
  "war-time": { vi: "Thế hệ thời chiến", en: "War-time Generation", color: "#40c2ff" },
  subsidy: { vi: "Thế hệ bao cấp", en: "Subsidy Generation", color: "#f76fbc" },
  reform: { vi: "Thế hệ đổi mới", en: "Reform Generation", color: "#fee74b" },
  "digital-native": { vi: "Thế hệ số", en: "Digital-native Generation", color: "#f36e3e" }
};

const COLUMN_TO_GENERATION = {
  war_time: "war-time",
  subsidy: "subsidy",
  reform: "reform",
  digital_native: "digital-native"
};

function nowIso() {
  return new Date().toISOString();
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeText(value) {
  return String(value || "").trim();
}

function randomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 5; i += 1) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

function randomId(prefix) {
  return prefix + "_" + Math.random().toString(36).slice(2, 10);
}

export function parseCsv(text) {
  const source = String(text || "").replace(/^\uFEFF/, "");
  const rows = [];
  let current = "";
  let row = [];
  let insideQuotes = false;

  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];
    const next = source[i + 1];

    if (char === "\"") {
      if (insideQuotes && next === "\"") {
        current += "\"";
        i += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
      continue;
    }

    if (char === "," && !insideQuotes) {
      row.push(current);
      current = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && next === "\n") {
        i += 1;
      }
      row.push(current);
      rows.push(row);
      row = [];
      current = "";
      continue;
    }

    current += char;
  }

  if (current !== "" || row.length) {
    row.push(current);
    rows.push(row);
  }

  if (!rows.length) {
    return [];
  }

  const headers = rows[0].map((header) => normalizeText(header));
  return rows
    .slice(1)
    .filter((cells) => cells.some((cell) => normalizeText(cell) !== ""))
    .map((cells) => {
      const out = {};
      headers.forEach((header, index) => {
        out[header] = cells[index] != null ? String(cells[index]).trim() : "";
      });
      return out;
    });
}

function splitTokens(raw) {
  return String(raw || "")
    .split(";")
    .map((token) => token.trim())
    .filter(Boolean);
}

function normalizeStat(raw) {
  const token = normalizeText(raw).toLowerCase();
  if (token === "health" || token === "sức khoẻ" || token === "sức khỏe") return "health";
  if (token === "happiness" || token === "hạnh phúc") return "happiness";
  if (token === "money" || token === "wealth" || token === "tiền bạc" || token === "tiền") return "money";
  if (token === "experience" || token === "kinh nghiệm") return "experience";
  return "";
}

export function parseRequirements(raw) {
  const tokens = splitTokens(raw);
  if (!tokens.length) {
    return null;
  }
  const rules = [];
  tokens.forEach((token) => {
    const statMatch = token.match(/^([a-z_à-ỹ ]+):?(>=|<=|>|<|=)(-?\d+)$/i);
    if (statMatch) {
      const stat = normalizeStat(statMatch[1]);
      if (stat) {
        rules.push({ kind: "stat", stat, operator: statMatch[2], value: Number(statMatch[3]) });
      }
      return;
    }
    const statusMatch = token.match(/^set_([a-z_]+):([a-z0-9_]+)$/i);
    if (statusMatch) {
      rules.push({ kind: "status", field: statusMatch[1], value: statusMatch[2] });
    }
  });
  return rules.length ? { rules } : null;
}

function parseStructuredEffects(raw, options = {}) {
  const tokens = splitTokens(raw);
  const effects = [];
  let pendingHousing = null;

  tokens.forEach((token, index) => {
    if (/^(occupation_choice|occupation_change)$/i.test(token)) {
      effects.push({ type: "chooseOccupation", key: options.keyPrefix + "_occupation_" + index });
      return;
    }
    if (/^hobby_choice$/i.test(token)) {
      effects.push({ type: "chooseHobby", key: options.keyPrefix + "_hobby_" + index });
      return;
    }
    const drawMatch = token.match(/^draw:(life|era)$/i);
    if (drawMatch) {
      effects.push({ type: "drawCard", deck: drawMatch[1].toLowerCase() });
      return;
    }
    const occupationMatch = token.match(/^set_occupation:([a-z0-9_]+)$/i);
    if (occupationMatch) {
      effects.push({ type: "setOccupation", occupation: occupationMatch[1] });
      return;
    }
    const hobbyMatch = token.match(/^set_hobby:([a-z0-9_]+)$/i);
    if (hobbyMatch) {
      effects.push({ type: "setHobby", hobby: hobbyMatch[1] });
      return;
    }
    const housingMatch = token.match(/^set_housing:([a-z0-9_]+)$/i);
    if (housingMatch) {
      pendingHousing = { type: "setHousing", housingStatus: housingMatch[1], payment: null };
      effects.push(pendingHousing);
      return;
    }
    const familyMatch = token.match(/^set_relationship:([a-z0-9_]+)$/i);
    if (familyMatch) {
      effects.push({ type: "setFamilyStatus", familyStatus: familyMatch[1] });
      return;
    }
    const childrenMatch = token.match(/^set_children:([a-z0-9_]+)$/i);
    if (childrenMatch) {
      effects.push({ type: "setChildrenStatus", childrenStatus: childrenMatch[1] });
      return;
    }
    const genericStatusMatch = token.match(/^set_([a-z_]+):([a-z0-9_]+)$/i);
    if (genericStatusMatch) {
      effects.push({ type: "setFlag", field: genericStatusMatch[1], value: genericStatusMatch[2] });
      return;
    }
    const moveToMatch = token.match(/^move_to:(\d+)$/i);
    if (moveToMatch) {
      effects.push({ type: "moveToNode", nodeId: String(moveToMatch[1]) });
      return;
    }
    const moveBackMatch = token.match(/^move_back:(\d+)$/i);
    if (moveBackMatch) {
      effects.push({ type: "moveBackSteps", steps: Number(moveBackMatch[1]) });
      return;
    }
    const paymentMatch = token.match(/^payment:(\d+)$/i);
    if (paymentMatch && pendingHousing) {
      pendingHousing.payment = Number(paymentMatch[1]);
      return;
    }

    let statMatch = token.match(/^([a-z_à-ỹ ]+):([+-]?\d+)(?:@(turns:(\d+)|until(?::_space_type)?:([a-z_]+)|per_turn))?$/i);
    if (!statMatch) {
      statMatch = token.match(/^([+-]?\d+)\s+([a-z_à-ỹ ]+)$/i);
      if (statMatch) {
        statMatch = [statMatch[0], statMatch[2], statMatch[1], "", "", ""];
      }
    }

    if (statMatch) {
      const stat = normalizeStat(statMatch[1]);
      const amount = Number(statMatch[2]);
      const modifier = statMatch[3] || "";
      const turns = statMatch[4] ? Number(statMatch[4]) : null;
      const untilType = statMatch[5] || "";
      if (!stat || Number.isNaN(amount)) {
        return;
      }
      if (pendingHousing && stat === "money" && amount < 0 && modifier === "per_turn") {
        pendingHousing.payment = Math.abs(amount);
        return;
      }
      if (!modifier) {
        effects.push({ type: "adjustStat", stat, amount });
        return;
      }
      effects.push({
        type: "startRecurring",
        key: options.keyPrefix + "_recurring_" + index + "_" + stat,
        effects: [{ type: "adjustStat", stat, amount }],
        durationTurns: modifier.indexOf("turns:") === 0 ? turns : null,
        endOnOccupationChange: untilType === "occupation_choice",
        endOnHousingChange: untilType === "housing_choice",
        note: options.sourceLabel || ""
      });
    }
  });

  return effects;
}

function getEffectsForGeneration(baseEffects, generationEffects, generation) {
  return [...(baseEffects || []), ...((generationEffects && generationEffects[generation]) || [])];
}

function effectDeltas(effectList) {
  return (effectList || []).reduce((acc, effect) => {
    if (!effect) return acc;
    if (effect.type === "adjustStat") {
      acc[effect.stat] = (acc[effect.stat] || 0) + (effect.amount || 0);
    }
    if (effect.type === "startRecurring") {
      (effect.effects || []).forEach((item) => {
        if (item && item.type === "adjustStat") {
          acc[item.stat] = (acc[item.stat] || 0) + (item.amount || 0);
        }
      });
    }
    return acc;
  }, {});
}

function buildEffectPreview(effectList, locale = "vi") {
  const lines = [];
  (effectList || []).forEach((effect) => {
    if (!effect) {
      return;
    }
    if (effect.type === "adjustStat") {
      lines.push({ kind: "stat", stat: effect.stat, amount: effect.amount, suffix: "" });
      return;
    }
    if (effect.type === "startRecurring") {
      const deltas = effectDeltas(effect.effects || []);
      Object.keys(deltas).forEach((stat) => {
        let suffix = "";
        if (typeof effect.durationTurns === "number") {
          suffix = locale === "en" ? `for ${effect.durationTurns} turns` : `trong ${effect.durationTurns} lượt`;
        } else if (effect.endOnOccupationChange) {
          suffix = locale === "en" ? "until occupation changes" : "đến khi đổi nghề";
        } else if (effect.endOnHousingChange) {
          suffix = locale === "en" ? "until housing changes" : "đến khi đổi nơi ở";
        } else {
          suffix = locale === "en" ? "each turn" : "mỗi lượt";
        }
        lines.push({ kind: "stat", stat, amount: deltas[stat], suffix });
      });
      return;
    }
    if (effect.type === "setOccupation") {
      lines.push({ kind: "text", vi: `Đổi nghề: ${effect.occupation}`, en: `Occupation: ${effect.occupation}` });
      return;
    }
    if (effect.type === "setHobby") {
      lines.push({ kind: "text", vi: `Đổi sở thích: ${effect.hobby}`, en: `Hobby: ${effect.hobby}` });
      return;
    }
    if (effect.type === "setHousing") {
      lines.push({ kind: "text", vi: `Nơi ở: ${effect.housingStatus}`, en: `Housing: ${effect.housingStatus}` });
      return;
    }
    if (effect.type === "setFamilyStatus") {
      lines.push({ kind: "text", vi: `Quan hệ: ${effect.familyStatus}`, en: `Relationship: ${effect.familyStatus}` });
      return;
    }
    if (effect.type === "setChildrenStatus") {
      lines.push({ kind: "text", vi: `Gia đình: ${effect.childrenStatus}`, en: `Family: ${effect.childrenStatus}` });
      return;
    }
  });
  return lines;
}

function shuffle(array) {
  const next = array.slice();
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function nodeLabel(content, nodeId, locale) {
  const meta = content.spaceMeta[nodeId];
  if (!meta) return locale === "en" ? `Space ${nodeId}` : `Ô ${nodeId}`;
  return locale === "en" ? (meta.titleEn || meta.titleVi || meta.title) : (meta.titleVi || meta.titleEn || meta.title);
}

export async function loadContentFromDirectory(dataDir) {
  const files = [
    "space_data_template.csv",
    "life_cards_template.csv",
    "era_cards_template.csv",
    "occupations_template.csv",
    "hobbies_template.csv"
  ];
  const texts = await Promise.all(files.map((file) => fs.readFile(path.join(dataDir, file), "utf8")));
  const [spaceRows, lifeRows, eraRows, occupationRows, hobbyRows] = texts.map(parseCsv);
  return buildContentFromRows({
    spaceRows,
    lifeRows,
    eraRows,
    occupationRows,
    hobbyRows
  });
}

export function buildContentFromRows({ spaceRows, lifeRows, eraRows, occupationRows, hobbyRows }) {
  const boardEntries = (spaceRows || [])
    .map((row) => ({ row, id: normalizeText(row.space_id), no: Number(row.space_id) }))
    .filter((entry) => entry.id && !Number.isNaN(entry.no))
    .sort((a, b) => a.no - b.no);

  const board = {
    startId: boardEntries.length ? boardEntries[0].id : "0",
    finishId: boardEntries.length ? boardEntries[boardEntries.length - 1].id : "0",
    nodeOrder: boardEntries.map((entry) => entry.id),
    nodes: {}
  };

  const spaceMeta = {};

  boardEntries.forEach((entry, index) => {
    const { row, id } = entry;
    const type = normalizeText(row.space_type || "stat");
    const nextDefault = normalizeText(row.next_default) || (boardEntries[index + 1] ? boardEntries[index + 1].id : "");
    const baseEffects = parseStructuredEffects(row.effects_common, {
      keyPrefix: `space_${id}`,
      sourceLabel: normalizeText(row.title_vi || row.title_en || id)
    });
    const generationEffects = {};
    Object.keys(COLUMN_TO_GENERATION).forEach((columnKey) => {
      const generation = COLUMN_TO_GENERATION[columnKey];
      const parsed = parseStructuredEffects(row[`effects_${columnKey}`], {
        keyPrefix: `space_${id}_${columnKey}`,
        sourceLabel: normalizeText(row.title_vi || row.title_en || id)
      });
      if (parsed.length) {
        generationEffects[generation] = parsed;
      }
    });

    const options = [1, 2, 3]
      .map((optionIndex) => {
        const labelVi = normalizeText(row[`option_${optionIndex}_label_vi`]);
        const labelEn = normalizeText(row[`option_${optionIndex}_label_en`]) || labelVi;
        const next = normalizeText(row[`option_${optionIndex}_next`]);
        if (!labelVi) {
          return null;
        }
        return {
          id: `${id}_opt_${optionIndex}`,
          labelVi,
          labelEn,
          next,
          effects: parseStructuredEffects(row[`option_${optionIndex}_effects`], {
            keyPrefix: `space_${id}_opt_${optionIndex}`,
            sourceLabel: labelVi || labelEn || id
          }),
          requirements: parseRequirements(row[`option_${optionIndex}_requirements`])
        };
      })
      .filter(Boolean);

    board.nodes[id] = {
      id,
      type,
      next: nextDefault || null,
      effects: baseEffects,
      generationEffects,
      options
    };

    spaceMeta[id] = {
      id,
      type,
      titleVi: normalizeText(row.title_vi || row.title_en || id),
      titleEn: normalizeText(row.title_en || row.title_vi || id),
      questionVi: normalizeText(row.question_vi),
      questionEn: normalizeText(row.question_en || row.question_vi),
      descriptionsVi: {
        "war-time": normalizeText(row.desc_war_time_vi),
        subsidy: normalizeText(row.desc_subsidy_vi),
        reform: normalizeText(row.desc_reform_vi),
        "digital-native": normalizeText(row.desc_digital_native_vi)
      },
      descriptionsEn: {
        "war-time": normalizeText(row.desc_war_time_en),
        subsidy: normalizeText(row.desc_subsidy_en),
        reform: normalizeText(row.desc_reform_en),
        "digital-native": normalizeText(row.desc_digital_native_en)
      }
    };
  });

  const lifeCards = buildCards(lifeRows || [], "life");
  const eraCards = buildCards(eraRows || [], "era");
  const occupations = buildOccupationMap(occupationRows || []);
  const hobbies = buildHobbyMap(hobbyRows || []);

  return {
    board,
    spaceMeta,
    lifeCards,
    eraCards,
    occupations,
    hobbies
  };
}

function buildCards(rows, deckName) {
  return rows
    .map((row, index) => {
      const id = normalizeText(row.card_id) || `${deckName}_${index + 1}`;
      const options = deckName === "life"
        ? [1, 2, 3]
            .map((optionIndex) => {
              const labelVi = normalizeText(row[`option_${optionIndex}_label_vi`]);
              const labelEn = normalizeText(row[`option_${optionIndex}_label_en`]) || labelVi;
              if (!labelVi) {
                return null;
              }
              return {
                id: `${id}_opt_${optionIndex}`,
                labelVi,
                labelEn,
                effects: parseStructuredEffects(row[`option_${optionIndex}_effects`], {
                  keyPrefix: `${id}_opt_${optionIndex}`,
                  sourceLabel: labelVi || labelEn || id
                })
              };
            })
            .filter(Boolean)
        : [];
      const generationEffects = {};
      Object.keys(COLUMN_TO_GENERATION).forEach((columnKey) => {
        const generation = COLUMN_TO_GENERATION[columnKey];
        const parsed = parseStructuredEffects(row[`effects_${columnKey}`], {
          keyPrefix: `${id}_${columnKey}`,
          sourceLabel: normalizeText(row.title_vi || row.title_en || id)
        });
        if (parsed.length) {
          generationEffects[generation] = parsed;
        }
      });
      return {
        id,
        deckName,
        titleVi: normalizeText(row.title_vi || row.title_en || id),
        titleEn: normalizeText(row.title_en || row.title_vi || id),
        descriptionVi: normalizeText(row.description_vi),
        descriptionEn: normalizeText(row.description_en || row.description_vi),
        questionVi: normalizeText(row.question_vi),
        questionEn: normalizeText(row.question_en || row.question_vi),
        effects: parseStructuredEffects(row.effects_common, {
          keyPrefix: `${id}_base`,
          sourceLabel: normalizeText(row.title_vi || row.title_en || id)
        }),
        generationEffects,
        options
      };
    })
    .filter((card) => card.titleVi || card.titleEn);
}

function buildOccupationMap(rows) {
  const map = {
    working: {
      id: "working",
      labelVi: "Đang đi làm",
      labelEn: "Working",
      selectable: false,
      requirements: null,
      recurringEffects: []
    }
  };
  rows.forEach((row) => {
    const id = normalizeText(row.occupation_id);
    if (!id) return;
    map[id] = {
      id,
      labelVi: normalizeText(row.label_vi || id),
      labelEn: normalizeText(row.label_en || row.label_vi || id),
      selectable: normalizeText(row.selectable || "yes").toLowerCase() === "yes",
      requirements: parseRequirements(row.requirements),
      recurringEffects: parseStructuredEffects(row.recurring_effects, {
        keyPrefix: `occupation_${id}`,
        sourceLabel: id
      })
    };
  });
  return map;
}

function buildHobbyMap(rows) {
  const map = {};
  rows.forEach((row) => {
    const id = normalizeText(row.hobby_id);
    if (!id) return;
    map[id] = {
      id,
      labelVi: normalizeText(row.label_vi || id),
      labelEn: normalizeText(row.label_en || row.label_vi || id),
      requirements: parseRequirements(row.requirements),
      recurringEffects: parseStructuredEffects(row.recurring_effects, {
        keyPrefix: `hobby_${id}`,
        sourceLabel: id
      })
    };
  });
  return map;
}

function getTextByLocale(vi, en, locale) {
  return locale === "en" ? (en || vi || "") : (vi || en || "");
}

function getSpaceDescription(content, player, nodeId, locale) {
  const meta = content.spaceMeta[nodeId];
  if (!meta) return "";
  const generation = player.generation;
  return locale === "en"
    ? (meta.descriptionsEn[generation] || meta.descriptionsVi[generation] || "")
    : (meta.descriptionsVi[generation] || meta.descriptionsEn[generation] || "");
}

function evaluateRequirementRule(player, rule) {
  if (!rule) {
    return true;
  }
  if (rule.kind === "stat") {
    const value = Number(player.stats[rule.stat] || 0);
    switch (rule.operator) {
      case ">=": return value >= rule.value;
      case "<=": return value <= rule.value;
      case ">": return value > rule.value;
      case "<": return value < rule.value;
      case "=": return value === rule.value;
      default: return true;
    }
  }
  if (rule.kind === "status") {
    return getPlayerFieldValue(player, rule.field) === rule.value;
  }
  return true;
}

function getPlayerFieldValue(player, field) {
  if (field === "occupation") return player.statuses.occupation;
  if (field === "hobby") return player.statuses.hobby;
  if (field === "housing") return player.statuses.housingStatus;
  if (field === "relationship") return player.statuses.familyStatus;
  if (field === "children") return player.statuses.childrenStatus;
  return player.flags[field] || "";
}

function requirementsMet(player, requirements) {
  if (!requirements || !Array.isArray(requirements.rules) || !requirements.rules.length) {
    return true;
  }
  return requirements.rules.every((rule) => evaluateRequirementRule(player, rule));
}

function requirementMessage(requirements, locale) {
  if (!requirements || !requirements.rules || !requirements.rules.length) {
    return "";
  }
  const labels = requirements.rules.map((rule) => {
    if (rule.kind === "stat") {
      const statLabel = locale === "en"
        ? ({ health: "Health", happiness: "Happiness", money: "Wealth", experience: "Experience" }[rule.stat] || rule.stat)
        : ({ health: "Sức khoẻ", happiness: "Hạnh phúc", money: "Tiền bạc", experience: "Kinh nghiệm" }[rule.stat] || rule.stat);
      return `${statLabel} ${rule.operator} ${rule.value}`;
    }
    if (rule.kind === "status") {
      return locale === "en"
        ? `${rule.field} = ${rule.value}`
        : `${rule.field} = ${rule.value}`;
    }
    return "";
  }).filter(Boolean);
  if (!labels.length) return "";
  return locale === "en" ? `Requires ${labels.join(", ")}` : `Yêu cầu ${labels.join(", ")}`;
}

function createPlayerState(name, generation, content) {
  return {
    id: randomId("player"),
    name,
    generation,
    age: 18,
    stats: clone(BASE_STATS),
    statuses: {
      occupation: "unemployed",
      hobby: "",
      housingStatus: "none",
      housingPayment: 0,
      familyStatus: "single",
      childrenStatus: "none"
    },
    flags: {},
    currentNode: content.board.startId,
    pathHistory: [content.board.startId],
    recurringEffects: [],
    lastMoveDistance: 0,
    occupationHistory: ["unemployed"],
    hobbyHistory: [],
    statHistory: [{ age: 18, ...clone(BASE_STATS) }],
    finished: false
  };
}

export function createRoomState(content, hostPlayer) {
  const code = randomCode();
  const player = createPlayerState(hostPlayer.name, hostPlayer.generation, content);
  return {
    code,
    hostPlayerId: player.id,
    createdAt: nowIso(),
    updatedAt: nowIso(),
    endedAt: null,
    status: "lobby",
    phase: "lobby",
    round: 1,
    currentPlayerIndex: 0,
    players: [player],
    deckState: {
      life: [],
      era: []
    },
    prompt: null,
    log: [],
    lastActivityAt: Date.now(),
    expiresAt: null
  };
}

export function addPlayerToRoom(room, content, payload) {
  if (room.status !== "lobby") {
    throw new Error("Game already started.");
  }
  const player = createPlayerState(payload.name, payload.generation, content);
  room.players.push(player);
  logEvent(room, "player_joined", `${player.name} joined the room.`, { playerId: player.id });
  return player;
}

function resetPlayerState(player, content) {
  const fresh = createPlayerState(player.name, player.generation, content);
  return {
    ...fresh,
    id: player.id
  };
}

function logEvent(room, type, message, payload = {}) {
  room.log.push({
    id: randomId("log"),
    at: nowIso(),
    type,
    message,
    payload
  });
  if (room.log.length > 200) {
    room.log = room.log.slice(-200);
  }
  room.updatedAt = nowIso();
  room.lastActivityAt = Date.now();
}

function initializeDecks(room, content) {
  room.deckState.life = shuffle(content.lifeCards.map((card) => card.id));
  room.deckState.era = shuffle(content.eraCards.map((card) => card.id));
}

function activePlayer(room) {
  return room.players[room.currentPlayerIndex] || null;
}

function recordHistory(player) {
  player.statHistory.push({
    age: player.age,
    health: player.stats.health,
    happiness: player.stats.happiness,
    money: player.stats.money,
    experience: player.stats.experience
  });
}

function moveToNode(content, player, nodeId, note) {
  if (!nodeId) return;
  player.currentNode = nodeId;
  player.pathHistory.push(nodeId);
  if (note) {
    player.pathHistory.push(`note:${note}`);
  }
}

function moveSteps(content, player, steps) {
  let moved = 0;
  while (moved < steps) {
    const node = content.board.nodes[player.currentNode];
    if (!node || !node.next) break;
    moveToNode(content, player, node.next);
    moved += 1;
    if (player.currentNode === content.board.finishId) {
      break;
    }
  }
  player.lastMoveDistance = moved;
}

function applyStat(player, stat, amount) {
  if (!STAT_KEYS.includes(stat)) return;
  player.stats[stat] = Number(player.stats[stat] || 0) + Number(amount || 0);
}

function applySingleEffect(room, content, player, effect) {
  if (!effect) return;
  switch (effect.type) {
    case "adjustStat":
      applyStat(player, effect.stat, effect.amount);
      return;
    case "startRecurring":
      player.recurringEffects = (player.recurringEffects || []).filter((entry) => entry.key !== effect.key);
      player.recurringEffects.push({
        key: effect.key,
        effects: clone(effect.effects || []),
        remainingTurns: typeof effect.durationTurns === "number" ? effect.durationTurns : null,
        endOnOccupationChange: Boolean(effect.endOnOccupationChange),
        endOnHousingChange: Boolean(effect.endOnHousingChange),
        note: effect.note || ""
      });
      if (
        effect.endOnOccupationChange &&
        player.statuses.occupation === "unemployed" &&
        (effect.effects || []).some((item) => item && item.type === "adjustStat" && item.stat === "money" && item.amount > 0)
      ) {
        player.statuses.occupation = "working";
      }
      return;
    case "setOccupation":
      player.statuses.occupation = effect.occupation;
      player.recurringEffects = (player.recurringEffects || []).filter((entry) => !entry.endOnOccupationChange);
      if (!player.occupationHistory.includes(effect.occupation)) {
        player.occupationHistory.push(effect.occupation);
      }
      return;
    case "setHobby":
      player.statuses.hobby = effect.hobby;
      if (!player.hobbyHistory.includes(effect.hobby)) {
        player.hobbyHistory.push(effect.hobby);
      }
      return;
    case "setHousing":
      player.statuses.housingStatus = effect.housingStatus;
      if (typeof effect.payment === "number") {
        player.statuses.housingPayment = effect.payment;
      }
      player.recurringEffects = (player.recurringEffects || []).filter((entry) => !entry.endOnHousingChange);
      return;
    case "setFamilyStatus":
      player.statuses.familyStatus = effect.familyStatus;
      return;
    case "setChildrenStatus":
      player.statuses.childrenStatus = effect.childrenStatus;
      return;
    case "setFlag":
      player.flags[effect.field] = effect.value;
      return;
    case "moveToNode":
      moveToNode(content, player, effect.nodeId, "effect");
      return;
    case "moveBackSteps": {
      const actual = Number(effect.steps || 0);
      if (actual <= 0) return;
      const cleanPath = player.pathHistory.filter((entry) => !String(entry).startsWith("note:"));
      const targetIndex = Math.max(0, cleanPath.length - 1 - actual);
      const target = cleanPath[targetIndex];
      if (target) {
        player.currentNode = target;
        player.pathHistory.push(target);
      }
      return;
    }
    default:
      return;
  }
}

function applyEffects(room, content, player, effects) {
  (effects || []).forEach((effect) => applySingleEffect(room, content, player, effect));
}

function splitEffectsAndFollowUp(effects) {
  const immediate = [];
  let followUp = null;
  (effects || []).forEach((effect) => {
    if (!effect) {
      return;
    }
    if (effect.type === "chooseOccupation") {
      followUp = followUp || { kind: "occupation" };
      return;
    }
    if (effect.type === "chooseHobby") {
      followUp = followUp || { kind: "hobby" };
      return;
    }
    immediate.push(effect);
  });
  return { immediate, followUp };
}

function openFollowUpPrompt(room, content, player, followUp, sourceNodeId = "") {
  if (!followUp) {
    return false;
  }
  if (followUp.kind === "occupation") {
    setPrompt(room, buildOccupationPrompt(room, content, player, sourceNodeId));
    return true;
  }
  if (followUp.kind === "hobby") {
    setPrompt(room, buildHobbyPrompt(room, content, player, sourceNodeId));
    return true;
  }
  return false;
}

function applyRecurringTurnEffects(player) {
  const activeRecurring = (player.recurringEffects || []).slice();
  activeRecurring.forEach((recurring) => {
    applyEffects(null, null, player, recurring.effects || []);
  });
  player.recurringEffects = activeRecurring
    .map((recurring) => {
      const next = clone(recurring);
      if (typeof next.remainingTurns === "number") {
        next.remainingTurns -= 1;
      }
      return next;
    })
    .filter((recurring) => recurring.remainingTurns === null || recurring.remainingTurns > 0);
}

function applyTurnIncome(content, player) {
  const occupation = content.occupations[player.statuses.occupation] || content.occupations.unemployed || null;
  const hobby = player.statuses.hobby ? content.hobbies[player.statuses.hobby] : null;
  if (occupation) {
    applyEffects(null, null, player, occupation.recurringEffects || []);
  }
  if (hobby) {
    applyEffects(null, null, player, hobby.recurringEffects || []);
  }
}

function currentCard(content, deckName, cardId) {
  const list = deckName === "era" ? content.eraCards : content.lifeCards;
  return list.find((card) => card.id === cardId) || null;
}

function drawCardId(room, content, deckName) {
  const queue = room.deckState[deckName];
  if (!queue.length) {
    room.deckState[deckName] = shuffle((deckName === "era" ? content.eraCards : content.lifeCards).map((card) => card.id));
  }
  return room.deckState[deckName].shift() || null;
}

function buildInfoPrompt({ titleVi, titleEn, descriptionVi, descriptionEn, questionVi, questionEn, effects }) {
  return {
    kind: "info",
    titleVi,
    titleEn,
    descriptionVi,
    descriptionEn,
    questionVi,
    questionEn,
    effectsVi: buildEffectPreview(effects, "vi"),
    effectsEn: buildEffectPreview(effects, "en")
  };
}

function setPrompt(room, prompt) {
  room.prompt = prompt;
  room.phase = "await_prompt";
}

function clearPrompt(room, nextPhase = "await_end") {
  room.prompt = null;
  room.phase = nextPhase;
}

function buildChoiceOptions(player, options, locale = "vi") {
  return (options || []).map((option) => ({
    id: option.id,
    labelVi: option.labelVi,
    labelEn: option.labelEn,
    effectsVi: buildEffectPreview(option.effects || [], "vi"),
    effectsEn: buildEffectPreview(option.effects || [], "en"),
    disabled: !requirementsMet(player, option.requirements),
    requirementVi: requirementMessage(option.requirements, "vi"),
    requirementEn: requirementMessage(option.requirements, "en"),
    next: option.next || ""
  }));
}

function resolveLifeCard(room, content, player, card) {
  if (!card) {
    room.phase = "await_end";
    return;
  }
  const generationEffects = getEffectsForGeneration(card.effects, card.generationEffects, player.generation);
  if (card.options && card.options.length) {
    setPrompt(room, {
      ...buildInfoPrompt({
        titleVi: card.titleVi,
        titleEn: card.titleEn,
        descriptionVi: card.descriptionVi,
        descriptionEn: card.descriptionEn,
        questionVi: card.questionVi,
        questionEn: card.questionEn,
        effects: []
      }),
      source: {
        type: "life_card_intro",
        cardId: card.id
      }
    });
    room.pendingFollowUp = {
      type: "life_card_choice",
      cardId: card.id
    };
    return;
  }
  const { immediate, followUp } = splitEffectsAndFollowUp(generationEffects);
  applyEffects(room, content, player, immediate);
  setPrompt(room, {
    ...buildInfoPrompt({
      titleVi: card.titleVi,
      titleEn: card.titleEn,
      descriptionVi: card.descriptionVi,
      descriptionEn: card.descriptionEn,
      questionVi: card.questionVi,
      questionEn: card.questionEn,
      effects: immediate
    }),
    source: {
      type: "life_card",
      cardId: card.id
    }
  });
  if (followUp) {
    room.pendingFollowUp = {
      type: followUp.kind === "occupation" ? "occupation_picker" : "hobby_picker",
      sourceNodeId: card.id
    };
  }
}

function resolveEraCard(room, content, player, card) {
  if (!card) {
    room.phase = "await_end";
    return;
  }
  room.players.forEach((target) => {
    applyEffects(room, content, target, getEffectsForGeneration(card.effects, card.generationEffects, target.generation));
  });
  setPrompt(room, {
    ...buildInfoPrompt({
      titleVi: card.titleVi,
      titleEn: card.titleEn,
      descriptionVi: card.descriptionVi,
      descriptionEn: card.descriptionEn,
      questionVi: card.questionVi,
      questionEn: card.questionEn,
      effects: getEffectsForGeneration(card.effects, card.generationEffects, player.generation)
    }),
    source: {
      type: "era_card",
      cardId: card.id
    }
  });
}

function resolveLanding(room, content, player) {
  const node = content.board.nodes[player.currentNode];
  if (!node) {
    room.phase = "await_end";
    return;
  }

  const meta = content.spaceMeta[player.currentNode];
  const combinedEffects = getEffectsForGeneration(node.effects, node.generationEffects, player.generation);

  if (player.currentNode === content.board.finishId || node.type === "finish") {
    player.finished = true;
    setPrompt(room, {
      ...buildInfoPrompt({
        titleVi: meta?.titleVi || "Về đích",
        titleEn: meta?.titleEn || "Finish",
        descriptionVi: getSpaceDescription(content, player, player.currentNode, "vi"),
        descriptionEn: getSpaceDescription(content, player, player.currentNode, "en"),
        questionVi: "",
        questionEn: "",
        effects: []
      }),
      source: { type: "finish" }
    });
    return;
  }

  if (node.type === "checkpoint" || node.type === "optional_choice") {
    applyEffects(room, content, player, combinedEffects);
    setPrompt(room, {
      kind: "choice",
      titleVi: meta.titleVi,
      titleEn: meta.titleEn,
      descriptionVi: getSpaceDescription(content, player, player.currentNode, "vi"),
      descriptionEn: getSpaceDescription(content, player, player.currentNode, "en"),
      options: buildChoiceOptions(player, node.options || []),
      source: { type: "node_choice", nodeId: node.id }
    });
    return;
  }

  if (node.type === "occupation_choice") {
    applyEffects(room, content, player, combinedEffects);
    setPrompt(room, buildOccupationPrompt(room, content, player, node.id));
    return;
  }

  if (node.type === "hobby_choice") {
    applyEffects(room, content, player, combinedEffects);
    setPrompt(room, buildHobbyPrompt(room, content, player, node.id));
    return;
  }

  if (node.type === "life_card") {
    setPrompt(room, {
      kind: "draw",
      titleVi: "Rút sự kiện cuộc đời",
      titleEn: "Draw a Life Event",
      descriptionVi: "Hãy nhấn vào bộ Sự kiện cuộc đời ở cạnh phải để tự rút lá bài của bạn.",
      descriptionEn: "Press the Life Event deck on the right to draw your own card.",
      source: { type: "deck_draw", deck: "life", nodeId: node.id }
    });
    return;
  }

  if (node.type === "era_card") {
    setPrompt(room, {
      kind: "draw",
      titleVi: "Rút sự kiện xã hội",
      titleEn: "Draw a Social Event",
      descriptionVi: "Hãy nhấn vào bộ Sự kiện xã hội ở cạnh phải để tự rút lá bài cho lượt này.",
      descriptionEn: "Press the Social Event deck on the right to draw this turn's card.",
      source: { type: "deck_draw", deck: "era", nodeId: node.id }
    });
    return;
  }

  applyEffects(room, content, player, combinedEffects);
  const hasNarrative = Boolean(meta && (meta.titleVi || meta.questionVi || meta.questionEn || getSpaceDescription(content, player, player.currentNode, "vi")));
  if (hasNarrative) {
    setPrompt(room, {
      ...buildInfoPrompt({
        titleVi: meta.titleVi,
        titleEn: meta.titleEn,
        descriptionVi: getSpaceDescription(content, player, player.currentNode, "vi"),
        descriptionEn: getSpaceDescription(content, player, player.currentNode, "en"),
        questionVi: meta.questionVi,
        questionEn: meta.questionEn,
        effects: combinedEffects
      }),
      source: { type: "space_info", nodeId: node.id }
    });
    return;
  }
  room.phase = "await_end";
}

function buildOccupationPrompt(room, content, player, sourceNodeId = "") {
  const options = Object.values(content.occupations)
    .filter((occupation) => occupation.selectable)
    .sort((a, b) => {
      const aScore = (a.requirements?.rules || []).length;
      const bScore = (b.requirements?.rules || []).length;
      if (aScore !== bScore) return aScore - bScore;
      return a.labelVi.localeCompare(b.labelVi, "vi");
    })
    .map((occupation) => ({
      id: occupation.id,
      labelVi: occupation.labelVi,
      labelEn: occupation.labelEn,
      effectsVi: buildEffectPreview(occupation.recurringEffects, "vi"),
      effectsEn: buildEffectPreview(occupation.recurringEffects, "en"),
      disabled: !requirementsMet(player, occupation.requirements),
      requirementVi: requirementMessage(occupation.requirements, "vi"),
      requirementEn: requirementMessage(occupation.requirements, "en")
    }));
  return {
    kind: "occupation",
    titleVi: "Chọn nghề nghiệp",
    titleEn: "Choose Occupation",
    descriptionVi: "Chọn nghề phù hợp cho chặng tiếp theo của cuộc đời.",
    descriptionEn: "Choose the occupation that fits the next stage of life.",
    options,
    source: { type: "occupation_choice", nodeId: sourceNodeId }
  };
}

function buildHobbyPrompt(room, content, player, sourceNodeId = "") {
  const options = Object.values(content.hobbies)
    .sort((a, b) => a.labelVi.localeCompare(b.labelVi, "vi"))
    .map((hobby) => ({
      id: hobby.id,
      labelVi: hobby.labelVi,
      labelEn: hobby.labelEn,
      effectsVi: buildEffectPreview(hobby.recurringEffects, "vi"),
      effectsEn: buildEffectPreview(hobby.recurringEffects, "en"),
      disabled: !requirementsMet(player, hobby.requirements),
      requirementVi: requirementMessage(hobby.requirements, "vi"),
      requirementEn: requirementMessage(hobby.requirements, "en")
    }));
  options.push({
    id: "__skip_hobby__",
    labelVi: "Để sau",
    labelEn: "Maybe later",
    effectsVi: [],
    effectsEn: [],
    disabled: false,
    requirementVi: "",
    requirementEn: ""
  });
  return {
    kind: "hobby",
    titleVi: "Chọn sở thích",
    titleEn: "Choose a Hobby",
    descriptionVi: "Chọn một sở thích để đồng hành cùng bạn.",
    descriptionEn: "Choose a hobby to carry into the next phase of life.",
    options,
    source: { type: "hobby_choice", nodeId: sourceNodeId }
  };
}

function buildFinishedSummary(player) {
  const occupationTrail = player.occupationHistory.filter((value) => !["unemployed", "working", "retired"].includes(value));
  const hobbyTrail = player.hobbyHistory.filter(Boolean);
  const topStat = [...STAT_KEYS].sort((a, b) => player.stats[b] - player.stats[a])[0];
  return {
    career: occupationTrail.length ? occupationTrail.join(", ") : "",
    hobbies: hobbyTrail.length ? hobbyTrail.join(", ") : "",
    highestStat: topStat,
    relationship: player.statuses.familyStatus,
    children: player.statuses.childrenStatus
  };
}

function relationshipLabel(value, locale) {
  const map = {
    single: { vi: "Độc thân", en: "Single" },
    solo: { vi: "Độc thân", en: "Single" },
    dating: { vi: "Hẹn hò", en: "Dating" },
    married: { vi: "Kết hôn", en: "Married" },
    separated: { vi: "Ly thân", en: "Separated" },
    widowed: { vi: "Goá", en: "Widowed" }
  };
  return getTextByLocale(map[value]?.vi || value, map[value]?.en || value, locale);
}

function childrenLabel(value, locale) {
  const map = {
    none: { vi: "Không con", en: "No children" },
    has_children: { vi: "Có con", en: "Has children" },
    has_pet: { vi: "Có thú cưng", en: "Has pets" },
    grown_children: { vi: "Con đã lớn", en: "Grown children" }
  };
  return getTextByLocale(map[value]?.vi || value, map[value]?.en || value, locale);
}

function housingLabel(value, locale) {
  const map = {
    none: { vi: "Chưa xác định", en: "Unsettled" },
    family_home: { vi: "Ở với gia đình", en: "Living with family" },
    rent: { vi: "Đi thuê nhà", en: "Renting" },
    buy: { vi: "Đi mua nhà", en: "Buying a home" },
    shared_rent: { vi: "Ở ghép", en: "Shared rent" },
    company_housing: { vi: "Nhà cơ quan", en: "Company housing" }
  };
  return getTextByLocale(map[value]?.vi || value, map[value]?.en || value, locale);
}

function occupationLabel(content, value, locale) {
  const occupation = content.occupations[value];
  if (occupation) {
    return getTextByLocale(occupation.labelVi, occupation.labelEn, locale);
  }
  if (value === "retired") {
    return locale === "en" ? "Retired" : "Nghỉ hưu";
  }
  if (value === "working") {
    return locale === "en" ? "Working" : "Đang đi làm";
  }
  return value || (locale === "en" ? "Unemployed" : "Thất nghiệp");
}

function hobbyLabel(content, value, locale) {
  if (!value) {
    return locale === "en" ? "No hobby yet" : "Chưa có sở thích";
  }
  const hobby = content.hobbies[value];
  if (hobby) {
    return getTextByLocale(hobby.labelVi, hobby.labelEn, locale);
  }
  return value;
}

function formatSigned(value) {
  const amount = Number(value) || 0;
  return `${amount > 0 ? "+" : ""}${amount}`;
}

function statLabelInline(stat, locale) {
  const map = {
    health: { vi: "Sức khoẻ", en: "Health" },
    happiness: { vi: "Hạnh phúc", en: "Happiness" },
    money: { vi: "Tiền bạc", en: "Wealth" },
    experience: { vi: "Kinh nghiệm", en: "Experience" }
  };
  return getTextByLocale(map[stat]?.vi || stat, map[stat]?.en || stat, locale);
}

function previewFromDeltas(deltas, locale, suffix = "") {
  return ["money", "health", "experience", "happiness"]
    .filter((stat) => deltas && deltas[stat])
    .map((stat) => ({
      kind: "stat",
      stat,
      amount: deltas[stat],
      suffix
    }));
}

function inlineSummaryFromEffects(effectList, locale) {
  const deltas = effectDeltas(effectList);
  const parts = ["money", "health", "experience", "happiness"]
    .filter((stat) => deltas[stat])
    .map((stat) => `${formatSigned(deltas[stat])} ${statLabelInline(stat, locale)}`);
  return parts.join(", ");
}

function buildOccupationInlineLabel(content, player, locale) {
  const occupationId = player.statuses.occupation || "unemployed";
  const occupation = content.occupations[occupationId];
  const label = occupationLabel(content, occupationId, locale);
  if (!occupation) {
    return label;
  }
  const summary = inlineSummaryFromEffects(occupation.recurringEffects || [], locale);
  return summary ? `${label} (${summary})` : label;
}

function buildHobbyInlineLabel(content, player, locale) {
  const hobbyId = player.statuses.hobby || "";
  const hobby = hobbyId ? content.hobbies[hobbyId] : null;
  const label = hobbyLabel(content, hobbyId, locale);
  if (!hobby) {
    return label;
  }
  const summary = inlineSummaryFromEffects(hobby.recurringEffects || [], locale);
  return summary ? `${label} (${summary})` : label;
}

function buildHousingInlineLabel(player, locale) {
  const label = housingLabel(player.statuses.housingStatus, locale);
  const details = [];
  if ((player.statuses.housingPayment || 0) > 0) {
    details.push(`${formatSigned(-player.statuses.housingPayment)} ${statLabelInline("money", locale)}`);
  }
  if (!details.length) {
    if ((player.statuses.housingStatus || "none") === "family_home") {
      details.push(locale === "en" ? "No rent / no mortgage" : "Không thuê / không trả góp");
    } else if ((player.statuses.housingStatus || "none") === "none") {
      details.push(locale === "en" ? "Waiting to choose housing" : "Chờ chọn nơi ở");
    }
  }
  return details.length ? `${label} (${details.join(", ")})` : label;
}

function buildRelationshipLine(player, locale) {
  const relationship = player.statuses.familyStatus || "solo";
  const children = player.statuses.childrenStatus || "none";
  if ((relationship === "single" || relationship === "solo") && children === "has_pet") {
    return locale === "en" ? "Single (With pets)" : "Độc thân (Nuôi thú cưng)";
  }
  if (relationship === "married") {
    if (children === "has_children") {
      return locale === "en" ? "Married (With children)" : "Kết hôn (Có con)";
    }
    if (children === "none") {
      return locale === "en" ? "Married (No children)" : "Kết hôn (Không con)";
    }
  }
  return relationshipLabel(relationship, locale);
}

function recurringSourceLabel(recurring, locale) {
  const map = {
    mortgage_debt: { vi: "Nợ trả góp", en: "Mortgage debt" },
    childcare: { vi: "Chi phí con cái", en: "Childcare cost" },
    student_debt: { vi: "Nợ học tập", en: "Student debt" },
    tuition_debt: { vi: "Nợ học phí", en: "Tuition debt" },
    education_debt: { vi: "Nợ giáo dục", en: "Education debt" },
    loan_repayment: { vi: "Khoản trả nợ", en: "Loan repayment" },
    promotion_raise: { vi: "Tăng lương thăng chức", en: "Promotion raise" },
    rent_support: { vi: "Điều chỉnh tiền thuê", en: "Rent adjustment" },
    caregiving_cost: { vi: "Chi phí chăm sóc", en: "Caregiving cost" },
    eldercare_cost: { vi: "Chi phí chăm sóc người lớn tuổi", en: "Eldercare cost" }
  };
  if (recurring?.key && map[recurring.key]) {
    return getTextByLocale(map[recurring.key].vi, map[recurring.key].en, locale);
  }
  return recurring?.note || (locale === "en" ? "Ongoing effect" : "Hiệu ứng đang duy trì");
}

function buildUpkeepRows(content, player) {
  const rows = [];
  const occupation = content.occupations[player.statuses.occupation] || null;
  const hobby = player.statuses.hobby ? content.hobbies[player.statuses.hobby] : null;

  if (occupation) {
    const effectsVi = buildEffectPreview(occupation.recurringEffects || [], "vi");
    const effectsEn = buildEffectPreview(occupation.recurringEffects || [], "en");
    if (effectsVi.length || effectsEn.length) {
      rows.push({
        labelVi: "Ảnh hưởng công việc",
        labelEn: "Work impact",
        effectsVi,
        effectsEn
      });
    }
  }

  if (hobby) {
    const effectsVi = buildEffectPreview(hobby.recurringEffects || [], "vi");
    const effectsEn = buildEffectPreview(hobby.recurringEffects || [], "en");
    if (effectsVi.length || effectsEn.length) {
      rows.push({
        labelVi: "Ảnh hưởng sở thích",
        labelEn: "Hobby impact",
        effectsVi,
        effectsEn
      });
    }
  }

  if ((player.statuses.housingPayment || 0) > 0) {
    rows.push({
      labelVi: "Chi phí nhà ở",
      labelEn: "Housing cost",
      effectsVi: buildEffectPreview([{ type: "adjustStat", stat: "money", amount: -player.statuses.housingPayment }], "vi"),
      effectsEn: buildEffectPreview([{ type: "adjustStat", stat: "money", amount: -player.statuses.housingPayment }], "en")
    });
  }

  if ((player.stats.money || 0) < 0) {
    const debtEffects = [
      { type: "adjustStat", stat: "money", amount: -1 },
      { type: "adjustStat", stat: "happiness", amount: -1 }
    ];
    rows.push({
      labelVi: "Áp lực nợ",
      labelEn: "Debt pressure",
      effectsVi: buildEffectPreview(debtEffects, "vi"),
      effectsEn: buildEffectPreview(debtEffects, "en")
    });
  }

  (player.recurringEffects || []).forEach((recurring) => {
    if (!recurring || recurring.key === "promotion_raise") {
      return;
    }
    const suffixVi = typeof recurring.remainingTurns === "number" ? `${recurring.remainingTurns} lượt còn lại` : "";
    const suffixEn = typeof recurring.remainingTurns === "number" ? `${recurring.remainingTurns} turns left` : "";
    rows.push({
      labelVi: recurringSourceLabel(recurring, "vi"),
      labelEn: recurringSourceLabel(recurring, "en"),
      effectsVi: previewFromDeltas(effectDeltas(recurring.effects || []), "vi", suffixVi),
      effectsEn: previewFromDeltas(effectDeltas(recurring.effects || []), "en", suffixEn)
    });
  });

  return rows.filter((row) => (row.effectsVi && row.effectsVi.length) || (row.effectsEn && row.effectsEn.length));
}

function buildPlayerTags(player) {
  const tags = [];
  if ((player.statuses.housingStatus || "") === "buy" && player.statuses.mortgageActive) {
    tags.push({ tone: "neutral", vi: "Đang trả góp", en: "Paying a mortgage" });
  }
  if ((player.statuses.housingStatus || "") === "rent" && (player.statuses.housingPayment || 0) >= 3) {
    tags.push({ tone: "bad", vi: "Áp lực tiền thuê", en: "Rent pressure" });
  }
  if ((player.stats.money || 0) >= 12) {
    tags.push({ tone: "good", vi: "Quỹ dự phòng", en: "Emergency fund" });
  }
  if ((player.stats.money || 0) < 0) {
    tags.push({ tone: "bad", vi: "Nợ nần chồng chất", en: "Deep in debt" });
  }
  if ((player.stats.health || 0) < 0) {
    tags.push({ tone: "bad", vi: "Lối sống thiếu lành mạnh", en: "Unhealthy lifestyle" });
  } else if ((player.stats.health || 0) <= 3) {
    tags.push({ tone: "bad", vi: "Nguy cơ kiệt sức", en: "Burnout risk" });
  }
  if ((player.stats.experience || 0) >= 7) {
    tags.push({ tone: "good", vi: "Tích luỹ kinh nghiệm", en: "Building experience" });
  }
  if (!tags.length) {
    tags.push({ tone: "neutral", vi: "Chuyển giai đoạn", en: "In transition" });
  }
  return tags;
}

function allFinished(room) {
  return room.players.length > 0 && room.players.every((player) => player.finished);
}

function nextActivePlayerIndex(room) {
  if (!room.players.length) return -1;
  const start = room.currentPlayerIndex;
  let index = start;
  do {
    index = (index + 1) % room.players.length;
    if (!room.players[index].finished) {
      return index;
    }
  } while (index !== start);
  return -1;
}

export function applyAction(room, content, action) {
  const actor = room.players.find((player) => player.id === action.playerId) || null;
  const current = activePlayer(room);
  const actorMustBeCurrent = ["start_turn", "submit_steps", "ack_prompt", "choose_option", "pick_occupation", "pick_hobby", "draw_card", "end_turn"];
  if (actorMustBeCurrent.includes(action.type) && (!current || !actor || actor.id !== current.id)) {
    throw new Error("Not your turn.");
  }
  if (room.status === "finished" && action.type !== "snapshot" && action.type !== "reset_game") {
    throw new Error("Game is already finished.");
  }

  switch (action.type) {
    case "start_game":
      if (room.status !== "lobby") throw new Error("Game already started.");
      if (!actor || actor.id !== room.hostPlayerId) throw new Error("Only the room host can start.");
      initializeDecks(room, content);
      room.status = "in_progress";
      room.phase = "await_start";
      logEvent(room, "game_started", "Game started.", {});
      return;
    case "reset_game": {
      if (!actor || actor.id !== room.hostPlayerId) throw new Error("Only the room host can reset the game.");
      room.players = room.players.map((player) => resetPlayerState(player, content));
      room.status = "lobby";
      room.phase = "lobby";
      room.round = 1;
      room.currentPlayerIndex = 0;
      room.deckState = { life: [], era: [] };
      room.prompt = null;
      room.pendingFollowUp = null;
      room.endedAt = null;
      room.expiresAt = null;
      room.log = [];
      room._persistedLogIndex = 0;
      logEvent(room, "game_reset", "Game reset to lobby.", {});
      return;
    }
    case "start_turn":
      if (room.phase !== "await_start") throw new Error("Turn cannot start now.");
      applyRecurringTurnEffects(actor);
      if (actor.statuses.housingPayment > 0) {
        applyStat(actor, "money", -actor.statuses.housingPayment);
      }
      if ((actor.stats.money || 0) < 0) {
        applyStat(actor, "money", -1);
        applyStat(actor, "happiness", -1);
      }
      applyTurnIncome(content, actor);
      room.phase = "await_steps";
      logEvent(room, "turn_started", `${actor.name} started their turn.`, { playerId: actor.id });
      return;
    case "submit_steps": {
      if (room.phase !== "await_steps") throw new Error("Steps are not expected now.");
      const steps = Number(action.steps);
      if (!Number.isFinite(steps) || steps < 1 || steps > 3) throw new Error("Invalid steps.");
      moveSteps(content, actor, steps);
      resolveLanding(room, content, actor);
      logEvent(room, "steps_submitted", `${actor.name} moved ${actor.lastMoveDistance} step(s).`, {
        playerId: actor.id,
        steps: actor.lastMoveDistance,
        nodeId: actor.currentNode
      });
      return;
    }
    case "ack_prompt":
      if (room.phase !== "await_prompt" || !room.prompt) throw new Error("No prompt to acknowledge.");
      if (room.pendingFollowUp && room.pendingFollowUp.type === "life_card_choice") {
        const card = currentCard(content, "life", room.pendingFollowUp.cardId);
        room.pendingFollowUp = null;
        room.prompt = {
          kind: "choice",
          titleVi: card.titleVi,
          titleEn: card.titleEn,
          descriptionVi: card.questionVi || card.descriptionVi,
          descriptionEn: card.questionEn || card.descriptionEn,
          options: buildChoiceOptions(actor, card.options || []),
          source: {
            type: "life_card_choice",
            cardId: card.id
          }
        };
        room.phase = "await_prompt";
        return;
      }
      if (room.pendingFollowUp && room.pendingFollowUp.type === "occupation_picker") {
        const sourceNodeId = room.pendingFollowUp.sourceNodeId || "";
        room.pendingFollowUp = null;
        setPrompt(room, buildOccupationPrompt(room, content, actor, sourceNodeId));
        return;
      }
      if (room.pendingFollowUp && room.pendingFollowUp.type === "hobby_picker") {
        const sourceNodeId = room.pendingFollowUp.sourceNodeId || "";
        room.pendingFollowUp = null;
        setPrompt(room, buildHobbyPrompt(room, content, actor, sourceNodeId));
        return;
      }
      if (room.prompt.source?.type === "finish") {
        clearPrompt(room, "await_end");
        if (allFinished(room)) {
          room.status = "finished";
          room.phase = "finished";
          room.endedAt = nowIso();
          room.expiresAt = Date.now() + 60 * 60 * 1000;
        }
        return;
      }
      clearPrompt(room, "await_end");
      return;
    case "draw_card": {
      if (room.phase !== "await_prompt" || !room.prompt || room.prompt.kind !== "draw") {
        throw new Error("No deck draw is active.");
      }
      const deck = String(action.deck || "").toLowerCase();
      if (!["life", "era"].includes(deck)) {
        throw new Error("Unknown deck.");
      }
      if (room.prompt.source?.deck !== deck) {
        throw new Error("Wrong deck for this space.");
      }
      if (deck === "life") {
        const cardId = drawCardId(room, content, "life");
        resolveLifeCard(room, content, actor, currentCard(content, "life", cardId));
        logEvent(room, "life_card_drawn", `${actor.name} drew a life card.`, { playerId: actor.id, cardId });
        return;
      }
      const cardId = drawCardId(room, content, "era");
      resolveEraCard(room, content, actor, currentCard(content, "era", cardId));
      logEvent(room, "era_card_drawn", `${actor.name} drew an era card.`, { playerId: actor.id, cardId });
      return;
    }
    case "choose_option": {
      if (room.phase !== "await_prompt" || !room.prompt || room.prompt.kind !== "choice") {
        throw new Error("No choice is active.");
      }
      if (room.prompt.source?.type === "node_choice") {
        const node = content.board.nodes[room.prompt.source.nodeId];
        const option = (node.options || []).find((item) => item.id === action.optionId);
        if (!option) throw new Error("Unknown option.");
        if (!requirementsMet(actor, option.requirements)) throw new Error("Requirements not met.");
        const { immediate, followUp } = splitEffectsAndFollowUp(option.effects || []);
        applyEffects(room, content, actor, immediate);
        if (option.next) {
          moveToNode(content, actor, option.next, "branch");
        }
        if (!openFollowUpPrompt(room, content, actor, followUp, node.id)) {
          clearPrompt(room, "await_end");
        }
        logEvent(room, "choice_selected", `${actor.name} selected ${getTextByLocale(option.labelVi, option.labelEn, "en")}.`, {
          playerId: actor.id,
          optionId: option.id
        });
        return;
      }
      if (room.prompt.source?.type === "life_card_choice") {
        const card = currentCard(content, "life", room.prompt.source.cardId);
        const option = (card.options || []).find((item) => item.id === action.optionId);
        if (!option) throw new Error("Unknown card option.");
        const { immediate, followUp } = splitEffectsAndFollowUp(option.effects || []);
        applyEffects(room, content, actor, immediate);
        if (!openFollowUpPrompt(room, content, actor, followUp, card.id)) {
          clearPrompt(room, "await_end");
        }
        logEvent(room, "life_option_selected", `${actor.name} resolved ${card.id}.`, {
          playerId: actor.id,
          optionId: option.id,
          cardId: card.id
        });
        return;
      }
      throw new Error("Unknown choice source.");
    }
    case "pick_occupation": {
      if (room.phase !== "await_prompt" || !room.prompt || room.prompt.kind !== "occupation") {
        throw new Error("Occupation picker is not active.");
      }
      const occupation = content.occupations[action.occupationId];
      if (!occupation || !occupation.selectable) throw new Error("Unknown occupation.");
      if (!requirementsMet(actor, occupation.requirements)) throw new Error("Requirements not met.");
      applySingleEffect(room, content, actor, { type: "setOccupation", occupation: occupation.id });
      clearPrompt(room, "await_end");
      logEvent(room, "occupation_selected", `${actor.name} became ${occupation.labelEn}.`, { playerId: actor.id, occupationId: occupation.id });
      return;
    }
    case "pick_hobby": {
      if (room.phase !== "await_prompt" || !room.prompt || room.prompt.kind !== "hobby") {
        throw new Error("Hobby picker is not active.");
      }
      if (action.hobbyId === "__skip_hobby__") {
        clearPrompt(room, "await_end");
        logEvent(room, "hobby_skipped", `${actor.name} skipped hobby selection.`, { playerId: actor.id });
        return;
      }
      const hobby = content.hobbies[action.hobbyId];
      if (!hobby) throw new Error("Unknown hobby.");
      if (!requirementsMet(actor, hobby.requirements)) throw new Error("Requirements not met.");
      applySingleEffect(room, content, actor, { type: "setHobby", hobby: hobby.id });
      clearPrompt(room, "await_end");
      logEvent(room, "hobby_selected", `${actor.name} chose ${hobby.labelEn}.`, { playerId: actor.id, hobbyId: hobby.id });
      return;
    }
    case "end_turn": {
      if (room.phase !== "await_end") throw new Error("Turn cannot end now.");
      actor.age += Math.max(0, Number(actor.lastMoveDistance) || 0);
      actor.lastMoveDistance = 0;
      recordHistory(actor);
      if (allFinished(room)) {
        room.status = "finished";
        room.phase = "finished";
        room.endedAt = nowIso();
        room.expiresAt = Date.now() + 60 * 60 * 1000;
        logEvent(room, "game_finished", "All players reached the end.", {});
        return;
      }
      const nextIndex = nextActivePlayerIndex(room);
      if (nextIndex === -1) {
        room.status = "finished";
        room.phase = "finished";
        room.endedAt = nowIso();
        room.expiresAt = Date.now() + 60 * 60 * 1000;
        return;
      }
      if (nextIndex <= room.currentPlayerIndex) {
        room.round += 1;
      }
      room.currentPlayerIndex = nextIndex;
      room.phase = "await_start";
      room.prompt = null;
      room.pendingFollowUp = null;
      logEvent(room, "turn_ended", `${actor.name} ended their turn.`, { playerId: actor.id });
      return;
    }
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function buildPlayerView(content, player) {
  return {
    id: player.id,
    name: player.name,
    generation: player.generation,
    age: player.age,
    stats: clone(player.stats),
    statuses: clone(player.statuses),
    labels: {
      occupationVi: buildOccupationInlineLabel(content, player, "vi"),
      occupationEn: buildOccupationInlineLabel(content, player, "en"),
      hobbyVi: buildHobbyInlineLabel(content, player, "vi"),
      hobbyEn: buildHobbyInlineLabel(content, player, "en"),
      housingVi: buildHousingInlineLabel(player, "vi"),
      housingEn: buildHousingInlineLabel(player, "en"),
      relationshipVi: buildRelationshipLine(player, "vi"),
      relationshipEn: buildRelationshipLine(player, "en"),
      childrenVi: childrenLabel(player.statuses.childrenStatus, "vi"),
      childrenEn: childrenLabel(player.statuses.childrenStatus, "en")
    },
    upkeepRows: buildUpkeepRows(content, player),
    tags: buildPlayerTags(player),
    currentNode: player.currentNode,
    finished: player.finished,
    occupationHistory: clone(player.occupationHistory),
    hobbyHistory: clone(player.hobbyHistory),
    statHistory: clone(player.statHistory),
    summary: buildFinishedSummary(player)
  };
}

export function buildRoomSnapshot(room, content) {
  const current = activePlayer(room);
  const currentNode = current ? content.board.nodes[current.currentNode] : null;
  return {
    code: room.code,
    status: room.status,
    phase: room.phase,
    round: room.round,
    hostPlayerId: room.hostPlayerId,
    currentPlayerId: current ? current.id : null,
    currentNodeId: current ? current.currentNode : null,
    currentNodeLabelVi: current ? nodeLabel(content, current.currentNode, "vi") : "",
    currentNodeLabelEn: current ? nodeLabel(content, current.currentNode, "en") : "",
    currentNodeDescriptionVi: current ? getSpaceDescription(content, current, current.currentNode, "vi") : "",
    currentNodeDescriptionEn: current ? getSpaceDescription(content, current, current.currentNode, "en") : "",
    currentNodeType: currentNode ? currentNode.type : "",
    createdAt: room.createdAt,
    updatedAt: room.updatedAt,
    endedAt: room.endedAt,
    expiresAt: room.expiresAt,
    players: room.players.map((player) => buildPlayerView(content, player)),
    prompt: room.prompt ? clone(room.prompt) : null,
    log: room.log.slice(-40),
    generationLabels: clone(GENERATIONS)
  };
}
