import { usePatientMedicalHistoryQuery } from '@/hooks/usePatientMedicalHistory';
import { getUserId } from '@/utils/userUtils';
import { MedicalHistoryCard } from './MedicalHistoryCard';
import { Stack, Text, Spinner } from '@chakra-ui/react';

export function MedicalHistoryList() {
  const patientId = getUserId();
  const { data: medicalHistoryDetails, isLoading } = usePatientMedicalHistoryQuery(patientId);

  if (isLoading) return <Spinner />;

  if (!medicalHistoryDetails || medicalHistoryDetails.length === 0)
    return (
      <Text fontSize="lg" textAlign="center">
        No medical history yet.
      </Text>
    );
  
  return (
    <Stack>
      {medicalHistoryDetails?.map(history => (
        <MedicalHistoryCard history={history} key={history.createDate} />
      ))}
    </Stack>
  );
}
