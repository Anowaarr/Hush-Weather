export type WeatherTheme =
  | 'clear-day'
  | 'clear-night'
  | 'partly-cloudy-day'
  | 'partly-cloudy-night'
  | 'cloudy'
  | 'overcast'
  | 'fog'
  | 'rain'
  | 'thunderstorm'
  | 'snow';

export interface WeatherCodeInfo {
  code: number;
  label: string;
  theme: WeatherTheme;
  iconName: string;
  isRain?: boolean;
  isSnow?: boolean;
  isThunder?: boolean;
}

export interface Place {
  id: string;
  name: string;
  admin1?: string;
  country?: string;
  countryCode?: string;
  latitude: number;
  longitude: number;
  timezone?: string;
  isCurrentLocation?: boolean;
}

export interface CurrentWeather {
  time: string;
  temperature: number;
  relativeHumidity: number;
  apparentTemperature: number;
  isDay: number;
  precipitation: number;
  weatherCode: number;
  surfacePressure: number;
  windSpeed: number;
  windDirection: number;
  windGusts: number;
}

export interface HourlyForecastItem {
  time: string; // ISO string in location's timezone
  temperature: number;
  relativeHumidity: number;
  dewPoint: number;
  apparentTemperature: number;
  precipitationProbability: number;
  precipitation: number;
  weatherCode: number;
  surfacePressure: number;
  visibility: number; // in meters
  windSpeed: number;
  windDirection: number;
  uvIndex: number;
  isDay: number;
  isSunrise?: boolean;
  isSunset?: boolean;
  eventLabel?: string;
}

export interface DailyForecastItem {
  time: string; // YYYY-MM-DD
  weatherCode: number;
  temperatureMax: number;
  temperatureMin: number;
  apparentTemperatureMax: number;
  apparentTemperatureMin: number;
  sunrise: string;
  sunset: string;
  uvIndexMax: number;
  precipitationSum: number;
  precipitationProbabilityMax: number;
  windSpeedMax: number;
  windGustsMax: number;
}

export interface WeatherData {
  place: Place;
  timezone: string;
  utcOffsetSeconds: number;
  current: CurrentWeather;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
  fetchedAt: number;
}

/* Raw Open-Meteo API payload shapes */
export interface OpenMeteoForecastResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    weather_code: number;
    surface_pressure: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    dew_point_2m: number[];
    apparent_temperature: number[];
    precipitation_probability: number[];
    precipitation: number[];
    weather_code: number[];
    surface_pressure: number[];
    visibility: number[];
    wind_speed_10m: number[];
    wind_direction_10m: number[];
    uv_index: number[];
    is_day: number[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    apparent_temperature_max: number[];
    apparent_temperature_min: number[];
    sunrise: string[];
    sunset: string[];
    uv_index_max: number[];
    precipitation_sum: number[];
    precipitation_probability_max: number[];
    wind_speed_10m_max: number[];
    wind_gusts_10m_max: number[];
  };
}

export interface OpenMeteoGeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code?: string;
  country?: string;
  admin1?: string;
  timezone?: string;
}

export interface OpenMeteoGeocodingResponse {
  results?: OpenMeteoGeocodingResult[];
  generationtime_ms?: number;
}
