'use client';
import { PatientAppointmentRow } from './PatientAppointmentRow';
import { Center, Spinner, Stack, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

const PatientAppointmentList = (props: any) => {
  const { appointmentList, cancelAppointment, editAppointment } = props;

  const appointmentsList = appointmentList.map((appointment: any, index: number) => (
    <PatientAppointmentRow
      appointment={appointment}
      key={appointment.id}
      index={index}
      handleCancelAppointment={cancelAppointment}
      handleEditAppointment={editAppointment}
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
              <Th><Center>Doctor's Name</Center></Th>
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

export default PatientAppointmentList;
