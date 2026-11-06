import type { Alumni } from "../types";

// A single alumni profile card 
export function alumniCard(a: Alumni): string {

  // Pill-shaped skill chips
  const skills = a.skills
    .map((s) => `<span class="text-xs bg-gray-100 text-slate px-2.5 py-1 rounded-full">${s}</span>`)
    .join("");

  const availability = `
    <span class="inline-flex items-center gap-1.5 text-xs font-medium ${a.availability ? "text-green-600" : "text-muted"}">
      <span class="w-2 h-2 rounded-full ${a.availability ? "bg-green-500" : "bg-gray-400"}"></span>
      ${a.availability ? "Available" : "Not available"}
    </span>`;

  return `
    <article class="bg-white  border border-border-light py-4 flex justify-center flex-col items-center   rounded-xl p-4   shadow-sm hover:shadow-md transition ">
    
      <div class="flex justify-between w-full">
        <div class="min-w-0 flex-1 flex flex-col gap-1.5">
            <h3 class="font-semibold text-ink text-base truncate">${a.name}</h3>
            <p class="text-sm text-slate truncate">${a.stack}</p>
            <p class="text-xs text-muted truncate">${a.location}</p>
            <div class="flex flex-wrap gap-1.5 pt-1">${skills}</div>
        </div>
        <img src="${a.avatar}" alt="${a.name}" class="w-24 h-24 rounded-xl object-cover flex-none" />
      </div>
      <div class="flex items-center justify-between gap-2 pt-2 w-full">
          ${availability}
          <a href="" target="_blank" rel="noopener"
         class="mt-auto text-sm font-medium text-primary border border-primary hover:bg-primary hover:text-white px-6 py-1.5 rounded-lg text-center transition-colors">
         Message
          </a>
         
      </div>
      
    </article>`;
}