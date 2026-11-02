import { alumniCard } from "../components/alumniCard";
import { getAlmni } from "../services/alumniService";

export async function renderAlumniView(container: HTMLElement): Promise<void> {
    container.innerHTML = `<p class="text-center text-muted py-10" >Loading alumni...  </p>`;
    try {
        const alumni = await getAlmni();
        if (alumni.length === 0) {
            container.innerHTML = `<p class="text-center text-muted py-10" > No alumni found.</p>`;
            return;
        }
        container.innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${alumni.map(alumniCard).join("")}
        </div>`
    } catch {
        container.innerHTML = `<p class="text-center text-red-600 py-10"> Something went wrong, Please try again </p>`
    }
}