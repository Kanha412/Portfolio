# Kanha Gupta — Portfolio

Personal portfolio website for **Kanha Gupta**, Software Engineering Analyst at Accenture.  
Built with **Angular 22**, **Tailwind CSS**, **Three.js**, **GSAP**, and the **Gemini AI** chatbot (KG AI).

---

## ✨ Features

| | |
|---|---|
| 🤖 **KG AI Chatbot** | Powered by Gemini 1.5 Flash — full resume context, multi-turn conversations, local fallback |
| 📨 **Contact Form** | Formspree integration — serverless, no backend needed |
| 🌌 **Hero Canvas** | Three.js interactive particle field |
| 🎞️ **Animations** | GSAP, AOS scroll reveals, Lenis smooth scroll, vanilla-tilt cards |
| 📐 **Responsive** | Mobile-first dark theme, glassmorphism cards |
| 📄 **Data-driven** | All content in JSON files — no HTML logic to touch |

**Sections:** Hero · About · Education · Skills · Experience · Projects · Achievements · Contact

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 22 (standalone components, no NgModules) |
| Styling | Tailwind CSS 3 · SCSS · CSS custom properties |
| Animations | GSAP · AOS · Lenis · vanilla-tilt |
| 3D | Three.js |
| AI Chatbot | Google Gemini 1.5 Flash (direct REST API) |
| Contact Form | Formspree |
| Deployment | Vercel |

---

## 📁 Project Structure

```
Portfolio/
├── frontend/                     # Angular SPA
│   ├── src/
│   │   ├── app/
│   │   │   ├── data/             # ← All content lives here (JSON + ai-context.ts)
│   │   │   │   ├── hero.json
│   │   │   │   ├── about.json
│   │   │   │   ├── education.json
│   │   │   │   ├── skills.json
│   │   │   │   ├── experience.json
│   │   │   │   ├── projects.json
│   │   │   │   ├── achievements.json
│   │   │   │   ├── contact.json
│   │   │   │   ├── chatbot.json
│   │   │   │   └── ai-context.ts  ← Gemini system prompt + custom Q&A
│   │   │   ├── layout/           # Navbar, Footer
│   │   │   └── sections/         # One folder per page section
│   │   └── environments/
│   │       ├── environment.ts        ← git-ignored, holds real API keys
│   │       └── environment.template.ts  ← committed template
│   └── scripts/
│       └── gen-env.mjs           # Generates environment.ts from CI env vars
├── vercel.json                   # Vercel deployment config
└── .gitignore
```

---

## 🚀 Running Locally

**Prerequisites:** Node 20+, Angular CLI 22

```bash
# 1. Clone
git clone https://github.com/Kanha412/Portfolio.git
cd Portfolio/frontend

# 2. Install
npm install

# 3. Set up environment
cp src/environments/environment.template.ts src/environments/environment.ts
# Edit environment.ts and fill in:
#   geminiApiKey  →  https://aistudio.google.com/apikey (free)
#   formspreeUrl  →  https://formspree.io (free up to 50 msgs/month)

# 4. Run dev server
npm start          # → http://localhost:4200
```

> **Without API keys** — the chatbot falls back to its local knowledge base and the contact form will error on submit. All other sections work fully.

---

## ☁️ Deploying to Vercel (Recommended)

No backend required. The app is a pure static SPA.

**1. Push to GitHub** (if not already):
```bash
git push origin main
```

**2. Import on Vercel:**  
[vercel.com/new](https://vercel.com/new) → Import `Kanha412/Portfolio`

**3. Set Environment Variables** in Vercel → Project → Settings → Environment Variables:

| Variable | Value |
|---|---|
| `GEMINI_API_KEY` | Your Gemini API key |
| `FORMSPREE_URL` | `https://formspree.io/f/<your-form-id>` |

**4. Deploy** — Vercel auto-detects `vercel.json` and uses:
- Build command: `cd frontend && npm install && npm run build:prod`
- Output: `frontend/dist/frontend/browser`
- SPA routing handled by `rewrites` in `vercel.json`

All future pushes to `main` trigger automatic redeploys.

---

## ✏️ Updating Content

Everything is in `frontend/src/app/data/`. Edit the JSON for the relevant section — no component code to touch.

| File | Controls |
|---|---|
| `hero.json` | Titles, description, social links |
| `about.json` | Bio, role, quick facts |
| `education.json` | Degree, institution, CGPA |
| `skills.json` | Skill categories and items |
| `experience.json` | Work history |
| `projects.json` | Projects, tech tags, links |
| `achievements.json` | Awards and recognitions |
| `contact.json` | Social handles |
| `chatbot.json` | Bot name, greeting, suggestions, local KB |
| `ai-context.ts` | Gemini system prompt — add custom Q&A at the bottom |

---

## 🤖 Adding Custom Q&A to KG AI

Open `frontend/src/app/data/ai-context.ts` and append to the `CUSTOM_QA` array:

```ts
export const CUSTOM_QA = [
  { q: 'availability', a: 'I am open to new opportunities starting Q4 2026.' },
  { q: 'freelance',    a: 'I take selective freelance projects — reach out via the contact form.' },
];
```

No other file needs changing. The entries are automatically injected into the Gemini system prompt.

---

## 🔗 Links

[![GitHub](https://img.shields.io/badge/GitHub-Kanha412-181717?logo=github)](https://github.com/Kanha412)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-kanhagupta412-0A66C2?logo=linkedin)](https://linkedin.com/in/kanhagupta412)
[![LeetCode](https://img.shields.io/badge/LeetCode-kanhagupta412-FFA116?logo=leetcode)](https://leetcode.com/kanhagupta412)
