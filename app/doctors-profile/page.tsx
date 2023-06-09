"use client"
import { AddressForm } from "./AddressForm";
import { EducationForm } from "./EducationForm";
import { UserForm } from "./UserForm";
import { useMultiStepForm } from "@/utils/useMultiStepForm";
import { useMutation } from "@tanstack/react-query";
import { DoctorProfile as FormValues } from "@/models/DoctorProfile";
import { getCities, getDoctorProfile, getLanguages, getSpecializations, saveDoctorProfile } from "@/api/doctors";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ExperienceForm from "./ExperienceForm";
import MiscellaneousInformationForm from "./MiscellaneousInformationForm";

const DoctorsProfile = () => {
    const [languageOptions, setLangugaeOptions] = useState<JSX.Element[]>([]);
    const [cityOptions, setCityOptions] = useState<JSX.Element[]>([]);
    const [specializationOptions, setSpeciliazationOptions] = useState<JSX.Element[]>([]);
    const [error, setError] = useState();
    const [isDisabled, setIsDisabled] = useState(false);
    const [isUnderReview, setIsUnderReview] = useState(false);

    const saveDoctorProfileMutation = useMutation({
        mutationFn: saveDoctorProfile,
    })

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<FormValues>({
        defaultValues: {
            // profilePicture: "default.png",
            doctorSpecialties: [{ specialtyId: "" }],
            doctorEducationBackgrounds: [{ startDate: "", endDate: "", fieldOfStudy: "", degree: "", institutionName: "" }],
            experiences: [{ startDate: "", endDate: "", companyName: "", description: "" }],
            doctorLanguages: [{ languageId: "" }]
        }
    });

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const languages: any[] = await getLanguages();
                const languageOptions = languages.map((language: any) => {
                    return <option key={language.languageId} value={language.languageId}>{language.languageName}</option>;
                });
                setLangugaeOptions(languageOptions);
            } catch (error: any) {
                console.error("Error occurred while fetching languages:", error.message);
            }
        }

        const fetchCities = async () => {
            try {
                const cities: any[] = await getCities();
                const cityOptions = cities.map((city: any) => {
                    return <option key={city.cityId} value={city.cityId}>{city.cityName}</option>;
                });
                setCityOptions(cityOptions);
            } catch (error: any) {
                console.error("Error occurred while fetching cities:", error.message);
            }
        }

        async function fetchSpecializations() {
            try {
                const specializations: any[] = await getSpecializations();
                const specializationOptions = specializations.map((specialization: any) => {
                    return <option key={specialization.specialtyId} value={specialization.specialtyId}>{specialization.specialtyName}</option>;
                });
                setSpeciliazationOptions(specializationOptions);
            } catch (error: any) {
                console.error("Error occurred while fetching specializations:", error.message);
            }
        }

        const fetchDoctorProfile = async () => {
            try {
                const doctorProfile = await getDoctorProfile();
                const doctorProfileData = doctorProfile.data;
                if (doctorProfileData) {
                    const formattedData = {
                        ...doctorProfileData,
                        doctorEducationBackgrounds: doctorProfileData.doctorEducationBackgrounds.map((education) => ({
                            ...education,
                            startDate: education.startDate.split('T')[0],
                            endDate: education.endDate.split('T')[0],
                        })),
                        experiences: doctorProfileData.experiences.map((experience) => ({
                            ...experience,
                            startDate: experience.startDate.split('T')[0],
                            endDate: experience.endDate.split('T')[0],
                        })),
                    };
                    console.log(formattedData)
                    reset(formattedData);
                }
            } catch (error) {
                if (error.message.includes(403)) {
                    setIsDisabled(true);
                    setIsUnderReview(true);
                }
                console.error("Error occurred while fetching doctor profile:", error);
            }
        };

        fetchLanguages();
        fetchCities();
        fetchSpecializations();
        fetchDoctorProfile();
    }, []);

    const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultiStepForm([
        <UserForm register={register} control={control} errors={errors} languageOptions={languageOptions} isDisabled={isDisabled} />,
        <AddressForm register={register} control={control} errors={errors} cityOptions={cityOptions} isDisabled={isDisabled} />,
        <EducationForm register={register} control={control} errors={errors} isDisabled={isDisabled} />,
        <ExperienceForm register={register} control={control} errors={errors} isDisabled={isDisabled} />,
        <MiscellaneousInformationForm register={register} control={control} errors={errors} specializationOptions={specializationOptions} isDisabled={isDisabled} />
    ]);


    const submitProfile = async (data: FormValues) => {
        if (isLastStep) {
            try {
                const result = await saveDoctorProfileMutation.mutateAsync(data);
                alert("Profile submitted for review!");
            } catch (e) {
                setError(e);
            }
        } else {
            next();
        }
    }

    return (
        <>
            {
                isUnderReview ? ("Your application is under review") :
                    // <DoctorsProfileForm />
                    (<div style={{
                        position: "relative",
                        background: "white",
                        border: "1px solid black",
                        padding: "2rem",
                        margin: "1rem auto",
                        borderRadius: ".5rem"
                    }}>
                        <form onSubmit={handleSubmit(submitProfile)} noValidate>
                            <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
                                {currentStepIndex + 1} / {steps.length}
                            </div>
                            {step}
                            <div style={{ marginTop: "1rem", display: "flex", gap: ".5rem", justifyContent: "flex-end" }}>
                                {!isFirstStep && <button type="button" onClick={back}>Back</button>}
                                <button type="submit">
                                    {isLastStep ? "Submit" : "Next"}
                                </button>
                            </div>
                            {error && <span className="error">{error.message}</span>}
                        </form>
                    </div>
                    )
            }
        </>
    );
}

export default DoctorsProfile;