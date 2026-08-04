export interface Weather {
    city: string;
    country: string;
    temperature: number; // in Celsius
    condition: string;
    humidity: number; // percentage
    windSpeed: number; 
    windUnit: string; // 'km/h' or 'm/s'
    updatedAt: string; // timestamp string
}