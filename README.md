# DakzinAI · AI-powered Animal Intrusion Detection System

DakzinAI is a locally developed, field-tested AI-powered virtual fence that detects wildlife entering farms, alerts farmers and repels animals humanely. It was developed by the College of Science and Technology (CST), Royal University of Bhutan, with AMTC Paro and the Department of Agriculture.

This repository holds the web app: the public website, the login and the admin dashboard, plus the API and MQTT services used by the field units.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

On Windows PowerShell, use `npm.cmd` / `npx.cmd` if scripts are blocked.

For a production build:

```bash
npm run build
npm run start
```

Copy `.env.example` to `.env` and fill in your own values. Never commit `.env`.

## Public website

| Page | Route | Page file | Component |
| --- | --- | --- | --- |
| Home | `/` | `app/page.tsx` | `components/landing/DakzinLanding.tsx` |
| How it works | `/how-it-works` | `app/how-it-works/page.tsx` | `HowItWorksPage` in `components/landing/pages.tsx` |
| Features | `/features` | `app/features/page.tsx` | `FeaturesPage` in `components/landing/pages.tsx` |
| News | `/news` | `app/news/page.tsx` | `components/landing/news.tsx` |
| Project milestones | `/milestones` | `app/milestones/page.tsx` | `components/landing/milestones.tsx` |
| About | `/about` | `app/about/page.tsx` | `AboutPage` in `components/landing/pages.tsx` |
| Log in | `/login` | `app/login/page.tsx` | `components/login-form.tsx` |

### Where to edit things

All website text lives in three content files, so most updates never touch the page code:

- `components/landing/site-content.ts`: menu, page header photos, the 7 animals, how-it-works steps, features, partners, team and contact details.
- `components/landing/news-content.ts`: news stories (newest first) with their photos and key facts.
- `components/landing/journey-content.ts`: the four Project milestones cards and the pilot sites.

Shared layout (styles, menu, footer, page header banner and the "Contact us" band) is in `components/landing/site.tsx`.

Other components:

- `AnimalRing.tsx`: the "What Dakzin recognises" ring on the home page.
- `HeroSummary.tsx`: the "The Problem" card on the home page.
- `ArchitectureDiagram.tsx`: the animated system diagram on How it works.

### Images

All images are in `public/`:

| Folder | Used for |
| --- | --- |
| `public/pages/` | Page header banners, the home page photo and the architecture diagram |
| `public/animals/` | The 7 animal photos in the ring (square) |
| `public/news/` | One photo per news story |
| `public/milestones/` | Project milestones card photos |
| `public/team/` | Team photos on About (square, about 400 × 400 px) |
| `public/login/` | Login page slideshow |
