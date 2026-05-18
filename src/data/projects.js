export const featuredProjects = [
  "Shinsei-Keikaku",
  "Talent_Sync",
  "Dietary-QA-System"
];

export const projectMeta = {
  "Shinsei-Keikaku": {
    displayName: "Shinsei Keikaku",
    category: "Full Stack · Gamification",
    description:
      "A gamified personal growth OS that turns your daily life into an RPG. Built a full quest system with EXP progression, difficulty tiers, and stat rewards across 6 categories — all wrapped in a glassmorphism UI with dark-first design and micro-animations.",
    tech: ["React 19", "Vite", "Context API", "React Router DOM", "Vanilla CSS"],
    tags: ["Gamification", "React", "Full Stack", "In Development"],
    features: [
      "Player level & rank engine — E-Rank Trainee to S-Rank Elite — with EXP curves and 5 combat stats (Strength, Intellect, Discipline, Vitality, Focus)",
      "Quest system with Daily / Weekly / Long-term tiers, auto-classification by deadline, and custom difficulty (Easy → Extreme)",
      "Achievement system with 5 rarity tiers (Common → Legendary) and color-coded glow effects",
      "Finance tracker with budgets, savings goals, and month/year bar chart analytics",
    ],
    html_url: "https://github.com/SiddhuPudi/Shinsei-Keikaku"
  },
  "Talent_Sync": {
    displayName: "Talent Sync",
    category: "Full Stack · Real-Time Systems",
    description:
      "A full-stack job platform with real-time chat, connection requests, and live notifications — deployed on Vercel + Render with a GitHub Actions CI/CD pipeline. Engineered a Kafka-backed event bus for message ordering, Redis for presence tracking, and route-based rate limiting (300 GET / 60 write req/min).",
    tech: ["React 19", "Node.js", "Express 5", "PostgreSQL", "Prisma ORM", "Socket.IO", "Apache Kafka", "Redis", "Docker", "GitHub Actions"],
    tags: ["Real-Time", "Full Stack", "DevOps", "Live Demo"],
    homepage: "https://talent-sync-green.vercel.app/",
    features: [
      "Real-time Socket.IO chat with typing indicators, online/offline presence glow, and mobile-responsive sidebar toggle",
      "Kafka + Redis event bus for guaranteed message ordering and pub/sub presence tracking across concurrent users",
      "GitHub Actions CI/CD — parallel frontend/backend jobs, Docker Compose integration tests, auto-deploy to Render + Vercel on push to main",
      "Redis-backed rate limiting: 15 req/15 min (auth), 300 req/min (reads), 60 req/min (writes) with exponential backoff on the frontend",
    ],
    html_url: "https://github.com/SiddhuPudi/Talent_Sync",
    homepage: "https://talent-sync-green.vercel.app"
  },
  "Dietary-QA-System": {
    displayName: "Dietary QA System",
    category: "NLP · Information Retrieval",
    description:
      "A document-grounded dietary QA system built without any neural models — using TF-IDF retrieval and cosine similarity to answer natural language questions from a corpus of ~45 nutrition PDFs. Every answer is traceable to a source document with a confidence score, making it fully explainable.",
    tech: ["Node.js", "TF-IDF", "natural (NLP library)", "pdf-parse", "Cosine Similarity", "JSON"],
    tags: ["NLP", "Explainable AI", "Information Retrieval", "Academic"],
    features: [
      "5-stage NLP pipeline: PDF extraction (pdf-parse) → lowercase normalization → paragraph chunking → TF-IDF indexing (natural) → cosine similarity retrieval",
      "Zero hallucination by design — strictly document-grounded with fallback: 'Information not available in provided documents'",
      "Evaluated against 15 manually-curated test questions with accuracy, precision, and coverage metrics saved to evaluation_results.json",
      "Scales to 100+ PDFs; processes ~45 diet books with per-answer source traceability and confidence scoring",
    ],
    html_url: "https://github.com/SiddhuPudi/Dietary-QA-System-using-TF-IDF"
  }
};