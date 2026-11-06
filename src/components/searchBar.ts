
import { Search } from "lucide";
import { icon } from "../utils/icon";
export function searchBar(placeholder: string): string {
  return `
    <div class="relative mb-4">
      <!-- search icon -->
      <span class="absolute inset-y-0 left-3 flex items-center text-muted pointer-events-none">
        ${icon(Search, "w-5 h-5")}
      </span>
      <input type="search" placeholder="${placeholder}" aria-label="${placeholder}" class="w-full bg-gray-10 border border-[#EAEAEA] rounded-lg py-2.5 pl-10 pr-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40" />
    </div>`;
}
