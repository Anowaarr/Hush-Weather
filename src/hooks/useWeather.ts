import { useState, useEffect, useCallback, useRef } from 'react';
import { Place, WeatherData } from '../types/weather';
import { fetchWeatherForecast } from '../api/openMeteo';
import { getCached } from '../api/cache';

interface UseWeatherResult {
  weather: WeatherData | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useWeather(place: Place | null): UseWeatherResult {
  const [weather, setWeather] = useState<WeatherData | null>(() => {
    if (!place) return null;
    const cacheKey = `weather_${place.latitude.toFixed(3)}_${place.longitude.toFixed(3)}`;
    const cached = getCached<WeatherData>(cacheKey);
    return cached ? { ...cached, place } : null;
  });

  const [loading, setLoading] = useState<boolean>(!weather);
  const [error, setError] = useState<Error | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadData = useCallback(
    async (targetPlace: Place, force = false) => {
      try {
        const cacheKey = `weather_${targetPlace.latitude.toFixed(3)}_${targetPlace.longitude.toFixed(3)}`;
        const cached = !force ? getCached<WeatherData>(cacheKey) : null;

        if (cached) {
          setWeather({ ...cached, place: targetPlace });
          setLoading(false);
          setError(null);
          return;
        }

        setLoading(true);
        setError(null);

        const data = await fetchWeatherForecast(targetPlace, force);
        if (isMounted.current) {
          setWeather(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted.current) {
          setError(err instanceof Error ? err : new Error('Failed to fetch weather data.'));
          setLoading(false);
        }
      }
    },
    []
  );

  useEffect(() => {
    if (place) {
      loadData(place, false);
    }
  }, [place, loadData]);

  const refresh = useCallback(async () => {
    if (place) {
      await loadData(place, true);
    }
  }, [place, loadData]);

  return {
    weather,
    loading,
    error,
    refresh,
  };
}
