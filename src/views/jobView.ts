import { renderFooter } from "../components/footer";
import jobCard from "../components/jobCard";
import { searchBar } from "../components/searchBar";
import { getJobs } from "../services/jobService";

export async function renderJobView(container: HTMLElement): Promise<void> {
    container.innerHTML = `<p class="text-center text-muted py-10">Loading</p>`;
    try {
        const jobs = await getJobs();
        if (jobs.length === 0) {
            container.innerHTML = `<p class="text-center text-muted py-10">No jobs found.</p>`;
            return;
        }
        container.innerHTML = `
            ${searchBar("Search Jobs...")}
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                ${jobs.map(jobCard).join("")}
            </div>
            ${renderFooter()}
            `;
    } catch {
        container.innerHTML = `<p class="text-center text-red-600 py-10">Something went wrong. Please try again.</p>`;
    }

}