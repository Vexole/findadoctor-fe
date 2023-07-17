'use client';
import { DoctorLanguages, DoctorSpecialties } from '@/api';
import {
  useCitiesByStateQuery,
  useDoctorsQuery,
  useLanguagesQuery,
  useSpecializationsQuery,
  useStatesQuery,
} from '@/hooks';
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
  Spinner,
  Collapse,
} from '@chakra-ui/react';
import { ChangeEvent, ReactEventHandler, useState } from 'react';

export default function DoctorsSearch() {
  const { data: doctorsList, isLoading } = useDoctorsQuery();
  const { data: specialtiesList } = useSpecializationsQuery();
  const { data: languagesList } = useLanguagesQuery();
  const { data: statesList } = useStatesQuery();
  const [selectedCity, setSelectedCity] = useState(0);
  const [showHiddenLanguages, setShowHiddenLanguages] = useState(false);
  const { data: citiesByStateList } = useCitiesByStateQuery(selectedCity);

  const getCitiesByState = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(Number(e.target.value));
  };

  const handleLanguagesToggle = () => setShowHiddenLanguages(!showHiddenLanguages);

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
                <InputGroup>
                  <InputRightElement pointerEvents="none">
                    <Search2Icon color="gray.400" />
                  </InputRightElement>
                  <Input type="text" placeholder="Name" />
                </InputGroup>
              </GridItem>
              <GridItem colSpan={1}>
                <InputGroup>
                  <InputRightElement pointerEvents="none">
                    <Search2Icon color="gray.400" />
                  </InputRightElement>
                  <Input type="text" placeholder="Postal Code" />
                </InputGroup>
              </GridItem>
              <GridItem colSpan={1} pt={2} textAlign="center">
                <Checkbox fontWeight="400">Accepting New Patients</Checkbox>
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
        <GridItem colSpan={1} p={6}>
          <Stack spacing={4}>
            <Heading as="h5" size="sm" color="#1A365D">
              Refine your search
            </Heading>
            {/* <InputGroup>
              <InputRightElement pointerEvents="none">
                <Search2Icon color="gray.400" />
              </InputRightElement>
              <Input type="text" placeholder="Search" />
            </InputGroup> */}
            <Text fontSize="sm" color="#1A365D" fontWeight="600">
              Specialty
            </Text>
            {specialtiesList?.map(({ specialtyId, specialtyName }: DoctorSpecialties) => (
              <Checkbox
                fontWeight="400"
                key={`specialty-${specialtyId}`}
                defaultValue={specialtyId}
              >
                {specialtyName}
              </Checkbox>
            ))}
            <Text fontSize="sm" color="#1A365D" fontWeight="600">
              Language
            </Text>

            <Collapse startingHeight={100} in={showHiddenLanguages}>
              <Stack direction="column">
                {languagesList?.map(({ languageId, languageName }: DoctorLanguages) => (
                  <Checkbox
                    fontWeight="400"
                    key={`languageId-${languageId}`}
                    defaultValue={languageId}
                  >
                    {languageName}
                  </Checkbox>
                ))}
              </Stack>
            </Collapse>
            <Button
              size="sm"
              w={100}
              variant="outline"
              onClick={handleLanguagesToggle}
              mt={2}
              colorScheme="blue"
            >
              Show {showHiddenLanguages ? 'Less' : 'More'}
            </Button>
            <Text fontSize="sm" color="#1A365D" fontWeight="600">
              State
            </Text>
            <Select placeholder="Choose a state" onChange={getCitiesByState}>
              {statesList?.map(({ stateId, stateName }) => (
                <option key={`stateId-${stateId}`} value={stateId}>
                  {stateName}
                </option>
              ))}
            </Select>
            <Text fontSize="sm" color="#1A365D" fontWeight="600">
              City
            </Text>
            <Select placeholder="Choose a city">
              {citiesByStateList?.map(({ cityId, cityName }) => (
                <option key={`cityId-${cityId}`} value={cityId}>
                  {cityName}
                </option>
              ))}
            </Select>
            <Button colorScheme="telegram">Update Search</Button>
          </Stack>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 3 }} bg="#EBF8FF" p={6}>
          <Grid templateColumns={{ base: '1, 1fr', md: 'repeat(2, 1fr)' }} gap={4}>
            <GridItem alignSelf="center">
              <Text fontSize="sm" color="gray">
                {`Showing ${doctorsList?.length} searching results.`}
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
          {isLoading && <Spinner />}
          {!isLoading && (
            <Grid
              templateColumns={{ base: '1, 1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
              templateRows={{ base: '1, 1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
              gap={6}
            >
              {doctorsList?.map((doctor, index) => (
                <GridItem w="100%" key={`doctor-${index}`}>
                  <Box bg="white" w="100%" height="100%" p={4} color="white" borderRadius="lg">
                    <Image
                      borderRadius="full"
                      boxSize="120px"
                      w="150px"
                      height="150px"
                      src={
                        doctor.profilePicture && doctor.gender === 'Female'
                          ? '/images/doctor-avatar-female.png'
                          : '/images/doctor-avatar-male.png'
                      }
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
                      {`${doctor.title} ${doctor.name}`}
                    </Heading>
                    {doctor.doctorSpecialties.map(({ specialtyId, specialtyName }) => (
                      <Text
                        key={`specialtyByDoctor-${specialtyId}`}
                        mt="1"
                        fontWeight="400"
                        as="h6"
                        size="sm"
                        lineHeight="tight"
                        noOfLines={1}
                        color="gray.500"
                        textAlign="center"
                      >
                        {specialtyName}
                      </Text>
                    ))}
                  </Box>
                </GridItem>
              ))}
            </Grid>
          )}
        </GridItem>
      </Grid>
    </Stack>
  );
}
