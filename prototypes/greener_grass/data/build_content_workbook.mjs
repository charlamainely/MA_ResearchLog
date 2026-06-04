import fs from "node:fs/promises";
import path from "node:path";
import { Workbook, SpreadsheetFile } from "@oai/artifact-tool";

const projectRoot = "/Users/lydukhanhhan/Documents/MA_ResearchLog";
const dataDir = path.join(projectRoot, "prototypes/greener_grass/data");
const outputDir = path.join(projectRoot, "outputs/greener_grass_content_templates");
const outputPath = path.join(outputDir, "greener_grass_content_templates.xlsx");

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        field += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") {
        i += 1;
      }
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      continue;
    }

    if (!inQuotes && char === ",") {
      row.push(field);
      field = "";
      continue;
    }

    field += char;
  }

  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((cells) => cells.some((cell) => String(cell || "").trim() !== ""));
}

function colLetter(index) {
  let n = index + 1;
  let out = "";
  while (n > 0) {
    const rem = (n - 1) % 26;
    out = String.fromCharCode(65 + rem) + out;
    n = Math.floor((n - 1) / 26);
  }
  return out;
}

async function loadCsvMatrix(filename) {
  const csvText = await fs.readFile(path.join(dataDir, filename), "utf8");
  return parseCsv(csvText);
}

async function buildWorkbook() {
  const workbook = Workbook.create();

  const guideSheet = workbook.worksheets.add("README");
  const guideRows = [
    ["GREENER GRASS Content Workbook"],
    [""],
    ["How to edit safely in Excel"],
    ["1. Edit this .xlsx workbook, not the raw .csv files."],
    ["2. Keep one language per column: *_vi for Vietnamese, *_en for English."],
    ["3. Keep effects in the effects_* columns using machine-readable syntax only."],
    ["4. For checkpoint rows, fill the option_* columns instead of next_default."],
    ["5. Export each sheet to CSV only when you are ready to update the runtime data."],
    [""],
    ["Files / tabs"],
    ["space_data_template = board spaces and checkpoints"],
    ["life_cards_template = life cards"],
    ["era_cards_template = era cards"],
    ["occupations_template = occupation definitions and recurring trade-offs"],
    ["hobbies_template = hobby definitions and recurring trade-offs"],
    [""],
    ["Effect syntax examples"],
    ["health:+1"],
    ["money:-2@turns:6"],
    ["money:+1@until:occupation_choice"],
    ["set_housing:rent;money:-1@per_turn"],
    ["set_relationship:dating"],
    ["set_hobby:gardening"],
    ["draw:life"],
    ["draw:era"]
  ];
  guideSheet.getRange(`A1:A${guideRows.length}`).values = guideRows;

  const files = [
    { filename: "space_data_template.csv", sheetName: "space_data_template" },
    { filename: "life_cards_template.csv", sheetName: "life_cards_template" },
    { filename: "era_cards_template.csv", sheetName: "era_cards_template" },
    { filename: "occupations_template.csv", sheetName: "occupations_template" },
    { filename: "hobbies_template.csv", sheetName: "hobbies_template" }
  ];

  for (const file of files) {
    const matrix = await loadCsvMatrix(file.filename);
    const rows = matrix.length;
    const cols = Math.max(...matrix.map((line) => line.length));
    const normalized = matrix.map((line) => {
      const copy = line.slice();
      while (copy.length < cols) {
        copy.push("");
      }
      return copy;
    });
    const sheet = workbook.worksheets.add(file.sheetName);
    const range = `A1:${colLetter(cols - 1)}${rows}`;
    sheet.getRange(range).values = normalized;
  }

  const inspect = await workbook.inspect({
    kind: "table",
    range: "space_data_template!A1:J6",
    include: "values",
    tableMaxRows: 6,
    tableMaxCols: 10
  });

  await fs.mkdir(outputDir, { recursive: true });
  const output = await SpreadsheetFile.exportXlsx(workbook);
  await output.save(outputPath);

  console.log(JSON.stringify({
    outputPath,
    inspect: inspect.ndjson
  }, null, 2));
}

await buildWorkbook();
