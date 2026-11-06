import type { Job } from "../types";


const jobCard = (j: Job): string => {
    return `
    <article class="bg-white border border-border-light rounded-xl p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
      <div>
        <h3 class="font-semibold text-ink">${j.title}</h3>
        <p class="text-sm text-slate">${j.company}</p>
        <p class="text-xs text-muted">${j.location}</p>
      </div>
      <div class="flex flex-wrap gap-1.5">
        <span class="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-md">${j.stack}</span>
        <span class="text-xs bg-gray-100 text-slate px-2 py-0.5 rounded-md">${j.contractType}</span>
      </div>
      <a href="${j.applyUrl}" target="_blank" rel="noopener"
         class="mt-auto text-sm font-medium text-primary border border-primary hover:bg-primary hover:text-white px-4 py-1.5 rounded-lg text-center transition-colors">
         Apply Now
      </a>
    </article>
    `;
}

export default jobCard;