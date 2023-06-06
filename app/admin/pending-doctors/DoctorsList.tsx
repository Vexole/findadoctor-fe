"use client";

import { approveDoctor, getPendingDoctorsList } from '@/api/doctors';
import { useQuery, useMutation } from '@tanstack/react-query';
import { DoctorRow } from './DoctorRow';

const DoctorsList = (props) => {
    const pendingDoctorsQuery = useQuery({
        queryKey: ["pendingDoctors"],
        queryFn: getPendingDoctorsList
    })

    const approveDoctorMutation = useMutation({
        mutationFn: approveDoctor,
    })

    if (pendingDoctorsQuery.isLoading) return <h1>Loading...</h1>;
    if (pendingDoctorsQuery.isError)
        return <pre>{JSON.stringify(pendingDoctorsQuery.error)}</pre>;

    const approveDoctorByAdmin = async (doctorId: string) => {
        try {
            const result = await approveDoctorMutation.mutateAsync(doctorId);
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    }

    if (pendingDoctorsQuery.data.length <= 0)
        return <h2>No Records Found!</h2>

    const pendingDoctorsList = pendingDoctorsQuery.data.map((doctor, index: number) => (
        <DoctorRow
            pendingDoctors={doctor}
            key={doctor.doctorUserId}
            index={index}
            approveDoctorByAdmin={approveDoctorByAdmin} />))


    return (
        <div>
            <h2>Pending Doctors List</h2>
            <table>
                <thead>
                    <tr className='doctors-list-row'>
                        <th>S.N.</th>
                        <th>Title</th>
                        <th>Doctor's Name</th>
                        <th>Phone</th>
                        <th>Street Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Postal Code</th>
                        <th>Fees</th>
                        <th>Is Accepting New Patients</th>
                    </tr>
                </thead>
                <tbody>{pendingDoctorsList}</tbody>
            </table>
        </div>
    );
}

export default DoctorsList;