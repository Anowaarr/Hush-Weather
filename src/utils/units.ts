import {
  DistanceUnit,
  PrecipitationUnit,
  PressureUnit,
  SpeedUnit,
  TemperatureUnit,
  UnitsConfig,
} from '../types/units';

export function celsiusToFahrenheit(c: number): number {
  return (c * 9) / 5 + 32;
}

export function fahrenheitToCelsius(f: number): number {
  return ((f - 32) * 5) / 9;
}

export function convertTemperature(celsius: number, unit: TemperatureUnit): number {
  return unit === 'fahrenheit' ? celsiusToFahrenheit(celsius) : celsius;
}

export function formatTemperature(
  celsius: number,
  unit: TemperatureUnit,
  showDegreeSymbol = true
): string {
  const converted = Math.round(convertTemperature(celsius, unit));
  return `${converted}${showDegreeSymbol ? '°' : ''}`;
}

export function kmhToMph(kmh: number): number {
  return kmh * 0.621371;
}

export function convertSpeed(kmh: number, unit: SpeedUnit): number {
  return unit === 'mph' ? kmhToMph(kmh) : kmh;
}

export function formatSpeed(kmh: number, unit: SpeedUnit): string {
  const converted = Math.round(convertSpeed(kmh, unit));
  return `${converted} ${unit === 'mph' ? 'mph' : 'km/h'}`;
}

export function mmToInches(mm: number): number {
  return mm * 0.0393701;
}

export function convertPrecipitation(mm: number, unit: PrecipitationUnit): number {
  return unit === 'inch' ? mmToInches(mm) : mm;
}

export function formatPrecipitation(mm: number, unit: PrecipitationUnit): string {
  if (unit === 'inch') {
    const inches = convertPrecipitation(mm, 'inch');
    return `${inches.toFixed(2)} in`;
  }
  return `${mm.toFixed(1)} mm`;
}

export function hPaToInHg(hPa: number): number {
  return hPa * 0.02953;
}

export function convertPressure(hPa: number, unit: PressureUnit): number {
  return unit === 'inHg' ? hPaToInHg(hPa) : hPa;
}

export function formatPressure(hPa: number, unit: PressureUnit): string {
  if (unit === 'inHg') {
    return `${convertPressure(hPa, 'inHg').toFixed(2)} inHg`;
  }
  return `${Math.round(hPa)} hPa`;
}

export function metersToDistance(meters: number, unit: DistanceUnit): number {
  const km = meters / 1000;
  return unit === 'mi' ? km * 0.621371 : km;
}

export function formatVisibility(meters: number, unit: DistanceUnit): string {
  const dist = metersToDistance(meters, unit);
  if (unit === 'mi') {
    return `${Math.round(dist)} mi`;
  }
  return `${Math.round(dist)} km`;
}

const COMPASS_POINTS = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
] as const;

export function degreesToCompass(degrees: number): string {
  const normalized = ((degrees % 360) + 360) % 360;
  const index = Math.round(normalized / 22.5) % 16;
  return COMPASS_POINTS[index];
}

export interface UVCategory {
  label: string;
  level: 'low' | 'moderate' | 'high' | 'very-high' | 'extreme';
  color: string;
  description: string;
}

export function getUVIndexCategory(uv: number): UVCategory {
  const rounded = Math.round(uv);
  if (rounded <= 2) {
    return {
      label: 'Low',
      level: 'low',
      color: '#48c774',
      description: 'Minimal risk of harm from sun exposure for the average person.',
    };
  }
  if (rounded <= 5) {
    return {
      label: 'Moderate',
      level: 'moderate',
      color: '#ffdd57',
      description: 'Moderate risk. Take precautions: wear sunglasses and use SPF 30+.',
    };
  }
  if (rounded <= 7) {
    return {
      label: 'High',
      level: 'high',
      color: '#ff8c00',
      description: 'Protection essential. Reduce sun exposure between 10 AM and 4 PM.',
    };
  }
  if (rounded <= 10) {
    return {
      label: 'Very High',
      level: 'very-high',
      color: '#f14668',
      description: 'Extra precautions needed. Unprotected skin can burn rapidly.',
    };
  }
  return {
    label: 'Extreme',
    level: 'extreme',
    color: '#9b51e0',
    description: 'Avoid outdoor sun exposure during peak midday hours.',
  };
}

/**
 * Calculates dew point (°C) using the Magnus-Tetens formula.
 * @param tempC Temperature in Celsius
 * @param rh Relative humidity as percentage (0-100)
 */
export function calculateDewPoint(tempC: number, rh: number): number {
  const a = 17.27;
  const b = 237.7;
  const clampedRh = Math.max(1, Math.min(100, rh));
  const alpha = (a * tempC) / (b + tempC) + Math.log(clampedRh / 100);
  const dewPoint = (b * alpha) / (a - alpha);
  return Math.round(dewPoint * 10) / 10;
}

export function getDefaultUnits(): UnitsConfig {
  const isUS =
    typeof navigator !== 'undefined' &&
    (navigator.language === 'en-US' ||
      navigator.languages?.includes('en-US') ||
      Intl.DateTimeFormat().resolvedOptions().timeZone?.includes('America/'));

  if (isUS) {
    return {
      temperature: 'fahrenheit',
      speed: 'mph',
      precipitation: 'inch',
      pressure: 'inHg',
      distance: 'mi',
      appearance: 'auto',
    };
  }

  return {
    temperature: 'celsius',
    speed: 'kmh',
    precipitation: 'mm',
    pressure: 'hPa',
    distance: 'km',
    appearance: 'auto',
  };
}

export function resolveThemeMode(
  appearance: 'auto' | 'dark' | 'light',
  theme: string
): 'dark' | 'light' {
  if (appearance === 'light') return 'light';
  if (appearance === 'dark') return 'dark';
  // In 'auto' mode:
  // Weather conditions with naturally bright/light skies (snow, fog) use light mode!
  if (theme === 'snow' || theme === 'fog') {
    return 'light';
  }
  return 'dark';
}
