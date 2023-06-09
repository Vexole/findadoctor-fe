'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, Container } from '@chakra-ui/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } }));
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  if (!domLoaded) return null;

  return (
    <QueryClientProvider client={client}>
      <CacheProvider>
        <ChakraProvider>
          <Container>{children}</Container>
        </ChakraProvider>
      </CacheProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
