'use client';
import {
  Box,
  Button,
  Checkbox,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';

export default function DoctorsSearch() {
  return (
    <Stack direction="column">
      <Stack
        display="flex"
        direction="column"
        alignItems="center"
        p={6}
        bg="#4199E1"
        w="100%"
        color="white"
      >
        <Box m={6}>
          <Heading as="h3">Find a Family Doctor. Schedule an Appointment.</Heading>
          <Text fontSize="xl">
            Choose your preferred family doctor and time slot to book an appointment.
          </Text>
        </Box>

        <Stack p={6} bg="#fff" w="100%" color="#1A365D" borderRadius="lg" spacing={6}>
          <Heading as="h4" size="md" color="telegram">
            Make a Medical Appointment
          </Heading>
          <Stack direction="row" spacing={4}>
            <Select size="md" placeholder="Select option">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            <Input size="md" placeholder="Location" />
            <Input size="md" placeholder="Date" type="date" />
            <Button size="md" colorScheme="telegram">
              Search
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="row">
        <Stack w="30%" spacing={4} direction="column">
          <Heading as="h6" size="md" color="telegram">
            Refine your search
          </Heading>
          <Input size="md" placeholder="Location" />
          <Text fontSize="md" color="#1A365D" fontWeight="regular">
            Specialty
          </Text>
          <Checkbox defaultChecked>Checkbox</Checkbox>
          <Checkbox>Checkbox</Checkbox>
          <Checkbox>Checkbox</Checkbox>
          <Checkbox>Checkbox</Checkbox>
          <Checkbox>Checkbox</Checkbox>
          <Checkbox defaultChecked>Checkbox</Checkbox>
          <Checkbox defaultChecked>Checkbox</Checkbox>
          <Text fontSize="md" color="#1A365D" fontWeight="regular">
            Qualification
          </Text>
          <Checkbox>Checkbox</Checkbox>
          <Checkbox>Checkbox</Checkbox>
          <Checkbox>Checkbox</Checkbox>
          <Checkbox>Checkbox</Checkbox>
          <Text fontSize="md" color="#1A365D" fontWeight="regular">
            State
          </Text>
          <Select size="md" placeholder="Select option">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <Text fontSize="md" color="#1A365D" fontWeight="regular">
            City
          </Text>
          <Select size="md" placeholder="Select option">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <Button colorScheme="telegram">Update Search</Button>
        </Stack>
        <Stack w="70%" bg="#EBF8FF" p={6} spacing={6}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Text fontSize="sm" color="gray">
              Showing 175 searching results.
            </Text>
            <Select
              variant="flushed"
              size="md"
              w="200px"
              p={2}
              placeholder="Sorted by: Highest rated"
            />
          </Stack>
          <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            <GridItem w="100%" h="10" bg="blue.500" />
            <GridItem w="100%" h="10" bg="blue.500" />
            <GridItem w="100%" h="10" bg="blue.500" />
            <GridItem w="100%" h="10" bg="blue.500" />
            <GridItem w="100%" h="10" bg="blue.500" />
          </Grid>
        </Stack>
      </Stack>
    </Stack>
  );
}
