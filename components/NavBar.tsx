import { Link, Stack, StackDivider } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';

const links = [
  { href: '/', title: 'Home', role: '' },
  { href: '/auth/login', title: 'Login', role: '' },
  { href: '/auth/register', title: 'Register', role: '' },
  { href: '/doctors-profile', title: 'Doctor Profile', role: 'doctor' },
  { href: '/admin/pending-doctors', title: 'Pending Doctors', role: 'admin' },
];

export function NavBar() {
  const [localStorageUser, setLocalStorageUser] = useState(localStorage.user);

  const authenticatedUser = localStorageUser ? JSON.parse(localStorageUser) : {};
  const userRole = authenticatedUser?.role ?? "";
  const allowedLinks = links.filter(link => link.role === "" || link.role === userRole.toLowerCase())

  useEffect(() => {
    const handleLocalStorageChange = () => {
      setLocalStorageUser(localStorage.user);
    };

    window.addEventListener('storage', handleLocalStorageChange);

    return () => {
      window.removeEventListener('storage', handleLocalStorageChange);
    };
  }, []);

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
