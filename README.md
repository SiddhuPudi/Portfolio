<div align="center">

# 🌐 Interactive 3D Developer Portfolio

**A high-fidelity, immersive web portfolio blending 3D environments with premium sci-fi, terminal-inspired aesthetics.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-thrivikram--portfolio.vercel.app-00E5FF?style=for-the-badge&logo=vercel&logoColor=white)](https://thrivikram-portfolio.vercel.app/)
![CI](https://github.com/SiddhuPudi/Portfolio/actions/workflows/ci.yml/badge.svg)
![Lighthouse](https://img.shields.io/badge/lighthouse-passing-brightgreen)

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

- 🧊 **Persistent 3D Canvas:** A background 3D scene built with Three.js and `@react-three/fiber` that dynamically shifts camera angles based on scroll progression.
- ⚡ **Performance-Based Rendering:** Integrates `PerformanceMonitor` to dynamically scale down rendering properties (like conditionally disabling complex fog and foreground particles) on lower-end devices to guarantee a consistent 60fps experience.
- 🛠️ **Centralized Configuration:** Configured completely from a single config file for fast updates to personal stats, links, resume settings, and copy.
- 🛡️ **Robust Error Boundaries:** Wraps critical entry points with a terminal-themed `GlobalErrorBoundary` to capture runtime failures and provide user-friendly system recovery layouts.
- 📊 **GitHub Activity Integration:** Embeds a real-time GitHub contribution graph mapping commits over the past year. Includes optimized session-based caching (`sessionStorage`) with a 10-minute TTL to respect GitHub API rate limits.
- 🎬 **Cinematic Animations:** Fluid entrance, exit, and layout animations powered by **Framer Motion**. Enhanced with **Magnetic Buttons**, a **Scroll Progress Indicator**, and a **Back-to-Top Button**.
- 📱 **100% Responsive Design:** Implements proportional 50/50 split layouts on desktop that gracefully collapse into stacked mobile views. Features a dedicated **Mobile Navigation Menu** and touch-optimized gestures.
- 🛸 **Custom Neon Cursor:** A highly optimized global custom cursor featuring an instant-follow neon core and a smoothly trailing outer ring that hides the native browser cursor to avoid visual overlap.
- 📬 **Interactive Contact Form:** Integrated with Formspree for serverless, secure email handling, upgraded with a live message **character counter** and auto-reset states.
- ♿ **Web Accessibility:** Improved accessibility with extensive **ARIA labels, keyboard navigation support**, and respect for **reduced motion** preferences.

---

## 🛠 Tech Stack

### Core
* **[React 19](https://react.dev/)** — UI Library
* **[Vite](https://vitejs.dev/)** — Next-Generation Frontend Tooling
* **[Vitest](https://vitest.dev/)** — Blazing Fast Unit Test Framework

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
├── .env                        # Environment variables
├── .github/
│   └── workflows/
│       └── ci.yml              # CI pipeline (build + test + Lighthouse)
├── .gitignore
├── eslint.config.js            # ESLint flat-config
├── index.html                  # App entry HTML (SEO meta, OG tags)
├── lighthouserc.json           # Lighthouse CI thresholds
├── package.json                # Project metadata and scripts
├── postcss.config.js           # PostCSS plugin config
├── tailwind.config.js          # Tailwind theme extensions & custom colors
├── vite.config.js              # Vite configuration
│
├── public/                     # Static assets served at root
└── src/
    ├── App.jsx                 # Main application orchestrator
    ├── index.css               # Global Tailwind & custom CSS tokens
    ├── main.jsx                # React root entry point with GlobalErrorBoundary
    ├── animations/
    │   └── variants.js         # Shared Framer Motion animation variants
    ├── components/
    │   ├── BackToTop.jsx       # Scroll-to-top floating button
    │   ├── CanvasErrorBoundary.jsx # Error boundary for 3D canvas failures
    │   ├── CustomCursor.jsx    # Global neon custom cursor logic
    │   ├── GlobalErrorBoundary.jsx # Top-level runtime error boundary
    │   ├── MagneticButton.jsx  # Hover-magnetic interactive button wrapper
    │   ├── icons/
    │   │   └── GithubIcon.jsx  # Centralized GitHub SVG icon component
    │   └── layout/
    │       ├── Overlay.jsx     # 2D DOM overlay wrapper
    │       ├── Preloader.jsx   # Initial loading splash screen
    │       ├── ScrollProgress.jsx # Scroll progress indicator bar
    │       └── SectionNav.jsx  # Side navigation dots / section switcher
    ├── context/
    │   └── ThemeContext.jsx    # Dark-mode theme context provider
    ├── data/
    │   ├── config.js           # Centralized personal site configuration
    │   └── projects.js         # Project portfolio registry
    ├── sections/
    │   ├── About.jsx           # Bio and photo split layout
    │   ├── Contact.jsx         # Social grid, contact form with char counter & footer
    │   ├── Hero.jsx            # Introduction, stats, and CTAs
    │   ├── Projects.jsx        # Horizontal animated project carousel
    │   ├── Resume.jsx          # Academic journey, CP profiles & GitHub activity
    │   └── Skills.jsx          # Categorized tech-stack icon grid
    ├── test/
    │   ├── data.test.js        # Data validation tests
    │   ├── sections.test.jsx   # Component smoke tests
    │   └── setup.js            # Vitest setup / DOM mocks
    ├── three/
    │   ├── CameraRig.jsx       # Scroll-based camera interpolation
    │   ├── CanvasLayout.jsx    # R3F Canvas with PerformanceMonitor
    │   ├── Scene.jsx           # Scene graph (particles, fog, lights)
    │   └── environments/
    │       ├── BackgroundDepth.jsx  # Deep-layer starfield particles
    │       ├── ForegroundDepth.jsx  # Close-layer floating particles
    │       └── Midground.jsx       # Central 3D geometry elements
    └── utils/
        └── github.js           # GitHub API fetcher with session caching
```

---

## ⚙️ Configuration

### Centralized Website Configuration
To customize your personal details, profile image names, resume download paths, social handles, or email statistics, update [src/data/config.js](file:///Users/thrivikrampudi/Downloads/Portfolio-3D/src/data/config.js). The data is dynamically propagated to components like the [Hero](file:///Users/thrivikrampudi/Downloads/Portfolio-3D/src/sections/Hero.jsx), [Resume](file:///Users/thrivikrampudi/Downloads/Portfolio-3D/src/sections/Resume.jsx), and [Contact](file:///Users/thrivikrampudi/Downloads/Portfolio-3D/src/sections/Contact.jsx) forms:

```javascript
export const siteConfig = {
  name: "Pudi Thrivikram",
  role: "Full Stack Systems Engineer",
  resumeUrl: "/PUDI_THRIVIKRAM.pdf",
  resumeDownloadName: "Pudi_Thrivikram_Resume.pdf",
  stats: [
    { value: "5+", label: "Projects" },
    { value: "2+", label: "Years Coding" },
  ],
  openToWork: true,
  socials: {
    github: "https://github.com/SiddhuPudi",
    linkedin: "https://linkedin.com/in/pudithrivikram",
    instagram: "https://www.instagram.com/siddhu_pudi",
  },
  githubUsername: "SiddhuPudi",
  email: "work.with.thrivikram@gmail.com",
  phone: "+91 93901 71829",
};
```

### Updating Projects
To add or modify portfolio projects, edit the registry in [src/data/projects.js](file:///Users/thrivikrampudi/Downloads/Portfolio-3D/src/data/projects.js). The [Projects.jsx](file:///Users/thrivikrampudi/Downloads/Portfolio-3D/src/sections/Projects.jsx) carousel will automatically scale to accommodate new entries.

### Configuring the Contact Form
The contact section uses Formspree. To connect it to your own email:
1. Create a free account at [Formspree](https://formspree.io/).
2. Create a new form.
3. Replace the target URL in [Contact.jsx](file:///Users/thrivikrampudi/Downloads/Portfolio-3D/src/sections/Contact.jsx) with your unique endpoint.

---

## 💡 Best Practices Implemented

* **Component Modularity:** Strict separation of 3D logic (`src/three`) and 2D DOM overlays (`src/sections`).
* **Hardware Acceleration:** Transitions and animations strictly utilize `transform` and `opacity` to ensure 60fps performance without triggering main-thread layout recalculations.
* **Scroll-Jacking Safety:** Scroll-based progression is decoupled from standard browser scrolling using bounded viewports (`h-[600vh]`), preventing jarring UX common in 3D web experiences.
* **Performance Fallbacks:** Implements adaptive performance scales by monitoring frame rate drops using R3F `PerformanceMonitor` to disable heavy rendering shaders.
* **Session Caching:** API network requests (like fetching GitHub repo metadata) are cached with sessionStorage for 10 minutes to respect API query quotas.

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