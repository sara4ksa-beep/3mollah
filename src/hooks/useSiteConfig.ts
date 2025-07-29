'use client';

import { useEffect, useState } from 'react';
import { getSiteConfig } from '@/lib/config';

export const useSiteConfig = () => {
  const [config, setConfig] = useState(() => getSiteConfig());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // الحصول على النطاق الحالي من المتصفح
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const siteConfig = getSiteConfig(hostname);
      setConfig(siteConfig);
    }
    setLoading(false);
  }, []);

  return { config, loading };
}; 