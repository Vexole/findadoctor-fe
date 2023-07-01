"use client"
import { useEffect, useState } from "react";
import DoctorsProfileForm from "@/app/doctors-profile/DoctorsProfileForm";
import { useCitiesQuery, useGendersQuery, useLanguagesQuery, useSpecializationsQuery } from "@/hooks";

const DoctorDetails = ({ params }: { params: { id: string } }) => {
  const [languageOptions, setLanguageOptions] = useState<JSX.Element[]>([]);
  const [cityOptions, setCityOptions] = useState<JSX.Element[]>([]);
  const [genderOptions, setGenderOptions] = useState<JSX.Element[]>([]);
  const [specializationOptions, setSpecializationOptions] = useState<JSX.Element[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const languages = useLanguagesQuery();
  const genders = useGendersQuery();
  const cities = useCitiesQuery();
  const specializations = useSpecializationsQuery();

  useEffect(() => {
    if (languages.data) {
      const tempLanguageOptions = languages.data.map((language: any) => (
        <option key={language.languageId} value={language.languageId}>{language.languageName}</option>
      ));
      setLanguageOptions(tempLanguageOptions);
    }
  }, [languages.data]);

  useEffect(() => {
    if (genders.data) {
      const tempGendersOptions = genders.data.map((gender: any) => (
        <option key={gender.value} value={gender.value}>{gender.description}</option>
      ));
      setGenderOptions(tempGendersOptions);
    }
  }, [genders.data]);

  useEffect(() => {
    if (cities.data) {
      const tempCityOptions = cities.data.map((city: any) => (
        <option key={city.cityId} value={city.cityId}>{city.cityName}</option>
      ));
      setCityOptions(tempCityOptions);
    }
  }, [cities.data]);

  useEffect(() => {
    if (specializations.data) {
      const tempSpecializationOptions = specializations.data.map((specialization: any) => (
        <option key={specialization.specialtyId} value={specialization.specialtyId}>{specialization.specialtyName}</option>
      ));
      setSpecializationOptions(tempSpecializationOptions);
    }
  }, [specializations.data]);

  return (
    <>
      <DoctorsProfileForm
        params={params}
        isAdmin={true}
        cityOptions={cityOptions}
        isDisabled={isDisabled}
        languageOptions={languageOptions}
        specializationOptions={specializationOptions}
        genderOptions={genderOptions}
      />
    </>
  );
};

export default DoctorDetails;
