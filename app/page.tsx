'use client';

import { Button, Heading } from '@chakra-ui/react';
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

  return (
    <>
      <Heading>Homepage!</Heading>
      <Button colorScheme="blue" onClick={handleAuth} isLoading={logout.isLoading}>
        {user ? 'Logout' : 'Login'}
      </Button>
    </>
  );
}
