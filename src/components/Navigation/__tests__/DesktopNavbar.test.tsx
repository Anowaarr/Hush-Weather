import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DesktopNavbar } from '../DesktopNavbar';
import { Place } from '../../../types/weather';
import { UnitsConfig } from '../../../types/units';

const mockPlaces: Place[] = [
  { id: '1', name: 'Cupertino', country: 'United States', countryCode: 'US', latitude: 37.32, longitude: -122.03 },
  { id: '2', name: 'Tokyo', country: 'Japan', countryCode: 'JP', latitude: 35.68, longitude: 139.69 },
];

const mockUnits: UnitsConfig = {
  temperature: 'celsius',
  speed: 'kmh',
  precipitation: 'mm',
  pressure: 'hPa',
  distance: 'km',
  appearance: 'auto',
};

describe('DesktopNavbar Component', () => {
  it('renders brand, quick country button, and search input', () => {
    const handleSelect = vi.fn();
    const handleAdd = vi.fn();
    const handleCountry = vi.fn();
    const handleSettings = vi.fn();
    const handleLocation = vi.fn();
    const handleToggleTemp = vi.fn();

    render(
      <DesktopNavbar
        places={mockPlaces}
        activePlaceId="1"
        units={mockUnits}
        onSelectPlace={handleSelect}
        onAddPlace={handleAdd}
        onOpenCountryPicker={handleCountry}
        onOpenSettings={handleSettings}
        onUseCurrentLocation={handleLocation}
        onToggleTempUnit={handleToggleTemp}
        isLocating={false}
      />
    );

    expect(screen.getByText('Hush')).toBeInTheDocument();
    expect(screen.getByText('All Countries')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search any city or place in the world/i)).toBeInTheDocument();

    const countryBtn = screen.getByRole('button', { name: /Choose country from directory/i });
    fireEvent.click(countryBtn);
    expect(handleCountry).toHaveBeenCalled();

    const fahrenheitBtn = screen.getByRole('radio', { name: '°F' });
    fireEvent.click(fahrenheitBtn);
    expect(handleToggleTemp).toHaveBeenCalledWith('fahrenheit');
  });
});
