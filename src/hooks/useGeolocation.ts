import { useState, useCallback } from 'react';
import { Place } from '../types/weather';

interface GeolocationState {
  place: Place | null;
  loading: boolean;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    place: null,
    loading: false,
    error: null,
  });

  const requestLocation = useCallback(async (): Promise<Place | null> => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setState({
        place: null,
        loading: false,
        error: 'Geolocation is not supported by your browser.',
      });
      return null;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          let cityName = 'My Location';

          // Try reverse geocoding via Open-Meteo or client time zone
          try {
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (tz && tz.includes('/')) {
              const guessedCity = tz.split('/')[1]?.replace(/_/g, ' ');
              if (guessedCity) {
                cityName = guessedCity;
              }
            }
          } catch {
            // Keep default "My Location"
          }

          const currentPlace: Place = {
            id: 'current_gps_location',
            name: cityName,
            latitude,
            longitude,
            isCurrentLocation: true,
          };

          setState({
            place: currentPlace,
            loading: false,
            error: null,
          });

          resolve(currentPlace);
        },
        (error) => {
          let errorMsg = 'Unable to retrieve location.';
          if (error.code === error.PERMISSION_DENIED) {
            errorMsg = 'Location permission was denied. Defaulting to standard places.';
          } else if (error.code === error.TIMEOUT) {
            errorMsg = 'Location request timed out.';
          }

          setState({
            place: null,
            loading: false,
            error: errorMsg,
          });

          resolve(null);
        },
        {
          enableHighAccuracy: false,
          timeout: 8000,
          maximumAge: 300000, // 5 minutes
        }
      );
    });
  }, []);

  return {
    ...state,
    requestLocation,
  };
}
