import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BottomBar } from '../BottomBar';
import { Place } from '../../../types/weather';

const mockPlaces: Place[] = [
  {
    id: 'gps',
    name: 'My Location',
    latitude: 37.77,
    longitude: -122.41,
    isCurrentLocation: true,
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    latitude: 35.68,
    longitude: 139.69,
  },
];

describe('BottomBar Navigation Component', () => {
  it('renders navigation tabs for each place', () => {
    const handleSelect = vi.fn();
    const handlePlaces = vi.fn();
    const handleSettings = vi.fn();

    render(
      <BottomBar
        places={mockPlaces}
        activeIndex={0}
        onSelectIndex={handleSelect}
        onOpenPlaces={handlePlaces}
        onOpenSettings={handleSettings}
      />
    );

    const tabs = screen.getAllByRole('tab');
    expect(tabs.length).toBe(2);

    fireEvent.click(tabs[1]);
    expect(handleSelect).toHaveBeenCalledWith(1);

    const listBtn = screen.getByLabelText(/Open saved places list/i);
    fireEvent.click(listBtn);
    expect(handlePlaces).toHaveBeenCalled();
  });
});
