import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CountryPickerModal } from '../CountryPickerModal';

describe('CountryPickerModal Component', () => {
  it('renders country search, regions, and list', () => {
    const handleClose = vi.fn();
    const handleSelect = vi.fn();

    render(
      <CountryPickerModal
        isOpen={true}
        onClose={handleClose}
        onSelectCountry={handleSelect}
      />
    );

    expect(screen.getByText('Select Country Weather')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search by country, capital, or code/i)).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Asia' })).toBeInTheDocument();
    expect(screen.getByText('Japan')).toBeInTheDocument();
  });

  it('selects a country and passes correct location payload', () => {
    const handleClose = vi.fn();
    const handleSelect = vi.fn();

    render(
      <CountryPickerModal
        isOpen={true}
        onClose={handleClose}
        onSelectCountry={handleSelect}
      />
    );

    const japanBtn = screen.getByRole('button', { name: /View weather for Tokyo, Japan/i });
    fireEvent.click(japanBtn);

    expect(handleSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Tokyo',
        country: 'Japan',
        countryCode: 'JP',
      })
    );
    expect(handleClose).toHaveBeenCalled();
  });
});
