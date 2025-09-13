'use client';

import { SWRConfig } from 'swr';
import { swrConfig } from '@/lib/swr';
import { NotificationProvider } from '@/contexts/NotificationContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={swrConfig}>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </SWRConfig>
  );
}
