import { eventCard } from "../components/eventCard";
import renderFilterBar from "../components/filterBar";
import { renderFooter } from "../components/footer";
import { getEvents } from "../services/eventService";
import type { EventItem } from "../types";
import { filterEvents } from "../utils/filterEvents";


export async function renderEventView(container: HTMLElement): Promise<void> {
    container.innerHTML = `<p class="text-center text-muted py-10">Loading events…</p>`;

    let eventList: EventItem[];
    try {
        eventList = await getEvents();
    } catch {
        container.innerHTML = `<p class="text-center text-red-600 py-10">Something went wrong. Please try again.</p>`;
        return;
    }

    if (eventList.length === 0) {
        container.innerHTML = `<p class="text-center text-muted py-10">No events found.</p>`;
        return;
    }

    container.innerHTML = `
    <div id="event-filterbar"></div>
    <div id="event-results" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
    ${renderFooter()}
  `;

    const resultsContainer = container.querySelector<HTMLDivElement>("#event-results")!;

    function drawResults(list: EventItem[]): void {
        resultsContainer.innerHTML = list.length
            ? list.map(eventCard).join("")
            : `<p class="col-span-full text-center text-muted py-10">No events match your search.</p>`;
    }

    renderFilterBar(container.querySelector<HTMLElement>("#event-filterbar")!, {
        searchPlaceholder: "Search events...",
        filters: [
            { key: "type", label: "Type", options: ["talk", "workshop"] },
        ],
        onChange: (state) => drawResults(filterEvents(eventList, state)),
    });

    drawResults(eventList);
}