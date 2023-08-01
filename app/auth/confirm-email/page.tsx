'use client';
import { useConfirmEmailMutation } from '@/hooks';
import { Button, Heading, Spinner, Stack } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ConfirmEmail = () => {
  const confirmEmail = useConfirmEmailMutation();
  const searchParams = useSearchParams();
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const userId = searchParams.get('userId');
    const token = searchParams.get('token')?.replaceAll(' ', '+');
    if (!userId || !token) return;
    confirmEmail.mutate({ userId, token }, { onSuccess: () => setIsConfirmed(true) });
  }, [searchParams]);

  if (confirmEmail.isLoading) return <Spinner />;

  if (isConfirmed)
    return (
      <Stack spacing={5} alignItems={'center'}>
        <Heading as="h1" size="2xl">
          Thank you!
        </Heading>
        <Heading as="h3" size="md">
          Your email has been confirmed.
        </Heading>
        <Link href="/auth/login">
          <Button colorScheme="blue">Go To Login</Button>
        </Link>
      </Stack>
    );

  return (
    <Stack spacing={5} alignItems={'center'}>
      <Heading as="h1" size="2xl">
        Sorry!
      </Heading>
      <Heading as="h3" size="md">
        Something went wrong. Try again later.
      </Heading>
    </Stack>
  );
};

export default dynamic(() => Promise.resolve(ConfirmEmail), {
  ssr: false,
});