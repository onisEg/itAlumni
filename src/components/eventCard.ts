import type { EventItem } from "../types";
// Build the HTML for a single event card
export function eventCard(e: EventItem): string {
    // Small badge for the event type (talk / workshop)
    const typeBadge = `<span class="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">${e.type}</span>`;
    return `
    <article class="bg-white border border-border rounded-xl p-4 flex flex-col gap-2 shadow-sm">
      <div class="flex items-center justify-between gap-2">
        <h3 class="font-semibold text-ink">${e.title}</h3>
        ${typeBadge}
      </div>
      <p class="text-sm text-muted">${e.date} · ${e.time}</p>
      <p class="text-sm text-slate">${e.description}</p>
    </article>`;
}