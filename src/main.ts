import './style.css'

import { renderAlumniView } from './views/alumniView.ts'
import { renderJobView } from './views/jobView.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

   <header class="border-b border-border">
    <div class="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
      <h1 class="text-xl font-bold text-primary">ITAlumni</h1>
     <nav class="flex gap-4 text-sm font-medium">
        <button data-route="alumni" class="nav-link">Networking</button>
        <button data-route="jobs" class="nav-link">Jobs</button>
      </nav>
    </div>
  </header>
  <main class="max-w-5xl mx-auto px-4 py-6">
    <h2 id="page-title" class="text-lg font-semibold text-ink mb-4"></h2>
    <div id="content"></div>
  </main>
`
const content = document.querySelector<HTMLButtonElement>("#content")!;
const title = document.querySelector<HTMLHeadElement>("#page-title")!;

const routes = {
    alumni: { title: "Alumni Network", render: renderAlumniView },
    jobs: { title: "Job Opportunities", render: renderJobView },

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