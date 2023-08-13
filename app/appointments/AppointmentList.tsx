'use client';
import { AppointmentRow } from './AppointmentRow';
import { usePendingDoctorsQuery, useApproveDoctorMutation, useRejectDoctorMutation, useAppointmentsQuery } from '@/hooks';
import { Center, Spinner, Stack, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useAuthenticatedUserContext } from '@/context';

const AppointmentList = () => {
  const authenticatedUser = useAuthenticatedUserContext();
  const router = useRouter();
  const pendingDoctorsQuery = usePendingDoctorsQuery();
  const appointmentsQuery = useAppointmentsQuery();
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

  if (appointmentsQuery.data.length <= 0) return <h2>No Records Found!</h2>;

  const appointmentsList = appointmentsQuery.data.map((doctor, index: number) => (
    <AppointmentRow
      appointment={doctor}
      key={doctor.doctorUserId}
      index={index}
      cancelAppointment={approveDoctorByAdmin}
    />
  ));

  return (
    <Stack>
      <h2>Appointments List</h2>
      <TableContainer>
        <Table variant='striped' colorScheme='gray' size='sm'>
          <Thead>
            <Tr className="doctors-list-row">
              <Th>S.N.</Th>
              <Th>Title</Th>
              <Th>Doctor's Name</Th>
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

export default AppointmentList;
