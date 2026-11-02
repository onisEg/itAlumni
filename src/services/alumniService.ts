import type { Alumni } from "../types"
import alumniData from "../data/alumni.json";

export function getAlmni(): Promise<Alumni[]> {

    return new Promise((resolve) => {
        setTimeout(() => resolve(alumniData as unknown as Alumni[]), 500);
    })
}