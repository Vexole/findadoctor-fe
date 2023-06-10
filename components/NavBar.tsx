import { Link, Stack, StackDivider } from '@chakra-ui/react';
import NextLink from 'next/link';

const links = [
  { href: '/', title: 'Home' },
  { href: '/auth/login', title: 'Login' },
  { href: '/auth/register', title: 'Register' },
];

export function NavBar() {
  return (
    <Stack direction="row" divider={<StackDivider />}>
      {links.map(({ href, title }) => (
        <Link as={NextLink} href={href} key={title} color="blue.500">
          {title}
        </Link>
      ))}
    </Stack>
  );
}
