// To represent a city entry used in the watchlist and UI components
export interface City{
    id: string;
    location: {
        city: string;
        country: string;
    };
}