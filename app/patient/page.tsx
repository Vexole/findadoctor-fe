import Link from 'next/link';

export default function PatientProfile() {
  return (
    <div>
      {/* <PatientProfileView /> */}
      <Link href="/patient/update">Update My Profile</Link>
    </div>
  );
}
