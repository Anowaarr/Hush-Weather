import {
  DailyForecastItem,
  HourlyForecastItem,
  OpenMeteoForecastResponse,
  OpenMeteoGeocodingResponse,
  Place,
  WeatherData,
} from '../types/weather';
import { getCached, setCached } from './cache';

const FORECAST_BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const GEOCODING_BASE_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export async function fetchWeatherForecast(place: Place, forceRefresh = false): Promise<WeatherData> {
  const cacheKey = `weather_${place.latitude.toFixed(3)}_${place.longitude.toFixed(3)}`;

  if (!forceRefresh) {
    const cached = getCached<WeatherData>(cacheKey);
    if (cached) {
      // Ensure place metadata (name, etc.) is preserved
      return { ...cached, place };
    }
  }

  const params = new URLSearchParams({
    latitude: place.latitude.toString(),
    longitude: place.longitude.toString(),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'weather_code',
      'surface_pressure',
      'wind_speed_10m',
      'wind_direction_10m',
      'wind_gusts_10m',
    ].join(','),
    hourly: [
      'temperature_2m',
      'relative_humidity_2m',
      'dew_point_2m',
      'apparent_temperature',
      'precipitation_probability',
      'precipitation',
      'weather_code',
      'surface_pressure',
      'visibility',
      'wind_speed_10m',
      'wind_direction_10m',
      'uv_index',
      'is_day',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'apparent_temperature_max',
      'apparent_temperature_min',
      'sunrise',
      'sunset',
      'uv_index_max',
      'precipitation_sum',
      'precipitation_probability_max',
      'wind_speed_10m_max',
      'wind_gusts_10m_max',
    ].join(','),
    timezone: 'auto',
    forecast_days: '10',
  });

  const url = `${FORECAST_BASE_URL}?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather service error: ${response.status} ${response.statusText}`);
  }

  const raw: OpenMeteoForecastResponse = await response.json();
  const normalized = normalizeWeatherData(place, raw);

  setCached(cacheKey, normalized);
  return normalized;
}

function normalizeWeatherData(place: Place, raw: OpenMeteoForecastResponse): WeatherData {
  const currentIso = raw.current.time;
  // Current hour string without minutes, e.g. "2026-11-08T18"
  const currentHourPrefix = currentIso.slice(0, 13);

  // Find index of the current hour in hourly array
  let startIndex = raw.hourly.time.findIndex((t) => t.startsWith(currentHourPrefix));
  if (startIndex === -1) {
    startIndex = 0;
  }

  // Extract next 26 hours from current hour
  const hourlySlice: HourlyForecastItem[] = [];
  const endIndex = Math.min(raw.hourly.time.length, startIndex + 26);

  for (let i = startIndex; i < endIndex; i++) {
    hourlySlice.push({
      time: raw.hourly.time[i],
      temperature: raw.hourly.temperature_2m[i],
      relativeHumidity: raw.hourly.relative_humidity_2m[i],
      dewPoint: raw.hourly.dew_point_2m[i],
      apparentTemperature: raw.hourly.apparent_temperature[i],
      precipitationProbability: raw.hourly.precipitation_probability[i],
      precipitation: raw.hourly.precipitation[i],
      weatherCode: raw.hourly.weather_code[i],
      surfacePressure: raw.hourly.surface_pressure[i],
      visibility: raw.hourly.visibility[i],
      windSpeed: raw.hourly.wind_speed_10m[i],
      windDirection: raw.hourly.wind_direction_10m[i],
      uvIndex: raw.hourly.uv_index[i],
      isDay: raw.hourly.is_day[i],
    });
  }

  // Insert sunrise and sunset items chronologically into hourly strip
  const mergedHourly = insertSunEventsIntoHourly(
    hourlySlice,
    raw.daily.sunrise,
    raw.daily.sunset,
    raw.current.temperature_2m
  );

  // Normalize daily forecast
  const daily: DailyForecastItem[] = [];
  for (let i = 0; i < raw.daily.time.length; i++) {
    daily.push({
      time: raw.daily.time[i],
      weatherCode: raw.daily.weather_code[i],
      temperatureMax: raw.daily.temperature_2m_max[i],
      temperatureMin: raw.daily.temperature_2m_min[i],
      apparentTemperatureMax: raw.daily.apparent_temperature_max[i],
      apparentTemperatureMin: raw.daily.apparent_temperature_min[i],
      sunrise: raw.daily.sunrise[i],
      sunset: raw.daily.sunset[i],
      uvIndexMax: raw.daily.uv_index_max[i],
      precipitationSum: raw.daily.precipitation_sum[i],
      precipitationProbabilityMax: raw.daily.precipitation_probability_max[i],
      windSpeedMax: raw.daily.wind_speed_10m_max[i],
      windGustsMax: raw.daily.wind_gusts_10m_max[i],
    });
  }

  return {
    place: {
      ...place,
      timezone: raw.timezone,
    },
    timezone: raw.timezone,
    utcOffsetSeconds: raw.utc_offset_seconds,
    current: {
      time: raw.current.time,
      temperature: raw.current.temperature_2m,
      relativeHumidity: raw.current.relative_humidity_2m,
      apparentTemperature: raw.current.apparent_temperature,
      isDay: raw.current.is_day,
      precipitation: raw.current.precipitation,
      weatherCode: raw.current.weather_code,
      surfacePressure: raw.current.surface_pressure,
      windSpeed: raw.current.wind_speed_10m,
      windDirection: raw.current.wind_direction_10m,
      windGusts: raw.current.wind_gusts_10m,
    },
    hourly: mergedHourly,
    daily,
    fetchedAt: Date.now(),
  };
}

function insertSunEventsIntoHourly(
  hourly: HourlyForecastItem[],
  sunrises: string[],
  sunsets: string[],
  fallbackTemp: number
): HourlyForecastItem[] {
  if (hourly.length === 0) return hourly;

  const minTime = hourly[0].time;
  const maxTime = hourly[hourly.length - 1].time;

  const sunEvents: HourlyForecastItem[] = [];

  sunrises.forEach((rise) => {
    if (rise >= minTime && rise <= maxTime) {
      sunEvents.push({
        time: rise,
        temperature: fallbackTemp,
        relativeHumidity: 0,
        dewPoint: 0,
        apparentTemperature: fallbackTemp,
        precipitationProbability: 0,
        precipitation: 0,
        weatherCode: 0,
        surfacePressure: 1013,
        visibility: 10000,
        windSpeed: 0,
        windDirection: 0,
        uvIndex: 0,
        isDay: 1,
        isSunrise: true,
        eventLabel: 'Sunrise',
      });
    }
  });

  sunsets.forEach((set) => {
    if (set >= minTime && set <= maxTime) {
      sunEvents.push({
        time: set,
        temperature: fallbackTemp,
        relativeHumidity: 0,
        dewPoint: 0,
        apparentTemperature: fallbackTemp,
        precipitationProbability: 0,
        precipitation: 0,
        weatherCode: 0,
        surfacePressure: 1013,
        visibility: 10000,
        windSpeed: 0,
        windDirection: 0,
        uvIndex: 0,
        isDay: 0,
        isSunset: true,
        eventLabel: 'Sunset',
      });
    }
  });

  const combined = [...hourly, ...sunEvents];
  combined.sort((a, b) => a.time.localeCompare(b.time));

  // Cap to next 24 display entries
  return combined.slice(0, 25);
}

export async function searchPlaces(query: string): Promise<Place[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) {
    return [];
  }

  const url = `${GEOCODING_BASE_URL}?name=${encodeURIComponent(trimmed)}&count=8&language=en&format=json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Geocoding search failed: ${response.status}`);
  }

  const data: OpenMeteoGeocodingResponse = await response.json();
  if (!data.results || data.results.length === 0) {
    return [];
  }

  return data.results.map((r) => ({
    id: `${r.latitude}_${r.longitude}_${r.id}`,
    name: r.name,
    admin1: r.admin1,
    country: r.country,
    countryCode: r.country_code,
    latitude: r.latitude,
    longitude: r.longitude,
    timezone: r.timezone,
  }));
}
