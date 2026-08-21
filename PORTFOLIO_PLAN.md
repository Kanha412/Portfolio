# 🚀 Kanha Gupta — Personal Portfolio: Full Build Plan

> **Stack at a glance:** Angular 17+ SPA · Tailwind CSS · GSAP + Three.js · NestJS API · MongoDB Atlas · Claude AI Chatbot
> **Goal:** Award-winning, "wow" portfolio with an AI alter-ego chatbot, silky animations, and zero-clutter UX.

---

## 1. 📁 Project Structure

```
portfolio/
├── frontend/                  # Angular 17+ SPA
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/          # Guards, interceptors, services
│   │   │   ├── shared/        # Reusable UI components
│   │   │   ├── sections/      # Each page section as a standalone component
│   │   │   │   ├── hero/
│   │   │   │   ├── about/
│   │   │   │   ├── skills/
│   │   │   │   ├── experience/
│   │   │   │   ├── projects/
│   │   │   │   ├── chatbot/
│   │   │   │   └── contact/
│   │   │   ├── layout/        # Navbar, Footer
│   │   │   └── app.component  # Root, scroll orchestration
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── lottie/        # Lottie JSON animations
│   │   │   └── models/        # 3D GLTF models (optional)
│   │   └── environments/
│   └── tailwind.config.js
│
├── backend/                   # NestJS API
│   ├── src/
│   │   ├── contact/           # Contact form module
│   │   ├── chat/              # AI chatbot proxy module
│   │   └── main.ts
│   └── .env
│
└── PORTFOLIO_PLAN.md          # This file
```

---

## 2. 🛠️ Tech Stack — Choices & Justifications

| Layer | Tool | Why |
|---|---|---|
| **Framework** | Angular 17+ (standalone) | SPA, signals, no NgModules boilerplate, great DX |
| **Styling** | Tailwind CSS v3 | Utility-first, no class bloat, easy dark mode |
| **Animations** | GSAP (GreenSock) | Industry-standard, timeline control, ScrollTrigger |
| **3D / Hero** | Three.js | WebGL 3D canvas — the "wow" moment on landing |
| **Scroll** | Lenis (smooth scroll) | Buttery 60fps scroll feel |
| **Scroll Reveals** | AOS or GSAP ScrollTrigger | Element entrance animations on scroll |
| **Particles** | tsParticles | Interactive particle backgrounds |
| **Icons** | Lucide Angular | Clean, consistent SVG icons |
| **Fonts** | Inter + Fira Code (variable) | Modern sans + monospace for code aesthetics |
| **Backend** | NestJS (Node.js) | Typed, modular, great for small APIs |
| **Database** | MongoDB Atlas | Schema-free, free tier, fast setup |
| **AI Chatbot** | Anthropic Claude API (`claude-sonnet-5`) | Best-in-class reasoning, context window |
| **Email** | Nodemailer / Resend | Notify on contact form submit |
| **Hosting FE** | GitHub Pages | Free, `github.io` public URL, deploys from `gh-pages` branch |
| **Hosting BE** | Vercel | Serverless functions, free tier, handles API + AI proxy |

---

## 3. 🎨 Sections — Content & Components

### 3.1 🌟 Hero / Landing
- **Effect:** Three.js animated sphere / abstract 3D geometry that reacts to mouse movement
- **Content:** Name large ("Kanha Gupta"), one-liner title (e.g. "Full-Stack Engineer · AI Enthusiast"), CTA buttons ("View Work" + "Chat with KanhaBot")
- **Background:** Dark gradient or deep space-like theme with tsParticles layer
- **Micro-details:** Blinking cursor on the tagline (typewriter effect via TypeIt.js)

### 3.2 👤 About Me
- **Layout:** Two-column — photo / avatar left, text right (staggered reveal on scroll)
- **Content:** Short punchy bio, current role, what drives me, fun facts
- **Effect:** Glassmorphism card, subtle floating animation on photo

### 3.3 ⚡ Skills
- **Layout:** Categorized icon grid — Languages, Frameworks, Tools, Cloud
- **Effect:** Each skill tile has a hover glow/lift; animated progress or just clean tags
- **Avoid:** Boring progress bars — use styled badge clusters instead

### 3.4 💼 Experience
- **Layout:** Vertical timeline (alternating left-right on desktop, stacked on mobile)
- **Content:** Company, role, dates, bullet achievements
- **Effect:** Timeline nodes pulse on scroll-enter; line draws itself (GSAP SVG stroke animation)

### 3.5 🗂️ Projects
- **Layout:** Bento grid (asymmetric card layout — mix of wide and tall cards)
- **Content:** Project name, tech stack tags, short description, GitHub + Live links
- **Effect:** Card tilt on hover (vanilla-tilt.js), image zoom, gradient border glow
- **Filter:** Tag-based filter (All / Web / AI / OSS etc.)

### 3.6 🤖 KanhaBot (AI Chatbot)
- **Placement:** Floating chat bubble (bottom-right), expands into a side panel
- **Name:** "KanhaBot" or "Ask Kanha" — with a custom avatar
- **Behavior:** Answers questions about Kanha — skills, projects, availability, interests, fun facts
- **Tech:** Angular service calls backend `/chat` endpoint → NestJS proxies to Claude API
- **Personality:** Friendly, witty, first-person ("I love building..."), knows when to say "Kanha hasn't shared that yet 😄"
- **Design:** Glassmorphism panel, typing indicator, message bubbles with timestamps

### 3.7 📬 Contact Us
- **Layout:** Split — left has social/coding links (GitHub, LinkedIn, LeetCode, Codeforces, Twitter/X), right has form
- **Form fields:** Name, Email, Message, Send button
- **Effect:** Form fields have animated label float; submit triggers a particle burst success state
- **Backend:** POST to `/contact`, stores in MongoDB, sends email notification

### 3.8 🔗 Footer
- **Content:** Copyright, made-with note, back-to-top button
- **Effect:** Subtle gradient line top border

---

## 4. 🎨 UI / UX Design Philosophy

### Color Palette (Dark-first)
```
Background:   #0a0a0f  (near-black, deep space)
Surface:      #111118  (card backgrounds)
Border:       #1e1e2e  (subtle outlines)
Primary:      #6c63ff  (electric violet — brand accent)
Secondary:    #00d4ff  (cyan — highlights, glow)
Text-main:    #e2e8f0  (soft white)
Text-muted:   #64748b  (secondary text)
Success:      #22c55e
```

### Typography
- **Headings:** Inter (700–900 weight), letter-spacing tight
- **Body:** Inter (400–500)
- **Code/Tags:** Fira Code (monospace)
- **Scale:** Fluid type via `clamp()` — no fixed px breakpoints

### Motion Design Principles
- **Entrance:** Fade up + slight Y translate (never jarring)
- **Exit:** Fade only (fast, <200ms)
- **Hover:** Scale 1.02–1.05, glow shadow — feel alive, not jumpy
- **Scroll:** Elements reveal at 20% viewport entry
- **Page load:** Staggered hero reveal sequence (GSAP timeline)
- **Reduced motion:** Respect `prefers-reduced-motion` media query

---

## 5. 🎬 Graphics & Animation Strategy

| Section | Animation Tool | Effect |
|---|---|---|
| Hero | Three.js | Rotating 3D geometric mesh, mouse parallax |
| Hero BG | tsParticles | Floating dots/stars layer behind Three.js |
| Hero Text | GSAP Timeline | Staggered word-by-word reveal on load |
| Nav | GSAP | Shrink + blur backdrop on scroll |
| About | GSAP ScrollTrigger | Photo slides in from left, text from right |
| Skills | AOS | Staggered fade-up grid |
| Experience | GSAP SVG | Line draws from top to bottom as you scroll |
| Projects | vanilla-tilt.js | 3D card tilt on mouse hover |
| Contact form | CSS + Angular animations | Floating labels, ripple on submit |
| Chatbot | Angular animations | Slide-up panel with spring easing |
| Global | Lenis | Smooth inertia scroll throughout |

---

## 6. 🤖 AI Chatbot — Architecture

```
User types question
      ↓
Angular ChatService (frontend)
      ↓  POST /chat { message, history[] }
NestJS ChatController
      ↓
Build system prompt (hardcoded Kanha's info)
      ↓
Anthropic Claude API (claude-sonnet-5)
      ↓  stream response
NestJS streams back to Angular
      ↓
ChatComponent renders tokens as they arrive
```

### System Prompt Structure
```
You are KanhaBot — the AI persona of Kanha Gupta, a full-stack software engineer.
Speak in first person, as Kanha. Be friendly, concise, and occasionally witty.
Answer only questions about Kanha. For unrelated questions, redirect politely.

=== About Kanha ===
- Current Role: [fill in]
- Skills: [fill in]
- Projects: [fill in]
- Education: [fill in]
- Interests: [fill in]
- Contact: kanha.gupta@accenture.com
- GitHub / LinkedIn / etc: [fill in]
...
```

### Features
- Streaming responses (token by token feel)
- Conversation history sent with each request (multi-turn)
- Rate limiting on backend (10 req/min per IP)
- Suggested starter questions shown initially

---

## 7. 🔌 Backend API Design

### Base URL: `https://api.kanha.dev` (or Railway URL)

| Method | Endpoint | Body | Description |
|---|---|---|---|
| `POST` | `/contact` | `{ name, email, message }` | Save contact message to DB + send email |
| `GET` | `/contact/health` | — | Health check |
| `POST` | `/chat` | `{ message, history[] }` | Proxy to Claude API, stream response |

### MongoDB Schema — Contact Message
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string",
  "message": "string",
  "createdAt": "Date",
  "read": false
}
```

### Security
- CORS locked to frontend domain
- Rate limiting (`@nestjs/throttler`)
- Input validation (`class-validator`)
- API key stored in `.env`, never exposed to frontend
- Helmet.js for HTTP headers

---

## 8. 📱 Responsive Strategy

| Breakpoint | Width | Target |
|---|---|---|
| `xs` | < 480px | Small phones |
| `sm` | 480–768px | Large phones |
| `md` | 768–1024px | Tablets |
| `lg` | 1024–1280px | Laptops |
| `xl` | 1280px+ | Desktops |

### Key Adaptations
- **Hero:** Three.js canvas downsized / simplified on mobile; particle count reduced
- **Projects:** Bento grid → single column on mobile
- **Experience:** Timeline → left-aligned single column on mobile
- **Chatbot:** Full-screen overlay on mobile instead of side panel
- **Nav:** Hamburger menu on mobile with slide-in drawer

---

## 9. 📦 Key Packages

### Frontend (`frontend/package.json`)
```
@angular/core: ^17.x
tailwindcss: ^3.x
gsap: ^3.x
three: ^0.x
@types/three
lenis: ^1.x
tsparticles: ^3.x
aos: ^2.x
vanilla-tilt: ^1.x
lucide-angular: latest
```

### Backend (`backend/package.json`)
```
@nestjs/core: ^10.x
@nestjs/mongoose: ^10.x
mongoose: ^8.x
@anthropic-ai/sdk: ^0.x
@nestjs/throttler: ^5.x
class-validator: ^0.x
class-transformer: ^0.x
helmet: ^7.x
nodemailer (or resend SDK)
```

---

## 10. 🗓️ Phased Implementation Roadmap

### Phase 1 — Scaffold & Setup *(~1 day)*
- [ ] Init Angular 17 project with standalone components
- [ ] Configure Tailwind CSS
- [ ] Set up Vercel `/api` serverless functions (contact + chat)
- [ ] Connect MongoDB Atlas
- [ ] Set up monorepo root scripts
- [ ] Configure GitHub Actions for auto-deploy to GitHub Pages
- [ ] Deploy shell to GitHub Pages + Vercel API

### Phase 2 — Core UI & Layout *(~3–4 days)*
- [ ] Global theme (CSS vars, fonts, Tailwind config)
- [ ] Navbar (with scroll behavior)
- [ ] Footer
- [ ] Hero section (Three.js + tsParticles + GSAP text reveal)
- [ ] Smooth scroll (Lenis)

### Phase 3 — Content Sections *(~4–5 days)*
- [ ] About section
- [ ] Skills section
- [ ] Experience timeline (with GSAP SVG line)
- [ ] Projects bento grid (with vanilla-tilt)
- [ ] Contact section (form + social links)
- [ ] All scroll animations wired (GSAP ScrollTrigger / AOS)

### Phase 4 — AI Chatbot *(~2–3 days)*
- [ ] KanhaBot floating widget UI
- [ ] Angular ChatService (streaming HTTP)
- [ ] NestJS `/chat` endpoint with Claude API
- [ ] System prompt with personal info
- [ ] Streaming token rendering
- [ ] Suggested questions UI

### Phase 5 — Backend, Polish & Deploy *(~2 days)*
- [ ] Vercel `/api/contact` endpoint — save to MongoDB + email notification
- [ ] Vercel `/api/chat` endpoint — Claude API proxy with rate limiting
- [ ] CORS lock to GitHub Pages domain
- [ ] SPA routing 404.html fix for GitHub Pages
- [ ] Final responsiveness pass
- [ ] Lighthouse audit (target 90+ performance)
- [ ] Meta tags / OG image for sharing
- [ ] Verify end-to-end: `github.io` → Vercel API → Claude/MongoDB

---

## 11. 🌐 Hosting & CI/CD

### Architecture Split

```
User → kanhagupta.github.io  (GitHub Pages — Angular SPA)
              ↓ API calls (CORS-locked)
       kanha-api.vercel.app  (Vercel — Serverless functions)
              ↓
       Claude API + MongoDB Atlas
```

### Services

| Service | What | URL | Config |
|---|---|---|---|
| **GitHub Pages** | Angular frontend | `kanhagupta.github.io` | Deploy via `angular-cli-ghpages` from `gh-pages` branch |
| **Vercel** | Backend API + AI proxy | `kanha-api.vercel.app` | Serverless functions, env vars for API keys |
| **MongoDB Atlas** | Contact messages DB | (internal) | Free M0 cluster, IP allowlist |
| **GitHub Actions** | CI/CD pipeline | — | Auto-build + deploy to Pages on push to `main` |

### GitHub Pages — Key Setup Steps
1. Build Angular with `--base-href /` (or repo sub-path if not root domain)
2. Use `angular-cli-ghpages` (`npx angular-cli-ghpages --dir=dist/frontend/browser`)
3. **SPA routing fix:** add `404.html` that redirects to `index.html` with path encoded as query param — standard trick, handles Angular routes like `/projects`, `/contact`
4. Enable GitHub Pages in repo Settings → Pages → `gh-pages` branch

### Vercel Backend — Key Setup Steps
1. Create `/api` folder with serverless functions (no NestJS needed — plain TS functions)
   - `api/contact.ts` → save message to MongoDB
   - `api/chat.ts` → proxy to Claude API (streaming)
2. Set env vars in Vercel dashboard: `ANTHROPIC_API_KEY`, `MONGODB_URI`
3. CORS config: allow only `https://kanhagupta.github.io`

### Angular Environment Config
```ts
// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://kanha-api.vercel.app/api'
};

// environment.ts (local dev)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

### Why this works perfectly
- ✅ Public URL is always `github.io` — Vercel is invisible to users
- ✅ API key never touches the frontend — stays in Vercel env vars
- ✅ Both services have generous free tiers — $0 hosting
- ✅ GitHub is single source of truth — push to `main` auto-deploys both

---

## 12. ✨ "Wow" Checklist

- [ ] 3D animated hero that reacts to mouse
- [ ] Silky smooth scroll (60fps, Lenis)
- [ ] Staggered text reveals on load
- [ ] Bento grid projects with 3D card tilt
- [ ] SVG timeline that draws on scroll
- [ ] AI chatbot that actually knows about you
- [ ] Particle burst on contact form submit
- [ ] Glassmorphism cards with glowing borders
- [ ] Dark theme with electric violet + cyan accents
- [ ] Fluid typography — no jarring mobile font shifts
- [ ] Reduced-motion fallbacks (accessibility)
- [ ] 90+ Lighthouse score

---

*Plan authored for Kanha Gupta · kanha.gupta@accenture.com · 2026-08-21*
