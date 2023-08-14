'use client';
const moment = require('moment');
import { getTimeslotAvailability } from "@/api";
import { useBookAppointmentMutation, useUpdateAppointmentMutation } from "@/hooks";
import { Appointment } from "@/models/Appointment";
import { getPaitent, getUser } from "@/utils/userUtils";
import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ScheduleMeeting, timeSlotDifference } from "react-schedule-meeting";

export default function BookAppointment() {
  const [selectedTimeslot, setSelectedTimeslot] = useState<Date>(
    // new Date(new Date(new Date().setDate(new Date().getDate()+1)).setHours(9, 0, 0, 0))
  );
  const [eventDurationInMinutes, setEventDurationInMinutes] = useState(60);
  const [isEditMode, setIsEditMode] = useState(false);
  const [appointment, setAppointment] = useState<Appointment>();
  const [openTimeslots, setOpenTimeslots] = useState<any[]>([]);

  const router = useRouter();
  const bookAppointment = useBookAppointmentMutation();
  const updateAppointment = useUpdateAppointmentMutation();
  const authenticatedUser = getUser();
  const patient = getPaitent();

  if (authenticatedUser?.role != "Patient") router.push('/auth/logout');

  const getTimeSlots = async () => {
    const openTimeslots: any[] = [];
    const promises = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(async (id) => {
      const timeslotDate = new Date(new Date().setDate(new Date().getDate() + id));
      const timeslots = await getTimeslotAvailability(patientProfile.associatedDoctor.doctorUserId, timeslotDate.toISOString().split('T')[0]);
      if (timeslots.length > 0) {
        timeslots.forEach((timeslot: any) => {
          const fromTime = timeslot.fromTime.split(":");
          const toTime = timeslot.toTime.split(":");
          const startTime = new Date(new Date(timeslot.date).setHours(fromTime[0], fromTime[1], fromTime[2], 0));
          const endTime = new Date(new Date(timeslot.date).setHours(toTime[0], toTime[1], toTime[2], 0));
          openTimeslots.push({
            id,
            startTime,
            endTime
          });
        });
      }
    });

    await Promise.all(promises);
    return openTimeslots;
  }

  useEffect(() => {
    if (localStorage.appointment) {
      const appointment = JSON.parse(localStorage.appointment);
      setSelectedTimeslot(new Date(appointment.appointmentDate));
      setAppointment(appointment);
      setIsEditMode(true);
    }

    async function fetchOpenTimeslots() {
      const timeslots = await getTimeSlots();
      setOpenTimeslots(timeslots);
      if (timeslots.length > 0) {
        const timeDifferenceInMillis = timeslots[0].endTime - timeslots[0].startTime;
        const diffInMinutes = Math.floor((timeDifferenceInMillis) / (1000 * 60));
        setEventDurationInMinutes(diffInMinutes);
      }
    }

    fetchOpenTimeslots();
  }, []);

  const handleUpdateAppointment = () => {
    if (selectedTimeslot && appointment) {
      const localOffset = selectedTimeslot.getTimezoneOffset() * 60000;
      const localTime = new Date(selectedTimeslot.getTime() - localOffset);
      const fromTime = localTime.toISOString().split('T')[1].split('.')[0];
      let endTimeSlot = new Date(localTime);
      const toTime = new Date((endTimeSlot.setMinutes(endTimeSlot.getMinutes() + eventDurationInMinutes)))
        .toISOString().split('T')[1].split('.')[0];
      updateAppointment.mutate({
        id: appointment.id,
        patientUserId: appointment?.patientUserId,
        appointmentDate: localTime.toISOString(),
        doctorUserId: appointment?.doctorUserId,
        fromTime,
        toTime
      }, {
        onSuccess: () => {
          localStorage.removeItem('appointment');
          router.push('/patient/appointments/book-appointment/success?updated=true');
        }
      });
    }
  }

  const handleCancelUpdateAppointment = () => {
    localStorage.removeItem('appointment');
    return router.push('/patient/appointments');
  }

  const patientProfile = JSON.parse(localStorage.patient);

  const handleBookAppointment = () => {
    if (selectedTimeslot) {
      const localOffset = selectedTimeslot.getTimezoneOffset() * 60000;
      const localTime = new Date(selectedTimeslot.getTime() - localOffset);
      const fromTime = localTime.toISOString().split('T')[1].split('.')[0];
      let endTimeSlot = new Date(localTime);
      const toTime = new Date((endTimeSlot.setMinutes(endTimeSlot.getMinutes() + eventDurationInMinutes)))
        .toISOString().split('T')[1].split('.')[0];
      bookAppointment.mutate({
        patientUserId: authenticatedUser?.userId ?? "",
        appointmentDate: localTime.toISOString(),
        doctorUserId: patient?.associatedDoctor?.doctorUserId ?? "",
        fromTime,
        toTime
      }, {
        onSuccess: () => {
          router.push('/patient/appointments/book-appointment/success');
        }
      });
    }
  }

  return (
    <div className="appointment-booking">
      <ScheduleMeeting
        borderRadius={10}
        primaryColor="#3f5b85"
        eventDurationInMinutes={eventDurationInMinutes}
        selectedStartTime={selectedTimeslot}
        defaultDate={selectedTimeslot}
        availableTimeslots={openTimeslots}
        onStartTimeSelect={timeslot => setSelectedTimeslot(timeslot.startTime)}
      />

      <Flex justify="center" gap={3} marginTop={4}>
        <Button
          isLoading={bookAppointment.isLoading}
          onClick={handleCancelUpdateAppointment}
          type="submit"
          colorScheme="yellow"
        >
          Back
        </Button>

        {isEditMode && <Button
          isLoading={bookAppointment.isLoading}
          onClick={handleUpdateAppointment}
          type="submit"
          colorScheme="facebook"
        >
          Update Appointment
        </Button>}
        {!isEditMode && <Button
          isLoading={bookAppointment.isLoading}
          onClick={handleBookAppointment}
          type="submit"
          isDisabled={selectedTimeslot == null}
          colorScheme="facebook"
        >
          Book Appointment
        </Button>}
      </Flex>
    </div>
  );
}