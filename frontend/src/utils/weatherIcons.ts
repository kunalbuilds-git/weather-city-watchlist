export const weatherIcons: Record<string, string> = {
  sunny: "☀️",
  clear: "☀️",
  "clear sky": "☀️",

  cloudy: "☁️",
  overcast: "☁️",
  "partly cloudy": "⛅",

  rain: "🌧️",
  drizzle: "🌦️",
  "light rain": "🌦️",
  "heavy rain": "🌧️",

  thunderstorm: "⛈️",
  storm: "🌩️",

  snow: "❄️",
  "light snow": "🌨️",

  fog: "🌫️",
  mist: "🌫️",

  windy: "🌪️",
};

// Returns the correct icon or a fallback
export function getWeatherIcon(condition: string): string {
  const key = condition.toLowerCase();
  return weatherIcons[key] || "❓";
}