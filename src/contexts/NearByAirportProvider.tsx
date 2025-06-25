import React, { createContext, useState, useEffect, useContext } from "react";
import useGeoLocation from "../hooks/useGeoLocation";

interface Airport {
    label: string;
    value: string;
    code: string;
    city: string;
    country: string;
    entityid: string;
}

interface NearByAirportContextType {
  airport: Airport | null;
  isLoading: boolean;
  error: string | null;
}

export const NearByAirportContext = createContext<NearByAirportContextType>({
  airport: null,
  isLoading: false,
  error: null,
});

export const NearByAirportProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { location, isLoading: geoLoading, error: geoError } = useGeoLocation();
  const [airport, setAirport] = useState<Airport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAirports = async () => {
      if (!location) return;
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://sky-scrapper.p.rapidapi.com/api/v1/flights/getNearByAirports?lat=${location.lat}&lng=${location.lang}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY ?? "",
              "x-rapidapi-host": process.env.REACT_APP_RAPIDAPI_HOST ?? "",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch nearby airport");
        }
        const data = await response.json();
        if (
            data?.data?.current?.navigation?.relevantFlightParams?.flightPlaceType ===
            "AIRPORT"
          ) {
            const curr = data.data.current;
            const nearAirport = {
                label: `${curr.presentation.title} (${curr.navigation.relevantFlightParams.skyId}) - ${curr.presentation.subtitle}`,
                value: curr.navigation.relevantFlightParams.skyId,
                code: curr.navigation.relevantFlightParams.skyId,
                city: curr.presentation.title,
                country: curr.presentation.subtitle,
                entityid: curr.navigation.relevantFlightParams.entityId,
            }
            setAirport(nearAirport);
          }
        
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };
    if (location && !geoLoading && !geoError) {
      fetchAirports();
    }
  }, [location, geoLoading, geoError]);

  return (
    <NearByAirportContext.Provider
      value={{
        airport,
        isLoading: isLoading || geoLoading,
        error: error || geoError,
      }}
    >
      {children}
    </NearByAirportContext.Provider>
  );
};

export default NearByAirportProvider;
