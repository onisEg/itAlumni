import type { Alumni } from "../types";

export function alumniCard(a: Alumni): string {
    const badge = a.availability ? `<span class="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Available</span>` : `<span class="text-xs font-medium text-muted bg-gray-100 px-2 py-0.5 rounded-full">Not available</span>`;
    const skills = a.skills.map((s) => `<span class="text-xs bg-gray-100 text-slate px-2 py-0.5 rounded">${s}</span>`).join("");
    return `
     <article class="bg-white border border-border rounded-xl p-4 flex flex-col gap-3 shadow-sm">
      <div class="flex items-center gap-3">
        <img src="${a.avatar}" alt="${a.name}" class="w-12 h-12 rounded-full object-cover" />
        <div class="min-w-0">
          <h3 class="font-semibold text-ink truncate">${a.name}</h3>
          <p class="text-sm text-muted truncate">${a.stack} · ${a.location}</p>
        </div>
      </div>
      <div class="flex flex-wrap gap-1.5">${skills}</div>
      <div class="flex items-center justify-between">
        ${badge}
        <button class="text-sm font-medium text-white bg-primary px-3 py-1.5 rounded-lg">Connect</button>
      </div>
    </article>

    `
}