'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

interface QueryProviderProps {
  children: React.ReactNode;
}

/**
 * React Query provider component
 * 
 * Provides React Query context to the application with optimized caching configuration.
 * Configures stale time, cache time, and refetch behavior for better performance.
 * 
 * @param props - Component props
 * @param props.children - Child components to wrap with React Query provider
 * @returns JSX element wrapping children with QueryClientProvider
 */
export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh for 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes - cache persists for 10 minutes (gcTime in v5)
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: true,
            retry: 1,
          },
          mutations: {
            retry: 1,
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
