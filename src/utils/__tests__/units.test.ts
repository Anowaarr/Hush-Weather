import { describe, it, expect } from 'vitest';
import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  convertTemperature,
  formatTemperature,
  kmhToMph,
  formatSpeed,
  mmToInches,
  formatPrecipitation,
  hPaToInHg,
  formatPressure,
  degreesToCompass,
  getUVIndexCategory,
  calculateDewPoint,
  resolveThemeMode,
} from '../units';

describe('Unit Conversion Utilities', () => {
  it('converts Celsius to Fahrenheit correctly', () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
    expect(celsiusToFahrenheit(100)).toBe(212);
    expect(celsiusToFahrenheit(-40)).toBe(-40);
    expect(Math.round(celsiusToFahrenheit(20))).toBe(68);
  });

  it('converts Fahrenheit to Celsius correctly', () => {
    expect(fahrenheitToCelsius(32)).toBe(0);
    expect(fahrenheitToCelsius(212)).toBe(100);
    expect(fahrenheitToCelsius(-40)).toBe(-40);
  });

  it('formats temperature with unit selection', () => {
    expect(convertTemperature(25, 'celsius')).toBe(25);
    expect(convertTemperature(0, 'fahrenheit')).toBe(32);
    expect(formatTemperature(21.4, 'celsius')).toBe('21°');
    expect(formatTemperature(21.4, 'fahrenheit')).toBe('71°');
    expect(formatTemperature(21.4, 'celsius', false)).toBe('21');
  });

  it('converts km/h to mph correctly', () => {
    expect(Math.round(kmhToMph(100))).toBe(62);
    expect(formatSpeed(20, 'kmh')).toBe('20 km/h');
    expect(formatSpeed(20, 'mph')).toBe('12 mph');
  });

  it('converts precipitation accurately', () => {
    expect(mmToInches(25.4)).toBeCloseTo(1.0, 1);
    expect(formatPrecipitation(12.5, 'mm')).toBe('12.5 mm');
    expect(formatPrecipitation(25.4, 'inch')).toBe('1.00 in');
  });

  it('converts and formats pressure', () => {
    expect(hPaToInHg(1013.25)).toBeCloseTo(29.92, 1);
    expect(formatPressure(1013, 'hPa')).toBe('1013 hPa');
    expect(formatPressure(1013.25, 'inHg')).toBe('29.92 inHg');
  });

  it('converts degrees to 16-point compass directions', () => {
    expect(degreesToCompass(0)).toBe('N');
    expect(degreesToCompass(360)).toBe('N');
    expect(degreesToCompass(45)).toBe('NE');
    expect(degreesToCompass(90)).toBe('E');
    expect(degreesToCompass(180)).toBe('S');
    expect(degreesToCompass(270)).toBe('W');
    expect(degreesToCompass(315)).toBe('NW');
    expect(degreesToCompass(22.5)).toBe('NNE');
  });

  it('categorizes UV index accurately', () => {
    expect(getUVIndexCategory(1).level).toBe('low');
    expect(getUVIndexCategory(4).level).toBe('moderate');
    expect(getUVIndexCategory(7).level).toBe('high');
    expect(getUVIndexCategory(9).level).toBe('very-high');
    expect(getUVIndexCategory(12).level).toBe('extreme');
  });

  it('calculates dew point approximation with Magnus formula', () => {
    // At 20°C and 50% relative humidity, dew point is approx 9.3°C
    const dp = calculateDewPoint(20, 50);
    expect(dp).toBeGreaterThan(8.5);
    expect(dp).toBeLessThan(10.0);
  });

  it('resolves theme mode correctly based on appearance and weather', () => {
    expect(resolveThemeMode('light', 'clear-night')).toBe('light');
    expect(resolveThemeMode('dark', 'snow')).toBe('dark');
    expect(resolveThemeMode('auto', 'snow')).toBe('light');
    expect(resolveThemeMode('auto', 'fog')).toBe('light');
    expect(resolveThemeMode('auto', 'clear-night')).toBe('dark');
    expect(resolveThemeMode('auto', 'clear-day')).toBe('dark');
  });
});
