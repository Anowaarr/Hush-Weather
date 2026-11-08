import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Place, WeatherTheme } from './types/weather';
import { UnitsConfig } from './types/units';
import { DEFAULT_PLACES } from './constants/defaultLocations';
import { getWeatherCodeInfo } from './constants/weatherCodes';
import { getDefaultUnits } from './utils/units';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useGeolocation } from './hooks/useGeolocation';
import { useWeather } from './hooks/useWeather';
import { useScrollPosition } from './hooks/useScrollPosition';
import { DynamicBackground } from './components/Background/DynamicBackground';
import { HeroWeather } from './components/Hero/HeroWeather';
import { StickyHeader } from './components/Hero/StickyHeader';
import { HourlyForecast } from './components/Hourly/HourlyForecast';
import { TenDayForecast } from './components/Daily/TenDayForecast';
import { DetailTiles } from './components/Details/DetailTiles';
import { BottomBar } from './components/Navigation/BottomBar';
import { PlacesModal } from './components/Places/PlacesModal';
import { UnitsModal } from './components/Settings/UnitsModal';
import { WeatherSkeleton } from './components/UI/Skeleton';
import { ErrorState } from './components/UI/ErrorState';
import { OfflineBanner } from './components/UI/OfflineBanner';
import { Footer } from './components/UI/Footer';
import './App.css';

const INITIAL_UNITS = getDefaultUnits();

export default function App() {
  const [places, setPlaces] = useLocalStorage<Place[]>('aether_saved_places', DEFAULT_PLACES);
  const [activePlaceIndex, setActivePlaceIndex] = useLocalStorage<number>('aether_active_index', 0);
  const [units, setUnits] = useLocalStorage<UnitsConfig>('aether_units', INITIAL_UNITS);

  const [isPlacesOpen, setIsPlacesOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Safe active place selection
  const safeIndex = Math.min(Math.max(0, activePlaceIndex), Math.max(0, places.length - 1));
  const activePlace = places[safeIndex] ?? places[0] ?? DEFAULT_PLACES[0];

  const { weather, loading, error, refresh } = useWeather(activePlace);
  const { requestLocation, loading: isLocating } = useGeolocation();
  const scrollY = useScrollPosition();

  // Active theme
  const currentCodeInfo = weather
    ? getWeatherCodeInfo(weather.current.weatherCode, weather.current.isDay)
    : null;
  const activeTheme: WeatherTheme = currentCodeInfo ? currentCodeInfo.theme : 'clear-day';

  // Keyboard navigation: left/right arrows to switch places
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPlacesOpen || isSettingsOpen) return;
      if (e.key === 'ArrowRight') {
        setActivePlaceIndex((prev) => (prev + 1) % places.length);
      } else if (e.key === 'ArrowLeft') {
        setActivePlaceIndex((prev) => (prev - 1 + places.length) % places.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [places.length, isPlacesOpen, isSettingsOpen, setActivePlaceIndex]);

  // Touch swipe gesture handling
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Detect horizontal swipe (horizontal distance > 60px and greater than vertical movement)
    if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0) {
        // Swiped left -> next place
        setActivePlaceIndex((prev) => (prev + 1) % places.length);
      } else {
        // Swiped right -> prev place
        setActivePlaceIndex((prev) => (prev - 1 + places.length) % places.length);
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const handleSelectPlace = useCallback((place: Place) => {
    const foundIndex = places.findIndex((p) => p.id === place.id);
    if (foundIndex !== -1) {
      setActivePlaceIndex(foundIndex);
    } else {
      setPlaces((prev) => [place, ...prev]);
      setActivePlaceIndex(0);
    }
  }, [places, setActivePlaceIndex, setPlaces]);

  const handleAddPlace = useCallback((place: Place) => {
    setPlaces((prev) => {
      const exists = prev.some((p) => p.id === place.id);
      return exists ? prev : [place, ...prev];
    });
  }, [setPlaces]);

  const handleDeletePlace = useCallback((placeId: string) => {
    setPlaces((prev) => {
      if (prev.length <= 1) return prev;
      const filtered = prev.filter((p) => p.id !== placeId);
      return filtered;
    });
    setActivePlaceIndex((prev) => Math.max(0, Math.min(prev, places.length - 2)));
  }, [places.length, setActivePlaceIndex, setPlaces]);

  const handleUseCurrentLocation = useCallback(async () => {
    const gpsPlace = await requestLocation();
    if (gpsPlace) {
      setPlaces((prev) => {
        const withoutOldGps = prev.filter((p) => !p.isCurrentLocation);
        return [gpsPlace, ...withoutOldGps];
      });
      setActivePlaceIndex(0);
    }
  }, [requestLocation, setActivePlaceIndex, setPlaces]);

  return (
    <div
      className="app-viewport"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <OfflineBanner />
      <DynamicBackground theme={activeTheme} />

      {weather && (
        <StickyHeader
          cityName={weather.place.name}
          temperature={weather.current.temperature}
          condition={currentCodeInfo?.label ?? 'Clear'}
          unit={units.temperature}
          scrollY={scrollY}
        />
      )}

      {loading && !weather && <WeatherSkeleton />}

      {error && !weather && (
        <ErrorState message={error.message} onRetry={refresh} />
      )}

      {weather && (
        <main className="weather-content">
          <HeroWeather
            cityName={weather.place.name}
            temperature={weather.current.temperature}
            condition={currentCodeInfo?.label ?? 'Clear'}
            highTemp={weather.daily[0]?.temperatureMax ?? weather.current.temperature}
            lowTemp={weather.daily[0]?.temperatureMin ?? weather.current.temperature}
            unit={units.temperature}
            scrollY={scrollY}
          />

          <HourlyForecast items={weather.hourly} unit={units.temperature} />

          <TenDayForecast
            daily={weather.daily}
            currentTemperature={weather.current.temperature}
            unit={units.temperature}
          />

          <DetailTiles weather={weather} units={units} />

          <Footer />
        </main>
      )}

      <BottomBar
        places={places}
        activeIndex={safeIndex}
        onSelectIndex={setActivePlaceIndex}
        onOpenPlaces={() => setIsPlacesOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <PlacesModal
        isOpen={isPlacesOpen}
        onClose={() => setIsPlacesOpen(false)}
        places={places}
        activePlaceId={activePlace.id}
        onSelectPlace={handleSelectPlace}
        onAddPlace={handleAddPlace}
        onDeletePlace={handleDeletePlace}
        onUseCurrentLocation={handleUseCurrentLocation}
        isLocating={isLocating}
      />

      <UnitsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        units={units}
        onUpdateUnits={(updated) => setUnits((prev) => ({ ...prev, ...updated }))}
      />
    </div>
  );
}
