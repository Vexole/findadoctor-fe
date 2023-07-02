'use client';

import { Button, Container, Heading, Stack } from '@chakra-ui/react';
import { useLogoutMutation } from '@/hooks';
import { useRouter } from 'next/navigation';
import { useAuthenticatedUserContext } from '@/context';

export default function Home() {
  const logout = useLogoutMutation();
  const router = useRouter();
  const user = useAuthenticatedUserContext();

  const handleAuth = () => {
    if (user) return logout.mutate();
    return router.push('/auth/login');
  };

  if (user)
    return (
      <Stack spacing={3}>
        <Heading>Welcome,</Heading>
        <Heading size="md" as="h3">
          {user.email}
        </Heading>
        <Button colorScheme="blue" onClick={handleAuth} isLoading={logout.isLoading}>
          Logout
        </Button>
      </Stack>
    );

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <div
        style={{
          width: '50%',
          backgroundColor: '#ebf8ff',
          paddingTop: '4rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h3
          style={{
            fontSize: '3rem',
            fontWeight: 700,
            lineHeight: '1.2',
            color: '#2d3748',
          }}
        >
          Find Highly Rated <br /> Family Doctors <br />
          Easily
        </h3>
        <p>Select you doctor and preferred slot to book your appointment</p>
      </div>
      <div
        style={{
          width: '50%',
          backgroundColor: '#4299e1',
          paddingTop: '4rem',
        }}
      ></div>
    </div>
  );
}
