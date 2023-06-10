import { FormEventHandler, ReactNode } from 'react';
import { Heading, Stack } from '@chakra-ui/react';

type FormWrapperProps = {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLDivElement>;
  title: string;
};
export function FormWrapper({ title, onSubmit, children }: FormWrapperProps) {
  return (
    <Stack spacing={4}>
      <Heading as="h2" size="xl">
        {title}
      </Heading>
      <Stack as="form" spacing={2} onSubmit={onSubmit}>
        {children}
      </Stack>
    </Stack>
  );
}
