# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Single-page marketing landing page for **MJ Engenharia** (solar energy, monitoring
contracts, robotic panel cleaning, HVAC). Static site, no backend, no framework —
just Vite bundling one HTML file, one CSS file, and one small vanilla-JS module.
All copy is Brazilian Portuguese (`<html lang="pt-BR">`).

## Commands

```bash
npm run dev      # Vite dev server with HMR
npm run build    # production build -> dist/
npm run preview  # serve the built dist/ locally
```

There are no tests, linter, or formatter configured.

## Architecture

- **`index.html`** — the entire site. Every section lives here as a `<section id="...">`
  (`inicio`, `sobre`, `servicos`, `avaliacoes`, `contato`); the desktop nav and the
  `#mobile-menu` link to those ids. Editing content = editing this file.
- **`src/main.js`** — the only script. Two jobs: (1) call `createIcons({ icons })` from
  `lucide` to hydrate every `<i data-lucide="...">` placeholder, (2) wire the mobile
  menu toggle (`header button` ⇄ `#mobile-menu`, toggling `hidden`/`flex`). Any new
  interactivity goes here.
- **`src/style.css`** — Tailwind v4 entry (`@import "tailwindcss"`). **Theme colors are
  defined in CSS, not a JS config**: the `@theme` block declares `--color-primary`,
  `--color-accent`, `--color-neutral`, which is what makes utility classes like
  `bg-primary` / `text-accent` work. Change brand colors here. There is no
  `tailwind.config.js`; Tailwind is wired through `@tailwindcss/vite` in `vite.config.js`.
- **`src/assets/`** — source images referenced directly from `index.html`. Note the
  inconsistent paths: the logo and team photo use a leading slash (`/src/assets/...`),
  the service-card images use a relative path (`src/assets/...`). Vite resolves both in
  build; keep new references consistent with nearby markup.
- **`public/favicon.svg`** — copied verbatim to the build root.

## Design System

Tailwind v4 utilities only — no custom component classes. Keep new markup on the
tokens and patterns already in `index.html`.

### Colors

- **Brand tokens** (`@theme` in `src/style.css`): `--color-primary` `#0C6AC2`
  (blue), `--color-accent` `#F59E0B` (amber), `--color-neutral` `#B7BABD` (unused
  in current markup). Use as `bg-primary`, `text-accent`, `border-primary`, etc.
  Commented-out accent alternates are kept in the file as a palette history.
- **Neutrals** come from Tailwind's built-in `slate` scale, not the token:
  `slate-50` page/section background, `white` cards and alternating sections,
  `slate-900` hero gradient tail + footer, `slate-800`/`slate-900` headings,
  `slate-600` body text, `slate-500`/`slate-400` muted labels and captions,
  `slate-100`/`slate-200` borders.
- **Section rhythm** alternates `bg-white` and `bg-slate-50`; adjacent same-color
  sections are separated with `border-t border-slate-100`.
- **Hero** is `bg-gradient-to-br from-primary to-slate-900` with white text and
  `text-blue-100` for secondary copy.
- **On-dark surfaces** (hero cards): `bg-white/10 backdrop-blur-sm border
  border-white/20`, hover `bg-white/20`.

### Typography

- System font stack via `font-sans` (Tailwind default); `antialiased` on `body`.
- **H1** (hero only): `text-4xl md:text-5xl lg:text-6xl font-extrabold
  tracking-tight leading-tight`.
- **Section title pattern**: a small eyebrow `h2` — `text-primary font-bold
  tracking-wider uppercase text-sm mb-2` — above an `h3`
  `text-3xl md:text-4xl font-extrabold text-slate-900`.
- **Card titles**: `text-xl font-bold` (`h3`/`h4`), often `uppercase` in
  hero/service cards.
- **Body**: `text-sm` or `text-base`, `leading-relaxed`; testimonial quotes add
  `italic`. Group paragraph stacks with `space-y-4`.
- Uppercase + `tracking-wider`/`tracking-wide` is the recurring treatment for
  nav links, eyebrows, and contact field labels.

### Layout & spacing

- **Container**: `max-w-7xl mx-auto px-6` on every section's inner wrapper.
- **Vertical section padding**: `py-24` (hero uses `pt-20 pb-24`).
- **Grids**: `grid-cols-1` → `md:grid-cols-2` → `lg:grid-cols-3` (services,
  testimonials) or `lg:grid-cols-4` (hero highlights); gaps `gap-6`/`gap-8`.
  Two-column text+media blocks use `lg:grid-cols-2 gap-16 items-center`.
- **Breakpoints**: only `md:` (768) and `lg:` (1024) are used; mobile-first.
- Header is `sticky top-0 z-50` with `shadow-md`.

### Components & motifs

- **Rounded corners**: `rounded-full` (buttons, pills, avatars), `rounded-2xl`
  (cards, image frames, map), `rounded-xl`/`rounded-lg` (icon tiles).
- **Shadows**: cards rest at `shadow-sm` and lift to `hover:shadow-xl` (or
  `hover:shadow-md`); primary buttons use `shadow-lg`.
- **Primary CTA**: `bg-accent text-white font-bold rounded-full px-8 py-4`,
  hover `bg-primary hover:shadow-xl hover:-translate-y-1`,
  `transition-all duration-300`. Small variant: `px-6 py-2` + `text-sm`.
- **Secondary/link button**: `bg-slate-100 text-primary border border-slate-200`,
  hover inverts to `bg-primary text-white`.
- **Icon tile**: fixed square (`w-12 h-12` / `w-14 h-14`), centered flex,
  rounded, `bg-accent` on dark or `bg-white border border-slate-100 shadow-md`
  on light; service cards overlap it onto the image with `-mt-12 relative z-10`.
- **Service card**: `bg-white rounded-2xl border border-slate-100`, image header
  `h-48 overflow-hidden` with `group-hover:scale-110` on the `img`
  (`duration-700`), body `p-6`.
- **Avatar**: `w-10 h-10 rounded-full bg-primary/10 text-primary font-bold`,
  centered initials.
- **Badge/pill**: `text-xs font-bold rounded-full px-3 py-1` with a light border.
- **Hover convention**: parent gets `class="group"`, children animate via
  `group-hover:*` (scale icons, color swaps, image zoom); always pair with
  `transition-*`. Links go `hover:text-accent`.
- **Icons**: [lucide](https://lucide.dev) `<i data-lucide="name">` placeholders
  hydrated by `src/main.js`; size with `w-4/5/6/7 h-*`, color via `text-*`,
  `fill-current` for filled stars. Keep new icons kebab-case lucide names.
- **WhatsApp glyph** is an inline `<svg>` (not lucide) in the header CTA.

## Notes

- `dist/` and `node_modules/` are committed to the repo despite being in `.gitignore`
  (they were added before being ignored). The live build under `dist/` is stale relative
  to `index.html` — run `npm run build` to refresh it.
- Repo path is `C:\xampp\htdocs\MjSite` but XAMPP/PHP/Apache are not involved; serve via
  the Vite commands above.
- Contact points hard-coded in `index.html`: WhatsApp link `wa.me/553899886614` and an
  embedded Google Maps iframe for the Montes Claros address.
- A `docker` branch exists on the remote for a containerized setup; `main` does not
  contain it.
