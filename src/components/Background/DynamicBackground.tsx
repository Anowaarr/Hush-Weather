import React, { useEffect, useState } from 'react';
import { WeatherTheme } from '../../types/weather';
import { WeatherCanvas } from './WeatherCanvas';
import './DynamicBackground.css';

interface DynamicBackgroundProps {
  theme: WeatherTheme;
}

export const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ theme }) => {
  const [currentTheme, setCurrentTheme] = useState<WeatherTheme>(theme);
  const [prevTheme, setPrevTheme] = useState<WeatherTheme | null>(null);
  const [isCrossFading, setIsCrossFading] = useState(false);

  useEffect(() => {
    if (theme !== currentTheme) {
      setPrevTheme(currentTheme);
      setCurrentTheme(theme);
      setIsCrossFading(true);

      const timer = setTimeout(() => {
        setIsCrossFading(false);
        setPrevTheme(null);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [theme, currentTheme]);

  return (
    <div className="dynamic-bg-container" aria-hidden="true">
      {prevTheme && (
        <div
          className={`dynamic-bg-layer theme-${prevTheme}`}
          style={{ opacity: isCrossFading ? 0 : 1 }}
        />
      )}
      <div
        className={`dynamic-bg-layer theme-${currentTheme}`}
        style={{ opacity: isCrossFading ? 1 : 1 }}
      />
      <div className="atmospheric-vignette" />
      <WeatherCanvas theme={currentTheme} />
    </div>
  );
};
