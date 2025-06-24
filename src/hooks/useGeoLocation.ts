import { useState, useEffect } from "react";

interface GeolocationPosition {
  lat: number;
  lang: number;
}

const useGeoLocation = () => {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const successHandler = (position: any) => {
      setLocation({
        lat: position.coords.latitude,
        lang: position.coords.longitude,
      });
    };

    const errorHandler = (error: any) => {
      setError(error.message);
    };

    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
      setIsLoading(false);
    } else {
      setError("Geolocation is not supported by this browser.");
      setIsLoading(false);
    }
  }, []);

  return { location, error, isLoading };
};

export default useGeoLocation;
