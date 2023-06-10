"use client"

import Link from "next/link";
import React from "react";

export function DoctorRow(props) {
    const {
        doctorUserId,
        doctorName,
        isAcceptingNewPatients,
        phone,
        title,
        fees,
        state,
        city,
        address,
        postalCode,
    } = props.pendingDoctors;

    return (
        <tr className='doctors-list-row'>
            <td>{props.index + 1}</td>
            <td>{title}</td>
            <td>{doctorName}</td>
            <td>{phone}</td>
            <td>{address}</td>
            <td>{city}</td>
            <td>{state}</td>
            <td>{postalCode}</td>
            <td>{fees}</td>
            <td><input type="checkbox" checked={isAcceptingNewPatients} readOnly /></td>
            <td><Link href={`/admin/pending-doctors/${doctorUserId}`}>
                <span>View Details</span>
            </Link></td>
            <td><button type="button" onClick={() => props.approveDoctorByAdmin(doctorUserId)}>Approve</button></td>
            <td><button type="button" onClick={() => props.rejectDoctorByAdmin(doctorUserId)}>Reject</button></td>
        </tr>
    );
}
