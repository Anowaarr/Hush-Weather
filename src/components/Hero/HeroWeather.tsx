import React from 'react';
import { TemperatureUnit } from '../../types/units';
import { formatTemperature } from '../../utils/units';
import './Hero.css';

interface HeroWeatherProps {
  cityName: string;
  temperature: number;
  condition: string;
  highTemp: number;
  lowTemp: number;
  unit: TemperatureUnit;
  scrollY: number;
}

export const HeroWeather: React.FC<HeroWeatherProps> = ({
  cityName,
  temperature,
  condition,
  highTemp,
  lowTemp,
  unit,
  scrollY,
}) => {
  // Apple iOS Weather scroll transition calculation
  // Between scrollY 0 and 120, fade out details and slide up slightly
  const collapseProgress = Math.min(1, Math.max(0, scrollY / 120));
  const opacity = 1 - collapseProgress;
  const translateY = -collapseProgress * 15;

  return (
    <header
      className="hero-section"
      style={{
        opacity,
        transform: `translate3d(0, ${translateY}px, 0)`,
        pointerEvents: opacity < 0.2 ? 'none' : 'auto',
      }}
      aria-label={`Current weather for ${cityName}`}
    >
      <h1 className="hero-city">{cityName}</h1>
      <div className="hero-temp-container">
        <span className="hero-temp">{formatTemperature(temperature, unit)}</span>
      </div>
      <div className="hero-condition">{condition}</div>
      <div className="hero-high-low" aria-label={`High ${formatTemperature(highTemp, unit)}, Low ${formatTemperature(lowTemp, unit)}`}>
        <span>H:{formatTemperature(highTemp, unit)}</span>
        <span>L:{formatTemperature(lowTemp, unit)}</span>
      </div>
    </header>
  );
};
