<div align="center">

# 🌐 Interactive 3D Developer Portfolio

**A high-fidelity, immersive web portfolio blending 3D environments with premium sci-fi, terminal-inspired aesthetics.**

![React](https://img.shields.io/badge/React-19.2.5-00D8FF?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0.10-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.184.0-white?style=for-the-badge&logo=threedotjs&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.19-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.38.0-0055FF?style=for-the-badge&logo=framer&logoColor=white)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-quick-start) • [Project Structure](#-architecture--structure) • [Configuration](#-configuration) • [Contact](#-contact)

</div>

---

## ⚡ Overview

Welcome to the source code of my 3D Interactive Portfolio. This project isn't just a static resume—it's an **experience**. Engineered to stand out, it merges a persistent React Three Fiber 3D background scene with smooth, scroll-jacked 2D overlays to create a cohesive, cinematic journey through my professional background.

The UI language leans into a **modern, editorial sci-fi aesthetic**, featuring glassmorphism panels, stark typographic contrast, custom hardware-accelerated animations, and a dynamic neon-glow custom cursor.

---

## ✨ Features

- 🧊 **Persistent 3D Canvas:** A background 3D scene built with Three.js and `@react-three/fiber` that dynamically shifts camera angles based on the user's scroll progression.
- 🎬 **Cinematic Animations:** Fluid entrance, exit, and layout animations powered by **Framer Motion**, including shared layout transitions for projects and skills carousels.
- 📱 **100% Responsive Design:** Implements proportional 50/50 split layouts on desktop that gracefully collapse into stacked mobile views without losing the premium feel.
- 🛸 **Custom Neon Cursor:** A highly optimized global custom cursor featuring an instant-follow neon core and a smoothly trailing `requestAnimationFrame` outer ring that reacts to interactive elements.
- 🚀 **Performance Optimized:** Uses Vite for lightning-fast HMR and highly optimized build sizes. Heavy SVG assets are inlined, and scroll events are meticulously handled to prevent layout thrashing.
- 📬 **Live Contact Form:** Integrated with Formspree for serverless, secure email handling directly from the frontend.

---

## 🛠 Tech Stack

### Core
* **[React 19](https://react.dev/)** — UI Library
* **[Vite](https://vitejs.dev/)** — Next-Generation Frontend Tooling

### 3D & Graphics
* **[Three.js](https://threejs.org/)** — 3D Library
* **[@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)** — React renderer for Three.js
* **[@react-three/drei](https://github.com/pmndrs/drei)** — Useful helpers for R3F

### Styling & Animation
* **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first CSS framework
* **[Framer Motion](https://www.framer.com/motion/)** — Production-ready animation library

### Icons
* **[Lucide React](https://lucide.dev/)** — Beautiful & consistent SVG icons
* **[React Icons](https://react-icons.github.io/react-icons/)** — Comprehensive brand and tech-stack icons

---

## 🚀 Quick Start

To get a local copy up and running, follow these simple steps.

### Prerequisites
* **Node.js** (v18.0.0 or higher)
* **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SiddhuPudi/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

---

## 🏗 Architecture & Structure

```text
├── public/                 # Static assets (Resume PDF, Images, 3D Models)
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── layout/         # Core layout wrappers (Overlay, Preloader, SectionNav)
│   │   └── CustomCursor.jsx# Global custom cursor logic
│   ├── data/               # Local JSON/JS data 
│   │   └── projects.js     # Project portfolio registry
│   ├── sections/           # Modular viewport sections
│   │   ├── Hero.jsx        # Introduction & CTAs
│   │   ├── About.jsx       # Bio and photo split layout
│   │   ├── Projects.jsx    # Horizontal animated project carousel
│   │   ├── Skills.jsx      # Categorized tech-stack icon grid
│   │   ├── Resume.jsx      # Academic journey & competitive programming
│   │   └── Contact.jsx     # Social grid and email form
│   ├── three/              # WebGL / Three.js logic
│   │   ├── CanvasLayout.jsx# R3F Canvas setup
│   │   └── CameraRig.jsx   # Scroll-based camera interpolation
│   ├── App.jsx             # Main application orchestrator
│   ├── index.css           # Global Tailwind & Custom CSS tokens
│   └── main.jsx            # React root entry point
├── tailwind.config.js      # Tailwind theme extensions & custom colors
├── vite.config.js          # Vite configuration
└── package.json            # Project metadata and scripts
```

---

## ⚙️ Configuration

### Updating Projects
To add or modify portfolio projects, edit the registry in `src/data/projects.js`. The `Projects.jsx` carousel will automatically scale to accommodate new entries.

### Configuring the Contact Form
The contact section (`src/sections/Contact.jsx`) uses Formspree. 
To connect it to your own email:
1. Create a free account at [Formspree](https://formspree.io/).
2. Create a new form.
3. Replace `"https://formspree.io/f/YOUR_FORM_ID"` in `Contact.jsx` with your unique endpoint.

---

## 💡 Best Practices Implemented

* **Component Modularity:** Strict separation of 3D logic (`src/three`) and 2D DOM overlays (`src/sections`).
* **Hardware Acceleration:** Transitions and animations strictly utilize `transform` and `opacity` to ensure 60fps performance without triggering main-thread layout recalculations.
* **Scroll-Jacking Safety:** Scroll-based progression is decoupled from standard browser scrolling using bounded viewports (`h-[600vh]`), preventing jarring UX common in 3D web experiences.

---

## 🤝 Contact

**👨🏻‍💻 Pudi Thrivikram**  
[📧 work.with.thrivikram@gmail.com](mailto:work.with.thrivikram@gmail.com)  
[🔗 LinkedIn](https://linkedin.com/in/pudithrivikram)  
[🐙 GitHub](https://github.com/SiddhuPudi)

---
<div align="center">
  <sub>Built with ❤️ and excessive amounts of coffee.</sub>
</div>