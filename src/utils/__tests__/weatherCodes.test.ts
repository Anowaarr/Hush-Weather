import { describe, it, expect } from 'vitest';
import { getWeatherCodeInfo } from '../../constants/weatherCodes';

describe('WMO Weather Code Mapping', () => {
  it('maps clear sky for day and night', () => {
    const day = getWeatherCodeInfo(0, 1);
    expect(day.label).toBe('Clear');
    expect(day.theme).toBe('clear-day');
    expect(day.iconName).toBe('sun');

    const night = getWeatherCodeInfo(0, 0);
    expect(night.label).toBe('Clear');
    expect(night.theme).toBe('clear-night');
    expect(night.iconName).toBe('moon');
  });

  it('maps partly cloudy for day and night', () => {
    const day = getWeatherCodeInfo(2, 1);
    expect(day.theme).toBe('partly-cloudy-day');
    expect(day.iconName).toBe('cloud-sun');

    const night = getWeatherCodeInfo(2, 0);
    expect(night.theme).toBe('partly-cloudy-night');
    expect(night.iconName).toBe('cloud-moon');
  });

  it('maps rain and snow flags properly', () => {
    const rain = getWeatherCodeInfo(61, 1);
    expect(rain.isRain).toBe(true);
    expect(rain.theme).toBe('rain');

    const snow = getWeatherCodeInfo(71, 1);
    expect(snow.isSnow).toBe(true);
    expect(snow.theme).toBe('snow');

    const thunder = getWeatherCodeInfo(95, 1);
    expect(thunder.isThunder).toBe(true);
    expect(thunder.theme).toBe('thunderstorm');
  });

  it('falls back gracefully on unknown codes', () => {
    const unknown = getWeatherCodeInfo(999, 1);
    expect(unknown.label).toBeDefined();
    expect(unknown.theme).toBeDefined();
  });
});
