import { Injectable } from '@angular/core';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // in milliseconds
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor() {}

  /**
   * Set data in cache with a TTL in minutes
   */
  set<T>(key: string, data: T, ttlMinutes: number): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttlMinutes * 60 * 1000,
    };
    try {
      localStorage.setItem(key, JSON.stringify(entry));
    } catch (e) {
      console.warn('CacheService: Failed to save to localStorage', e);
    }
  }

  /**
   * Get data from cache. Returns null if not found or expired.
   */
  get<T>(key: string): T | null {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    try {
      const entry: CacheEntry<T> = JSON.parse(raw);
      const isExpired = Date.now() - entry.timestamp > entry.ttl;

      if (isExpired) {
        this.clear(key);
        return null;
      }

      return entry.data;
    } catch (e) {
      console.warn('CacheService: Failed to parse cache entry', e);
      this.clear(key);
      return null;
    }
  }

  /**
   * Clear a specific cache entry
   */
  clear(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Clear all cache entries
   */
  clearAll(): void {
    localStorage.clear();
  }
}
