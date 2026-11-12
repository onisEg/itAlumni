import type { EventItem } from "../types";
// A single event card
export function eventCard(e: EventItem): string {
  // Small badge for the event type (talk / workshop)
  const typeBadge = `<span class="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full capitalize">${e.type}</span>`;
  return `
    <article class="bg-white border border-border rounded-xl p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow">
      <div class="flex items-start justify-between gap-2">
        <h3 class="font-semibold text-ink">${e.title}</h3>
        ${typeBadge}
      </div>
      <p class="text-sm text-muted flex items-center gap-1.5">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        ${e.date} · ${e.time}
      </p>
      <p class="text-sm text-slate">${e.description}</p>
    </article>
    `;
}