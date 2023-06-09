import { useFieldArray } from "react-hook-form";
import React from "react";
import { FormWrapper } from "../../components/FormWrapper";

export function EducationForm(props) {
    const { register, control, errors } = props;
    const { fields: qualificationFields, append: qualificationAppend, remove: qualificationRemove } = useFieldArray({
        name: 'doctorEducationBackgrounds',
        control
    })

    return (
        <FormWrapper title="Education Details">
            <div className="form-fields">
                <label htmlFor="doctorEducationBackgrounds">Qualifications</label>
                <div className="dynamic-lists">
                    {qualificationFields.map((field, index) => {
                        return (
                            <div className="form-control" key={field.id}>
                                <input {...register(`doctorEducationBackgrounds.${index}.degree` as const,
                                    { required: 'Degree is required' })}
                                    id={`doctorEducationBackgrounds.${index}.degree`} type="text" placeholder="Degree" />
                                <input
                                    {...register(`doctorEducationBackgrounds.${index}.institutionName` as const, {
                                        required: "Please enter the institute name"
                                    })}
                                    type="text"
                                    placeholder="Institute Name"
                                />
                                <input
                                    {...register(`doctorEducationBackgrounds.${index}.fieldOfStudy` as const, {
                                        required: "Please enter the field of study"
                                    })}
                                    type="text"
                                    placeholder="Field of Study"
                                />
                                <label htmlFor="startDate">Start Date</label>
                                <input {...register(`doctorEducationBackgrounds.${index}.startDate` as const, {
                                    required: "Please select start date"
                                })} type="date" id={`doctorEducationBackgrounds.${index}.startDate`} />
                                <label htmlFor="endDate">End Date</label>
                                <input {...register(`doctorEducationBackgrounds.${index}.endDate` as const, {
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
                                })} type="date" />
                                {
                                    index > 0 &&
                                    <div className="btn_remove">
                                        <button type="button" onClick={() => qualificationRemove(index)}>Remove</button>
                                    </div>
                                }
                                <div className="errors">
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
                                </div>
                            </div>);
                    })
                    }
                    <div className="btn_add_more">
                        <button type="button" onClick={() => qualificationAppend({ startDate: "", endDate: "", fieldOfStudy: "", degree: "", institutionName: "" })}>Add More</button>
                    </div>
                </div>
            </div>
        </FormWrapper>);
}