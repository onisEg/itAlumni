import type { FilterState } from "../components/filterBar";

export type Level = "junior" | "mid" | "senior";

export interface Alumni {
    id: number;
    name: string;
    avatar: string;
    stack: string;
    location: string;
    availability: boolean;
    skills: string[];
    level: Level;
    workSituation: string;
}

export interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    contractType: string;
    stack: string;
    applyUrl: string;
}

export interface EventItem {
    id: number;
    title: string;
    date: string;
    time: string;
    description: string;
    type: "talk" | "workshop";
}

export interface User {
    name: string;
    email: string;
    avatar?: string;
}

// Description dropdown
export interface FilterConfig {
    key: string;       
    label: string;      
    options: string[];  
}

export interface FilterBarOptions {
    searchPlaceholder: string;
    filters: FilterConfig[];
    onChange: (state: FilterState) => void; // It aligns with any change
}
