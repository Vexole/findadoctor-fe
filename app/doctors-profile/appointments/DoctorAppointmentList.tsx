'use client';
import { DoctorAppointmentRow } from './DoctorAppointmentRow';
import { Center, Heading, Stack, Tab, TabList, TabPanel, TabPanels, Table, TableContainer, Tabs, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

const DoctorAppointmentList = (props: any) => {
  const { appointmentList, cancelAppointment, completeAppointment, viewPatient } = props;

  const pendingAppointmentsList = appointmentList.filter((appointment: any) => {
    return (appointment.status !== 'Cancelled' && appointment.status !== 'Completed')
  }).map((appointment: any, index: number) => (
    <DoctorAppointmentRow
      appointment={appointment}
      key={appointment.id}
      index={index}
      handleCancelAppointment={cancelAppointment}
      handleViewPatient={viewPatient}
      handleCompleteAppointment={completeAppointment}
    />
  ));

  const cancelledAppointmentsList = appointmentList.filter((appointment: any) => {
    return appointment.status === 'Cancelled'
  }).map((appointment: any, index: number) => (
    <DoctorAppointmentRow
      appointment={appointment}
      key={appointment.id}
      index={index}
      handleCancelAppointment={cancelAppointment}
      handleViewPatient={viewPatient}
      handleCompleteAppointment={completeAppointment}
    />
  ));

  const completedAppointmentsList = appointmentList.filter((appointment: any) => {
    return appointment.status === 'Completed'
  }).map((appointment: any, index: number) => (
    <DoctorAppointmentRow
      appointment={appointment}
      key={appointment.id}
      index={index}
      handleCancelAppointment={cancelAppointment}
      handleViewPatient={viewPatient}
      handleCompleteAppointment={completeAppointment}
    />
  ));

  return (
    <Stack spacing={6}>
      <Heading as="h2" size="xl">
        Appointments List
      </Heading>

      <div>
        <Tabs>
          <TabList>
            <Tab>Pending Appointments</Tab>
            <Tab>Completed Appointments</Tab>
            <Tab>Cancelled Appointments</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <TableContainer>
                <Table variant='striped' colorScheme='gray' size='sm'>
                  <Thead>
                    <Tr className="doctors-list-row">
                      <Th><Center>S.N.</Center></Th>
                      <Th><Center>Patient's Name</Center></Th>
                      <Th><Center>Date</Center></Th>
                      <Th><Center>Time</Center></Th>
                      <Th><Center>Status</Center></Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>{pendingAppointmentsList}</Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>
              <TableContainer>
                <Table variant='striped' colorScheme='gray' size='sm'>
                  <Thead>
                    <Tr className="doctors-list-row">
                      <Th><Center>S.N.</Center></Th>
                      <Th><Center>Patient's Name</Center></Th>
                      <Th><Center>Date</Center></Th>
                      <Th><Center>Time</Center></Th>
                      <Th><Center>Status</Center></Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>{completedAppointmentsList}</Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>
              <TableContainer>
                <Table variant='striped' colorScheme='gray' size='sm'>
                  <Thead>
                    <Tr className="doctors-list-row">
                      <Th><Center>S.N.</Center></Th>
                      <Th><Center>Patient's Name</Center></Th>
                      <Th><Center>Date</Center></Th>
                      <Th><Center>Time</Center></Th>
                      <Th><Center>Status</Center></Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>{cancelledAppointmentsList}</Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </Stack>
  );
};

export default DoctorAppointmentList;
