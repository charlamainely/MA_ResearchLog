# Greener Grass Online MVP

## What this is

A lightweight local online multiplayer prototype for small-group testing.

It is designed to be:

- fast to run locally
- easy to replace with Supabase later
- authoritative enough for room-based turn sync

## What it does right now

- create a room
- join by room code from other devices
- nickname + generation entry
- authoritative room state on a local Node server
- turn flow:
  - start turn
  - choose 1 to 3 steps
  - resolve checkpoints / occupations / hobbies / life cards / era cards
  - end turn
- shared room log
- JSONL room logs saved in:
  - `logs/room-<CODE>.jsonl`

## How to run

From:

- `/Users/lydukhanhhan/Documents/MA_ResearchLog/prototypes/greener_grass_online`

Run:

```bash
npm start
```

Then open:

- `http://localhost:3000`

## How to test with other devices on the same Wi-Fi

1. Start the server on your laptop.
2. Find your laptop's local IP address.
3. On other devices, open:
   - `http://YOUR_LOCAL_IP:3000`
4. Create a room on one device.
5. Share the room code.
6. Other players join with nickname + generation.

## Notes

- Active rooms are stored in memory only.
- Finished rooms are cleaned up automatically later.
- Logs remain in the `logs/` folder for research review.
- This MVP is intentionally structured so the room store and log sink can later be replaced by Supabase-backed equivalents.
