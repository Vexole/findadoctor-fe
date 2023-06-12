"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DevTool } from '@hookform/devtools';
import { Education, Experience, DoctorProfile as FormValues } from "@/models/DoctorProfile";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useApproveDoctorMutation, useSaveDoctorProfileMutation } from "@/hooks";
import { getCities, getLanguages, getPendingDoctorDetailById, getSpecializations } from "@/api";
import { useForm, useFieldArray } from "react-hook-form";
import { Button, Stack } from "@chakra-ui/react";

type PropTypes = {
    params: { id: string },
    isAdmin: boolean,
    isDisabled: boolean,
    cityOptions: JSX.Element[]
    specializationOptions: JSX.Element[]
    languageOptions: JSX.Element[]
}

const DoctorsProfileForm = ({ params, isAdmin, isDisabled,
    cityOptions, specializationOptions, languageOptions }: PropTypes) => {
    const [userId, setUserId] = useState(params.id);

    const saveDoctorProfileApi = useSaveDoctorProfileMutation();
    const approveDoctorApi = useApproveDoctorMutation();
    const rejectDoctorApi = useApproveDoctorMutation();

    const approveByAdmin = async () => {
        await approveDoctorApi.mutateAsync(userId);
    }

    const rejectByAdmin = async () => {
        await rejectDoctorApi.mutateAsync(userId);
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
            <form onSubmit={handleSubmit(submitProfile)} noValidate>
                {/* <div className="form-fields">
                    <label htmlFor="profilePicture">Profile Picture</label>
                    <input type="file" {...register("profilePicture")} />
                </div> */}
                <div className="form-fields">
                    <label htmlFor="title">Title</label>
                    <select {...register("title", { required: 'Title is required' })} id="title" disabled={isDisabled}>
                        <option value="">Select an option</option>
                        <option value="Dr.">Dr.</option>
                        <option value="Dr.(Ms.)">Dr.(Ms.)</option>
                        <option value="Dr.(Mrs.)">Dr.(Mrs.)</option>
                        <option value="Dr.(Miss)">Dr.(Miss)</option>
                        <option value="Dr.(Mr.)">Dr.(Mr.)</option>
                    </select>
                    {/* {errors.title && <span className="error">{errors.title.message}</span>} */}
                </div>
                <div className="form-fields">
                    <label htmlFor="firstName">Fist Name</label>
                    <input {...register("firstName", { required: 'First Name is required' })}
                        id="firstName" type="text" disabled={isDisabled} />
                    {/* {errors.firstName && <span className="error">{errors.firstName.message}</span>} */}
                </div>
                <div className="form-fields">
                    <label htmlFor="middleName">Middle Name</label>
                    <input {...register("middleName")}
                        id="middleName" type="text" disabled={isDisabled} />
                    {/* {errors.middleName && <span className="error">{errors.middleName.message}</span>} */}
                </div>
                <div className="form-fields">
                    <label htmlFor="lastName">Last Name</label>
                    <input {...register("lastName", { required: 'Last Name is required' })}
                        id="lastName" type="text" disabled={isDisabled} />
                    {/* {errors.lastName && <span className="error">{errors.lastName.message}</span>} */}
                </div>
                {/* <div className="form-fields">
                    <label htmlFor="age">Age</label>
                    <input {...register("age", { valueAsNumber: true, required: "Age must be between 18 and 74", min: 18, max: 75 })}
                        id="age" type="text" disabled={isDisabled} />
                </div> */}
                {/* <div className="form-fields">
                    <label htmlFor="gender">Gender</label>
                    <div>
                        <select {...register(`gender`,
                            {
                                validate: (fieldValue) => {
                                    return (fieldValue != "" || "Please select a gender")
                                }
                            })}
                            disabled={isDisabled} >
                            <option value="" disabled>Select an Option</option>
                            <option value="M" disabled>Male</option>
                            <option value="F" disabled>Female</option>
                            <option value="O" disabled>Others</option>
                        </select>
                    </div>
                </div> */}
                <div className="form-fields">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input {...register("phone", {
                        required: "Phone Number is requred",
                        pattern: {
                            value: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
                            message: 'Invalid phone number format'
                        }
                    })} id="phone" type="text" disabled={isDisabled} />
                    {/* {errors.phone && <span className="error">{errors.phone.message}</span>} */}
                </div>
                <div className="form-fields">
                    <label htmlFor="doctorLanguages">Languages</label>
                    <div className="dynamic-lists">
                        {languageFields.map((field, index) => {
                            return (
                                <div className="form-control" key={field.id}>
                                    <select {...register(`doctorLanguages.${index}.languageId` as const,
                                        {
                                            validate: (fieldValue) => {
                                                return (fieldValue != "" || "Please select a language")
                                            }
                                        })}
                                        disabled={isDisabled} >
                                        <option value="" disabled>Select an Option</option>
                                        {languageOptions}
                                    </select>
                                    {!isDisabled && index > 0 &&
                                        <div className="btn_remove">
                                            <button type="button" onClick={() => languageRemove(index)}>Remove</button>
                                        </div>
                                    }
                                </div>);
                        })
                        }
                        {/* {errors.doctorLanguages && <span className="error">Please select a language.</span>} */}
                        {!isDisabled && <div className="btn_add_more">
                            <button type="button" onClick={() => languageAppend({ languageId: "" })}>Add More</button>
                        </div>}
                    </div>
                </div>



                <div className="form-fields">
                    <label htmlFor="street">Street Address</label>
                    <input {...register("street", { required: 'Street Address is required' })}
                        id="street" type="text" disabled={isDisabled} />
                    {/* {errors.street && <span className="error">{errors.street.message}</span>} */}
                </div>
                <div className="form-fields">
                    <label htmlFor="cityId">City</label>
                    <select {...register("cityId", {
                        validate: (fieldValue) => {
                            return (fieldValue !== "" || "Please select a city")
                        }
                    })} id="city" disabled={isDisabled} >
                        <option value="">Select an option</option>
                        {cityOptions}
                    </select>
                    {/* {errors.cityId && <span className="error">{errors.cityId.message}</span>} */}
                </div>
                <div className="form-fields">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input {...register("postalCode", { required: 'Unit Number is required' })}
                        id="postalCode" type="text" disabled={isDisabled} />
                    {/* {errors.postalCode && <span className="error">{errors.postalCode.message}</span>} */}
                </div>



                <div className="form-fields">
                    <label htmlFor="doctorEducationBackgrounds">Qualifications</label>
                    <div className="dynamic-lists">
                        {qualificationFields.map((field, index) => {
                            return (
                                <div className="form-control" key={field.id}>
                                    <input {...register(`doctorEducationBackgrounds.${index}.degree` as const,
                                        { required: 'Degree is required' })}
                                        id={`doctorEducationBackgrounds.${index}.degree`}
                                        type="text" placeholder="Degree" disabled={isDisabled} />
                                    <input
                                        {...register(`doctorEducationBackgrounds.${index}.institutionName` as const, {
                                            required: "Please enter the institute name"
                                        })}
                                        type="text"
                                        placeholder="Institute Name" disabled={isDisabled}
                                    />
                                    <input
                                        {...register(`doctorEducationBackgrounds.${index}.fieldOfStudy` as const, {
                                            required: "Please enter the field of study"
                                        })}
                                        type="text"
                                        placeholder="Field of Study" disabled={isDisabled}
                                    />
                                    <label htmlFor="startDate">Start Date</label>
                                    <input {...register(`doctorEducationBackgrounds.${index}.startDate` as const, {
                                        required: "Please select start date"
                                    })} type="date" id={`doctorEducationBackgrounds.${index}.startDate`} disabled={isDisabled} />
                                    <label htmlFor="endDate">End Date</label>
                                    <input {...register(`doctorEducationBackgrounds.${index}.endDate` as const, {
                                        required: "Please select end date",
                                        validate: {
                                            endDateGreaterThanStartDate: (value) => {
                                                const startDate: string = document.getElementById(`doctorEducationBackgrounds.${index}.startDate`)?.value;
                                                if (!startDate || startDate === '') {
                                                    return true;
                                                }
                                                return new Date(value) >= new Date(startDate) || "End date cannot be before start date";
                                            }
                                        }
                                    })} type="date" disabled={isDisabled} />
                                    {
                                        !isDisabled && index > 0 &&
                                        <div className="btn_remove">
                                            <button type="button" onClick={() => qualificationRemove(index)}>Remove</button>
                                        </div>
                                    }
                                    {/* <div className="errors">
                                        {errors.doctorEducationBackgrounds?.[index]?.degree && (
                                            <div className="error">{errors.doctorEducationBackgrounds?.[index]?.degree.message}</div>
                                        )}
                                        {errors.doctorEducationBackgrounds?.[index]?.institutionName && (
                                            <div className="error">{errors.doctorEducationBackgrounds?.[index]?.institutionName.message}</div>
                                        )}
                                        {errors.doctorEducationBackgrounds?.[index]?.fieldOfStudy && (
                                            <div className="error">{errors.doctorEducationBackgrounds?.[index]?.fieldOfStudy.message}</div>
                                        )}
                                        {errors.doctorEducationBackgrounds?.[index]?.startDate && (
                                            <div className="error">{errors.doctorEducationBackgrounds?.[index]?.startDate.message}</div>
                                        )}
                                        {errors.doctorEducationBackgrounds?.[index]?.endDate && (
                                            <div className="error">{errors.doctorEducationBackgrounds?.[index]?.endDate.message}</div>
                                        )}
                                    </div> */}
                                </div>);
                        })
                        }
                        {!isDisabled && <div className="btn_add_more">
                            <button type="button" onClick={() => qualificationAppend({ startDate: "", endDate: "", fieldOfStudy: "", degree: "", institutionName: "" })}>Add More</button>
                        </div>}
                    </div>
                </div>



                <div className="form-fields">
                    <label htmlFor="experiences">Experiences</label>
                    <div className="dynamic-lists">
                        {experienceFields.map((field, index) => {
                            return (
                                <div className="form-control" key={field.id}>
                                    <input
                                        {...register(`experiences.${index}.companyName` as const, {
                                            required: "Please enter the company name"
                                        })}
                                        type="text"
                                        placeholder="Company Name"
                                        disabled={isDisabled}
                                    />
                                    <label htmlFor={`experiences.${index}.description`}>Description</label>
                                    <input
                                        {...register(`experiences.${index}.description` as const, {
                                            required: "Please enter the description"
                                        })}
                                        type="text"
                                        placeholder="Description"
                                        disabled={isDisabled}
                                    />
                                    <label htmlFor="startDate">Start Date</label>
                                    <input {...register(`experiences.${index}.startDate` as const, {
                                        required: "Please select start date"
                                    })} type="date" id={`experiences.${index}.startDate`} disabled={isDisabled} />
                                    <label htmlFor="endDate">End Date</label>
                                    <input {...register(`experiences.${index}.endDate` as const, {
                                        required: "Please select end date",
                                        validate: {
                                            endDateGreaterThanStartDate: (value) => {
                                                let startDate: string = document.getElementById(`experiences.${index}.startDate`)?.value;
                                                if (!startDate || startDate === '') {
                                                    return true;
                                                }
                                                return new Date(value) >= new Date(startDate) || "End date must be after start date";
                                            }
                                        }
                                    })} type="date" disabled={isDisabled} />
                                    {
                                        !isDisabled && index > 0 &&
                                        <div className="btn_remove">
                                            <button type="button" onClick={() => experienceRemove(index)}>Remove</button>
                                        </div>
                                    }
                                    {/* <div className="errors">
                                        {errors && errors.experiences?.[index]?.companyName && (
                                            <div className="error">{errors.experiences?.[index]?.companyName.message}</div>
                                        )}
                                        {errors.experiences?.[index]?.description && (
                                            <div className="error">{errors.experiences?.[index]?.description.message}</div>
                                        )}
                                        {errors.experiences?.[index]?.startDate && (
                                            <div className="error">{errors.experiences?.[index]?.startDate.message}</div>
                                        )}
                                        {errors.experiences?.[index]?.endDate && (
                                            <div className="error">{errors.experiences?.[index]?.endDate.message}</div>
                                        )}
                                    </div> */}
                                </div>);
                        })
                        }
                        {!isDisabled && <div className="btn_add_more">
                            <button type="button" onClick={() => experienceAppend({ startDate: "", endDate: "", companyName: "", description: "" })}>Add More</button>
                        </div>}
                    </div>
                </div>



                <div className="form-fields">
                    <label htmlFor="doctorSpecialties">Specializations</label>
                    <div className="dynamic-lists">
                        {specializationFields.map((field, index) => {
                            return (
                                <div className="form-control" key={field.specialtyId}>
                                    <select {...register(`doctorSpecialties.${index}.specialtyId` as const,
                                        {
                                            required: "Please select a specialization"
                                        })}
                                        disabled={isDisabled}
                                    >
                                        <option value="" disabled>Select an Option</option>
                                        {specializationOptions}
                                    </select>
                                    {
                                        !isDisabled && index > 0 &&
                                        <div>
                                            <button type="button" onClick={() => specializationRemove(index)}>Remove</button>
                                        </div>
                                    }
                                </div>);
                        })
                        }
                        {/* {errors.doctorSpecialties && <span className="error">Please complete specialization details.</span>} */}
                        {!isDisabled && <div className="btn_add_more">
                            <button type="button" onClick={() => specializationAppend({ specialtyId: "" })}>Add More</button>
                        </div>}
                    </div>
                </div>

                <div className="form-fields">
                    <label htmlFor="fees">Fees</label>
                    <input {...register("fees", {
                        required: "Fees is requred",
                        pattern: {
                            value: /^\d+(,\d{1,2})?$/,
                            message: 'Invalid fees'
                        }
                    })} id="fees" type="text" disabled={isDisabled} />
                    {/* {errors.fees && <span className="error">{errors.fees.message}</span>} */}
                </div>

                <div className="form-fields">
                    <label htmlFor="waitingTime">Waiting Time</label>
                    <input {...register("waitingTime")} id="waitingTime" type="text" disabled={isDisabled} />
                    {/* {errors.waitingTime && <span className="error">{errors.waitingTime.message}</span>} */}
                </div>

                <div className="form-fields">
                    <label htmlFor="isAcceptingNewPatients">IsAcceptingNewPatients</label>
                    <input {...register("isAcceptingNewPatients")} id="isAcceptingNewPatients" type="checkbox" disabled={isDisabled} />
                </div>


                {isAdmin && (<Stack direction={'row'} spacing={3} alignItems={'center'}>
                    <Link href={`/admin/pending-doctors`}>
                        <span>Back</span>
                    </Link>
                    <Button type="button" colorScheme="blue" onClick={approveByAdmin}>Approve</Button>
                    <Button type="button" colorScheme="red" onClick={rejectByAdmin}>Reject</Button>
                </Stack>)}
            </form>
            {/* <DevTool control={control} /> */}
        </>
    );
}

export default DoctorsProfileForm;