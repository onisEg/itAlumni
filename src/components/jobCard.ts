import type { Job } from "../types";


const jobCard = (j: Job): string => {
    return `
    <article class="bg-white border rounded-xl p-4 flex-col gap-3 shadow-sm">
        <div>
            <h3 class="font-semibold text-ink">${j.title}</h3>
            <p class="text-sm text-muted">${j.company} . ${j.location}</p>
        </div>
        <div class="flex flex-wrap gap-1.5">
            <span class="text-xs bg-gray-100 text-slate px-2 py-0.5 rounded">${j.stack}</span>
            <span class="text-xs bg-gray-100 text-slate px-2 py-0.5 rounded">${j.contractType}</span>
        </div>
        <a href="${j.applyUrl}" target="_blank" rel="noopener"
         class="text-sm font-medium text-white bg-primary px-3 py-1.5 rounded-lg text-center">Apply</a>
    </article>
    `;
}

export default jobCard;