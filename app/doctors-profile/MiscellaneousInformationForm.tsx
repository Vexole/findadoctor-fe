import { FormInput } from "@/components";
import { FormWrapper } from "../../components/FormWrapper";
import { useFieldArray } from "react-hook-form";
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Select } from "@chakra-ui/react";


const MiscellaneousInformationForm = (props) => {
    const { register, control, errors } = props;
    const { specializationOptions, isDisabled } = props;

    const { fields: specializationFields, append: specializationAppend, remove: specializationRemove } = useFieldArray({
        name: 'doctorSpecialties',
        control
    })
    return (
        <FormWrapper title="Additional Details"
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
            <FormControl>
                <FormLabel fontWeight="bold" color="#1A365D">Specializations</FormLabel>
                {specializationFields.map((field, index) => {
                    return (
                        <div className="form-control" key={field.id}>
                            <Select placeholder="Select an option"
                                isDisabled={isDisabled}
                                {...register(`doctorSpecialties.${index}.specialtyId` as const,
                                    {
                                        validate: (fieldValue: any) => {
                                            return (fieldValue != "" || "Please select a specialization")
                                        }
                                    })}>
                                {specializationOptions}
                            </Select>
                            {!isDisabled && index > 0 &&
                                <div className="btn_remove">
                                    <button type="button" onClick={() => specializationRemove(index)}>Remove</button>
                                </div>
                            }
                            {Boolean(errors.doctorSpecialties) ? (
                                <FormErrorMessage>{errors.doctorSpecialties ? String(errors.doctorSpecialties?.message) : ''}</FormErrorMessage>
                            ) : (
                                <FormHelperText>{errors.doctorSpecialties ? String(errors.doctorSpecialties?.message) : ''}</FormHelperText>
                            )}
                        </div>);
                })
                }
                {!isDisabled && <div className="btn_add_more">
                    <button type="button" onClick={() => specializationAppend({ specialtyId: "" })}>Add More</button>
                </div>}
            </FormControl>

            <FormInput
                label="Fees"
                placeholder='Enter your fees'
                isDisabled={isDisabled}
                register={register("fees", {
                    required: "Fees is requred",
                    pattern: {
                        value: /^\d+(,\d{1,2})?$/,
                        message: 'Invalid fees'
                    }
                })}
                isInvalid={Boolean(errors.fees)}
                helperText={errors.fees ? String(errors.fees?.message) : ''}
            />

            <FormInput
                label="Waiting Time"
                placeholder='Enter your waiting time'
                isDisabled={isDisabled}
                register={register("waitingTime", { required: "Waiting Time is Required." })}
                isInvalid={Boolean(errors.waitingTime)}
                helperText={errors.waitingTime ? String(errors.waitingTime?.message) : ''}
            />

            <div className="form-fields">
                <label htmlFor="isAcceptingNewPatients">IsAcceptingNewPatients</label>
                <input {...register("isAcceptingNewPatients")} id="isAcceptingNewPatients"
                    type="checkbox" disabled={isDisabled} />
            </div>
        </FormWrapper>);
}

export default MiscellaneousInformationForm;