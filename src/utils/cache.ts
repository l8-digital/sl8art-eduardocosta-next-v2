// src/app/api/utils/cache.ts

type CacheEntry<T> = {
  value: T;
  expires: number;
};

export class ApiCache<T = unknown> {
  private store: Record<string, CacheEntry<T>> = {};

  constructor(private ttl: number = 1000 * 60 * 60 * 24) {} // 24h

  get(key: string): T | null {
    const entry = this.store[key];
    if (!entry) return null;

    // expirado
    if (Date.now() > entry.expires) {
      delete this.store[key];
      return null;
    }

    return entry.value;
  }

  set(key: string, value: T): void {
    this.store[key] = {
      value,
      expires: Date.now() + this.ttl,
    };
  }

  clear(key?: string): void {
    if (key) delete this.store[key];
    else this.store = {};
  }
}

// Instância global
export const apiCache = new ApiCache();
