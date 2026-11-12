import renderFilterBar from "../components/filterBar";
import { renderFooter } from "../components/footer";
import jobCard from "../components/jobCard";
import { getJobs } from "../services/jobService";
import type { Job } from "../types";
import { filterJobs } from "../utils/filterJobs";
import { uniqueValues } from "../utils/uniqueValues";

export async function renderJobView(container: HTMLElement): Promise<void> {
    container.innerHTML = `<p class="text-center text-muted py-10">Loading jobs…</p>`;

    let jobList: Job[];
    try {
        jobList = await getJobs();
    } catch {
        container.innerHTML = `<p class="text-center text-red-600 py-10">Something went wrong. Please try again.</p>`;
        return;
    }

    if (jobList.length === 0) {
        container.innerHTML = `<p class="text-center text-muted py-10">No jobs found.</p>`;
        return;
    }

    container.innerHTML = `
    <div id="job-filterbar"></div>
    <div id="job-results" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
    ${renderFooter()}
  `;

    const resultsContainer = container.querySelector<HTMLDivElement>("#job-results")!;

    function drawResults(list: Job[]): void {
        resultsContainer.innerHTML = list.length
            ? list.map(jobCard).join("")
            : `<p class="col-span-full text-center text-muted py-10">No jobs match your search.</p>`;
    }

    renderFilterBar(container.querySelector<HTMLElement>("#job-filterbar")!, {
        searchPlaceholder: "Search jobs...",
        filters: [
            { key: "stack", label: "Stack", options: uniqueValues(jobList, "stack") },
            { key: "contractType", label: "Contract", options: uniqueValues(jobList, "contractType") },
            { key: "location", label: "Location", options: uniqueValues(jobList, "location") },
        ],
        onChange: (state) => drawResults(filterJobs(jobList, state)),
    });

    drawResults(jobList);
}