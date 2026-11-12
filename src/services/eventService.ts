import type { EventItem } from "../types";
import eventsData from "../data/events.json"
// Simulate an async API call so the UI can show a loading state
export function getEvents(): Promise<EventItem[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(eventsData as unknown as EventItem[])
        }, 500);
    })
}