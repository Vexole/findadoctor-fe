'use client';
import { useSearchParams } from 'next/navigation';
import { Stack, Box } from '@chakra-ui/react';
import { useSharedDoctorProfileQuery } from '@/hooks';

export default function DoctorSearchDetails() {
  const params = useSearchParams();
  const doctorId = params.get('doctor');
  console.log(doctorId);
  const { data: doctorDetails } = useSharedDoctorProfileQuery(doctorId);
  console.log(doctorDetails);

  return (
    <Stack direction="column" spacing={0}>
      <Box>
      </Box>
    </Stack>
  );
}
