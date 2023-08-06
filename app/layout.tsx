'use client';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '/public/styles.css';
import NavBar from '@/components/NavBar';

const inter = Inter({ subsets: ['latin'] });

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Providers>
            <NavBar />
            <main>{children}</main>
          </Providers>
        </QueryClientProvider>
      </body>
    </html>
  );
}
