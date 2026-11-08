import React from 'react';
import { List, Navigation, Settings2 } from 'lucide-react';
import { Place } from '../../types/weather';
import './BottomBar.css';

interface BottomBarProps {
  places: Place[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenPlaces: () => void;
  onOpenSettings: () => void;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  places,
  activeIndex,
  onSelectIndex,
  onOpenPlaces,
  onOpenSettings,
}) => {
  return (
    <nav className="bottom-bar" aria-label="Weather app navigation">
      {/* Settings / Units Button */}
      <button
        className="bottom-bar-action-btn"
        onClick={onOpenSettings}
        aria-label="Open units and weather settings"
      >
        <Settings2 size={20} />
      </button>

      {/* Pagination dots */}
      <div className="bottom-bar-dots" role="tablist" aria-label="Saved places pagination">
        {places.map((place, idx) => {
          const isActive = idx === activeIndex;
          if (place.isCurrentLocation) {
            return (
              <button
                key={place.id}
                role="tab"
                aria-selected={isActive}
                aria-label={`Current location, ${place.name}`}
                className={`bottom-bar-location-icon ${isActive ? 'active' : ''}`}
                onClick={() => onSelectIndex(idx)}
              >
                <Navigation size={12} fill={isActive ? '#ffffff' : 'none'} />
              </button>
            );
          }

          return (
            <button
              key={place.id}
              role="tab"
              aria-selected={isActive}
              aria-label={`Place ${idx + 1}: ${place.name}`}
              className={`bottom-bar-dot ${isActive ? 'active' : ''}`}
              onClick={() => onSelectIndex(idx)}
            />
          );
        })}
      </div>

      {/* Places List Button */}
      <button
        className="bottom-bar-action-btn"
        onClick={onOpenPlaces}
        aria-label="Open saved places list"
      >
        <List size={22} />
      </button>
    </nav>
  );
};
