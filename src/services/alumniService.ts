import type { Alumni } from "../types"
import alumniData from "../data/alumni.json";
//It fetches the data (and calls an async API, allowing us to handle a loading state).
export function getAlmni(): Promise<Alumni[]> {

    return new Promise((resolve) => {
        setTimeout(() => resolve(alumniData as Alumni[]), 500);
    })
}