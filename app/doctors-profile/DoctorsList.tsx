"use client";

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState, useEffect } from 'react';

const DoctorsList = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getDoctorsList = async () => {
            const response = await axios.get('/doctors', { signal: controller.signal });
            isMounted && setDoctors(response.data);
        }
        getDoctorsList();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    return (
        <div>
            <h2>Doctors List</h2>
            {doctors.length ? (
                <ul>
                    {doctors.map((doctor: any, index: number) => {
                        return <li key={index}>{doctor.id + index}</li>
                    })}
                </ul>
            )
                :
                (<p>No doctors yet!</p>)}
        </div>
    );
}

export default DoctorsList;