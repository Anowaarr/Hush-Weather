import React from 'react';
import { Calendar } from 'lucide-react';
import { DailyForecastItem } from '../../types/weather';
import { TemperatureUnit } from '../../types/units';
import { formatDayLabel } from '../../utils/date';
import { formatTemperature } from '../../utils/units';
import { getWeatherCodeInfo } from '../../constants/weatherCodes';
import { WeatherIcon } from '../UI/WeatherIcon';
import './Daily.css';

interface TenDayForecastProps {
  daily: DailyForecastItem[];
  currentTemperature: number;
  unit: TemperatureUnit;
}

export const TenDayForecast: React.FC<TenDayForecastProps> = ({
  daily,
  currentTemperature,
  unit,
}) => {
  if (daily.length === 0) return null;

  // Calculate 10-day global min and max for range bar alignment
  const globalMin = Math.min(...daily.map((d) => d.temperatureMin));
  const globalMax = Math.max(...daily.map((d) => d.temperatureMax));
  const totalSpan = Math.max(1, globalMax - globalMin);

  return (
    <section className="glass-card daily-card" aria-label="10-day weather forecast">
      <div className="card-header">
        <Calendar size={14} aria-hidden="true" />
        <span>10-Day Forecast</span>
      </div>

      <div className="daily-rows-list" role="list">
        {daily.map((day, index) => {
          const codeInfo = getWeatherCodeInfo(day.weatherCode, 1);
          const dayLabel = formatDayLabel(day.time, index);
          const isToday = index === 0;

          const leftPercent = ((day.temperatureMin - globalMin) / totalSpan) * 100;
          const widthPercent = Math.max(
            4,
            ((day.temperatureMax - day.temperatureMin) / totalSpan) * 100
          );

          // Dot position on Today row
          const dotPercent = Math.min(
            100,
            Math.max(0, ((currentTemperature - globalMin) / totalSpan) * 100)
          );

          return (
            <div
              key={day.time}
              className="daily-row"
              role="listitem"
              aria-label={`${dayLabel}: ${codeInfo.label}, Low ${formatTemperature(day.temperatureMin, unit)}, High ${formatTemperature(day.temperatureMax, unit)}`}
            >
              <span className="daily-day-name">{dayLabel}</span>
              <div className="daily-icon-wrapper">
                <WeatherIcon name={codeInfo.iconName} size={20} ariaLabel={codeInfo.label} />
              </div>
              <span className="daily-temp-low">{formatTemperature(day.temperatureMin, unit)}</span>
              <div className="daily-range-bar-container">
                <div
                  className="daily-range-bar"
                  style={{
                    left: `${leftPercent}%`,
                    width: `${widthPercent}%`,
                  }}
                />
                {isToday && (
                  <div
                    className="daily-current-dot"
                    style={{ left: `${dotPercent}%` }}
                    aria-label={`Current temperature: ${formatTemperature(currentTemperature, unit)}`}
                  />
                )}
              </div>
              <span className="daily-temp-high">{formatTemperature(day.temperatureMax, unit)}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
