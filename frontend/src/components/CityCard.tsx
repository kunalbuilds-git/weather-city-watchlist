import { weatherIcons } from "../utils/weatherIcons";

interface CityCardProps {
  city: string;
  country: string;
  temperature: number;
  condition: string;
}

export default function CityCard({ city, country, temperature, condition }: CityCardProps) {
  const icon = weatherIcons[condition.toLowerCase()] || "❓";

  return (
    <div className="bg-blue-50 p-4 rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
        {city}
        {country ? `, ${country}` : ""}
        <span className="text-3xl">{icon}</span>
      </h2>

      <p className="text-gray-700">
        <span className="font-medium">Temperature:</span> {temperature}°C
      </p>

      <p className="text-gray-700">
        <span className="font-medium">Condition:</span> {condition}
      </p>
    </div>
  );
}