import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HeroWeather } from '../HeroWeather';
import { StickyHeader } from '../StickyHeader';

describe('Hero Weather Components', () => {
  it('renders city name, country, temperature, condition, high/low, and live time', () => {
    render(
      <HeroWeather
        cityName="Tokyo"
        country="Japan"
        admin1="Kantō"
        timezone="Asia/Tokyo"
        temperature={21}
        condition="Partly Cloudy"
        highTemp={24}
        lowTemp={15}
        unit="celsius"
        scrollY={0}
      />
    );

    expect(screen.getByText('Tokyo')).toBeInTheDocument();
    expect(screen.getByText('Kantō, Japan')).toBeInTheDocument();
    expect(screen.getByText('21°')).toBeInTheDocument();
    expect(screen.getByText('Partly Cloudy')).toBeInTheDocument();
    expect(screen.getByText('H:24°')).toBeInTheDocument();
    expect(screen.getByText('L:15°')).toBeInTheDocument();
    // Live clock check
    expect(screen.getByLabelText(/Current local time in Tokyo/i)).toBeInTheDocument();
  });

  it('renders sticky header with details and country', () => {
    render(
      <StickyHeader
        cityName="Tokyo"
        country="JP"
        timezone="Asia/Tokyo"
        temperature={21}
        condition="Partly Cloudy"
        unit="celsius"
        scrollY={100}
      />
    );

    expect(screen.getByText('Tokyo (JP)')).toBeInTheDocument();
    expect(screen.getByText('21°')).toBeInTheDocument();
  });
});
