'use client';
import { DoctorLanguages, DoctorSpecialties, GetDoctorsParams } from '@/api';
import { requestDoctor } from '@/api/doctor/requestDoctor';
import { useAuthenticatedUserContext } from '@/context';
import {
  useCitiesByStateQuery,
  useDoctorsQuery,
  useLanguagesQuery,
  useSpecializationsQuery,
  useStatesQuery,
} from '@/hooks';
import { ErrorResponse } from '@/models/ErrorResponse';
import {
  Box,
  Button,
  Checkbox,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  Image,
  Spinner,
  Collapse,
  useToast,
  Tag,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ChangeEvent, PropsWithChildren, useState } from 'react';

export type FormTypes = {
  states: number;
  cities: number;
  postalCode: string;
  specialties: string[];
  languages: string[];
};

const initialFormValues: FormTypes = {
  states: 0,
  cities: 0,
  postalCode: '',
  specialties: [],
  languages: [],
};

const TextContainer = ({ title, children }: PropsWithChildren<{ title: string }>) => (
  <>
    {' '}
    <Text fontSize="sm" color="#1A365D" fontWeight="600">
      {title}
    </Text>
    {children}
  </>
);

export default function DoctorsSearch() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [queryParams, setQueryParams] = useState<GetDoctorsParams>({});

  const { data: doctorsList, isLoading } = useDoctorsQuery(queryParams);
  const { data: specialtiesList } = useSpecializationsQuery();
  const { data: languagesList } = useLanguagesQuery();
  const { data: statesList } = useStatesQuery();
  const { data: citiesByStateList } = useCitiesByStateQuery(formValues.states);

  const [showHiddenLanguages, setShowHiddenLanguages] = useState(false);
  const router = useRouter();

  const getDoctorPicture = (profilePicture: string | undefined, gender: string) => {
    if (!profilePicture) {
      return gender === 'Female'
        ? '/images/doctor-avatar-female.png'
        : '/images/doctor-avatar-male.png';
    }
    return profilePicture;
  };

  const handleFormValues = (key: keyof FormTypes, value: number | string | string[]) =>
    setFormValues(prevFormValues => ({
      ...prevFormValues,
      [key]: value,
    }));

  const handleCheckboxChange = (key: keyof FormTypes, name: string) => {
    const checkboxArray = formValues[key] as string[];
    if (checkboxArray.includes(name))
      return handleFormValues(
        key,
        checkboxArray.filter(optionName => name !== optionName)
      );
    return handleFormValues(key, [...checkboxArray, name]);
  };

  const handleLanguagesToggle = () => setShowHiddenLanguages(!showHiddenLanguages);

  const handleSearch = () => {
    const states = statesList?.find(state => state.stateId === formValues.states)?.stateName;
    const cities = citiesByStateList?.find(city => city.cityId === formValues.cities)?.cityName;
    setQueryParams({ ...formValues, states, cities });
  };

  const authenticatedUser = useAuthenticatedUserContext();
  const toast = useToast();

  const isPatient = authenticatedUser?.role === 'Patient';
  const patientUIserId = authenticatedUser?.userId;
  const isPatientProfileCompleted = authenticatedUser?.isProfileComplete;

  const requestFamilyDoctorMutation = useMutation(requestDoctor, {
    onSuccess: () => {
      toast({
        title: 'Followed successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (e: ErrorResponse) => {
      toast({
        title:
          e?.response?.data?.errors?.error[0] ?? 'Something went wrong. Cannot Follow Doctor.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    },
  });

  const handleFollowClick = async (doctorId: string) => {
    if (isPatientProfileCompleted) {
      requestFamilyDoctorMutation.mutateAsync({
        doctorId,
        patientId: patientUIserId as string,
      });
    } else {
      toast({
        title: 'Please complete your profile first.',
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
    }
  };

  const handleDoctorDetails = (doctor: string) => {
    router.push(`/doctors-search/doctor-details?doctor=${doctor}`);
  };

  return (
    <Stack direction="column" spacing={0}>
      <Stack
        display="flex"
        direction="column"
        alignItems="center"
        p={6}
        bg="#4199E1"
        w="100%"
        h={200}
        justifyContent="center"
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
      </Stack>
      <Grid templateColumns={{ base: '1, 1fr', md: 'repeat(4, 1fr)' }}>
        <GridItem colSpan={1} p={6}>
          <Stack spacing={4}>
            <Heading as="h5" size="md" color="#1A365D">
              Refine your search
            </Heading>

            <TextContainer title="Specialty">
              {specialtiesList?.map(({ specialtyId, specialtyName }: DoctorSpecialties) => (
                <Checkbox
                  fontWeight="400"
                  key={`specialty-${specialtyId}`}
                  isChecked={formValues.specialties.includes(specialtyName)}
                  onChange={() => handleCheckboxChange('specialties', specialtyName)}
                >
                  {specialtyName}
                </Checkbox>
              ))}
            </TextContainer>

            <TextContainer title="Language">
              <Collapse startingHeight={100} in={showHiddenLanguages}>
                <Stack direction="column">
                  {languagesList?.map(({ languageId, languageName }: DoctorLanguages) => (
                    <Checkbox
                      fontWeight="400"
                      key={`languageId-${languageId}`}
                      isChecked={formValues.languages.includes(languageName)}
                      onChange={() => handleCheckboxChange('languages', languageName)}
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
            </TextContainer>

            <TextContainer title="State">
              <Select
                placeholder="Choose a state"
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  handleFormValues('states', Number(e.target.value))
                }
                value={formValues.states}
              >
                {statesList?.map(({ stateId, stateName }) => (
                  <option key={`stateId-${stateId}`} value={stateId}>
                    {stateName}
                  </option>
                ))}
              </Select>
            </TextContainer>
            <TextContainer title="City">
              <Select
                placeholder="Choose a city"
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  handleFormValues('cities', Number(e.target.value))
                }
                value={formValues.cities}
              >
                {citiesByStateList?.map(({ cityId, cityName }) => (
                  <option key={`cityId-${cityId}`} value={cityId}>
                    {cityName}
                  </option>
                ))}
              </Select>
            </TextContainer>
            <TextContainer title="Postal Code">
              <Input
                type="text"
                placeholder="Enter a Postal Code"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFormValues('postalCode', e.target.value)
                }
                value={formValues.postalCode}
              />
            </TextContainer>
            <Button colorScheme="telegram" onClick={handleSearch}>
              Update Search
            </Button>
            <Button
              colorScheme="telegram"
              variant="outline"
              onClick={() => setFormValues(initialFormValues)}
            >
              Reset Filters
            </Button>
          </Stack>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 3 }} bg="#EBF8FF" p={6}>
          {!isLoading && (
            <Grid templateColumns={{ base: '1, 1fr', md: 'repeat(2, 1fr)' }} mb={4}>
              <GridItem alignSelf="center">
                <Text fontSize="sm" color="gray">
                  {`Showing ${doctorsList?.length || 0} searching results.`}
                </Text>
              </GridItem>
            </Grid>
          )}
          {isLoading && <Spinner />}
          {!isLoading && (
            <Grid
              templateColumns={{ base: '1, 1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)' }}
              templateRows={{ base: '1, 1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
              gap={6}
            >
              {doctorsList?.map((doctor, index) => (
                <GridItem w="100%" key={`doctor-${index}`}>
                  <Box
                    bg="white"
                    w="100%"
                    height="100%"
                    p={4}
                    color="white"
                    borderRadius="lg"
                  >
                    <Image
                      borderRadius="full"
                      boxSize="120px"
                      w="150px"
                      height="150px"
                      src={getDoctorPicture(doctor.profilePicture, doctor.gender)}
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
                    <Grid mt={3} templateColumns="repeat(2, auto)" gap={2} justifyContent="center">
                      {doctor.doctorSpecialties.map(({ specialtyId, specialtyName }) => (
                        <GridItem justifyContent="flex-end">
                          <Tag
                            key={`specialtyByDoctor-${specialtyId}`}
                            color="gray.500"
                            textAlign="center"
                          >
                            {specialtyName}
                          </Tag>
                        </GridItem>
                      ))}
                    </Grid>
                    {isPatient && (
                      <Stack justifyContent="center" direction="row" mt={6}>
                        <Button
                          type="submit"
                          colorScheme="facebook"
                          onClick={() => handleFollowClick(doctor.userId)}
                        >
                          Follow Doctor
                        </Button>
                        <Button
                          type="submit"
                          colorScheme="facebook"
                          onClick={() => handleDoctorDetails(doctor.userId)}
                          ml={4}
                        >
                          See Details
                        </Button>
                      </Stack>
                    )}
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
