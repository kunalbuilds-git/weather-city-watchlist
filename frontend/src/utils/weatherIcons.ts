// Keys are lowercase versions of the conditions the backend returns
export const weatherIcons: Record<string, string> = {
  clear: "☀️",
  cloudy: "☁️",
  rainy: "🌧️",
  snowy: "❄️",
  thunderstorm: "⛈️",
  unknown: "🌡️",
};

export function getWeatherIcon(condition: string): string {
  return weatherIcons[condition.toLowerCase()] ?? "🌡️";
}