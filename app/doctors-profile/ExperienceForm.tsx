import { FormInput } from "@/components";
import { FormWrapper } from "../../components/FormWrapper";
import { useFieldArray } from "react-hook-form";
import { FormLabel } from "@chakra-ui/react";

const ExperienceForm = (props) => {
    const { register, control, errors, isDisabled } = props;
    const { fields: experienceFields, append: experienceAppend, remove: experienceRemove } = useFieldArray({
        name: 'experiences',
        control
    })

    return (
        <FormWrapper title="Experience Details"
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
                    Experiences</FormLabel>
                <div>
                    {experienceFields.map((field, index) => {
                        return (
                            <div className="form-control" key={field.id}>
                                <FormInput
                                    marginTop={8}
                                    label="Company Name"
                                    placeholder='Enter company name'
                                    isDisabled={isDisabled}
                                    register={register(`experiences.${index}.companyName` as const, {
                                        required: "Please enter the company name"
                                    })}
                                    isInvalid={Boolean(errors.experiences?.[index]?.companyName)}
                                    helperText={errors.experiences?.[index]?.companyName ? String(errors.experiences?.[index]?.companyName.message) : ''}
                                />

                                <FormInput
                                    label="Description"
                                    placeholder='Enter description'
                                    isDisabled={isDisabled}
                                    register={register(`experiences.${index}.description` as const, {
                                        required: "Please enter the description"
                                    })}
                                    isInvalid={Boolean(errors.experiences?.[index]?.description)}
                                    helperText={errors.experiences?.[index]?.description ? String(errors.experiences?.[index]?.description.message) : ''}
                                />

                                <FormInput
                                    type="date"
                                    label="Start Date"
                                    placeholder='Enter start date'
                                    isDisabled={isDisabled}
                                    register={register(`experiences.${index}.startDate` as const, {
                                        required: "Please select start date"
                                    })}
                                    id={`experiences.${index}.startDate`}
                                    isInvalid={Boolean(errors.experiences?.[index]?.startDate)}
                                    helperText={errors.experiences?.[index]?.startDate ?
                                        String(errors.experiences?.[index]?.startDate.message) : ''}
                                />

                                <FormInput
                                    type="date"
                                    label="End Date"
                                    placeholder='Enter end date'
                                    isDisabled={isDisabled}
                                    register={register(`experiences.${index}.endDate` as const, {
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
                                    })}
                                    isInvalid={Boolean(errors.experiences?.[index]?.endDate)}
                                    helperText={errors.experiences?.[index]?.endDate ?
                                        String(errors.experiences?.[index]?.endDate.message) : ''}
                                />

                                {
                                    !isDisabled && index > 0 &&
                                    <div className="btn_remove">
                                        <button type="button" onClick={() => experienceRemove(index)}>Remove</button>
                                    </div>
                                }
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