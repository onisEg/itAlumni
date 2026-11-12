# ITAlumni

A front-end alumni platform for an IT academy, where graduates can discover each other, browse job offers, and keep up with community events. Built as **Project 1** of the IT Academy (Barcelona Activa) Front-End course.

Front-end only — it runs entirely on **mock JSON data** with no backend.

## Preview

🔗 **Live demo:** <!-- paste your Vercel URL here --> `https://YOUR-APP.vercel.app`

<!-- Add a screenshot of the home page: save it in the repo (e.g. public/preview.png) and uncomment the line below -->
<!-- ![ITAlumni preview](./public/preview.png) -->

## Features

The app covers three sections, each with its own list view plus search and filtering:

- **Alumni Network** — browse graduate profiles; search by name or skill; filter by stack, level and availability.
- **Job Bank** — browse job offers; search by title or company; filter by stack, contract type and location.
- **Events** — browse talks and workshops; search by title; filter by type.

Across every section:

- Clear **loading, empty and error** states.
- A **reusable filter bar** (one component, configured per section).
- **Responsive** layout (mobile-first) with a top nav on desktop and a bottom tab bar on mobile.

It also includes a few extra screens for a more complete feel — a landing/home page, a profile view, and a registration page (UI only).

## Tech stack

- **Vite** + **TypeScript** (vanilla, no framework)
- **Tailwind CSS v4**
- **Lucide** + **Font Awesome** icons
- Mock data as local **JSON**

## Project structure

```
src/
├── assets/        # logo, icons, images
├── components/    # reusable UI pieces (cards, header, footer, nav, searchBar, filterBar…)
├── data/          # mock data: alumni.json, jobs.json, events.json
├── services/      # data access (simulates an async API with a small delay)
├── types/         # shared TypeScript interfaces
├── utils/         # pure helpers: filterAlumni, filterJobs, filterEvents, uniqueValues…
├── views/         # one render function per page (alumni, jobs, events, home, profile, register)
├── main.ts        # app shell + mini-router
└── style.css      # Tailwind entry + design tokens
```

**How it fits together:** each _view_ fetches its data from a _service_, then wires the reusable `filterBar` _component_ to a pure _filter function_ from `utils/`. The filter functions take data and return data (no DOM), which keeps them easy to reason about and to test.

## Getting started

```bash
# clone
git clone https://github.com/onisEg/itAlumni.git
cd itAlumni

# install
npm install

# run in development
npm run dev
```

Other scripts:

```bash
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build locally
```

## Scope

**In scope (graded):** the Alumni, Job Bank and Events sections, each at two levels — viewing the list, and searching/filtering it.

**Out of scope:** authentication, messaging, connection requests, real job applications and an admin panel. The home, profile and register screens are extra UI and not part of the graded scope.

## Author

**Anas Alnagar** — [github.com/onisEg](https://github.com/onisEg)
