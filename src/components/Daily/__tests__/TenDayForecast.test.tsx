import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TenDayForecast } from '../TenDayForecast';
import { DailyForecastItem } from '../../../types/weather';

const mockDaily: DailyForecastItem[] = [
  {
    time: '2026-11-08',
    weatherCode: 0,
    temperatureMax: 24,
    temperatureMin: 14,
    apparentTemperatureMax: 24,
    apparentTemperatureMin: 14,
    sunrise: '2026-11-08T06:30',
    sunset: '2026-11-08T17:30',
    uvIndexMax: 4,
    precipitationSum: 0,
    precipitationProbabilityMax: 5,
    windSpeedMax: 15,
    windGustsMax: 25,
  },
  {
    time: '2026-11-09',
    weatherCode: 2,
    temperatureMax: 22,
    temperatureMin: 13,
    apparentTemperatureMax: 22,
    apparentTemperatureMin: 13,
    sunrise: '2026-11-09T06:31',
    sunset: '2026-11-09T17:29',
    uvIndexMax: 3,
    precipitationSum: 0,
    precipitationProbabilityMax: 10,
    windSpeedMax: 14,
    windGustsMax: 22,
  },
];

describe('TenDayForecast Component', () => {
  it('renders "Today" for index 0 and days rows', () => {
    render(<TenDayForecast daily={mockDaily} currentTemperature={20} unit="celsius" />);
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('10-Day Forecast')).toBeInTheDocument();
  });

  it('renders temperatures for low and high', () => {
    render(<TenDayForecast daily={mockDaily} currentTemperature={20} unit="celsius" />);
    expect(screen.getByText('14°')).toBeInTheDocument();
    expect(screen.getByText('24°')).toBeInTheDocument();
  });
});
