# SnowFlakes' osu! Taiko Practice Mode 🥁

A lightweight, web-based practice tool for osu! Taiko, running entirely in the browser with Vanilla JS.

Try it here: https://sf-osu-taiko-practice-mode.vercel.app/

## 🌟 Features
- **File Parsing**: Drag & Drop your `.osu` beatmaps and `.mp3` audio files.
- **Customizable**: Change volume, keybinds (KDDK, DDKK, etc.), and language (EN/VI/JA).
- **Persistent Settings**: Your preferences are saved automatically.
- **Performance**: Canvas-based rendering with accurate hit windows (300/100/Miss).

## 🚀 How to Run Locally
1. Clone this repository or download the files.
2. Open `index.html` in any modern web browser (Chrome, Edge, Firefox).
3. Drag and drop your osu! files to play!

## 📂 Project Structure
- `index.html`: Main entry point.
- `src/js/main.js`: Core game logic, file parsing, and event handling.
- `src/css/style.css`: Styling for the game interface and settings modal.
- `public/`: Static assets (icons, demo maps).

## 🎮 Controls
- **Default**: `A` (Kat), `S` (Don), `K` (Don), `L` (Kat)
- **Restart**: Press the `Retry` button on the results screen.
- **Settings**: Click the ⚙️ icon to rebind keys.

## 🛠 Tech Stack
- HTML5 Canvas
- Vanilla JavaScript (ES6+)
- CSS3 Flexbox/Grid
- LocalStorage API

---
*Creator by -[SnowFlakes]-, follow me here: https://osu.ppy.sh/users/19207842*

*Inspired by nahieu2005, follow him here: https://osu.ppy.sh/users/22069182*
