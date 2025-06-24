import React, {createContext} from "react";
import useGeoLocation from "../hooks/useGeoLocation";

interface LocationContextType {
    location: {
        lat: number;
        lang: number;
    } | null;
    error: string | null;
    isLoading: boolean;
}

export const LocationContext = createContext<LocationContextType>({
    location: null,
    error: null,
    isLoading: false
});

export const LocationProvider = ({children}: {children: React.ReactNode}) => {
    const {location, error, isLoading} = useGeoLocation();

    return (
        <LocationContext.Provider value={{location, error, isLoading}}>
            {children}
        </LocationContext.Provider>
    )
}

export default LocationProvider;