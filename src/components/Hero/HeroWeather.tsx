import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { TemperatureUnit } from '../../types/units';
import { formatTemperature } from '../../utils/units';
import { useLiveTime } from '../../hooks/useLiveTime';
import './Hero.css';

interface HeroWeatherProps {
  cityName: string;
  admin1?: string;
  country?: string;
  timezone?: string;
  temperature: number;
  condition: string;
  highTemp: number;
  lowTemp: number;
  unit: TemperatureUnit;
  scrollY: number;
}

export const HeroWeather: React.FC<HeroWeatherProps> = ({
  cityName,
  admin1,
  country,
  timezone,
  temperature,
  condition,
  highTemp,
  lowTemp,
  unit,
  scrollY,
}) => {
  const liveTime = useLiveTime(timezone);

  // Apple iOS Weather scroll transition calculation
  // Between scrollY 0 and 120, fade out details and slide up slightly
  const collapseProgress = Math.min(1, Math.max(0, scrollY / 120));
  const opacity = 1 - collapseProgress;
  const translateY = -collapseProgress * 15;

  const locationSubtitle = [admin1, country].filter(Boolean).join(', ');

  return (
    <header
      className="hero-section"
      style={{
        opacity,
        transform: `translate3d(0, ${translateY}px, 0)`,
        pointerEvents: opacity < 0.2 ? 'none' : 'auto',
      }}
      aria-label={`Current weather for ${cityName}${country ? `, ${country}` : ''}`}
    >
      {/* Explicit Location Badge */}
      {locationSubtitle && (
        <div className="hero-location-badge" aria-label={`Location: ${locationSubtitle}`}>
          <MapPin size={13} aria-hidden="true" color="#60cdff" />
          <span>{locationSubtitle}</span>
        </div>
      )}

      <h1 className="hero-city">{cityName}</h1>

      {/* Live Local Clock for this exact place */}
      <div
        className="hero-live-clock-badge"
        aria-label={`Current local time in ${cityName}: ${liveTime.fullStr}`}
      >
        <span className="hero-live-dot" aria-hidden="true" />
        <Clock size={12} aria-hidden="true" />
        <span>{liveTime.fullStr}</span>
      </div>

      <div className="hero-temp-container">
        <span className="hero-temp">{formatTemperature(temperature, unit)}</span>
      </div>
      <div className="hero-condition">{condition}</div>
      <div
        className="hero-high-low"
        aria-label={`High ${formatTemperature(highTemp, unit)}, Low ${formatTemperature(lowTemp, unit)}`}
      >
        <span>H:{formatTemperature(highTemp, unit)}</span>
        <span>L:{formatTemperature(lowTemp, unit)}</span>
      </div>
    </header>
  );
};
