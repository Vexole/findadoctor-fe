'use client';

import { Container, Heading } from '@chakra-ui/react';
import { LoginForm } from './form';

export default function Login() {
  return (
    <Container>
      <Heading>Login</Heading>
      <LoginForm />
    </Container>
  );
}
