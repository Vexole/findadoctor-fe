import { MedicalHistoryPayload } from "@/api/appointment";
import { Stack, Text } from "@chakra-ui/react";

type MedicalHistoryCardProps = {
  history: MedicalHistoryPayload;
}

const formatDate = (date: string) => {
  const inputDate = new Date(date);
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day = String(inputDate.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};


export function MedicalHistoryCard({history}: MedicalHistoryCardProps) {
  return (
    <Stack direction="column" border="1px" borderColor="gray.300" p={6} spacing={4}>
      <Text fontSize="lg" fontWeight="bold" color="#1A365D">
        Date of Treatment:
      </Text>
      <Text fontSize="lg">{formatDate(history.dateOfTreatment)}</Text>
      <Text fontSize="lg" fontWeight="bold" color="#1A365D">
        Doctor Name:
      </Text>
      <Text fontSize="lg">{history.doctorName}</Text>
      <Text fontSize="lg" fontWeight="bold" color="#1A365D" mt={3}>
        Condition:
      </Text>
      <Text fontSize="lg">{history.condition}</Text>
      <Text fontSize="lg" fontWeight="bold" color="#1A365D" mt={3}>
        Treatment:
      </Text>
      <Text fontSize="lg">{history.treatment}</Text>
      <Text fontSize="lg" fontWeight="bold" color="#1A365D" mt={3}>
        Notes:
      </Text>
      <Text fontSize="lg">{history.notes}</Text>
    </Stack>
  );
}
