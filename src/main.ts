import { BriefcaseBusiness, Home, User, Users } from 'lucide';
import './style.css'
import { icon } from './utils/icon.ts';

import { renderAlumniView } from './views/alumniView.ts'
import { renderEventView } from './views/eventView.ts';
import { renderJobView } from './views/jobView.ts'

// The app's root element (the empty <div id="app"> in index.html)
const app = document.querySelector<HTMLDivElement>('#app')!;

// Build the shell once: header + nav + an empty content area (#content)
app.innerHTML = `
  <!-- Top header: logo + desktop nav -->
    <header class="sticky top-0 z-10 bg-white border-b border-border">
      <div class="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <span class="text-xl font-bold text-primary"><img src="../src/assets/Logo.svg" alt=""/></span>
        <nav class="hidden md:flex gap-6 text-sm font-medium">
          <button data-route="alumni" class="nav-link">Home</button>
          <button data-route="alumni" class="nav-link">Networking</button>
          <button data-route="jobs" class="nav-link">Job Opportunities</button>
          <button data-route="events" class="nav-link">Events</button>
        </nav>
        <span class="w-6"></span>
      </div>
    </header>
    <!-- Page content (extra bottom padding on mobile to clear the tab bar) -->
    <main class="max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-6">
      <h2 id="page-title" class="text-lg font-semibold text-ink mb-4"></h2>
      <div id="content"></div>
    </main>

    <!-- Mobile bottom tab bar (hidden on desktop) -->
    <nav class="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-[#EAEAEA] flex justify-around py-4 z-10">
      <button data-route="Home" class="tab flex flex-col items-center gap-1 text-xs">
        ${icon(Home, "w-6 h-6")}<span>Home</span>
      </button>
      <button data-route="alumni" class="tab flex flex-col items-center gap-1 text-xs">
        ${icon(Users, "w-6 h-6")}<span>Network</span>
      </button>
      <button data-route="jobs" class="tab flex flex-col items-center gap-1 text-xs">
        ${icon(BriefcaseBusiness, "w-6 h-6")}<span>Jobs</span>
      </button>
      <button data-route="events" class="tab flex flex-col items-center gap-1 text-xs">
        ${icon(Users, "w-6 h-6")}<span>Events</span>
      </button>
      <button data-route="profile" class="tab flex flex-col items-center gap-1 text-xs">
        ${icon(User, "w-6 h-6")}<span>Profile</span>
      </button>
      
    </nav>
`

// Grab the two spots we update on navigation: the title and the content box
const content = document.querySelector<HTMLButtonElement>("#content")!;
const title = document.querySelector<HTMLHeadElement>("#page-title")!;


// Route table: maps each page name to its title + the function that draws it
const routes = {
  alumni: { title: "Alumni Network", render: renderAlumniView },
  jobs: { title: "Job Opportunities", render: renderJobView },
  events: { title: "Events & Activities", render: renderEventView },
}



function navigate(route: keyof typeof routes) {
  title.textContent = routes[route].title;


  // Highlight the active button on BOTH desktop nav and mobile tabs
  document.querySelectorAll<HTMLButtonElement>(".nav-link, .tab").forEach((b) => {
    const active = b.dataset.route === route;   // the current page
    b.classList.toggle("text-primary", active); // active = pink
    b.classList.toggle("text-slate", !active);  // others = grey
  });

  routes[route].render(content);
}

// Wire every button (desktop links AND mobile tabs) to navigate
document.querySelectorAll<HTMLButtonElement>(".nav-link, .tab").forEach((btn) => {
  btn.addEventListener("click", () => navigate(btn.dataset.route as keyof typeof routes));
});
navigate("alumni")