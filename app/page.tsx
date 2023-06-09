'use client';

import { Button, Heading } from '@chakra-ui/react';
import { useLogoutMutation } from '@/hooks';
import { useRouter } from 'next/navigation';

export default function Home() {
  const logout = useLogoutMutation();
  const router = useRouter();
  
  const handleAuth = () => {
    if (localStorage.user) return logout.mutate();
    return router.push('/auth/login');
  };

  return (
    <>
      <Heading>Homepage!</Heading>
      <Button colorScheme="blue" onClick={handleAuth}>
        {localStorage.user ? 'Logout' : 'Login'}
      </Button>
    </>
  );
}
