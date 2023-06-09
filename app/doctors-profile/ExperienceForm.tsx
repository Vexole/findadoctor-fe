import { FormWrapper } from "../../components/FormWrapper";
import { useFieldArray } from "react-hook-form";

const ExperienceForm = (props) => {
    const { register, control, errors, isDisabled } = props;
    const { fields: experienceFields, append: experienceAppend, remove: experienceRemove } = useFieldArray({
        name: 'experiences',
        control
    })

    return (
        <FormWrapper title="Experience Details">
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
                                        endDateGreaterThanStartDate: (value: string) => {
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
                                <div className="errors">
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
                                </div>
                            </div>);
                    })
                    }
                    {!isDisabled && <div className="btn_add_more">
                        <button type="button" onClick={() => experienceAppend({ startDate: "", endDate: "", companyName: "", description: "" })}>Add More</button>
                    </div>}
                </div>
            </div>
        </FormWrapper>
    );
}

export default ExperienceForm;