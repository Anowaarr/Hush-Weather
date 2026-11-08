const DEFAULT_CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

const memoryStore = new Map<string, CacheEntry<unknown>>();

export function getCached<T>(key: string): T | null {
  try {
    let entry: CacheEntry<T> | null = null;

    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        entry = JSON.parse(raw) as CacheEntry<T>;
      }
    }

    if (!entry && memoryStore.has(key)) {
      entry = memoryStore.get(key) as CacheEntry<T>;
    }

    if (!entry) {
      return null;
    }

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    if (isExpired) {
      removeCached(key);
      return null;
    }

    return entry.data;
  } catch {
    return null;
  }
}

export function setCached<T>(key: string, data: T, ttlMs = DEFAULT_CACHE_TTL_MS): void {
  try {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttlMs,
    };

    memoryStore.set(key, entry as CacheEntry<unknown>);

    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(entry));
    }
  } catch {
    // If quota exceeded or storage unavailable, keep in memory
  }
}

export function removeCached(key: string): void {
  try {
    memoryStore.delete(key);
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(key);
    }
  } catch {
    // Ignore storage deletion errors
  }
}

export function clearAllWeatherCache(): void {
  try {
    memoryStore.clear();
    if (typeof window !== 'undefined' && window.localStorage) {
      const keysToRemove: string[] = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key && key.startsWith('weather_')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((k) => window.localStorage.removeItem(k));
    }
  } catch {
    // Ignore
  }
}
