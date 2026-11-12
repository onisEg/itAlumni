export function uniqueValues<T>(items: T[], key: keyof T): string[] {
    return [...new Set(items.map((item) => String(item[key])))].sort();
}