import type { EventItem } from "../types";
import type { FilterState } from "../components/filterBar";

export function filterEvents(eventList: EventItem[], filters: FilterState): EventItem[] {
    const searchText = filters.query.trim().toLowerCase();

    return eventList.filter((event) => {
        const matchesSearch =
            searchText === "" ||
            event.title.toLowerCase().includes(searchText) ||
            event.description.toLowerCase().includes(searchText);

        const matchesType = filters.type === "" || event.type === filters.type;

        return matchesSearch && matchesType;
    });
}