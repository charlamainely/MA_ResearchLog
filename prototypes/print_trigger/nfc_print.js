const { NFC } = require('nfc-pcsc');
const { spawn } = require('child_process');

const nfc = new NFC();

const UID_TO_TEMPLATE = {
  "1149891332": "childhood-memory",
  "0037184260": "family-conflict",
  "1172026116": "migration-story",
  "1256604420": "traditional-recipe",
  "1000551172": "love-story",
  "1223926532": "life-choice"
};

let lastUid = null;
let lastTime = 0;
const DEBOUNCE_MS = 2000;


function triggerPrint(templateKey) {
  console.log(`Printing template: ${templateKey}`);

  const child = spawn('python3', ['print_receipt.py', templateKey], {
    stdio: 'inherit'
  });

  child.on('error', (err) => {
    console.error('Failed to start print script:', err);
  });
}

nfc.on('reader', reader => {
  console.log(`Reader connected: ${reader.name}`);

  reader.on('card', card => {
    const uid = (card.uid || '').toUpperCase();
    const now = Date.now();

    if (!uid) {
      console.log('No UID found on card');
      return;
    }

    if (uid === lastUid && now - lastTime < DEBOUNCE_MS) {
      return;
    }

    lastUid = uid;
    lastTime = now;

    console.log(`Scanned UID: ${uid}`);

    const templateKey = UID_TO_TEMPLATE[uid];

    if (!templateKey) {
      console.log(`No template mapped for UID: ${uid}`);
      return;
    }

    triggerPrint(templateKey);
  });

  reader.on('error', err => {
    console.error(`Reader error (${reader.name}):`, err);
  });

  reader.on('end', () => {
    console.log(`Reader removed: ${reader.name}`);
  });
});

nfc.on('error', err => {
  console.error('NFC error:', err);
});
