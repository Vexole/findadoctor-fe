'use client';
import { DoctorRow } from './DoctorRow';
import { usePendingDoctorsQuery, useApproveDoctorMutation, useRejectDoctorMutation } from '@/hooks';
import { Center, Spinner, Stack, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useAuthenticatedUserContext } from '@/context';

const DoctorsList = () => {
  const authenticatedUser = useAuthenticatedUserContext();
  const router = useRouter();
  const pendingDoctorsQuery = usePendingDoctorsQuery();
  const approveDoctorMutation = useApproveDoctorMutation();
  const rejectDoctorMutation = useRejectDoctorMutation();

  if (!authenticatedUser) {
    router.push("/auth/login");
  }

  if (pendingDoctorsQuery.isLoading) return <Spinner />;
  if (pendingDoctorsQuery.isError) return <pre>{JSON.stringify(pendingDoctorsQuery.error)}</pre>;

  const approveDoctorByAdmin = async (doctorId: string) => {
    try {
      const result = await approveDoctorMutation.mutateAsync(doctorId, {
        onSuccess: () => {
          router.push('/admin/pending-doctors')
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const rejectDoctorByAdmin = async (doctorId: string, reason: string) => {
    try {
      const result = await rejectDoctorMutation.mutateAsync([doctorId, reason], {
        onSuccess: () => router.refresh(),
      });
    } catch (e) {
      console.log(e);
    }
  };

  if (pendingDoctorsQuery.data.length <= 0) return <h2>No Records Found!</h2>;

  const pendingDoctorsList = pendingDoctorsQuery.data.map((doctor, index: number) => (
    <DoctorRow
      pendingDoctors={doctor}
      key={doctor.doctorUserId}
      index={index}
      approveDoctorByAdmin={approveDoctorByAdmin}
      rejectDoctorByAdmin={rejectDoctorByAdmin}
    />
  ));

  return (
    <Stack>
      <h2>Pending Doctors List</h2>
      <TableContainer>
        <Table variant='striped' colorScheme='gray' size='sm'>
          <Thead>
            <Tr className="doctors-list-row">
              <Th>S.N.</Th>
              <Th>Title</Th>
              <Th>Doctor Name</Th>
              <Th>Phone</Th>
              <Th>Street Address</Th>
              <Th>City</Th>
              <Th>State</Th>
              <Th>Postal Code</Th>
              <Th>Fees</Th>
              <Th>Is Accepting New Patients</Th>
              <Th colSpan={3}><Center>Actions</Center></Th>
            </Tr>
          </Thead>
          <Tbody>{pendingDoctorsList}</Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default DoctorsList;
