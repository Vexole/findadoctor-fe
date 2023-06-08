import { Container } from '@chakra-ui/react';
import { ReactElement, useEffect, useState } from 'react';

type PageWrapperProps = {
  children: ReactElement | ReactElement[];
};

export const PageWrapper = ({ children }: PageWrapperProps) => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  if (!domLoaded) return null;

  return <Container>{children}</Container>;
};
