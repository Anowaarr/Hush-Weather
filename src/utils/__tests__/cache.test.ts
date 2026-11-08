import { describe, it, expect, beforeEach } from 'vitest';
import { getCached, setCached, removeCached, clearAllWeatherCache } from '../../api/cache';

describe('Weather API Cache', () => {
  beforeEach(() => {
    clearAllWeatherCache();
  });

  it('stores and retrieves cached data before expiry', () => {
    const key = 'weather_test_entry';
    const payload = { temp: 24, city: 'Cupertino' };

    setCached(key, payload, 5000);
    const retrieved = getCached<typeof payload>(key);
    expect(retrieved).toEqual(payload);
  });

  it('returns null and purges when entry is expired', async () => {
    const key = 'weather_expired_entry';
    // 5ms TTL
    setCached(key, { temp: 10 }, 5);

    await new Promise((r) => setTimeout(r, 15));

    const retrieved = getCached(key);
    expect(retrieved).toBeNull();
  });

  it('removes entries explicitly', () => {
    const key = 'weather_to_remove';
    setCached(key, { value: 123 });
    removeCached(key);
    expect(getCached(key)).toBeNull();
  });
});
