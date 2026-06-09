# Greener Grass Online Multiplayer Migration Plan

## Goal

Create an online co-op version of the current local prototype without losing the current fallback build in:

- `/Users/lydukhanhhan/Documents/MA_ResearchLog/prototypes/greener_grass`

This folder is the working copy for the online version:

- `/Users/lydukhanhhan/Documents/MA_ResearchLog/prototypes/greener_grass_online`

## Current Prototype Audit

The current prototype is a strong candidate for online multiplayer because it is:

- turn-based
- room-based
- low-frequency in player input
- deterministic enough to centralize on one authoritative state machine

The main architectural issue is that the game is currently fully client-authoritative.

### Current state model

The live game state is held in one browser-side object in:

- `/Users/lydukhanhhan/Documents/MA_ResearchLog/prototypes/greener_grass_online/index.html`

Key characteristics:

- `state.players`, `state.round`, `state.currentPlayerIndex`, `state.phase`, `state.deckState`
- deck order is shuffled in-browser
- turn progression is computed in-browser
- movement, choices, effects, recurring upkeep, retirement, and endgame are all resolved in-browser

### Current content model

The content pipeline is already in good shape for multiplayer:

- `data/space_data_template.csv`
- `data/life_cards_template.csv`
- `data/era_cards_template.csv`
- `data/occupations_template.csv`
- `data/hobbies_template.csv`

These are loaded at runtime and transformed into:

- board nodes
- card decks
- occupations
- hobbies

This is good because the online server can reuse the same authored data.

### Current logic clusters

These parts are already identifiable and should be extracted first:

- content loading: `loadTemplateContentFromCsv()`
- turn lifecycle: `startTurnFlow()`, `resolveMoveFlow()`, `endTurnFlow()`
- movement and landing resolution: `resolveMovement()`, `resolveLandingNode()`, `resolveGateInterrupt()`
- effect engine: `applyEffects()`, `applyEffect()`
- card flow: `showCardAndResolve()`
- endgame/reporting: `showResultsIfNeeded()`

### What is tightly coupled right now

The biggest migration risk is that gameplay logic and DOM rendering are still mixed together.

Examples:

- effect application updates UI during resolution
- phase changes and button states are interleaved
- modal choice flow lives inside the same file as the rules engine
- deck interactions are still expressed as UI behavior first, game behavior second

That means the next version should not start by “adding sockets” to the current file. It should first separate:

- pure game logic
- UI rendering
- network transport

## Recommended Multiplayer Architecture

## Recommendation

Best fit for this game:

- frontend: static web app
- authoritative room backend: Cloudflare Worker + Durable Object per room
- persistence: Durable Object storage for active rooms, optional archive storage later
- identity: room code + player display name first, optional accounts later

Why this fits:

- one game room maps naturally to one Durable Object
- turn-based rooms do not need heavy real-time throughput
- WebSockets are supported directly
- object-local storage is a good fit for room snapshots

Alternative option if you want a more managed database/auth stack:

- Supabase for auth + room metadata + presence
- still keep an authoritative room service for gameplay transitions

## Why not pure client-sync

Do not let every browser compute the next move independently and just “sync state”.

That will create:

- deck desync
- race conditions on choices
- duplicate card draws
- conflicting turn ownership
- hard-to-debug reconnect problems

The server should own:

- room state
- turn order
- shuffled decks
- all effect resolution
- checkpoint and card choices
- save/resume snapshots

Clients should own:

- rendering
- local animations
- input submission
- temporary optimistic loading states only

## Target System Shape

## Frontend responsibilities

- create room / join room UI
- lobby and player ready state
- render full game state received from server
- send user intents to server
- show local animations after authoritative updates

## Backend responsibilities

- create room
- join room
- validate player permissions
- validate whose turn it is
- apply one action at a time
- update room snapshot
- broadcast updated room state to all clients
- support reconnect

## Shared game engine responsibilities

The core rules should become pure functions, for example:

- `createInitialGame(content, roomConfig)`
- `addPlayer(gameState, playerInput)`
- `startGame(gameState)`
- `startTurn(gameState, actorId)`
- `submitSteps(gameState, actorId, steps)`
- `chooseCheckpointOption(gameState, actorId, optionId)`
- `chooseCardOption(gameState, actorId, optionId)`
- `pickOccupation(gameState, actorId, occupationId)`
- `pickHobby(gameState, actorId, hobbyId)`
- `drawSpecificCard(gameState, deckName, cardId)` for dev tools
- `endTurn(gameState, actorId)`

Each should return:

- next authoritative state
- emitted events for UI

Example events:

- `turn_started`
- `player_moved`
- `checkpoint_opened`
- `card_drawn`
- `occupation_picker_opened`
- `hobby_picker_opened`
- `stats_changed`
- `turn_ended`
- `game_finished`

## Suggested Folder Split

Recommended first split inside this online folder:

```text
greener_grass_online/
  client/
    index.html
    app.js
    ui/
    network/
  shared/
    content/
    engine/
    schema/
  server/
    worker/
    room/
  data/
    *.csv
```

Minimal practical version:

```text
greener_grass_online/
  index.html
  client.js
  shared-game.js
  room-server-plan.md
  data/
```

## Migration Phases

## Phase 1: Extract a pure game engine

Goal:

- keep local version working
- make online version backend-ready

Tasks:

- copy all content loading/transformation helpers into a shared module
- move gameplay rules out of DOM functions
- convert game transitions into pure state reducers
- replace direct DOM side effects with returned events

Deliverable:

- local single-browser version still works
- same rules can run without touching the DOM

## Phase 2: Define the network protocol

Use message-based actions.

Client -> server:

- `room.create`
- `room.join`
- `room.leave`
- `room.ready`
- `game.start`
- `turn.start`
- `turn.submit_steps`
- `turn.choose_option`
- `turn.pick_occupation`
- `turn.pick_hobby`
- `turn.end`

Server -> clients:

- `room.snapshot`
- `room.player_joined`
- `room.player_left`
- `room.presence`
- `game.event`
- `game.error`

Keep the protocol explicit and small.

## Phase 3: Build room backend

For each room:

- store snapshot
- store player connections
- queue actions
- process actions serially

Critical rule:

- only one action resolves at a time

This avoids most multiplayer bugs.

## Phase 4: Rebuild the frontend around snapshots

Instead of mutating local state directly:

- subscribe to room snapshot
- render from latest authoritative snapshot
- submit actions to server
- show waiting state while action is being processed

## Phase 5: Add reconnect and persistence

Need at least:

- room code
- player id/token stored locally
- reconnect to same seat
- restore latest room snapshot

Optional later:

- save finished runs
- replay log
- spectator mode

## Data and Content Strategy

Keep using the current authored CSV templates.

Recommended rule:

- frontend may read them for local rendering
- backend must also load the same content and be the source of truth for effect resolution

This prevents clients from spoofing modified effects or card definitions.

## Multiplayer-Specific Design Decisions

## Input ownership

Only the active player should be allowed to submit turn actions.

Other players can:

- read
- watch transitions
- respond verbally
- observe cards and checkpoints

## Card secrecy

Your current design is mostly open-information and discussion-based.

That means you do not need hidden hands or secret deck ownership.

This makes online sync much easier.

## Room size

Current practical support:

- 2 to 4 players

Keep that limit in the room service for the first online version.

## Offline fallback

Do not remove the current local prototype.

Keep:

- `greener_grass` as local fallback
- `greener_grass_online` as the networked branch of the concept

This is useful because:

- workshops may have bad internet
- local testing stays much faster
- online migration can happen incrementally

## Recommended Infrastructure Choices

## Best overall choice

- Cloudflare Workers
- Durable Objects
- WebSockets

This is the best fit for authoritative room-based turn sync.

## Best managed-service choice

- Supabase Auth
- Supabase Realtime for presence and non-authoritative messaging
- small authoritative game service for action resolution

Use this if user accounts and database tooling matter more than infrastructure simplicity.

## Things you do not need for MVP

- matchmaking
- public room discovery
- friend systems
- voice chat
- anti-cheat beyond authoritative action validation
- native mobile apps

## Immediate Next Steps

Recommended order:

1. Freeze the local prototype as the fallback reference.
2. Extract the game engine from `index.html` into a shared JS module in this online folder.
3. Define the room snapshot schema and action protocol.
4. Build a minimal single-room authoritative backend.
5. Reconnect the UI to server snapshots.

## Concrete Short-Term Deliverables

The next practical implementation steps should be:

1. create `shared-game.js` with:
   - state creation
   - turn reducers
   - effect reducers
   - movement reducers
2. create `ROOM_PROTOCOL.md`
3. create `ROOM_STATE_SCHEMA.md`
4. keep `client` rendering in the browser
5. only after that, choose and wire the backend

## Recommendation for this project

Do this as a staged migration, not a rewrite.

The safest path is:

- preserve current UI and content authoring
- extract rules first
- add authoritative room backend second
- polish reconnect/lobby last

That keeps momentum while protecting the working prototype.
