'use client';

import {
  Container,
  Input,
  Heading,
  Flex,
  Select,
  Textarea,
  Box,
  FormControl,
  FormLabel,
  Button,
} from '@chakra-ui/react';

export default function PatientProfile() {
  return (
    <Container style={{ marginTop: '16px', marginBottom: '16px' }}>
      <Flex direction="column">
        <Heading>Patient&apos;s Profile</Heading>
        <FormControl isRequired style={{ marginTop: '16px' }}>
          <Box py={4}>
            <FormLabel>Full Name</FormLabel>
            <Input placeholder="Full name" />
          </Box>
          <Box py={4}>
            <FormLabel>Date of birth</FormLabel>
            <Input placeholder="Select Date and Time" size="md" type="date" />
          </Box>
          <Box py={4}>
            <FormLabel>Phone number</FormLabel>
            <Input type="tel" placeholder="Phone number" />
          </Box>
          <Box py={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Email" />
          </Box>
          <Box py={4}>
            <FormLabel>Gender</FormLabel>
            <Select placeholder="Gender">
              <option>Male</option>
              <option>Female</option>
            </Select>
          </Box>
          <Box py={4}>
            <Button colorScheme="blue">Submit</Button>
          </Box>
        </FormControl>
      </Flex>
    </Container>
  );
}