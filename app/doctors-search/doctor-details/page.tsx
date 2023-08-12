'use client';
import { useSearchParams } from 'next/navigation';
import { Stack, Grid, GridItem, Box, Text, Heading, Image, Tag, Divider } from '@chakra-ui/react';
import { useSharedDoctorProfileQuery } from '@/hooks';

export default function DoctorSearchDetails() {
  const params = useSearchParams();
  const doctorId = params.get('doctor');
  console.log(doctorId);
  const { data: doctorDetails } = useSharedDoctorProfileQuery(String(doctorId));
  console.log(doctorDetails);

  const getDoctorPicture = (profilePicture?: string, gender?: string) => {
    if (profilePicture) return profilePicture;
    return gender === 'Female'
      ? '/images/doctor-avatar-female.png'
      : '/images/doctor-avatar-male.png';
  };

  function formatDate(date) {
    const inputDate = new Date(date);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }

  return (
    <Stack p={4}>
      <Grid templateColumns={{ base: '1, 1fr', md: 'repeat(2, 1fr)' }} mb={4} gap={4}>
        <GridItem>
          <Box border="1px" borderColor="gray.300" p={6} justifyContent="center">
            <Stack direction="column" spacing={4}>
              <Image
                borderRadius="full"
                boxSize="120px"
                w="150px"
                height="150px"
                src={getDoctorPicture(doctorDetails?.profilePicture, doctorDetails?.gender)}
                alt="Doctor Profile"
                m="auto"
                objectFit="cover"
              />
              <Heading as="h2" size="lg" textAlign="center" mt={2} color="#3a57a6">
                {`${doctorDetails?.title} ${doctorDetails?.name}`}
              </Heading>
              <Stack direction="row" justifyContent="center">
                {doctorDetails?.doctorSpecialties.map(({ specialtyId, specialtyName }) => (
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
              </Stack>
              <div>
                <Text fontSize="sm" fontWeight="bold" color="#1A365D">
                  Address:
                </Text>
                <Text fontSize="sm">{doctorDetails?.street}</Text>
                <Text fontSize="sm">
                  {doctorDetails?.cityName} - {doctorDetails?.state}
                </Text>
                <Text fontSize="sm">{doctorDetails?.postalCode}</Text>
                <Text fontSize="sm" fontWeight="bold" color="#1A365D" mt={3}>
                  Contact:
                </Text>
                <Text fontSize="sm">{doctorDetails?.contactInformation}</Text>
                <Text fontSize="sm" fontWeight="bold" color="#1A365D" mt={3}>
                  Accepting New Patients:
                </Text>
                {doctorDetails?.isAcceptingNewPatients ? (
                  <Tag size="sm" variant="solid" colorScheme="green">
                    Yes
                  </Tag>
                ) : (
                  <Tag size="sm" variant="solid" colorScheme="orange">
                    No
                  </Tag>
                )}
                <Text fontSize="sm" fontWeight="bold" color="#1A365D" mt={3}>
                  Waiting Time:
                </Text>
                <Text fontSize="sm">{doctorDetails?.waitingTime}</Text>
                <Text fontSize="sm" fontWeight="bold" color="#1A365D" mt={3}>
                  Fees:
                </Text>
                <Text fontSize="sm">${doctorDetails?.fees}</Text>
              </div>
            </Stack>
          </Box>
        </GridItem>
        <GridItem>
          <Stack spacing={3}>
            <Box border="1px" borderColor="gray.300" p={6}>
              <Heading as="h3" size="md" mb={3} color="#3a57a6">
                Experience
              </Heading>
              {doctorDetails?.experiences.map(xp => (
                <Stack key={xp?.doctorExperienceId} mx={4}>
                  <Text fontSize="md">
                    {formatDate(xp.startDate)} - {formatDate(xp.endDate)}
                  </Text>
                  <Text fontSize="md">Company: {xp.companyName}</Text>
                  <Text fontSize="md">Description: {xp.description}</Text>
                  <Divider borderColor="gray.300" />
                </Stack>
              ))}
            </Box>
            <Box border="1px" borderColor="gray.300" p={6}>
              <Heading as="h3" size="md" mb={3} color="#3a57a6">
                Language
              </Heading>
              {doctorDetails?.doctorLanguages.map(language => (
                <Text key={language?.languageId}>{language?.languageName}</Text>
              ))}
            </Box>
            <Box border="1px" borderColor="gray.300" p={6}>
              <Heading as="h3" size="md" mb={3} color="#3a57a6">
                Education
              </Heading>
              {doctorDetails?.doctorEducationBackgrounds.map(ed => (
                <Stack key={ed?.doctorEducationBackgroundId} mt={4}>
                  <Text fontSize="sm">
                    {formatDate(ed.startDate)} - {formatDate(ed.endDate)}
                  </Text>
                  <Text fontSize="md">
                    {ed.degree} - Field: {ed.fieldOfStudy}
                  </Text>
                  <Text fontSize="md">Institution: {ed.institutionName}</Text>
                  <Divider />
                </Stack>
              ))}
            </Box>
          </Stack>
        </GridItem>
      </Grid>
    </Stack>
  );
}
