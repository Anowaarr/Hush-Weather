import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HourlyForecast } from '../HourlyForecast';
import { HourlyForecastItem } from '../../../types/weather';

const mockHourly: HourlyForecastItem[] = [
  {
    time: '2026-11-08T18:00',
    temperature: 20,
    relativeHumidity: 60,
    dewPoint: 12,
    apparentTemperature: 20,
    precipitationProbability: 10,
    precipitation: 0,
    weatherCode: 0,
    surfacePressure: 1013,
    visibility: 10000,
    windSpeed: 10,
    windDirection: 180,
    uvIndex: 0,
    isDay: 0,
  },
  {
    time: '2026-11-08T19:00',
    temperature: 18,
    relativeHumidity: 65,
    dewPoint: 11,
    apparentTemperature: 18,
    precipitationProbability: 35,
    precipitation: 0.2,
    weatherCode: 61,
    surfacePressure: 1013,
    visibility: 9000,
    windSpeed: 12,
    windDirection: 190,
    uvIndex: 0,
    isDay: 0,
  },
  {
    time: '2026-11-08T19:45',
    temperature: 18,
    relativeHumidity: 0,
    dewPoint: 0,
    apparentTemperature: 18,
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
  },
];

describe('HourlyForecast Component', () => {
  it('renders "Now" as the first item label', () => {
    render(<HourlyForecast items={mockHourly} unit="celsius" />);
    expect(screen.getByText('Now')).toBeInTheDocument();
  });

  it('renders precipitation percentage when >= 20%', () => {
    render(<HourlyForecast items={mockHourly} unit="celsius" />);
    expect(screen.getByText('35%')).toBeInTheDocument();
  });

  it('renders injected sunset item', () => {
    render(<HourlyForecast items={mockHourly} unit="celsius" />);
    expect(screen.getByText('Sunset')).toBeInTheDocument();
    expect(screen.getByText('7:45 PM')).toBeInTheDocument();
  });
});
