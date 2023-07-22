"use client";
import { DevTool } from '@hookform/devtools';
import { Education, Experience, DoctorProfile as FormValues } from "@/models/DoctorProfile";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useApproveDoctorMutation, useRejectDoctorMutation, useSaveDoctorProfileMutation } from "@/hooks";
import { getCities, getLanguages, getPendingDoctorDetailById, getSpecializations } from "@/api";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button, Stack, Grid, Box, Image, Select, Input, Text, VStack, HStack, useToast, Checkbox } from "@chakra-ui/react";

type PropTypes = {
    params: { id: string },
    isAdmin: boolean,
    isDisabled: boolean,
    cityOptions: JSX.Element[]
    specializationOptions: JSX.Element[]
    languageOptions: JSX.Element[],
    genderOptions: JSX.Element[]
}

const DoctorsProfileForm = ({ params, isAdmin, isDisabled,
    cityOptions, specializationOptions, languageOptions, genderOptions }: PropTypes) => {
    const [userId, setUserId] = useState(params.id);
    const [profileImageUrl, setProfileImageUrl] = useState("");

    const saveDoctorProfileApi = useSaveDoctorProfileMutation();
    const approveDoctorApi = useApproveDoctorMutation();
    const rejectDoctorApi = useRejectDoctorMutation();
    const router = useRouter();

    const approveByAdmin = async () => {
        await approveDoctorApi.mutateAsync(userId, {
            onSuccess: res => router.push("/admin/pending-doctors")
        });
    }

    const rejectByAdmin = async () => {
        await rejectDoctorApi.mutateAsync(userId, {
            onSuccess: res => router.push("/admin/pending-doctors")
        });
    }

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<FormValues>({
        defaultValues: {
            doctorSpecialties: [{ specialtyId: "" }],
            doctorEducationBackgrounds: [{ startDate: "", endDate: "", fieldOfStudy: "", degree: "", institutionName: "" }],
            experiences: [{ startDate: "", endDate: "", companyName: "", description: "" }],
            doctorLanguages: [{ languageId: "" }]
        }
    });

    useEffect(() => {
        const fetchDoctorProfile = async () => {
            try {
                const doctorProfile = await getPendingDoctorDetailById(params.id);
                const doctorProfileData = doctorProfile.data;
                setProfileImageUrl(doctorProfileData.profilePicture);

                if (doctorProfileData) {
                    const formattedData = {
                        ...doctorProfileData,
                        doctorEducationBackgrounds: doctorProfileData
                            .doctorEducationBackgrounds.map((education: Education) => ({
                                ...education,
                                startDate: education.startDate.split('T')[0],
                                endDate: education.endDate.split('T')[0],
                            })),
                        experiences: doctorProfileData.experiences.map((experience: Experience) => ({
                            ...experience,
                            startDate: experience.startDate.split('T')[0],
                            endDate: experience.endDate.split('T')[0],
                        })),
                    };
                    reset(formattedData);
                }
            } catch (error) {
                console.error("Error occurred while fetching doctor profile:", error);
            }
        };

        fetchDoctorProfile();
    }, []);

    const { fields: specializationFields, append: specializationAppend, remove: specializationRemove } = useFieldArray({
        name: 'doctorSpecialties',
        control
    })

    const { fields: experienceFields, append: experienceAppend, remove: experienceRemove } = useFieldArray({
        name: 'experiences',
        control
    })

    const { fields: qualificationFields, append: qualificationAppend, remove: qualificationRemove } = useFieldArray({
        name: 'doctorEducationBackgrounds',
        control
    })

    const { fields: languageFields, append: languageAppend, remove: languageRemove } = useFieldArray({
        name: 'doctorLanguages',
        control
    })

    const submitProfile = async (data: FormValues) => {
        const result = await saveDoctorProfileApi.mutateAsync(data);
        console.log(result);
    }

    return (
        <>
            {/* {saveDoctorProfileMutation.isError && <p>Error occurred while saving doctor profile: {saveDoctorProfileMutation?.error?.message}</p>} <br></br> */}
            {/* {saveDoctorProfileMutation.isLoading && "Loading..."} */}
            <form onSubmit={handleSubmit(submitProfile)} noValidate className="pending-doctor-profile">
                <Grid templateColumns={{ sm: "1fr", md: "2fr 3fr 2fr" }} gap={6} maxW="1024px" mx="auto">
                    <Box>
                        <Box w="200px" h="200px" rounded="full" overflow="hidden" boxShadow="md" mx="auto">
                            <Image src={profileImageUrl} alt="Profile Picture" objectFit="cover" w="100%" h="100%" />
                        </Box>
                        <VStack spacing={4} align="stretch">
                            <Box>
                                <Text fontWeight="bold">Title</Text>
                                <Select {...register("title", { required: 'Title is required' })} isDisabled={isDisabled}>
                                    <option value="">Select an option</option>
                                    <option value="Dr.">Dr.</option>
                                    <option value="Dr.(Ms.)">Dr.(Ms.)</option>
                                    <option value="Dr.(Mrs.)">Dr.(Mrs.)</option>
                                    <option value="Dr.(Miss)">Dr.(Miss)</option>
                                    <option value="Dr.(Mr.)">Dr.(Mr.)</option>
                                </Select>
                            </Box>

                            <Box>
                                <Text fontWeight="bold">First Name</Text>
                                <Input {...register("firstName", { required: 'First Name is required' })} type="text" isDisabled={isDisabled} />
                            </Box>

                            <Box>
                                <Text fontWeight="bold">Middle Name</Text>
                                <Input {...register("middleName")} type="text" isDisabled={isDisabled} />
                            </Box>

                            <Box>
                                <Text fontWeight="bold">Last Name</Text>
                                <Input {...register("lastName", { required: 'Last Name is required' })} type="text" isDisabled={isDisabled} />
                            </Box>

                            <Box>
                                <Text fontWeight="bold">Phone Number</Text>
                                <Input
                                    {...register("phone", {
                                        required: "Phone Number is required",
                                        pattern: {
                                            value: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
                                            message: 'Invalid phone number format'
                                        }
                                    })}
                                    id="phone" type="text" isDisabled={isDisabled}
                                />
                            </Box>

                            <Box>
                                <Text fontWeight="bold">Gender</Text>
                                <Select
                                    {...register("gender", {
                                        validate: (fieldValue) => {
                                            return fieldValue !== "" || "Please select a gender";
                                        }
                                    })}
                                    id="gender" isDisabled={isDisabled}
                                >
                                    <option value="">Select an Option</option>
                                    {genderOptions}
                                </Select>
                                {errors.gender && <Text color="red">Please select a gender.</Text>}
                            </Box>

                            <Box>
                                <Text fontWeight="bold">Languages</Text>
                                <VStack spacing={4} align="stretch">
                                    {languageFields.map((field, index) => (
                                        <Box key={field.id}>
                                            <Select
                                                {...register(`doctorLanguages.${index}.languageId`, {
                                                    validate: (fieldValue) => {
                                                        return fieldValue !== "" || "Please select a language";
                                                    }
                                                })}
                                                isDisabled={isDisabled}
                                            >
                                                <option value="" disabled>Select an Option</option>
                                                {languageOptions}
                                            </Select>
                                            {!isDisabled && index > 0 &&
                                                <Button variant="link" colorScheme="red" size="sm" onClick={() => languageRemove(index)}>Remove</Button>
                                            }
                                        </Box>
                                    ))}
                                    {!isDisabled && <Button colorScheme="blue" size="sm" onClick={() => languageAppend({ languageId: "" })}>Add More</Button>}
                                </VStack>
                            </Box>
                        </VStack>
                    </Box>

                    <VStack spacing={6} align="stretch">
                        <Box>
                            <Text fontWeight="bold">Qualifications</Text>
                            <VStack spacing={4} align="stretch">
                                {qualificationFields.map((field, index) => (
                                    <VStack key={field.id} spacing={2} align="stretch">
                                        <Input
                                            {...register(`doctorEducationBackgrounds.${index}.degree` as const, { required: 'Degree is required' })}
                                            type="text"
                                            placeholder="Degree"
                                            isDisabled={isDisabled}
                                        />
                                        <Input
                                            {...register(`doctorEducationBackgrounds.${index}.institutionName` as const, {
                                                required: "Please enter the institute name"
                                            })}
                                            type="text"
                                            placeholder="Institute Name"
                                            isDisabled={isDisabled}
                                        />
                                        <Input
                                            {...register(`doctorEducationBackgrounds.${index}.fieldOfStudy` as const, {
                                                required: "Please enter the field of study"
                                            })}
                                            type="text"
                                            placeholder="Field of Study"
                                            isDisabled={isDisabled}
                                        />
                                        <HStack spacing={4}>
                                            <Box>
                                                <label htmlFor={`doctorEducationBackgrounds.${index}.startDate`}>Start Date</label>
                                                <Input
                                                    {...register(`doctorEducationBackgrounds.${index}.startDate` as const, {
                                                        required: "Please select start date"
                                                    })}
                                                    type="date"
                                                    id={`doctorEducationBackgrounds.${index}.startDate`}
                                                    isDisabled={isDisabled}
                                                />
                                            </Box>
                                            <Box>
                                                <label htmlFor={`doctorEducationBackgrounds.${index}.endDate`}>End Date</label>
                                                <Input
                                                    {...register(`doctorEducationBackgrounds.${index}.endDate` as const, {
                                                        required: "Please select end date",
                                                        validate: {
                                                            endDateGreaterThanStartDate: (value) => {
                                                                const startDate: string = document.getElementById(
                                                                    `doctorEducationBackgrounds.${index}.startDate`
                                                                )?.value;
                                                                if (!startDate || startDate === '') {
                                                                    return true;
                                                                }
                                                                return new Date(value) >= new Date(startDate) || "End date cannot be before start date";
                                                            }
                                                        }
                                                    })}
                                                    type="date"
                                                    isDisabled={isDisabled}
                                                />
                                            </Box>
                                            {!isDisabled && index > 0 && (
                                                <Button onClick={() => qualificationRemove(index)}>Remove</Button>
                                            )}
                                        </HStack>
                                    </VStack>
                                ))}
                                {!isDisabled && (
                                    <Button onClick={() => qualificationAppend({ startDate: "", endDate: "", fieldOfStudy: "", degree: "", institutionName: "" })}>
                                        Add More
                                    </Button>
                                )}
                            </VStack>
                        </Box>

                        <Box>
                            <Box>
                                <Text fontWeight="bold">Experiences</Text>
                                <VStack spacing={4} align="stretch">
                                    {experienceFields.map((field, index) => (
                                        <VStack key={field.id} spacing={2} align="stretch">
                                            <Input
                                                {...register(`experiences.${index}.companyName` as const, {
                                                    required: "Please enter the company name"
                                                })}
                                                type="text"
                                                placeholder="Company Name"
                                                isDisabled={isDisabled}
                                            />
                                            <Input
                                                {...register(`experiences.${index}.description` as const, {
                                                    required: "Please enter the description"
                                                })}
                                                type="text"
                                                placeholder="Description"
                                                isDisabled={isDisabled}
                                            />
                                            <HStack spacing={4}>
                                                <Box>
                                                    <label htmlFor={`experiences.${index}.startDate`}>Start Date</label>
                                                    <Input
                                                        {...register(`experiences.${index}.startDate` as const, {
                                                            required: "Please select start date"
                                                        })}
                                                        type="date"
                                                        id={`experiences.${index}.startDate`}
                                                        isDisabled={isDisabled}
                                                    />
                                                </Box>
                                                <Box>
                                                    <label htmlFor={`experiences.${index}.endDate`}>End Date</label>
                                                    <Input
                                                        {...register(`experiences.${index}.endDate` as const, {
                                                            required: "Please select end date",
                                                            validate: {
                                                                endDateGreaterThanStartDate: (value) => {
                                                                    const startDate: string = document.getElementById(
                                                                        `experiences.${index}.startDate`
                                                                    )?.value;
                                                                    if (!startDate || startDate === '') {
                                                                        return true;
                                                                    }
                                                                    return new Date(value) >= new Date(startDate) || "End date must be after start date";
                                                                }
                                                            }
                                                        })}
                                                        type="date"
                                                        isDisabled={isDisabled}
                                                    />
                                                </Box>
                                                {!isDisabled && index > 0 && (
                                                    <Button onClick={() => experienceRemove(index)}>Remove</Button>
                                                )}
                                            </HStack>
                                        </VStack>
                                    ))}
                                    {!isDisabled && (
                                        <Button onClick={() => experienceAppend({ startDate: "", endDate: "", companyName: "", description: "" })}>
                                            Add More
                                        </Button>
                                    )}
                                </VStack>
                            </Box>
                        </Box>
                    </VStack>

                    <VStack spacing={6} align="stretch">
                        <Box>
                            <Text fontWeight="bold">Specializations</Text>
                            <VStack spacing={4} align="stretch">
                                {specializationFields.map((field, index) => (
                                    <VStack key={field.specialtyId} spacing={2} align="stretch">
                                        <Select
                                            {...register(`doctorSpecialties.${index}.specialtyId` as const, {
                                                required: "Please select a specialization"
                                            })}
                                            disabled={isDisabled}
                                            placeholder="Select an Option"
                                        >
                                            {specializationOptions}
                                        </Select>
                                        {!isDisabled && index > 0 && (
                                            <Button onClick={() => specializationRemove(index)}>Remove</Button>
                                        )}
                                    </VStack>
                                ))}
                                {!isDisabled && (
                                    <Button onClick={() => specializationAppend({ specialtyId: "" })}>
                                        Add More
                                    </Button>
                                )}
                            </VStack>
                        </Box>

                        <Box>
                            <Text fontWeight="bold">Fees</Text>
                            <Input
                                {...register("fees", {
                                    required: "Fees is required",
                                    pattern: {
                                        value: /^\d+(,\d{1,2})?$/,
                                        message: 'Invalid fees'
                                    }
                                })}
                                type="text"
                                id="fees"
                                isDisabled={isDisabled}
                            />
                        </Box>

                        <Box>
                            <Text fontWeight="bold">Waiting Time</Text>
                            <Input
                                {...register("waitingTime")}
                                type="text"
                                id="waitingTime"
                                isDisabled={isDisabled}
                            />
                        </Box>

                        <Box>
                            <Text fontWeight="bold">IsAcceptingNewPatients</Text>
                            <input {...register("isAcceptingNewPatients")} id="isAcceptingNewPatients" type="checkbox" disabled={isDisabled} />
                        </Box>

                        {isAdmin && (
                            <HStack justifyContent="flex-end" spacing={4}>
                                <Link href="/admin/pending-doctors"><Button colorScheme="yellow">Back</Button></Link>
                                <Button colorScheme="blue" onClick={approveByAdmin}>Approve</Button>
                                <Button colorScheme="red" onClick={rejectByAdmin}>Reject</Button>
                            </HStack>
                        )}
                    </VStack>
                </Grid>
            </form>
            {/* <DevTool control={control} /> */}
        </>
    );
}

export default DoctorsProfileForm;