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
      setIsLoading(false);
    };

    const errorHandler = (error: any) => {
      let message = error.message;
      if (
        error.code === 2 ||
        error.message?.includes('kCLErrorLocationUnknown')
      ) {
        message =
          'Unable to determine your location at this time. Please check your device settings or try again later.';
      } else if (error.code === 1) {
        message = 'Location permission denied. Please allow location access.';
      } else if (error.code === 3) {
        message = 'Location request timed out. Please try again.';
      }
      setError(message);
      setIsLoading(false);
    };

    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
    } else {
      setError('Geolocation is not supported by this browser.');
      setIsLoading(false);
    }
  }, []);

  return { location, error, isLoading };
};

export default useGeoLocation;
