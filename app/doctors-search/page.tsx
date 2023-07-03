'use client';
import { CalendarIcon, Search2Icon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Checkbox,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Text,
  Image,
} from '@chakra-ui/react';
// import Image from 'next/image';

const contentArray = [
  {
    image: '/images/doctor1.jpg',
    title: 'Ducan Pitt',
    specialty: 'Orthodontics',
  },
  {
    image: '/images/doctor2.jpg',
    title: 'Mary Weather',
    specialty: 'Endodontics',
  },
  {
    image: '/images/doctor3.jpg',
    title: 'Jacob Abel',
    specialty: 'Periodontics',
  },
  {
    image: '/images/doctor4.jpg',
    title: 'Gill Hames',
    specialty: 'Pediatric',
  },
  {
    image: '/images/doctor5.jpg',
    title: 'Finn McDonald',
    specialty: 'Dentistry',
  },
  {
    image: '/images/doctor6.jpg',
    title: 'Donna Summer',
    specialty: 'Prosthodontics',
  },
  {
    image: '/images/doctor7.jpg',
    title: 'Dagmar McLean',
    specialty: 'Psychiatry',
  },
  {
    image: '/images/doctor8.jpg',
    title: 'Richard Kicker',
    specialty: 'Urology',
  },
  {
    image: '/images/doctor9.jpg',
    title: 'Millie Billie',
    specialty: 'Dermatology',
  },
];

export default function DoctorsSearch() {
  return (
    <Stack direction="column" spacing={0}>
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
          <Heading as="h3" textAlign="center">
            Find a Family Doctor. Schedule an Appointment.
          </Heading>
          <Text fontSize="xl" textAlign="center">
            Choose your preferred family doctor and time slot to book an appointment.
          </Text>
        </Box>

        <Stack p={6} bg="#fff" w="100%" color="#1A365D" borderRadius="lg" spacing={6}>
          <Heading as="h4" size="md" color="telegram">
            Make a Medical Appointment
          </Heading>
          <Stack direction="row" spacing={4}>
            <Grid templateColumns={{ base: '1, 1fr', md: 'repeat(4, 1fr)' }} gap={4} w="100%">
              <GridItem colSpan={1}>
                <Select size="md" placeholder="Specialty / Doctor / Hospital">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </GridItem>
              <GridItem colSpan={1}>
                <InputGroup>
                  <InputRightElement pointerEvents="none">
                    <Search2Icon color="gray.400" />
                  </InputRightElement>
                  <Input type="text" placeholder="Location" />
                </InputGroup>
              </GridItem>
              <GridItem colSpan={1}>
                <InputGroup>
                  <InputRightElement pointerEvents="none">
                    <CalendarIcon color="gray.400" />
                  </InputRightElement>
                  <Input type="text" placeholder="Date" />
                </InputGroup>
              </GridItem>
              <GridItem colSpan={1}>
                <Button size="md" w="100%" colorScheme="telegram">
                  Search
                </Button>
              </GridItem>
            </Grid>
          </Stack>
        </Stack>
      </Stack>
      <Grid templateColumns={{ base: '1, 1fr', md: 'repeat(4, 1fr)' }}>
        <GridItem colSpan={1}  p={6}>
          <Stack spacing={4}>
            <Heading as="h5" size="sm" color="#1A365D">
              Refine your search
            </Heading>
            <InputGroup>
              <InputRightElement pointerEvents="none">
                <Search2Icon color="gray.400" />
              </InputRightElement>
              <Input type="text" placeholder="Search" />
            </InputGroup>
            <Text fontSize="sm" color="#1A365D" fontWeight="500">
              Specialty
            </Text>
            <Checkbox defaultChecked fontWeight="400">
              General practioner
            </Checkbox>
            <Checkbox fontWeight="400" color="gray.700">
              Dentistry
            </Checkbox>
            <Checkbox fontWeight="400" color="gray.700">
              Neurology
            </Checkbox>
            <Checkbox fontWeight="400" color="gray.700">
              X-Ray
            </Checkbox>
            <Checkbox fontWeight="400" color="gray.700">
              Dermatology
            </Checkbox>
            <Checkbox defaultChecked fontWeight="400">
              Urology
            </Checkbox>
            <Checkbox defaultChecked fontWeight="400">
              Phychiatry
            </Checkbox>
            <Text fontSize="sm" color="#1A365D" fontWeight="500">
              Qualification
            </Text>
            <Checkbox fontWeight="400">MBBS</Checkbox>
            <Checkbox fontWeight="400">MBBch</Checkbox>
            <Checkbox fontWeight="400">MD</Checkbox>
            <Checkbox fontWeight="400">DO</Checkbox>
            <Text fontSize="sm" color="#1A365D" fontWeight="500">
              State
            </Text>
            <InputGroup>
              <InputRightElement pointerEvents="none">
                <Search2Icon color="gray.400" />
              </InputRightElement>
              <Input type="text" placeholder="Ontario (ON)" />
            </InputGroup>
            <Text fontSize="sm" color="#1A365D" fontWeight="500">
              City
            </Text>
            <Select size="md" placeholder="Choose a city">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            <Button colorScheme="telegram">Update Search</Button>
          </Stack>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 3 }} bg="#EBF8FF" p={6}>
          <Grid templateColumns={{ base: '1, 1fr', md: "repeat(2, 1fr)"}} gap={4} >
            <GridItem  alignSelf='center'>
              <Text fontSize="sm" color="gray">
                Showing 175 searching results.
              </Text>
            </GridItem>
            <GridItem justifySelf="end">
              <Select
                variant="flushed"
                size="md"
                w="200px"
                p={2}
                placeholder="Sorted by: Highest rated"
              />
            </GridItem>
          </Grid>
          <Grid
            templateColumns={{ base: '1, 1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
            templateRows={{ base: '1, 1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
            gap={6}
          >
            {contentArray.map((content, index) => (
              <GridItem w="100%" key={index}>
                <Box bg="white" w="100%" height="100%" p={4} color="white" borderRadius="lg">
                  <Image
                    borderRadius="full"
                    boxSize="120px"
                    w="150px"
                    height="150px"
                    src={content.image}
                    alt="Doctor Profile"
                    m="auto"
                    objectFit="cover"
                  />

                  <Heading
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    size="md"
                    lineHeight="tight"
                    noOfLines={1}
                    color="#1A365D"
                    textAlign="center"
                  >
                    {content.title}
                  </Heading>
                  <Text
                    mt="1"
                    fontWeight="400"
                    as="h6"
                    size="sm"
                    lineHeight="tight"
                    noOfLines={1}
                    color="gray.500"
                    textAlign="center"
                  >
                    {content.specialty}
                  </Text>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </GridItem>
      </Grid>
    </Stack>
  );
}
