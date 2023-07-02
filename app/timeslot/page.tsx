'use client';
const moment = require('moment');
import { useAuthenticatedUserContext } from "@/context";
import { useBookAppointmentMutation } from "@/hooks";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ScheduleMeeting, timeSlotDifference } from "react-schedule-meeting";

export default function Timeslot() {
    const [selectedTimeslot, setSelectedTimeslot] = useState(
        new Date(new Date(new Date().setDate(new Date().getDate())).setHours(9, 0, 0, 0))
    );

    const router = useRouter();
    const bookAppointment = useBookAppointmentMutation();
    const authenticatedUser = useAuthenticatedUserContext();

    // if (authenticatedUser?.role != "Patient") router.push('/auth/logout');

    function getSaturdaysAndSundays(startDate: any, endDate: any) {
        const result = [];

        const currentDate = moment(startDate).startOf('day');
        const lastDate = moment(endDate).startOf('day');

        while (currentDate.isSameOrBefore(lastDate)) {
            if (currentDate.isoWeekday() === 6 || currentDate.isoWeekday() === 7) {
                const id = currentDate.diff(moment().startOf('day'), 'days');

                const startTime = new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(9, 0, 0, 0));
                const endTime = new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(17, 0, 0, 0));

                result.push({
                    startTime,
                    endTime
                });
            }
            currentDate.add(1, 'day');
        }

        return result;
    }

    const startDate = moment('2023-01-01');
    const endDate = moment('2023-12-31');

    const unavailableTimeSlots = getSaturdaysAndSundays(startDate, endDate);

    const availableTimeSlots = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => {
        return {
            id,
            startTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(9, 0, 0, 0)),
            endTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(17, 0, 0, 0)),
        };
    });

    const availableTimeSlotsLessUnavailableTimeSlots = timeSlotDifference(availableTimeSlots, unavailableTimeSlots);

    const handleBookAppointment = () => {
        const localOffset = selectedTimeslot.getTimezoneOffset() * 60000;
        const localISOTime = new Date(selectedTimeslot.getTime() - localOffset).toISOString();
        bookAppointment.mutate({
            userId: authenticatedUser?.userId ?? "",
            date: localISOTime,
            doctorId: ''
        }, {
            onSuccess: (e) => {
                if (e.isPasswordChangeRequired) {
                    router.push(`/auth/change-password`);
                    return;
                } else {
                    router.push('/');
                }
            }
        });
    }

    return (
        <>
            <ScheduleMeeting
                borderRadius={10}
                primaryColor="#3f5b85"
                eventDurationInMinutes={30}
                selectedStartTime={selectedTimeslot}
                defaultDate={selectedTimeslot}
                availableTimeslots={availableTimeSlotsLessUnavailableTimeSlots}
                onStartTimeSelect={timeslot => setSelectedTimeslot(timeslot.startTime)}
            />
            <Button isLoading={bookAppointment.isLoading} onClick={handleBookAppointment} type="submit" colorScheme="facebook" flex={1}>
                Book Appointment
            </Button>
        </>
    );
}