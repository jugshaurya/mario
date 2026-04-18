# Super Mario Bros

<p align="center">
  <img src="https://img.shields.io/badge/Phaser-3.19-blue?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA0klEQVR4nGNgGFTAH4j/Q/F/KP0fiz4GEA0E/6EYxAaJg9hgDYRUwzQhY7BGJCH8GqkxSP+hmpEtAmkkKIYA/sCAgEF0P0INBokzMDAwCBDQSFAMw3+oakDif+TOVRB7FUgxiA8OQJCBEA9oRAkwGPiDagfSRwY8pgPx/4EcBGDPAuxCYvjNhVuHww6HHbDphbsQWQ2yAxZ6YUfQs0D+RFaDzJ9Y7ERFBw4n4nYKRB7D6KkYxYUfwccJ+A9dVqcx/o8tUj9S7leMZiP8TjjAEACp/F5bRrqQYwAAAABJRU5ErkJggg==&labelColor=1a1a2e" alt="Phaser 3">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000" alt="JavaScript">
  <img src="https://img.shields.io/badge/Webpack-4-8DD6F9?style=for-the-badge&logo=webpack&logoColor=fff" alt="Webpack">
  <img src="https://img.shields.io/badge/Deployed-Vercel-000?style=for-the-badge&logo=vercel" alt="Vercel">
</p>

<p align="center">
  A classic Super Mario Bros Level 1-1 recreation built from scratch with <strong>Phaser 3</strong> game framework.<br/>
  Stomp goombas, break bricks, collect coins, and reach the flagpole!
</p>

<p align="center">
  <a href="https://mario-shaurya.vercel.app"><strong>Play Now &rarr; mario-shaurya.vercel.app</strong></a>
</p>

---

## Gameplay

| Feature | Description |
|---------|-------------|
| **Movement** | Acceleration-based physics with skid animation |
| **Jumping** | Variable-height jump — tap for short hop, hold for full jump |
| **Enemies** | Goombas and Turtles patrol the level — stomp them from above! |
| **Bricks** | Hit brick blocks from below to break them |
| **Coins** | Collect coins from question blocks for bonus points |
| **Lives** | 3 lives system with death animation and respawn |
| **Timer** | 400-tick countdown — reach the end before time runs out |
| **HUD** | Real-time score, coin count, world, lives, and timer display |
| **Win** | Reach the end of the level for a 5000-point bonus |

## Controls

| Key | Action |
|-----|--------|
| `→` / `D` | Move Right |
| `←` / `A` | Move Left |
| `↑` / `W` | Jump |
| `Enter` / `Space` | Start Game / Retry |

## Screens

- **Title Screen** — Retro pixel-art title with blinking prompt
- **Game** — Full Level 1-1 with enemies, obstacles, and collectibles
- **Game Over** — Displayed after losing all 3 lives, press Enter to retry

## Tech Stack

| Tech | Purpose |
|------|---------|
| [Phaser 3](https://phaser.io/) | HTML5 game framework with Arcade Physics |
| [Tiled](https://www.mapeditor.org/) | Level design (tilemap JSON export) |
| [Webpack 4](https://webpack.js.org/) | Module bundling and dev server |
| [Babel 7](https://babeljs.io/) | ES6+ transpilation |
| [Vercel](https://vercel.com/) | Deployment and hosting |

## Project Structure

```
mario/
├── src/
│   ├── index.js              # Game config and initialization
│   ├── index.html            # HTML shell
│   ├── style.css             # Fullscreen canvas styling
│   ├── scenes/
│   │   ├── BootScene.js      # Asset loading + progress bar
│   │   ├── TitleScene.js     # Title screen
│   │   ├── GameScene.js      # Core gameplay logic
│   │   ├── HUDScene.js       # Score, coins, lives, timer overlay
│   │   └── GameOverScene.js  # Game over + retry screen
│   └── assets/               # Sprites, tileset, and level data
├── webpack.config.js
├── vercel.json               # Vercel deployment config
└── package.json
```

## Run Locally

```bash
# Install dependencies
npm install

# Start dev server (opens browser at localhost:8080)
npm start

# Production build
npm run build
```

## Deploy

The project is configured for one-click Vercel deployment:

1. Push to GitHub
2. Connect repo on [vercel.com](https://vercel.com)
3. Vercel auto-detects `vercel.json` and deploys

Or deploy via CLI:

```bash
npx vercel --prod
```

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/jugshaurya">jugshaurya</a>
</p>
