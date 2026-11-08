import React from 'react';
import { TemperatureUnit } from '../../types/units';
import { formatTemperature } from '../../utils/units';
import { useLiveTime } from '../../hooks/useLiveTime';
import './Hero.css';

interface StickyHeaderProps {
  cityName: string;
  country?: string;
  timezone?: string;
  temperature: number;
  condition: string;
  unit: TemperatureUnit;
  scrollY: number;
}

export const StickyHeader: React.FC<StickyHeaderProps> = ({
  cityName,
  country,
  timezone,
  temperature,
  condition,
  unit,
  scrollY,
}) => {
  const liveTime = useLiveTime(timezone);

  // Fade in between scrollY 80 and 130
  const progress = Math.min(1, Math.max(0, (scrollY - 70) / 50));
  const isVisible = progress > 0.05;

  return (
    <div
      className={`sticky-header ${isVisible ? 'visible' : ''}`}
      style={{
        opacity: progress,
        transform: `translate3d(0, ${(1 - progress) * -8}px, 0)`,
      }}
      aria-hidden={!isVisible}
    >
      <div className="sticky-header-city">
        {cityName} {country ? `(${country})` : ''}
      </div>
      <div className="sticky-header-details">
        <span>{formatTemperature(temperature, unit)}</span>
        <span>•</span>
        <span>{condition}</span>
        <span>•</span>
        <span>{liveTime.timeStr}</span>
      </div>
    </div>
  );
};
