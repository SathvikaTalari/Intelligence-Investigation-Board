# 🕵️‍♂️ The Detective Bureau — Intelligence & Investigation Board

![License](https://img.shields.io/badge/License-MIT-amber.svg)
![React](https://img.shields.io/badge/React-19-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![Vite](https://img.shields.io/badge/Vite-6.0-purple.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)
![Deploy](https://img.shields.io/badge/Deploy-Render-success.svg)

> *"Every clue, no matter how small, brings us closer to the truth."* — Sherlock Holmes

**The Detective Bureau** is a award-worthy, highly immersive **1940s Film-Noir Investigation Board & Case Management Web Application**. Built entirely with modern frontend web technologies, it transforms standard administrative dashboards into a photorealistic, tactile detective office experience — featuring stitched leather folders, brass hardware, aged parchment paper, 3D red wax seals, dynamic corkboard evidence strings, and interactive cartography.

---

## 🌟 Key Features & Modules

### 🕵️ 1. Photorealistic Detective Desk Login (`/login`)
- 1940s detective office environment backdrop (`/detective_bg.png`).
- Stitched leather parchment credential card with brass paperclips.
- 3D red wax seal login button (**"ACCESS ARCHIVE"**).

### 📊 2. Executive Bureau Dashboard (`/dashboard`)
- 6 interactive stat folder tabs with vintage count-up metrics.
- Rubber-stamped status indicators (`CLASSIFIED`, `ACTIVE`, `PENDING`).
- SVG crime trend line chart & evidence category donut charts.
- Pinned active case document with red pushpins.
- Real-time investigator activity feed and city risk heatmap.

### 📌 3. Drag & Drop Corkboard Investigation Board (`/board`)
- Interactive corkboard workspace with 17 movable case nodes.
- Dynamic SVG red evidence strings connecting suspect, location, witness, and evidence nodes.
- Corkboard Radar Mini-Map with click-to-center pan navigation.
- Floating brass toolbar with zoom controls, string toggles, and `+ Add Item` modal.
- Detailed right-hand Inspector Panel featuring suspect polaroids, alibi notes, and evidence logs.

### 📁 4. Case Archive Dossier Hub (`/cases`)
- 8 detailed case dossier folders with paperclips and red pushpins.
- Authentic rubber status stamps (`CLASSIFIED`, `OPEN`, `CLOSED`, `ARCHIVED`).
- Interactive filter sidebar (Keyword search, Status dropdown, Detective filter).
- Case status donut chart breakdown (`Investigating: 50%`, `Open: 25%`, `Closed: 20.8%`, `Archived: 4.2%`).

### 🔍 5. Evidence Vault & Custody Chain (`/evidence`)
- 10 evidence cards featuring collected fingerprints (`/fingerprint_collected.png`), audio wiretaps, written notes, and photographs.
- Category filters (`PHOTO`, `DOCUMENT`, `PHYSICAL`, `AUDIO`, `DIGITAL`).
- Evidence Inspector Modal with chain-of-custody log, seal numbers, and simulated downloads.
- `+ Add Evidence` creation modal.

### 📑 6. Classified Document Repository (`/documents`)
- Aged parchment document grid pinned with red pushpins.
- File format classification badges (`PDF`, `JPG`, `MP4`).
- Document reader modal with full text preview and download actions.
- `+ Upload Document` creation modal.

### 🗺️ 7. Cartographic City Map & Route Inspector (`/maps`)
- Blackwood City parchment map backdrop with vintage compass rose.
- Numbered location pins (1 through 5) connected by red animated SVG route lines.
- Location Inspector displaying authentic crime scene photos (`/blackwood_museum.png`, `/getaway_vehicle.png`, `/clara_winters_card.png`, `/broken_window_card.png`).
- Interactive bottom Route Timeline bar for step-by-step case navigation.

### ⏳ 8. Chronological Case Timeline (`/timeline`)
- Central vertical brass track with illuminated node connectors.
- Event cards pinned with red pushpins featuring witness portraits (James Moriarty, Clara Winters).
- Category filter checkboxes (`Case Opened`, `Evidence`, `Witness Interview`, `Suspect Profile`, `Arrest`).
- Detailed Event Inspector sidebar.

### 🔔 9. Real-Time Notification Desk (`/notifications`)
- Category filter tabs (`All 12`, `Unread 12`, `Cases`, `Evidence`, `System`).
- Unread badge counters & vintage camera illustration (`/vintage_camera.png`).
- Notification Inspector card with `UNREAD` rubber stamp and direct evidence navigation.

### ⚙️ 10. Detective Bureau Settings (`/settings`)
- Configurable bureau parameters (Shortcut toggles, Auto-save interval, Archive threshold).
- Theme Selector featuring the default **1940s Detective Office Desktop** visual theme.
- Export Settings JSON feature and Keyboard Shortcuts modal.

### 🔎 11. Global Command Palette (`Ctrl + K`)
- Press `Ctrl + K` or click the search bar anywhere in the app to summon the instant search modal.
- Instantly search and navigate across cases, suspects, evidence, maps, and reports.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) + [Vite 6](https://vitejs.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) + Custom HSL Design System |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) |
| **Linting & Quality** | [Oxlint](https://oxc.rs/) |

---

## 🚀 Local Development Setup

### Prerequisites
- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/SathvikaTalari/Intelligence-Investigation-Board.git
   cd Intelligence-Investigation-Board
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for Production:**
   ```bash
   npm run build
   ```

5. **Preview Production Build:**
   ```bash
   npm run preview
   ```

---

## 🌐 Deploying to Render

To deploy this application on [Render](https://render.com/):

1. Create a **Static Site** on Render.
2. Connect your GitHub repository (`SathvikaTalari/Intelligence-Investigation-Board`).
3. Set the build settings:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
4. Add SPA Routing Rewrite Rule under **Redirects / Rewrites**:
   - **Source:** `/*`
   - **Target:** `/index.html`
   - **Action:** `Rewrite`

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

Developed with ❤️ for Frontend Web Hackathons.
