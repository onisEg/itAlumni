import type { FilterBarOptions } from "../types";
import { searchBar } from "./searchBar";
export type FilterState = { query: string;[filterKey: string]: string };

function renderFilterBar(container: HTMLElement, options: FilterBarOptions) {
  const currentState: FilterState = { query: "" };
  options.filters.forEach((filter) => {
    currentState[filter.key] = "";
  })

  container.innerHTML = `
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
      <div class="w-full md:max-w-xs">${searchBar(options.searchPlaceholder)}</div>

      <div class="flex flex-wrap gap-2">
        ${options.filters.map((filter) => `
          <select data-filter-key="${filter.key}" aria-label="${filter.label}"
            class="border border-border-light rounded-lg px-3 py-2 text-sm text-slate bg-white">
            <option value="">${filter.label}: All</option>
            ${filter.options
            .map((optionValue) => `<option value="${optionValue}">${optionValue}</option>`)
            .join("")}
          </select>`
      )
      .join("")}
      </div>
    </div>
  `;

  // A function we call whenever something changes → it notifies the view
  function notifyChange(): void {
    options.onChange({ ...currentState });
  }

  // Search text
  const searchInput = container.querySelector<HTMLInputElement>("input");
  let debounceTimer: number;
  searchInput?.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      currentState.query = searchInput.value;
      notifyChange();
    }, 300);
  });


  //dropdowns
  const dropdowns = container.querySelectorAll<HTMLSelectElement>("[data-filter-key]");
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("change", () => {
      currentState[dropdown.dataset.filterKey!] = dropdown.value;
      notifyChange();
    });
  });

}

export default renderFilterBar;