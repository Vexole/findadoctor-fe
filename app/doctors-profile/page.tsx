"use client"
import { AddressForm } from "./AddressForm";
import { EducationForm } from "./EducationForm";
import { UserForm } from "./UserForm";
import { useMultiStepForm } from "@/utils/useMultiStepForm";
import { Education, Experience, DoctorProfile as FormValues } from "@/models/DoctorProfile";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import ExperienceForm from "./ExperienceForm";
import MiscellaneousInformationForm from "./MiscellaneousInformationForm";
import { useCitiesQuery, useDoctorProfileQuery, useGendersQuery, useLanguagesQuery, usePendingDoctorsQuery, useSaveDoctorProfileMutation, useSpecializationsQuery, useUpdateDoctorProfileMutation } from "@/hooks";
import { getUser } from "@/utils/userUtils";
import { uploadImage } from '@/utils/cloudinary';

const DoctorsProfile = () => {
    const [languageOptions, setLanguageOptions] = useState<JSX.Element[]>([]);
    const [cityOptions, setCityOptions] = useState<JSX.Element[]>([]);
    const [genderOptions, setGenderOptions] = useState<JSX.Element[]>([]);
    const [specializationOptions, setSpecializationOptions] = useState<JSX.Element[]>([]);
    const [error, setError] = useState();
    const [isDisabled, setIsDisabled] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [profilePictureUrl, setProfilePictureUrl] = useState("https://res.cloudinary.com/dbmmtklps/image/upload/v1688519237/q8v58luexpmgoxacidj9.jpg");
    const [oldDoctorProfileData, setOldDoctorProfileData] = useState<FormValues | undefined>();

    const saveDoctorProfileMutation = useSaveDoctorProfileMutation();
    const updateDoctorProfileMutation = useUpdateDoctorProfileMutation();
    const router = useRouter();
    const authenticatedUser = getUser();

    const { register, handleSubmit, watch, control, formState: { errors }, reset } = useForm<FormValues>({
        defaultValues: {
            profilePicture: "",
            doctorSpecialties: [{ specialtyId: "" }],
            doctorEducationBackgrounds: [{ startDate: "", endDate: "", fieldOfStudy: "", degree: "", institutionName: "" }],
            experiences: [{ startDate: "", endDate: "", companyName: "", description: "" }],
            doctorLanguages: [{ languageId: "" }]
        }
    });

    const languages = useLanguagesQuery();
    const cities = useCitiesQuery();
    const genders = useGendersQuery();
    const specializations = useSpecializationsQuery();
    const doctorProfile = useDoctorProfileQuery();

    if (!authenticatedUser) {
        router.push("/auth/login");
    }

    if (authenticatedUser && authenticatedUser['role'] === 'DoctorUnderReview' && authenticatedUser['isProfileComplete']) {
        router.push('/doctors-profile/under-review/')
    }

    useEffect(() => {
        if (languages.data) {
            const tempLanguageOptions = languages.data.map((language: any) => (
                <option key={language.languageId} value={language.languageId}>{language.languageName}</option>
            ));
            setLanguageOptions(tempLanguageOptions);
        }
    }, [languages.data]);

    useEffect(() => {
        if (cities.data) {
            const tempCityOptions = cities.data.map((city: any) => (
                <option key={city.cityId} value={city.cityId}>{city.cityName}</option>
            ));
            setCityOptions(tempCityOptions);
        }
    }, [cities.data]);

    useEffect(() => {
        if (genders.data) {
            const tempGenderOptions = genders.data.map((gender: any) => (
                <option key={gender.value} value={gender.value}>{gender.description}</option>
            ));
            setGenderOptions(tempGenderOptions);
        }
    }, [genders.data]);

    useEffect(() => {
        if (specializations.data) {
            const tempSpecializationOptions = specializations.data.map((specialization: any) => (
                <option key={specialization.specialtyId} value={specialization.specialtyId}>{specialization.specialtyName}</option>
            ));
            setSpecializationOptions(tempSpecializationOptions);
        }
    }, [specializations.data]);

    useEffect(() => {
        if (doctorProfile.data) {
            const doctorProfileData = doctorProfile.data;
            setProfilePictureUrl(doctorProfileData.profilePicture);
            const formattedData = {
                ...doctorProfileData,
                doctorEducationBackgrounds: doctorProfileData.doctorEducationBackgrounds.map((education: Education) => ({
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
            setIsDisabled(true);
        }
    }, [doctorProfile.data]);

    const handleProfilePictureChange = (data: any) => {
        uploadImage(data.target.files)
            .then(res => {
                setProfilePictureUrl(res.data.url);
            });
    }

    const handleUpdateProfile = () => {
        setIsDisabled(false);
        setIsEditMode(true);
        setOldDoctorProfileData({ ...(doctorProfile.data as FormValues) });
    }

    const handleCancelUpdateProfile = () => {
        setIsDisabled(true);
        setIsEditMode(false);
        setProfilePictureUrl(oldDoctorProfileData?.profilePicture);
        reset(oldDoctorProfileData);
    }

    const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultiStepForm([
        <UserForm register={register} control={control} errors={errors} languageOptions={languageOptions} genderOptions={genderOptions}
            isDisabled={isDisabled} isEditMode={isEditMode} profilePictureUrl={profilePictureUrl}
            handleProfilePictureChange={handleProfilePictureChange} />,
        <AddressForm register={register} control={control} errors={errors} cityOptions={cityOptions} isDisabled={isDisabled} />,
        <EducationForm register={register} control={control} errors={errors} isDisabled={isDisabled} />,
        <ExperienceForm register={register} control={control} errors={errors} isDisabled={isDisabled} />,
        <MiscellaneousInformationForm register={register} control={control} errors={errors} specializationOptions={specializationOptions} isDisabled={isDisabled} />
    ]);

    const submitProfile = async (data: FormValues, event: any) => {
        const buttonName = (event.nativeEvent.submitter as HTMLButtonElement).name || "";

        if (isDisabled && isLastStep) {
            handleUpdateProfile();
        }
        else if (isLastStep) {
            data.profilePicture = profilePictureUrl;
            if (!isEditMode) {
                try {
                    await saveDoctorProfileMutation.mutateAsync(data);
                    router.push('/doctors-profile/confirmation');
                } catch (e: any) {
                    setError(e);
                }
            } else {
                return updateProfile(data);
            }
        } else {
            if (buttonName === 'update') {
                return updateProfile(data);
            } else {
                next();
            }
        }
    }

    const updateProfile = async (data: FormValues) => {
        try {
            data.profilePicture = profilePictureUrl;
            await updateDoctorProfileMutation.mutateAsync(data);
            setIsDisabled(true);
            setIsEditMode(false);
        } catch (e: any) {
            setError(e);
        }
    }

    return (
        <>
            {
                (<div style={{
                    position: "relative",
                    background: "white",
                    width: '80%',
                    padding: "2rem",
                    margin: "1rem auto"
                }}>
                    <form onSubmit={handleSubmit(submitProfile)} noValidate>
                        {isDisabled && !isEditMode && <div style={{ position: "absolute", top: ".5rem" }}>
                            <p className="doctor-profile-links" onClick={() => handleUpdateProfile()}>Update Your Profile</p>
                        </div>}
                        {!isDisabled && isEditMode && <div style={{ position: "absolute", top: ".5rem" }}>
                            <p className="doctor-profile-links" onClick={() => handleCancelUpdateProfile()}>Cancel</p>
                        </div>}
                        <div style={{ position: "absolute", top: ".5rem", right: ".75rem" }}>
                            {currentStepIndex + 1} / {steps.length}
                        </div>
                        {step}
                        <div style={{ marginTop: "1rem", display: "flex", gap: ".5rem", justifyContent: "flex-end" }}>
                            {!isFirstStep && <button type="button" onClick={back}>Back</button>}
                            <button type="submit">
                                {(isEditMode && isLastStep) ? "Update" : (isDisabled && isLastStep) ? "Edit" :
                                    !isDisabled && isLastStep ? "Submit" : "Next"}
                            </button>
                            {isEditMode && !isLastStep && <button type="submit" name="update">Update</button>}
                        </div>
                    </form>
                </div>
                )
            }
        </>
    );
}

export default DoctorsProfile;