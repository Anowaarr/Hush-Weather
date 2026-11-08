import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PlacesModal } from '../PlacesModal';
import { Place } from '../../../types/weather';

const mockPlaces: Place[] = [
  { id: '1', name: 'Cupertino', latitude: 37.32, longitude: -122.03 },
  { id: '2', name: 'Tokyo', latitude: 35.68, longitude: 139.69 },
];

describe('PlacesModal Component', () => {
  it('renders saved places list when open', () => {
    const handleClose = vi.fn();
    const handleSelect = vi.fn();
    const handleAdd = vi.fn();
    const handleDelete = vi.fn();
    const handleLocation = vi.fn();

    render(
      <PlacesModal
        isOpen={true}
        onClose={handleClose}
        places={mockPlaces}
        activePlaceId="1"
        onSelectPlace={handleSelect}
        onAddPlace={handleAdd}
        onDeletePlace={handleDelete}
        onUseCurrentLocation={handleLocation}
        isLocating={false}
      />
    );

    expect(screen.getByText('Weather')).toBeInTheDocument();
    expect(screen.getByText('Cupertino')).toBeInTheDocument();
    expect(screen.getByText('Tokyo')).toBeInTheDocument();

    const cupertinoBtn = screen.getByLabelText(/Select Cupertino/i);
    fireEvent.click(cupertinoBtn);
    expect(handleSelect).toHaveBeenCalledWith(mockPlaces[0]);
  });
});
