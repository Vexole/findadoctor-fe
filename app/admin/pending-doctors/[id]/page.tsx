"use client"
import { Education, Experience, DoctorProfile as FormValues } from "@/models/DoctorProfile";
import { getCities, getLanguages, getSpecializations } from "@/api/doctors";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getPendingDoctorDetailById } from "@/api/doctors";
import DoctorsProfileForm from "@/app/doctors-profile/DoctorsProfileForm";

const DoctorDetails = ({ params }: { params: { id: string } }) => {
  const [languageOptions, setLangugaeOptions] = useState<JSX.Element[]>([]);
  const [cityOptions, setCityOptions] = useState<JSX.Element[]>([]);
  const [specializationOptions, setSpeciliazationOptions] = useState<JSX.Element[]>([]);
  const [userId, setUserId] = useState(params.id);
  const [isDisabled, setIsDisabled] = useState(true);

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<FormValues>({
    defaultValues: {
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
        const doctorProfile = await getPendingDoctorDetailById(params.id);
        const doctorProfileData = doctorProfile.data;
        if (doctorProfileData) {
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
        }
      } catch (error) {
        console.error("Error occurred while fetching doctor profile:", error);
      }
    };

    fetchLanguages();
    fetchCities();
    fetchSpecializations();
    fetchDoctorProfile();
  }, []);

  // const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultiStepForm([
  //   <UserForm register={register} control={control} errors={errors} languageOptions={languageOptions} />,
  //   <AddressForm register={register} control={control} errors={errors} cityOptions={cityOptions} />,
  //   <EducationForm register={register} control={control} errors={errors} />,
  //   <ExperienceForm register={register} control={control} errors={errors} />,
  //   <MiscellaneousInformationForm register={register} control={control} errors={errors} specializationOptions={specializationOptions} />
  // ]);

  return (
    // <div style={{
    //   position: "relative",
    //   background: "white",
    //   border: "1px solid black",
    //   padding: "2rem",
    //   margin: "1rem auto",
    //   borderRadius: ".5rem"
    // }}>
    //   <form onSubmit={handleSubmit(submitProfile)} noValidate>
    //     <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
    //       {currentStepIndex + 1} / {steps.length}
    //     </div>
    //     {step}
    //     <div style={{ marginTop: "1rem", display: "flex", gap: ".5rem", justifyContent: "flex-end" }}>
    //       {!isFirstStep && <button type="button" onClick={back}>Back</button>}
    //       <button type="submit">
    //         {isLastStep ? "Submit" : "Next"}
    //       </button>
    //     </div>
    //   </form>
    // </div>
    <>
      <DoctorsProfileForm params={params} isAdmin={true} />
      {/* <button>Approve</button> */}
    </>
  );
}

export default DoctorDetails;