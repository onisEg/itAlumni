import { alumniCard } from "../components/alumniCard";
import { renderFooter } from "../components/footer";
import { getAlumni } from "../services/alumniService";
import { filterAlumni } from "../utils/filterAlumni";
import { uniqueValues } from "../utils/uniqueValues";
import type { Alumni } from "../types";
import renderFilterBar from "../components/filterBar";

export async function renderAlumniView(container: HTMLElement): Promise<void> {

    container.innerHTML = `<p class="text-center text-muted py-10">Loading alumni…</p>`;
    //loading
    let alumniList: Alumni[];
    try {
        alumniList = await getAlumni();
    } catch {
        //getting data fail
        container.innerHTML = `<p class="text-center text-red-600 py-10">Something went wrong. Please try again.</p>`;
        return;
    }

    // 2) No Data
    if (alumniList.length === 0) {
        container.innerHTML = `<p class="text-center text-muted py-10">No alumni found.</p>`;
        return;
    }

    container.innerHTML = `
    <div id="alumni-filterbar"></div>
    <div id="alumni-results" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
    ${renderFooter()}
  `;

    const resultsContainer = container.querySelector<HTMLDivElement>("#alumni-results")!;

    // when we get alumniList drow it 
    function drawResults(list: Alumni[]): void {
        resultsContainer.innerHTML = list.length
            ? list.map(alumniCard).join("")
            : `<p class="col-span-full text-center text-muted py-10">No alumni match your search.</p>`;
    }


    // نربط الفلتر بار بالـ config الخاص بالـ alumni
    renderFilterBar(container.querySelector<HTMLElement>("#alumni-filterbar")!, {
        searchPlaceholder: "Search alumni...",
        filters: [
            { key: "stack", label: "Stack", options: uniqueValues(alumniList, "stack") },
            { key: "level", label: "Level", options: ["junior", "mid", "senior"] },
            { key: "availability", label: "Availability", options: ["Available", "Not available"] },
        ],
        onChange: (state) => drawResults(filterAlumni(alumniList, state)),
    });

    //all Alumnus
    drawResults(alumniList);
}