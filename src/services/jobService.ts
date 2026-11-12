import type { Job } from "../types";
import jobsData from "../data/jobs.json"

export function getJobs(): Promise<Job[]> {
    return new Promise((resolve) => {
        setTimeout(() =>  resolve(jobsData as unknown as Job[]) , 500);
    })
}