# ITAlumni — Technical Report

**Author:** Anas Alnagar
**Project:** Project 1 — IT Academy (Barcelona Activa) Front-End course
**Live:** https://it-alumni-pink.vercel.app/ · **Repo:** https://github.com/onisEg/itAlumni

## 1. Overview

ITAlumni is a front-end alumni platform for an IT academy. Graduates can browse other alumni, look at job offers, and follow community events. It is a front-end-only project: there is no backend, and all the data comes from local mock JSON files.

## 2. Objective and scope

The graded goal was three sections — Alumni Network, Job Bank and Events — each at two levels: viewing the list, and searching and filtering it.

Authentication, messaging and connection requests were out of scope. I also added a few extra screens (home, profile, register) to make the app feel more complete, but after checking priorities with my mentor I kept the focus on the filters, left favourites out (they were optional), and planned tests only if time allowed.

## 3. Tech stack and why

- **Vite + TypeScript (vanilla, no framework).** The brief asked for HTML/CSS/TypeScript without a framework. Vite gave me a fast dev server and a simple production build, and TypeScript made the code safer and more self-documenting through interfaces (`Alumni`, `Job`, `EventItem`).
- **Tailwind CSS v4** for quick, consistent styling, with the colours and fonts defined once as design tokens.
- **Mock JSON data** served through a small service that returns a `Promise` with a short `setTimeout`. This simulates a real async API, which let me handle loading, empty and error states the same way I would with a real one.

## 4. Architecture and key decisions

I split the code by responsibility: `views/` (one render function per page), `services/` (data access), `utils/` (pure logic), `components/` (reusable UI), `types/` (shared interfaces).

The decision I am happiest with is the **reusable filter bar**. Instead of writing three separate filters, I built one `filterBar` component that knows nothing about alumni, jobs or events. Each view passes it a small configuration (which dropdowns, which options) and a callback. Adding a new section does not change the component at all — it stays closed for modification but open for extension.

The filtering logic lives in **pure functions** (`filterAlumni`, `filterJobs`, `filterEvents`): they take data and a filter state and return the matching data, without touching the DOM. That keeps them easy to follow and ready to unit-test.

For navigation I wrote a tiny router in `main.ts` using **event delegation** — a single click listener on `document` catches any element with a `data-route` attribute. This means buttons that are injected later (like a "Back" button inside a view) work automatically, without re-wiring listeners. The search input is also **debounced**, so filtering runs once the user stops typing instead of on every keystroke.

## 5. Git workflow

I followed Git Flow: a `main` branch, a `develop` integration branch, and a `feature/*` branch per task. Each feature went into `develop` through a pull request, using conventional commit messages (`feat`, `fix`, `refactor`, `chore`, `docs`). At the end I merged `develop` into `main` for the release, and deployed the `main` branch on Vercel.

## 6. Challenges and how I solved them

- **Tailwind v4 setup.** No utilities were generated at first. The fix was adding the `@tailwindcss/vite` plugin and moving the colour tokens into an `@theme` block instead of `:root`.
- **Filename casing.** The app ran fine locally on Windows but the production build is case-sensitive (Linux). A file saved as `HomeView.ts` but imported as `homeView.ts` broke the deploy until I made the names match exactly. I learned to trust `git ls-files` over what the editor shows.
- **A disconnected branch.** While moving between branches, one feature branch ended up with a history unrelated to `develop`, so it could not be compared or merged cleanly. I fixed it with `git reset --soft develop`, which re-planted my changes on top of `develop` while keeping all my work, and then committed normally.
- **A filter that did not react.** I had rendered the search box and dropdowns but the event listeners were missing, so nothing triggered the filtering. Adding the listeners back — and fixing a `.some()` callback that forgot to `return` its result — made search and filters work.

## 7. What I learned

- How to design a small, reusable component with a clear contract, instead of copy-pasting the same feature three times.
- Why separating pure logic from the DOM makes code easier to read and to test.
- Practical Git recovery (`reset --soft`, `push --force-with-lease`, reading history), and why branch discipline and case-sensitive filenames really matter once a project is deployed.

## 8. Possible improvements

- Favourites saved in `localStorage` (the optional level 3).
- Unit tests with Vitest for the filter functions, which are already pure and test-ready.
- A real backend/API instead of mock JSON, and a proper date filter for events.
