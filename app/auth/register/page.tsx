'use client';
import { RegisterForm } from './form';
import { getRoles } from '@/api/auth';
import { PageWrapper } from '@/components';
import { useEffect, useState } from 'react';

const Register = () => {
  // const [roleOptions, setRoleOptions] = useState<JSX.Element[]>([]);

  // const fetchRoles = async () => {
  //     try {
  //         const roles: any[] = await getRoles();
  //         const roleOptions = roles.map((role: any) => {
  //             return <option key={role} value={role}>{role}</option>;
  //         });
  //         setRoleOptions(roleOptions);
  //     } catch (error: any) {
  //         console.error("Error occurred while fetching roles:", error.message);
  //     }
  // }

  // useEffect(() => {
  //     fetchRoles();
  // }, []);

  return (
    <PageWrapper>
      <RegisterForm />
    </PageWrapper>
  );
};

export default Register;
