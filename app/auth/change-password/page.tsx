'use client';
import { FormInput, FormWrapper } from '@/components';
import { useChangePasswordMutation } from '@/hooks';
import { Button, Heading, Spinner, Stack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUserId } from '@/utils/userUtils';

const schema = yup
    .object({
        oldPassword: yup.string().required('Current Password is required.'),
        newPassword: yup
            .string()
            .required('Password is required.')
            .min(8, 'Must be at least 8 characters')
            .matches(/[0-9]/, 'Password must have at least one number.')
            .matches(/[a-z]/, 'Password must have at least one lowercase character.')
            .matches(/[A-Z]/, 'Password must have at least one uppercase character.')
            .matches(/[^a-zA-Z0-9]/, 'Password must have at least one non-alphanumeric character.'),
        confirmPassword: yup
            .string()
            .required('Confirm Password is required.')
            .oneOf([yup.ref('newPassword')], 'Passwords must match.'),
    })
    .required();

type FormTypes = yup.InferType<typeof schema>;

export default function Register() {
    const { changePassword } = useChangePasswordMutation();
    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormTypes>({ resolver: yupResolver(schema) });

    const [userId, setUserId] = useState('');

    useEffect(() => {
        const loggedInUserId = getUserId();
        if (!loggedInUserId) router.push('/auth/login');
        setUserId(loggedInUserId);
    }, []);

    const onSubmit: SubmitHandler<FormTypes> = (formValues: yup.InferType<typeof schema>) =>
        changePassword.mutate({ ...formValues, userId }, { onSuccess: () => router.push('/') });

    return (
        <FormWrapper title="Change Password" onSubmit={handleSubmit(onSubmit)}>
            <FormInput
                type="password"
                label="Current Password"
                register={register('oldPassword')}
                isInvalid={Boolean(errors.oldPassword)}
                helperText={errors.oldPassword ? String(errors.oldPassword?.message) : ''}
            />

            <FormInput
                type="password"
                label="New Password"
                register={register('newPassword')}
                isInvalid={Boolean(errors.newPassword)}
                helperText={
                    errors.newPassword
                        ? String(errors.newPassword?.message)
                        : 'The password must have at least 8 character, one lowercase, one uppercase, one number, and one non-alphanumeric character.'
                }
            />
            <FormInput
                type="password"
                label="Confirm Password"
                register={register('confirmPassword')}
                isInvalid={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword ? String(errors.confirmPassword?.message) : ''}
            />
            <Button isLoading={changePassword.isLoading} type="submit" colorScheme="blue">
                Change Password
            </Button>
        </FormWrapper>
    );
}
