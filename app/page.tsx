'use client';

import { PageWrapper } from '@/components';
import { Button, Heading } from '@chakra-ui/react';

export default function Home() {
  return (
    <PageWrapper>
      <Heading>Homepage!</Heading>
      <Button colorScheme="blue">I'm a button</Button>
    </PageWrapper>
  );
}
