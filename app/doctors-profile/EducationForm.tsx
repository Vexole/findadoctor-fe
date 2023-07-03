import { useFieldArray } from "react-hook-form";
import React from "react";
import { FormWrapper } from "../../components/FormWrapper";
import { FormLabel } from "@chakra-ui/react";
import { FormInput } from "@/components";

export function EducationForm(props) {
    const { register, control, errors, isDisabled } = props;
    const { fields: qualificationFields, append: qualificationAppend, remove: qualificationRemove } = useFieldArray({
        name: 'doctorEducationBackgrounds',
        control
    })

    return (
        <FormWrapper title="Education Details"
            titleProps={{ color: '#1A365D', mt: 6 }}
            alignItems="center"
            formProps={{
                w: '100%',
                maxW: 'lg',
                p: '6',
                borderWidth: '1px',
                borderRadius: 'lg',
                borderColor: '#1A365D',
            }}>
            <div>
                <FormLabel fontWeight="bold" color="#1A365D">
                    Qualifications</FormLabel>
                <div>
                    {qualificationFields.map((field, index) => {
                        return (
                            <div className="form-control" key={field.id}>
                                <FormInput
                                    marginTop={8}
                                    label="Degree"
                                    placeholder='Enter your degree'
                                    isDisabled={isDisabled}
                                    register={register(`doctorEducationBackgrounds.${index}.degree` as const,
                                        { required: 'Degree is required' })}
                                    isInvalid={Boolean(errors.doctorEducationBackgrounds?.[index]?.degree)}
                                    helperText={errors.doctorEducationBackgrounds?.[index]?.degree ?
                                        String(errors.doctorEducationBackgrounds?.[index]?.degree.message) : ''}
                                />

                                <FormInput
                                    label="Institue Name"
                                    placeholder='Enter your institute name'
                                    isDisabled={isDisabled}
                                    register={register(`doctorEducationBackgrounds.${index}.institutionName` as const, {
                                        required: "Please enter the institute name"
                                    })}
                                    isInvalid={Boolean(errors.doctorEducationBackgrounds?.[index]?.institutionName)}
                                    helperText={errors.doctorEducationBackgrounds?.[index]?.institutionName ?
                                        String(errors.doctorEducationBackgrounds?.[index]?.institutionName.message) : ''}
                                />

                                <FormInput
                                    label="Field of Study"
                                    placeholder='Enter your field of study'
                                    isDisabled={isDisabled}
                                    register={register(`doctorEducationBackgrounds.${index}.fieldOfStudy` as const, {
                                        required: "Please enter the field of study"
                                    })}
                                    isInvalid={Boolean(errors.doctorEducationBackgrounds?.[index]?.fieldOfStudy)}
                                    helperText={errors.doctorEducationBackgrounds?.[index]?.fieldOfStudy ?
                                        String(errors.doctorEducationBackgrounds?.[index]?.fieldOfStudy.message) : ''}
                                />

                                <FormInput
                                    type="date"
                                    label="Start Date"
                                    placeholder='Enter start date'
                                    isDisabled={isDisabled}
                                    register={register(`doctorEducationBackgrounds.${index}.startDate` as const, {
                                        required: "Please select start date"
                                    })}
                                    isInvalid={Boolean(errors.doctorEducationBackgrounds?.[index]?.startDate)}
                                    helperText={errors.doctorEducationBackgrounds?.[index]?.startDate ?
                                        String(errors.doctorEducationBackgrounds?.[index]?.startDate.message) : ''}
                                />

                                <FormInput
                                    type="date"
                                    label="End Date"
                                    placeholder='Enter end date'
                                    isDisabled={isDisabled}
                                    register={register(`doctorEducationBackgrounds.${index}.endDate` as const, {
                                        required: "Please select end date",
                                        validate: {
                                            endDateGreaterThanStartDate: (value: string) => {
                                                const startDate: string = document.getElementById(`doctorEducationBackgrounds.${index}.startDate`)?.value;
                                                if (!startDate || startDate === '') {
                                                    return true;
                                                }
                                                return new Date(value) >= new Date(startDate) || "End date cannot be before start date";
                                            }
                                        }
                                    })}
                                    isInvalid={Boolean(errors.doctorEducationBackgrounds?.[index]?.endDate)}
                                    helperText={errors.doctorEducationBackgrounds?.[index]?.endDate ?
                                        String(errors.doctorEducationBackgrounds?.[index]?.endDate.message) : ''}
                                />

                                {
                                    !isDisabled && index > 0 &&
                                    <div className="btn_remove">
                                        <button type="button" onClick={() => qualificationRemove(index)}>Remove</button>
                                    </div>
                                }
                            </div>);
                    })
                    }
                    {!isDisabled && <div className="btn_add_more">
                        <button type="button" onClick={() => qualificationAppend({ startDate: "", endDate: "", fieldOfStudy: "", degree: "", institutionName: "" })}>Add More</button>
                    </div>}
                </div>
            </div>
        </FormWrapper>);
}