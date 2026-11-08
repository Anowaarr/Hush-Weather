import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HeroWeather } from '../HeroWeather';
import { StickyHeader } from '../StickyHeader';

describe('Hero Weather Components', () => {
  it('renders city name, temperature, condition, and high/low', () => {
    render(
      <HeroWeather
        cityName="Cupertino"
        temperature={21}
        condition="Partly Cloudy"
        highTemp={24}
        lowTemp={15}
        unit="celsius"
        scrollY={0}
      />
    );

    expect(screen.getByText('Cupertino')).toBeInTheDocument();
    expect(screen.getByText('21°')).toBeInTheDocument();
    expect(screen.getByText('Partly Cloudy')).toBeInTheDocument();
    expect(screen.getByText('H:24°')).toBeInTheDocument();
    expect(screen.getByText('L:15°')).toBeInTheDocument();
  });

  it('renders sticky header with details', () => {
    render(
      <StickyHeader
        cityName="Cupertino"
        temperature={21}
        condition="Partly Cloudy"
        unit="celsius"
        scrollY={100}
      />
    );

    expect(screen.getByText('Cupertino')).toBeInTheDocument();
    expect(screen.getByText('21°')).toBeInTheDocument();
  });
});
