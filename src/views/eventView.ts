import { eventCard } from "../components/eventCard";
import { renderFooter } from "../components/footer";
import { searchBar } from "../components/searchBar";
import { getEvents } from "../services/eventService";

// Render the events view into the given container, handling every UI state
export async function renderEventView(container: HTMLElement): Promise<void> {
    // 1) Loading state
    container.innerHTML = `<p class="text-center text-muted py-10">Loading events…</p>`;
    try {
        const events = await getEvents();
        // 2) Empty state
        if (events.length === 0) {
            container.innerHTML = `<p class="text-center text-muted py-10">No events found.</p>
            
            `;
            return;
        }
        // 3) Success: cards
        container.innerHTML = `
            ${searchBar("Search Events...")}
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                ${events.map(eventCard).join("")}
            </div>
            ${renderFooter()}
            `;
    } catch {
        // 4) Error 
        container.innerHTML = `<p class="text-center text-red-600 py-10">Something went wrong. Please try again.</p>`;
    }
}