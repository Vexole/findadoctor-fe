'use client';

import {
  getApprovedPatientAssociation,
  getPendingPatientAssociation,
} from '@/api/doctor/getPatientAssociation';
import { useAuthenticatedUserContext } from '@/context';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

export default function DoctorPatientProfile() {
  const authenticatedUser = useAuthenticatedUserContext();
  console.log('authenticatedUser', authenticatedUser);
  const userId = authenticatedUser?.userId;
  const { data: pendingPatientData, isLoading: pendingPatientsDataLoading } = useQuery(
    ['pendingPatient', userId],
    () => getPendingPatientAssociation({ userId: userId as string })
  );
  const { data: approvedPatientData, isLoading: approvedPatientsDataLoading } = useQuery(
    ['approvedPatient', userId],
    () => getApprovedPatientAssociation({ userId: userId as string })
  );
  console.log('association', pendingPatientData, approvedPatientData);
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Pending Patients</Tab>
          <Tab>Approved Patients</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
