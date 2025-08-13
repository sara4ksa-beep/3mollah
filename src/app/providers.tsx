'use client';

import { SWRConfig } from 'swr';
import { swrConfig } from '@/lib/swr';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={swrConfig}>
      {children}
    </SWRConfig>
  );
}
