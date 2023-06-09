'use client';

import { Button, Heading, Stack } from '@chakra-ui/react';
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
    <Stack spacing={3}>
      <Heading>Homepage</Heading>
      <Button colorScheme="blue" onClick={handleAuth}>
        Login
      </Button>
    </Stack>
  );
}
