# SnowFlakes' osu! taiko Practice Mode 🥁

A lightweight, web-based practice tool for **osu!taiko**, running entirely in the browser with Vanilla JS. Upload your favorite maps and practice with custom speeds!

🔗 **[Play Here](https://sf-osu-taiko-practice-mode.vercel.app)**

---

## 🌟 Key Features

### 🎮 Gameplay
- **Drag & Drop Support**: Simply drag `.osu` beatmap files and `.mp3` audio files directly onto the screen to play.
- **Precise Rhythm Engine**: Canvas-based rendering with accurate hit windows (Great/Good/Miss).
- **Pause System**: 
  - Pause anytime by pressing `ESC` or clicking the floating **⏸️ button** (bottom-right).
  - **Continue**: Resumes after a 3-second animated countdown.
  - **Retry**: Instantly restarts the map.
  - **Quit**: Returns to the idle screen.

### ⚙️ Customization
- **Scroll Velocity (SV) Control**: 
  - Adjust note scroll speed from **0.1x to 10.0x**.
  - Use the slider or the **+ / -** buttons for precise 0.1 increments.
  - *Note: The SV display on the game screen reflects your custom multiplier.*
- **Keybinds**: Supports multiple styles (KDDK, DDKK, KKDD, etc.) and fully custom key mapping.
- **Volume Control**: Independent master volume slider.
- **Multi-Language**: Fully translated into **English**, **Tiếng Việt**, and **日本語**.

### 🏆 Chunithm-Style Scoring
Experience a specialized scoring system inspired by CHUNITHM. For more details, hop in [here](https://chunithm.org/basic/evaluation/):
- **Max Score**: 1,010,000 (theoretical max with all Perfects).
- **Ranking Tiers**:
  - **SSS+**: 1,009,000+
  - **SSS**: 1,007,500+
  - **SS**: 1,000,000+
  - **S / AAA / AA / A**: Granular grading down to D rank.

---

## 🕹️ How to Play
1. **Load a Map**: Drag an `.osu` file and its matching `.mp3` into the browser window.
2. **Settings**: Click the **⚙️ Settings** button to adjust volume, keys, or scroll speed (SV).
3. **Play**: Click the **PLAY** button to start.

### 🎮 Controls (Default)
| Action | Key |
| :--- | :--- |
| **Kat (Blue)** | `A` or `L` |
| **Don (Red)** | `S` or `K` |
| **Pause** | `ESC` or Click ⏸️ |

---

## 📝 Changelog

### **v2025.1.8: Adding favicon for the website**
- Favicon added, named **favicon.png**

### **v2025.1.7: New Polish & Alignment**
- **UI Update**: Moved the **Pause Button** to the bottom-right of the playfield with a transparent, floating style.
- **SV Logic**: The stats panel (`SV: x.x`) now displays the user's custom setting directly, ignoring the map's internal SV for clarity.
- **Bug Fix**: Fixed hit effect text rendering (replaced Japanese characters with "GREAT/GOOD/MISS" to prevent missing font issues).

### **v2025.1.6: Pause System Enhancements**
- **Pause Menu**: Added a dedicated overlay with "Continue", "Retry", and "Quit" options.
- **Countdown**: Added a 3-second animated countdown when resuming the game.

### **v2025.1.5: Localization Update**
- **Translations**: Added full translation support for the SV controls in English, Vietnamese, and Japanese.

### **v2025.1.4: Precision Controls**
- **SV Buttons**: Added **`+`** and **`-`** buttons next to the Scroll Velocity slider for precise 0.1 increments.

### **v2025.1.3: Gameplay Mechanics Overhaul**
- **Scoring System**: Replaced standard osu! scoring with the **Chunithm** system (Max score 1,010,000; D to SSS+ ranks).
- **Stats**: Added detailed tracking for Perfect, Good, Miss, Max Combo, and Accuracy.

### **v2025.1.2: UI/UX & Responsiveness**
- **Responsive Design**: Fixed layout issues on smaller screens and high zoom levels.
- **Scroll Fixes**: Added smart scrollbars to the Settings modal to ensure buttons are always accessible.
- **Game Container**: Implemented a wrapper to manage absolute positioning of UI elements better.

### **v2025.1.1: Core Features & Persistence**
- **Drag & Drop**: Implemented logic to allow users to drag `.osu` and `.mp3` files directly onto the screen.
- **LocalStorage**: Settings (Volume, Keybinds, Language, SV) now save automatically and load on refresh.

### **v2025.1.0: Foundation**
- **Initial Release**: Basic `.osu` parsing, HTML5 Canvas rendering, and audio synchronization.

---

## 🚀 Installation & Local Development
To run this project on your own machine:

1. **Clone the repository**:
   ```
   git clone [https://github.com/YOUR_USERNAME/sf-osu-taiko-practice-mode-app.git](https://github.com/YOUR_USERNAME/sf-osu-taiko-practice-mode.git)
   ```

2. **Open the folder**:
    ```
    cd sf-osu-taiko-practice-mode
    ```

3. **Run**: Simply open index.html in any modern web browser (Chrome, Edge, Firefox).

---

## 🛠️ Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+).
- **Rendering**: HTML5 Canvas API.
- **Audio**: Web Audio API.
- **Storage**: LocalStorage API.

---

## 🤝 Credits
- **Developer**: [SnowFlakes](https://osu.ppy.sh/users/19207842)
- **Inspiration**: Based on the work of [nahieu2005](https://osu.ppy.sh/users/22069182).
- **Assets**: Taiko drum icons from Icons8.

---

*Disclaimer: This is a fan-made project and is not affiliated with osu! or ppy Pty Ltd.*

*Last Update: December 29, 2025*

