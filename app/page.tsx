'use client'
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="text-red-500">
        Find A Family Doctor
      </div>
    </QueryClientProvider>
  )
}
