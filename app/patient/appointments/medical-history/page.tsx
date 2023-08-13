'use client';
import { Stack, Heading } from '@chakra-ui/react';
import { MedicalHistoryList } from './MedicalHistoryList';

export default function MedicalHistory() {

  return (
    <Stack direction="column" justifyContent="center" spacing={4} p={4}>
      <Heading as="h2" size="lg" textAlign="center" mt={2} color="#3a57a6">
        Medical History Details
      </Heading>
      <MedicalHistoryList/>
    </Stack>
  );
}
