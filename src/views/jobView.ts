import jobCard from "../components/jobCard";
import { getJobs } from "../services/jobService";

export async function renderJobView(container: HTMLElement): Promise<viod> {
    container.innerHTML = `<p class="text-center text-muted py-10">Loading</p>`;
    try {
        const jobs = await getJobs();
        if (jobs.length === 0) {
            container.innerHTML = `<p class="text-center text-muted py-10">No jobs found.</p>`;
            return;
        }
        container.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${jobs.map(jobCard).join("")}
      </div>`;
    } catch {
        container.innerHTML = `<p class="text-center text-red-600 py-10">Something went wrong. Please try again.</p>`;
    }
    
}