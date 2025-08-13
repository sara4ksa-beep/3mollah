// Client-side Redis mock implementation
// This file provides a mock Redis interface for client-side usage

export const redis = {
  // Mock set function
  async set(key: string, value: string, expireSeconds?: number): Promise<void> {
    // In client-side, we can use localStorage as a fallback
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
        if (expireSeconds) {
          const expiry = Date.now() + (expireSeconds * 1000);
          localStorage.setItem(`${key}:expiry`, expiry.toString());
        }
      }
    } catch (error) {
      console.warn('Client-side Redis mock failed:', error);
    }
  },

  // Mock get function
  async get(key: string): Promise<string | null> {
    try {
      if (typeof window !== 'undefined') {
        const value = localStorage.getItem(key);
        if (!value) return null;

        // Check expiry
        const expiry = localStorage.getItem(`${key}:expiry`);
        if (expiry && Date.now() > parseInt(expiry)) {
          localStorage.removeItem(key);
          localStorage.removeItem(`${key}:expiry`);
          return null;
        }

        return value;
      }
      return null;
    } catch (error) {
      console.warn('Client-side Redis mock failed:', error);
      return null;
    }
  },

  // Mock delete function
  async del(key: string): Promise<number> {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
        localStorage.removeItem(`${key}:expiry`);
        return 1;
      }
      return 0;
    } catch (error) {
      console.warn('Client-side Redis mock failed:', error);
      return 0;
    }
  },

  // Mock exists function
  async exists(key: string): Promise<boolean> {
    try {
      if (typeof window !== 'undefined') {
        return localStorage.getItem(key) !== null;
      }
      return false;
    } catch (error) {
      console.warn('Client-side Redis mock failed:', error);
      return false;
    }
  },

  // Mock hash functions
  async hSet(key: string, field: string, value: string): Promise<void> {
    try {
      if (typeof window !== 'undefined') {
        const hashKey = `${key}:${field}`;
        localStorage.setItem(hashKey, value);
      }
    } catch (error) {
      console.warn('Client-side Redis mock failed:', error);
    }
  },

  async hGet(key: string, field: string): Promise<string | null> {
    try {
      if (typeof window !== 'undefined') {
        const hashKey = `${key}:${field}`;
        return localStorage.getItem(hashKey);
      }
      return null;
    } catch (error) {
      console.warn('Client-side Redis mock failed:', error);
      return null;
    }
  },

  async hGetAll(key: string): Promise<Record<string, string>> {
    try {
      if (typeof window !== 'undefined') {
        const result: Record<string, string> = {};
        for (let i = 0; i < localStorage.length; i++) {
          const storageKey = localStorage.key(i);
          if (storageKey && storageKey.startsWith(`${key}:`) && !storageKey.includes(':expiry')) {
            const field = storageKey.replace(`${key}:`, '');
            result[field] = localStorage.getItem(storageKey) || '';
          }
        }
        return result;
      }
      return {};
    } catch (error) {
      console.warn('Client-side Redis mock failed:', error);
      return {};
    }
  },

  // Mock increment function
  async incr(key: string): Promise<number> {
    try {
      if (typeof window !== 'undefined') {
        const current = parseInt(localStorage.getItem(key) || '0');
        const newValue = current + 1;
        localStorage.setItem(key, newValue.toString());
        return newValue;
      }
      return 0;
    } catch (error) {
      console.warn('Client-side Redis mock failed:', error);
      return 0;
    }
  },

  // Mock setEx function
  async setEx(key: string, seconds: number, value: string): Promise<void> {
    return this.set(key, value, seconds);
  },

  // Mock TTL function
  async ttl(key: string): Promise<number> {
    try {
      if (typeof window !== 'undefined') {
        const expiry = localStorage.getItem(`${key}:expiry`);
        if (!expiry) return -1;
        
        const remaining = parseInt(expiry) - Date.now();
        return Math.max(0, Math.floor(remaining / 1000));
      }
      return -1;
    } catch (error) {
      console.warn('Client-side Redis mock failed:', error);
      return -1;
    }
  },
};

export default redis;
