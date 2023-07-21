'use client';
import { DoctorAppointmentRow } from './DoctorAppointmentRow';
import { Center, Stack, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

const DoctorAppointmentList = (props: any) => {
  const {appointmentList, cancelAppointment} = props;

  const appointmentsList = appointmentList.map((appointment: any, index: number) => (
    <DoctorAppointmentRow
      appointment={appointment}
      key={appointment.id}
      index={index}
      handleCancelAppointment={cancelAppointment}
    />
  ));

  return (
    <Stack>
      <h2>Appointments List</h2>
      <TableContainer>
        <Table variant='striped' colorScheme='gray' size='sm'>
          <Thead>
            <Tr className="doctors-list-row">
              <Th><Center>S.N.</Center></Th>
              <Th><Center>Patient's Name</Center></Th>
              <Th><Center>Date</Center></Th>
              <Th><Center>Time</Center></Th>
              <Th><Center>Status</Center></Th>
              <Th colSpan={2}></Th>
            </Tr>
          </Thead>
          <Tbody>{appointmentsList}</Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default DoctorAppointmentList;
