# Saigon Street Sprint Pixel Asset Guide

## Export Settings (32px pipeline)
- Canvas/frame size: `32x32` (or exact multiples like `32x64`, `64x32`, `64x64`).
- Format: `PNG` with transparent background.
- Scaling: nearest-neighbor only; no anti-aliasing, no blur.
- Padding: leave 1-2 transparent pixels around edges to prevent clipping.
- Pivot: draw sprites as if feet/wheels touch the bottom center of frame.

## Folder Layout
- `assets/sprites/static/`
- `assets/sprites/long/`
- `assets/sprites/crossing/`
- `assets/sprites/switcher/`
- `assets/sprites/powerups/`
- `assets/sprites/player/`
- `assets/sprites/ui/`

## Hooking Sprites Into The Game
There is no strict filename requirement.
Any filename works as long as you put the exact path in `image` (or `spriteVersions`) inside `obstacleAssets` in `prototypes/sim_city/index.html`.

In `prototypes/sim_city/index.html`, set `image` in `obstacleAssets`:

```js
parkedScooter: {
  template: 'bike',
  width: 46,
  height: 62,
  image: 'assets/sprites/static/parked_scooter.png'
}
```

Notes:
- Paths are relative to `prototypes/sim_city/index.html`.
- Keep `width` and `height` as gameplay display size in world units.
- Sprite source can stay `32x32`; the game scales it responsively.

## 1-3 Random Versions Per Sprite Type
Each obstacle sprite type supports up to 3 random versions using `spriteVersions`.

```js
parkedScooter: {
  template: 'bike',
  width: 46,
  height: 62,
  image: 'assets/sprites/static/parked_scooter_v1.png',
  spriteVersions: [
    { image: 'assets/sprites/static/parked_scooter_v1.png' },
    { image: 'assets/sprites/static/parked_scooter_v2.png' },
    { image: 'assets/sprites/static/parked_scooter_v3.png' }
  ]
}
```

Rules:
- `spriteVersions` can have 1 to 3 entries (extra entries are ignored).
- One version is chosen when the obstacle spawns and stays fixed for that obstacle.
- If `spriteVersions` is omitted, the base `image` is used.
- Optional per-version direction lock for crossers: `moveDir: -1` (right-to-left) or `moveDir: 1` (left-to-right).

```js
spriteVersions: [
  { image: 'assets/sprites/crossing/crossing_grandma.png', moveDir: 1 },
  { image: 'assets/sprites/crossing/crossing_ox.png', moveDir: -1 }
]
```

## Runtime Sizing
- Sprite aspect ratio is preserved automatically (no stretching).
- Sprite draw size targets half of lane width, then scales responsively with screen size.

## Current Project Mapping (already wired)
- Static: `static_driver.png`, `static_pothole.png`, `static_truck.png`
- Long divider chain (ordered): `long_divider_bottom.png` -> `long_divider_body.png` (repeat) -> `long_divider_top.png`
- Crossing: `crossing_grandma.png`, `crossing_ox.png`, `crossing_oxcart.png`
- Switcher: `switcher_female.png`, `switcher_nolight.png`
- Powerups: `powerup_coffee.png`, `powerup_banhmi.png`, `powerup_gas.png`
- Player: `player_linh.png`

If you add new files later, just update the corresponding `image` or `spriteVersions` paths in `obstacleAssets`.

## Suggested Naming
- Static: `parked_scooter.png`, `plastic_crate.png`
- Long: `divider_segment.png`, `roadwork_segment.png`
- Crossing: `cross_fast_bike.png`, `cross_heavy_cart.png`
- Switcher: `switcher_bike.png`

## Animation-Ready Naming
Use frame sequences now so you can animate later without renaming:
- `switcher_bike_idle_00.png`, `switcher_bike_idle_01.png`
- `switcher_bike_signal_00.png`, `switcher_bike_signal_01.png`
- `cross_fast_bike_run_00.png`, `cross_fast_bike_run_01.png`

Later you can swap `image` to an animation loader (sprite sheet or frame array) without changing folder structure.
