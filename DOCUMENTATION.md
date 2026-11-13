# ITAlumni — Project Documentation

A complete walkthrough of how the project is built, written so that anyone opening the repository can understand the whole thing without reading every file first.

- **Live:** https://it-alumni-pink.vercel.app/
- **Repository:** https://github.com/onisEg/itAlumni

---

## 1. What this project is

ITAlumni is a front-end alumni platform for an IT academy. Graduates can browse other alumni, look through job offers, and follow community events. There is **no backend** — all the data comes from local mock JSON files, and the app simulates an async API so it still behaves like a real one (loading, empty and error states).

Each of the three sections does two things: it **shows a list**, and it lets you **search and filter** that list.

---

## 2. Tech stack

| Tool | Why |
|------|-----|
| **Vite** | Fast dev server and a simple production build. |
| **TypeScript** (vanilla, no framework) | The brief asked for HTML/CSS/TS without a framework. Interfaces make the data shapes explicit and catch mistakes early. |
| **Tailwind CSS v4** | Quick, consistent styling with design tokens defined once. |
| **Lucide + Font Awesome** | Icons (UI + brand/social). |
| **Mock JSON** | Local data, served through a service that returns a `Promise`. |

---

## 3. Architecture overview

The code is split by responsibility. Each layer has one job and does not know the details of the layer above it. Data flows upward, from the raw files to the screen:

```
┌─────────────────────────────────────────────┐
│  DOM — what you see in the browser            │
└───────────────▲──────────────────────────────┘
                │
┌───────────────┴──────────────────────────────┐
│  main.ts — the router                         │
│  routes table · navigate() · click delegation │
└───────────────▲──────────────────────────────┘
                │
┌───────────────┴──────────────────────────────┐
│  views/ — one render function per page        │
│  renderAlumniView · renderJobView · …         │
└───────────────▲──────────────────────────────┘
                │ uses
      ┌─────────┴──────────┐
      │                    │
┌─────┴───────┐    ┌───────┴──────────┐
│  utils/     │    │  components/      │
│  pure logic │    │  reusable UI      │
│  filter*    │    │  filterBar, cards │
└─────▲───────┘    └───────────────────┘
      │
┌─────┴───────────────────────────────────────┐
│  services/ — fetch the data (Promise + delay)│
│  getAlumni() · getJobs() · getEvents()       │
└─────▲────────────────────────────────────────┘
      │
┌─────┴────────────────────────────────────────┐
│  data/ — mock JSON files                      │
│  alumni.json · jobs.json · events.json        │
└──────────────────────────────────────────────┘
```

**The core idea:** a view asks a service for data, then wires a reusable component (`filterBar`) to a pure filter function from `utils/`. Nothing reaches across layers, which keeps every part easy to read and to change on its own.

---

## 4. Data flow — a concrete example

What happens, step by step, when you open the **Networking** section and type "react":

1. **You click "Networking".** The button carries `data-route="alumni"`. A single click listener on the whole document catches it.
2. **The router calls `navigate("alumni")`,** which calls the page's render function `renderAlumniView()`.
3. **The view requests data** from `getAlumni()` and shows "Loading…" until it resolves (half a second).
4. **Data arrives** → the view builds the `filterBar` (search + dropdowns) and draws all the cards.
5. **You type "react".** 300 ms after you stop typing (debounce), the view calls `filterAlumni`, which returns only the matches, and the cards are re-drawn.

---

## 5. Folder structure

```
src/
├── assets/        # logo, icons, images
├── components/    # reusable UI: cards, filterBar, header, footer, nav, searchBar
├── data/          # mock data: alumni.json, jobs.json, events.json
├── services/      # data access (Promise + setTimeout → fake API)
├── types/         # shared TypeScript interfaces
├── utils/         # pure helpers: filterAlumni, filterJobs, filterEvents, uniqueValues
├── views/         # one render function per page
├── main.ts        # app shell + router
└── style.css      # Tailwind entry + design tokens
```

---

## 6. The layers in detail

### 6.1 Types — the shared contracts

Every data shape is declared once as an `interface`. This makes the code self-documenting and lets TypeScript catch mistakes before they run.

```ts
export interface Alumni {
  id: number;
  name: string;
  avatar: string;
  stack: string;
  location: string;
  availability: boolean;
  skills: string[];
  level: "junior" | "mid" | "senior";
  workSituation: string;
}
```

(`Job` and `EventItem` follow the same idea.)

### 6.2 Services — faking an API

A service returns a `Promise` that resolves after a short delay. We handle it with `async/await`, exactly as we would a real API — which is what lets us show a proper loading state.

```ts
export function getAlumni(): Promise<Alumni[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(alumniData as Alumni[]), 500);
  });
}
```

### 6.3 Utilities — pure filter functions

These are the heart of the filtering. Each is a **pure function**: it takes data and a filter state and returns data, **without touching the DOM**. That makes it easy to reason about and easy to unit-test.

```ts
export function filterAlumni(alumniList: Alumni[], filters: FilterState): Alumni[] {
  const searchText = filters.query.trim().toLowerCase();

  return alumniList.filter((alumnus) => {
    const matchesSearch =
      searchText === "" ||
      alumnus.name.toLowerCase().includes(searchText) ||
      alumnus.skills.some((skill) => skill.toLowerCase().includes(searchText));

    const matchesStack = filters.stack === "" || alumnus.stack === filters.stack;
    const matchesLevel = filters.level === "" || alumnus.level === filters.level;
    const matchesAvailability =
      filters.availability === "" ||
      (filters.availability === "Available" ? alumnus.availability : !alumnus.availability);

    // every active condition must pass
    return matchesSearch && matchesStack && matchesLevel && matchesAvailability;
  });
}
```

A small generic helper builds the dropdown options from the data itself:

```ts
export function uniqueValues<T>(items: T[], key: keyof T): string[] {
  return [...new Set(items.map((item) => String(item[key])))].sort();
}
```

### 6.4 Components — the reusable `filterBar`

Instead of writing three separate filter UIs, there is **one** `filterBar` component that knows nothing about alumni, jobs or events. You give it a configuration (which dropdowns, which options) and a callback, and it reports back whenever something changes. Adding a new section never changes the component — this is the Open/Closed principle in practice.

```ts
export interface FilterConfig {
  key: string;        // must match the key read inside the filter function (e.g. "stack")
  label: string;      // shown to the user
  options: string[];  // the selectable values
}

export type FilterState = { query: string; [filterKey: string]: string };

function renderFilterBar(container: HTMLElement, options: FilterBarOptions): void {
  const currentState: FilterState = { query: "" };
  options.filters.forEach((filter) => { currentState[filter.key] = ""; });

  // …renders the search input + a <select> per filter…

  function notifyChange(): void {
    options.onChange({ ...currentState });   // send a copy of the state to the view
  }

  // debounced search (wait 300ms after typing stops)
  const searchInput = container.querySelector<HTMLInputElement>("input");
  let debounceTimer: number;
  searchInput?.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      currentState.query = searchInput.value;
      notifyChange();
    }, 300);
  });

  // dropdowns update their key and notify immediately
  container.querySelectorAll<HTMLSelectElement>("[data-filter-key]").forEach((dropdown) => {
    dropdown.addEventListener("change", () => {
      currentState[dropdown.dataset.filterKey!] = dropdown.value;
      notifyChange();
    });
  });
}
```

Other UI components (`alumniCard`, `jobCard`, `eventCard`, `header`, `footer`, `bottomNav`, `searchBar`) are plain functions that return an HTML string.

### 6.5 Views — the coordinators

A view ties everything together: it fetches the data, handles the loading/empty/error states, builds the `filterBar` with a section-specific config, and re-draws the results whenever the filters change.

```ts
export async function renderAlumniView(container: HTMLElement): Promise<void> {
  container.innerHTML = `<p>Loading alumni…</p>`;            // 1) loading

  let alumniList: Alumni[];
  try {
    alumniList = await getAlumni();
  } catch {
    container.innerHTML = `<p>Something went wrong.</p>`;    // error
    return;
  }
  if (alumniList.length === 0) {                             // empty
    container.innerHTML = `<p>No alumni found.</p>`;
    return;
  }

  // layout: filter bar slot + results grid + footer
  // …

  renderFilterBar(filterBarEl, {
    searchPlaceholder: "Search alumni...",
    filters: [
      { key: "stack", label: "Stack", options: uniqueValues(alumniList, "stack") },
      { key: "level", label: "Level", options: ["junior", "mid", "senior"] },
      { key: "availability", label: "Availability", options: ["Available", "Not available"] },
    ],
    onChange: (state) => drawResults(filterAlumni(alumniList, state)),
  });

  drawResults(alumniList);   // first paint: everyone
}
```

The job and event views are the same shape — a different config and a different filter function (`filterJobs`, `filterEvents`).

### 6.6 The router — `main.ts`

`main.ts` builds the shell once (header + content area + mobile nav) and then routes between pages. It uses **event delegation**: one click listener on `document` catches any element with a `data-route` attribute, so buttons injected later (like a "Back" button inside a view) work automatically.

```ts
const routes = {
  home:   { title: "",                     render: renderHomeView },
  alumni: { title: "Alumni Network",       render: renderAlumniView },
  jobs:   { title: "Job Opportunities",    render: renderJobView },
  events: { title: "Events & Activities",  render: renderEventView },
  profile:{ title: "",                     render: renderProfileView },
  register:{ title: "",                    render: renderRegisterView },
};

function navigate(route: keyof typeof routes) {
  if (!routes[route]) return;               // ignore unknown routes
  title.textContent = routes[route].title;
  // highlight the active nav/tab button…
  routes[route].render(content);
}

// one listener handles every [data-route] element, now or later
document.addEventListener("click", (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-route]");
  if (!btn) return;
  navigate(btn.dataset.route as keyof typeof routes);
});

navigate("home");   // start page
```

---

## 7. Key concepts used

- **Reusable component (Open/Closed).** `filterBar` is configured per section, so new sections extend the app without modifying the component.
- **Pure functions.** The filter functions take data and return data with no side effects, which makes them predictable and test-ready.
- **Event delegation.** A single listener handles all navigation, including dynamically injected buttons.
- **Debounce.** Search filters once the user pauses typing, not on every keystroke.
- **Separation of concerns.** Data / services / logic / UI / routing live in separate folders, each with a single responsibility.

---

## 8. Features by section

| Section | Search by | Filter by |
|---------|-----------|-----------|
| **Alumni** | name or skill | stack, level, availability |
| **Jobs** | title or company | stack, contract type, location |
| **Events** | title | type (talk / workshop) |

Every section handles loading, empty and error states, and the layout is responsive (top nav on desktop, bottom tab bar on mobile).

---

## 9. Git workflow

The project follows **Git Flow**:

- `main` — the final, deployable version (Vercel builds from here).
- `develop` — the integration branch where features come together.
- `feature/*` — one branch per task, merged into `develop` through a pull request.

Commit messages follow the conventional style: `feat`, `fix`, `refactor`, `chore`, `docs`.

---

## 10. Running the project

```bash
git clone https://github.com/onisEg/itAlumni.git
cd itAlumni

npm install
npm run dev        # development server
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
```

---

## 11. Limitations and possible improvements

- **Favourites** (save to `localStorage`) — the optional level 3, left out on purpose.
- **Unit tests** with Vitest for the filter functions, which are already pure and test-ready.
- A **real backend/API** instead of mock JSON, and a proper **date filter** for events.

---

_ITAlumni — Project 1, IT Academy (Barcelona Activa) Front-End course. Author: Anas Alnagar._
