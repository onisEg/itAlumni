import type { Job } from "../types";
import type { FilterState } from "../components/filterBar";

export function filterJobs(jobList: Job[], filters: FilterState): Job[] {
    const searchText = filters.query.trim().toLowerCase();

    return jobList.filter((job) => {
        const matchesSearch =
            searchText === "" ||
            job.title.toLowerCase().includes(searchText) ||
            job.company.toLowerCase().includes(searchText);

        const matchesStack = filters.stack === "" || job.stack === filters.stack;
        const matchesContract = filters.contractType === "" || job.contractType === filters.contractType;
        const matchesLocation = filters.location === "" || job.location === filters.location;

        return matchesSearch && matchesStack && matchesContract && matchesLocation;
    });
}