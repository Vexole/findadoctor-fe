"use client";
import { DoctorRow } from './DoctorRow';
import { usePendingDoctorsQuery, useApproveDoctorMutation, useRejectDoctorMutation } from '@/hooks';
import { useRouter } from 'next/navigation';

const DoctorsList = () => {
    const router = useRouter();
    const pendingDoctorsQuery = usePendingDoctorsQuery();
    const approveDoctorMutation = useApproveDoctorMutation();
    const rejectDoctorMutation = useRejectDoctorMutation();

    if (pendingDoctorsQuery.isLoading) return <h1>Loading...</h1>;
    if (pendingDoctorsQuery.isError)
        return <pre>{JSON.stringify(pendingDoctorsQuery.error)}</pre>;

    const approveDoctorByAdmin = async (doctorId: string) => {
        try {
            const result = await approveDoctorMutation.mutateAsync(doctorId,
                { onSuccess: () => router.push('/admin/pending-doctors') });
        } catch (e) {
            console.log(e);
        }
    }

    const rejectDoctorByAdmin = async (doctorId: string) => {
        try {
            const result = await rejectDoctorMutation.mutateAsync(doctorId,
                { onSuccess: () => router.push('/admin/pending-doctors') });
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
            approveDoctorByAdmin={approveDoctorByAdmin}
            rejectDoctorByAdmin={rejectDoctorByAdmin} />))

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