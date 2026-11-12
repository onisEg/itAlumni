import type { FilterState } from "../components/filterBar";
import type { Alumni } from "../types";

export function filterAlumni(alumniList: Alumni[], filters: FilterState): Alumni[] {

    const searchText = filters.query.trim().toLocaleLowerCase();

    return alumniList.filter((alumnus) => {
        const matchesSearch =
            searchText === "" ||
            alumnus.name.toLocaleLowerCase().includes(searchText) ||
            alumnus.skills.some((skill) => skill.toLocaleLowerCase().includes(searchText))

        const matchesStack = filters.stack === "" || alumnus.stack === filters.stack;
        const matchesLevel = filters.level === "" || alumnus.level === filters.level;
        const matchesAvailability =
            filters.availability === "" ||
            (filters.availability === "Available" ? alumnus.availability : !alumnus.availability);

        return matchesSearch && matchesStack && matchesLevel && matchesAvailability;
    })
}