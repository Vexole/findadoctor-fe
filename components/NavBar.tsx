"use client"
import { useState } from 'react';
import { useAuthenticatedUserContext } from '@/context';
import { getUser } from '@/utils/userUtils';
import {
  Stack,
  Link,
  IconButton,
  useDisclosure,
  StackDivider,
  Collapse,
  Box
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import dynamic from 'next/dynamic';

const links = [
  { href: '/', title: 'Home', role: '', accessLevel: '' },
  {
    href: '/doctors-search',
    title: 'Doctor Search',
    role: '',
    accessLevel: '',
    restrictRole: 'Doctor',
  },
  { href: '/auth/login', title: 'Login', role: '', accessLevel: 'unauthenticated' },
  { href: '/auth/register', title: 'Register', role: '', accessLevel: 'unauthenticated' },
  {
    href: '/doctors-profile',
    title: 'Profile',
    role: 'doctor',
    accessLevel: 'authenticated',
  },
  {
    href: '/doctors-profile',
    title: 'Profile',
    role: 'doctorunderreview',
    accessLevel: 'authenticated',
  },
  {
    href: '/doctors-profile',
    title: 'Profile',
    role: 'doctorrejected',
    accessLevel: 'authenticated',
  },
  {
    href: '/doctors-profile/appointments',
    title: 'Appointments',
    role: 'doctor',
    accessLevel: 'authenticated',
  },
  {
    href: '/patient/appointments',
    title: 'Appointments',
    role: 'patient',
    accessLevel: 'authenticated',
  },
  {
    href: '/doctors-profile/availability',
    title: 'Availability',
    role: 'doctor',
    accessLevel: 'authenticated',
  },
  {
    href: '/doctors-profile/availability',
    title: 'Availability',
    role: 'administrativeassistant',
    accessLevel: 'authenticated',
  },
  {
    href: '/admin/pending-doctors',
    title: 'Pending Doctors',
    role: 'admin',
    accessLevel: 'authenticated',
  },
  {
    href: '/doctors-profile/add-staff',
    title: 'Create Staff',
    role: 'doctor',
    accessLevel: 'authenticated',
  },
  {
    href: '/doctors-profile/patient-profile',
    title: 'Patients',
    role: 'doctor',
    accessLevel: 'authenticated',
  },
  {
    href: '/patient/create',
    title: 'Profile',
    role: 'patient',
    accessLevel: 'authenticated',
    isProfileCompleteRequired: false,
  },
  {
    href: '/patient',
    title: 'Profile',
    role: 'patient',
    accessLevel: 'authenticated',
    isProfileCompleteRequired: true,
  },
  { href: '/auth/logout', title: 'Logout', role: '', accessLevel: 'authenticated' },
];

function NavBar() {
  const { isOpen, onToggle } = useDisclosure();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const authenticatedUser = useAuthenticatedUserContext();
  const userRole = authenticatedUser?.role ?? getUser()?.role ?? '';
  const accessLevel = authenticatedUser ? 'authenticated' : 'unauthenticated';
  let allowedLinks = links
    .filter(link => link.role === '' || link.role.toLowerCase() === userRole.toLowerCase())
    .filter(link => link.accessLevel === '' || link.accessLevel === accessLevel)
    .filter(link => {
      if (link.restrictRole) {
        if (link.restrictRole !== userRole) {
          return link;
        }
      } else {
        return link;
      }
    });

  if (authenticatedUser && userRole === 'Patient' && authenticatedUser.isProfileComplete) {
    allowedLinks = allowedLinks.filter(
      link => !(link.title === 'Profile' && !link.isProfileCompleteRequired)
    );
  }

  if (authenticatedUser && userRole === 'Patient' && !authenticatedUser.isProfileComplete) {
    allowedLinks = allowedLinks.filter(
      link => !(link.title === 'Profile' && link.isProfileCompleteRequired)
    );
  }

  const toggleMenu = () => {
    setIsSmallScreen(!isSmallScreen);
  };

  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      color="blue.500"
      px={{ base: '2rem', md: '4rem' }}
      py="1rem"
      backgroundColor="blue.500"
      justifyContent="space-between"
      alignItems="center"
      className="nav-bar"
    >
      <Link
        href="/"
        fontWeight={700}
        color="white"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          style={{
            height: '2rem',
            width: '2rem',
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
          />
        </svg>
        <span>Find a Family Doctor</span>
      </Link>

      <Box display={{ base: 'block', md: 'none' }}>
        <IconButton
          aria-label="Open menu"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          colorScheme="white"
          onClick={onToggle}
          size="md"
        />
      </Box>

      <Stack
        direction="row"
        spacing={4}
        display={{ base: 'none', md: 'flex' }}
        divider={<StackDivider />}
        mt={{ base: 4, md: 0 }}
      >
        {allowedLinks.map(({ href, title }) => (
          <Link
            as={NextLink}
            href={href}
            style={{ cursor: 'pointer', color: 'white' }}
            key={title}
            color="white"
          >
            {title}
          </Link>
        ))}
      </Stack>

      {/* Hamburger menu for smaller devices */}
      <Collapse in={isOpen} animateOpacity>
        <Stack direction="column" spacing={4}>
          {allowedLinks.map(({ href, title }) => (
            <Link
              as={NextLink}
              href={href}
              style={{ cursor: 'pointer', color: 'white' }}
              key={title}
              color="blue.500"
            >
              {title}
            </Link>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
}

export default dynamic(() => Promise.resolve(NavBar), {
  ssr: false,
})