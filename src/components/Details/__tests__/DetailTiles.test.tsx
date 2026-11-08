import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DetailTiles } from '../DetailTiles';
import { WeatherData } from '../../../types/weather';
import { UnitsConfig } from '../../../types/units';

const mockUnits: UnitsConfig = {
  temperature: 'celsius',
  speed: 'kmh',
  precipitation: 'mm',
  pressure: 'hPa',
  distance: 'km',
  appearance: 'auto',
};

const mockWeather: WeatherData = {
  place: {
    id: 'test_place',
    name: 'San Francisco',
    latitude: 37.77,
    longitude: -122.41,
    timezone: 'America/Los_Angeles',
  },
  timezone: 'America/Los_Angeles',
  utcOffsetSeconds: -28800,
  current: {
    time: '2026-11-08T14:00',
    temperature: 20,
    relativeHumidity: 65,
    apparentTemperature: 20,
    isDay: 1,
    precipitation: 0,
    weatherCode: 0,
    surfacePressure: 1016,
    windSpeed: 14,
    windDirection: 270,
    windGusts: 22,
  },
  hourly: [
    {
      time: '2026-11-08T14:00',
      temperature: 20,
      relativeHumidity: 65,
      dewPoint: 13,
      apparentTemperature: 20,
      precipitationProbability: 0,
      precipitation: 0,
      weatherCode: 0,
      surfacePressure: 1016,
      visibility: 10000,
      windSpeed: 14,
      windDirection: 270,
      uvIndex: 4,
      isDay: 1,
    },
  ],
  daily: [
    {
      time: '2026-11-08',
      weatherCode: 0,
      temperatureMax: 22,
      temperatureMin: 12,
      apparentTemperatureMax: 22,
      apparentTemperatureMin: 12,
      sunrise: '2026-11-08T06:45',
      sunset: '2026-11-08T17:05',
      uvIndexMax: 4,
      precipitationSum: 0,
      precipitationProbabilityMax: 0,
      windSpeedMax: 16,
      windGustsMax: 24,
    },
  ],
  fetchedAt: Date.now(),
};

describe('DetailTiles Component', () => {
  it('renders all 8 weather metric sections', () => {
    render(<DetailTiles weather={mockWeather} units={mockUnits} />);

    expect(screen.getByText('UV Index')).toBeInTheDocument();
    expect(screen.getByText('Sunset')).toBeInTheDocument();
    expect(screen.getByText('Wind')).toBeInTheDocument();
    expect(screen.getByText('Feels Like')).toBeInTheDocument();
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('Visibility')).toBeInTheDocument();
    expect(screen.getByText('Pressure')).toBeInTheDocument();
    expect(screen.getByText('Precipitation')).toBeInTheDocument();
  });

  it('renders correct computed metric values', () => {
    render(<DetailTiles weather={mockWeather} units={mockUnits} />);

    expect(screen.getByText('65%')).toBeInTheDocument(); // Humidity
    expect(screen.getByText('14 km/h')).toBeInTheDocument(); // Wind speed
    expect(screen.getByText('1016 hPa')).toBeInTheDocument(); // Pressure
  });
});
