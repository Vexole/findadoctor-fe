import { ReactNode } from 'react';
import { Heading, Stack } from '@chakra-ui/react';

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};
export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <Stack spacing={3}>
      <Heading  as='h2' size='xl'>{title}</Heading>
      <Stack spacing={1}>{children}</Stack>
    </Stack>
  );
}
