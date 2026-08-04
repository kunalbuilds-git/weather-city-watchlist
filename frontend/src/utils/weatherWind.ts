export function formatWind(speed: number, unit: string): string {
    if (!speed) return "0";
    return `${speed} ${unit}`;
}