import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { redis } from './redis-client';

// SWR configuration
export const swrConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 2000,
  errorRetryCount: 3,
  errorRetryInterval: 5000,
};

// Custom fetcher with Redis caching
export const fetcher = async (url: string) => {
  try {
    // Check Redis cache first
    const cached = await redis.get(`cache:${url}`);
    if (cached) {
      return JSON.parse(cached);
    }

    // Fetch from API
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Cache in Redis for 5 minutes
    await redis.set(`cache:${url}`, JSON.stringify(data), 300);
    
    return data;
  } catch (error) {
    console.error('Fetcher error:', error);
    throw error;
  }
};

// Custom fetcher for POST requests
export const postFetcher = async (url: string, data: any) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('POST fetcher error:', error);
    throw error;
  }
};

// Custom fetcher for PUT requests
export const putFetcher = async (url: string, data: any) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('PUT fetcher error:', error);
    throw error;
  }
};

// Custom fetcher for DELETE requests
export const deleteFetcher = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('DELETE fetcher error:', error);
    throw error;
  }
};

// Custom hooks for common data fetching

// Products hook
export const useProducts = (page: number = 1, limit: number = 12) => {
  return useSWR(
    `/api/products?page=${page}&limit=${limit}`,
    fetcher,
    swrConfig
  );
};

// Product by ID hook
export const useProduct = (id: string) => {
  return useSWR(
    id ? `/api/products/${id}` : null,
    fetcher,
    swrConfig
  );
};

// Search products hook
export const useProductSearch = (query: string, filters: any = {}) => {
  const searchParams = new URLSearchParams();
  if (query) searchParams.append('search', query);
  if (filters.category) searchParams.append('category', filters.category);
  if (filters.minPrice) searchParams.append('minPrice', filters.minPrice.toString());
  if (filters.maxPrice) searchParams.append('maxPrice', filters.maxPrice.toString());
  
  return useSWR(
    query ? `/api/products/search?${searchParams.toString()}` : null,
    fetcher,
    swrConfig
  );
};

// Categories hook
export const useCategories = () => {
  return useSWR('/api/categories', fetcher, swrConfig);
};

// User hook
export const useUser = () => {
  return useSWR('/api/users/me', fetcher, swrConfig);
};

// Analytics hook
export const useAnalytics = (period: string = '7d') => {
  return useSWR(
    `/api/analytics?period=${period}`,
    fetcher,
    swrConfig
  );
};

// Custom hook for real-time data with polling
export const useRealtimeData = (url: string, interval: number = 5000) => {
  return useSWR(url, fetcher, {
    ...swrConfig,
    refreshInterval: interval,
  });
};

// Custom hook for infinite loading
export const useInfiniteProducts = (limit: number = 12) => {
  const { data, error, isValidating } = useSWR(
    `/api/products?limit=${limit}`,
    fetcher,
    swrConfig
  );

  const products = data ? data.flat() : [];
  const isLoading = !data && !error;

  return {
    products,
    isLoading,
    isValidating,
    error,
  };
};

// Cache management utilities
export const cacheUtils = {
  // Invalidate cache for specific key
  invalidateCache: async (key: string) => {
    await redis.del(`cache:${key}`);
  },

  // Invalidate all cache
  invalidateAllCache: async () => {
    // This is a simplified version - in production you might want to use SCAN
    console.log('Cache invalidation requested');
  },

  // Prefetch data
  prefetch: async (url: string) => {
    try {
      const data = await fetcher(url);
      return data;
    } catch (error) {
      console.error('Prefetch error:', error);
    }
  },
};

// Error boundary hook
export const useErrorBoundary = () => {
  const { data, error } = useSWR('/api/health', fetcher, {
    errorRetryCount: 0,
    revalidateOnFocus: false,
  });

  return {
    isHealthy: !error && data?.status === 'ok',
    error,
  };
};

// Performance monitoring hook
export const usePerformance = () => {
  const { data, error } = useSWR('/api/performance', fetcher, {
    refreshInterval: 30000, // Check every 30 seconds
  });

  return {
    metrics: data,
    error,
    isLoading: !data && !error,
  };
};
