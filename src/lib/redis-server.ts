import { createClient } from 'redis';

// Redis client configuration - Server side only
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    connectTimeout: 10000,
  },
});

// Error handling
redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
  console.log('Redis Client Connected');
});

// Connect to Redis
if (!redisClient.isOpen) {
  redisClient.connect().catch(console.error);
}

// Utility functions for Redis operations
export const redis = {
  // Set key-value pair with optional expiration
  async set(key: string, value: string, expireSeconds?: number): Promise<void> {
    try {
      if (expireSeconds) {
        await redisClient.setEx(key, expireSeconds, value);
      } else {
        await redisClient.set(key, value);
      }
    } catch (error) {
      console.error('Redis SET Error:', error);
      throw error;
    }
  },

  // Get value by key
  async get(key: string): Promise<string | null> {
    try {
      return await redisClient.get(key);
    } catch (error) {
      console.error('Redis GET Error:', error);
      return null;
    }
  },

  // Delete key
  async del(key: string): Promise<number> {
    try {
      return await redisClient.del(key);
    } catch (error) {
      console.error('Redis DEL Error:', error);
      return 0;
    }
  },

  // Check if key exists
  async exists(key: string): Promise<boolean> {
    try {
      const result = await redisClient.exists(key);
      return result === 1;
    } catch (error) {
      console.error('Redis EXISTS Error:', error);
      return false;
    }
  },

  // Set hash field
  async hSet(key: string, field: string, value: string): Promise<void> {
    try {
      await redisClient.hSet(key, field, value);
    } catch (error) {
      console.error('Redis HSET Error:', error);
      throw error;
    }
  },

  // Get hash field
  async hGet(key: string, field: string): Promise<string | null> {
    try {
      return await redisClient.hGet(key, field);
    } catch (error) {
      console.error('Redis HGET Error:', error);
      return null;
    }
  },

  // Get all hash fields
  async hGetAll(key: string): Promise<Record<string, string>> {
    try {
      return await redisClient.hGetAll(key);
    } catch (error) {
      console.error('Redis HGETALL Error:', error);
      return {};
    }
  },

  // Increment counter
  async incr(key: string): Promise<number> {
    try {
      return await redisClient.incr(key);
    } catch (error) {
      console.error('Redis INCR Error:', error);
      return 0;
    }
  },

  // Set with expiration (TTL)
  async setEx(key: string, seconds: number, value: string): Promise<void> {
    try {
      await redisClient.setEx(key, seconds, value);
    } catch (error) {
      console.error('Redis SETEX Error:', error);
      throw error;
    }
  },

  // Get TTL for key
  async ttl(key: string): Promise<number> {
    try {
      return await redisClient.ttl(key);
    } catch (error) {
      console.error('Redis TTL Error:', error);
      return -1;
    }
  },
};

export default redisClient;
