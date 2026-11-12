
import './style.css'
import { renderAlumniView } from './views/alumniView.ts'
import { renderEventView } from './views/eventView.ts';
import { renderJobView } from './views/jobView.ts'
import { renderProfileView } from './views/profileView.ts';
import { renderRegisterView } from './views/renderRegisterView.ts';
import { renderHeader } from './components/header.ts';
import { renderBottomNav } from './components/bottomNav.ts';
import { renderHomeView } from './views/homeView.ts';


// The app's root element (the empty <div id="app"> in index.html)
const app = document.querySelector<HTMLDivElement>('#app')!;

// Build the shell once: header + nav + an empty content area (#content)
app.innerHTML = `
  ${renderHeader()}
    <!-- Page content (extra bottom padding on mobile to clear the tab bar) -->
    <main class="max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-6">
      <h2 id="page-title" class="text-lg font-semibold text-ink mb-4"></h2>
      <div id="content"></div>
      
      </main>
  ${renderBottomNav()}
`

// Grab the two spots we update on navigation: the title and the content box
const content = document.querySelector<HTMLDivElement>("#content")!;
const title = document.querySelector<HTMLHeadingElement>("#page-title")!;


// Route table: maps each page name to its title + the function that draws it
const routes = {
  home: { title: "", render: renderHomeView },
  alumni: { title: "Alumni Network", render: renderAlumniView },
  jobs: { title: "Job Opportunities", render: renderJobView },
  events: { title: "Events & Activities", render: renderEventView },
  profile: { title: "", render: renderProfileView },
  register: { title: "", render: renderRegisterView },
}

function navigate(route: keyof typeof routes) {
  if (!routes[route]) return;
  title.textContent = routes[route].title;

  // Highlight the active button on BOTH desktop nav and mobile tabs
  document.querySelectorAll<HTMLButtonElement>(".nav-link, .tab").forEach((b) => {
    const active = b.dataset.route === route;   // the current page
    b.classList.toggle("text-primary", active); // active = pink
    b.classList.toggle("text-slate", !active);  // others = grey
  });

  routes[route].render(content);
}

document.addEventListener("click", (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-route]");
  if (!btn) return;
  navigate(btn.dataset.route as keyof typeof routes);
});

navigate("home")

window.addEventListener("navigate", (e) => {
  navigate((e as CustomEvent<keyof typeof routes>).detail);
});