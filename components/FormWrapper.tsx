import { FormEventHandler } from 'react';
import { Heading, HeadingProps, Stack, StackProps } from '@chakra-ui/react';

type FormWrapperProps = StackProps & {
  onSubmit: FormEventHandler<HTMLDivElement>;
  title?: string;
  titleProps?: HeadingProps;
  formProps?: StackProps;
};

export function FormWrapper({ title, onSubmit, children, titleProps, formProps, ...props }: FormWrapperProps) {
  return (
    <Stack spacing={2} {...props}>
      <Heading as="h4" size="md" {...titleProps}>
        {title}
      </Heading>
      <Stack as="form" spacing={2} justifyContent="center" {...formProps} onSubmit={onSubmit}>
        {children}
      </Stack>
    </Stack>
  );
}
