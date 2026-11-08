import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from '../App';

describe('App Integration', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear();
  });

  it('renders without crashing and shows navigation bar', () => {
    render(<App />);

    expect(screen.getByRole('navigation', { name: /Weather app navigation/i })).toBeInTheDocument();
  });

  it('opens and closes settings modal', () => {
    render(<App />);

    const settingsBtn = screen.getByLabelText(/Open units and weather settings/i);
    fireEvent.click(settingsBtn);

    expect(screen.getByText('Units of Measurement')).toBeInTheDocument();

    const doneBtn = screen.getByText('Done');
    fireEvent.click(doneBtn);

    expect(screen.queryByText('Units of Measurement')).not.toBeInTheDocument();
  });

  it('opens and closes saved places modal', () => {
    render(<App />);

    const placesBtn = screen.getByLabelText(/Open saved places list/i);
    fireEvent.click(placesBtn);

    expect(screen.getByPlaceholderText(/Search for a city or airport/i)).toBeInTheDocument();

    const closeBtn = screen.getByLabelText(/Close saved places/i);
    fireEvent.click(closeBtn);

    expect(screen.queryByPlaceholderText(/Search for a city or airport/i)).not.toBeInTheDocument();
  });
});
