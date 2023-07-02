import { useAuthenticatedUserContext } from '@/context';
import { Link, Stack, StackDivider } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';

const links = [
  { href: '/', title: 'Home', role: '', accessLevel: '' },
  { href: '/auth/login', title: 'Login', role: '', accessLevel: 'unauthenticated' },
  { href: '/auth/register', title: 'Register', role: '', accessLevel: 'unauthenticated' },
  { href: '/doctors-profile', title: 'Doctor Profile', role: 'doctor', accessLevel: 'authenticated' },
  { href: '/admin/pending-doctors', title: 'Pending Doctors', role: 'admin', accessLevel: 'authenticated' },
  { href: '/auth/logout', title: 'Logout', role: '', accessLevel: 'authenticated' },
];

export function NavBar() {

  const authenticatedUser = useAuthenticatedUserContext();
  const userRole = authenticatedUser?.role ?? "";
  const accessLevel = authenticatedUser ? "authenticated" : "unauthenticated";
  const allowedLinks = links.filter(link => link.role === "" || link.role === userRole.toLowerCase())
    .filter(link => link.accessLevel === "" || link.accessLevel === accessLevel)

  return (
    <Stack direction="row" divider={<StackDivider />}>
      {allowedLinks.map(({ href, title }) => (
        <Link as={NextLink} href={href} key={title} color="blue.500">
          {title}
        </Link>
      ))}
    </Stack>
  );
}
