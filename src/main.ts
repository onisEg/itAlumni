import './style.css'

import { renderAlumniView } from './views/alumniView.ts'
import { renderEventView } from './views/eventView.ts';
import { renderJobView } from './views/jobView.ts'

// The app's root element (the empty <div id="app"> in index.html)
const app = document.querySelector<HTMLDivElement>('#app')!;

// Build the shell once: header + nav + an empty content area (#content)
app.innerHTML = `
   <header class="border-b border-border">
    <div class="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
    
      <a ><img class="w-full" src="./src/assets/Logo.svg" alt=""></a>
     <nav class="flex gap-4 text-sm font-medium">
        <button data-route="alumni" class="nav-link">Networking</button>
        <button data-route="jobs" class="nav-link">Jobs</button>
        <button data-route="events" class="nav-link">Events</button>
      </nav>
    </div>
  </header>
  <main class="max-w-5xl mx-auto px-4 py-6">
    <h2 id="page-title" class="text-lg font-semibold text-ink mb-4"></h2>
    <div id="content"></div>
  </main>
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
    document.querySelectorAll<HTMLButtonElement>(".nav-link").forEach((b) => {
        b.classList.toggle("text-primary"), b.dataset.route === route;
        b.classList.toggle("text-slate"), b.dataset.route !== route;

    });
    routes[route].render(content);
}
document.querySelectorAll<HTMLButtonElement>(".nav-link").forEach((btn) => { btn.addEventListener("click", () => navigate(btn.dataset.route as keyof typeof routes)) })

navigate("alumni")