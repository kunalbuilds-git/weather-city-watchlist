// Define the shape of the data the component expects
interface WeatherDetailsProps {
    humidity: number;
    windSpeed: number;
    windUnit: string;
    updatedAt: string;
}

export default function WeatherDetails({ humidity, windSpeed, windUnit, updatedAt }: WeatherDetailsProps) {
    return (
        <div className="bg-green-50 p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Weather Details</h2>

            <p className="text-gray-700">
                <span className="font-medium">Humidity:</span> {humidity}%
            </p>

            <p className="text-gray-700">
                <span className="font-medium">Wind Speed:</span> {windSpeed} {windUnit}
            </p>

            <p className="text-gray-700">
                <span className="font-medium">Updated At:</span> {updatedAt}
            </p>
        </div>
    );
}