'use client';
import SuccessPage from '@/components/SuccessPage';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AppointmentSuccessPage() {
  const searchParams = useSearchParams();

  const isUpdated = searchParams.get('updated') === 'true';

  const router = useRouter();

  const title = isUpdated ? 'Appointment Updated' : 'Appointment Booked';
  const message = isUpdated
    ? 'Your appointment has been updated successfully.'
    : 'Your appointment has been booked successfully.';

  return (
    <div>
      <SuccessPage
        successTitle={title}
        successMessage={message}
        button1Text="View Appointments"
        button2Text="Got to Homepage"
        handleButton1Click={() => router.push('/patient/appointments')}
        handleButton2Click={() => router.push('/')}
      />
    </div>
  );
}
