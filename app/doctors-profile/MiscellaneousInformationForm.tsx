import { FormWrapper } from "../../components/FormWrapper";
import { useFieldArray } from "react-hook-form";


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
            <div className="form-fields">
                <label htmlFor="doctorSpecialties">Specializations</label>
                <div className="dynamic-lists">
                    {specializationFields.map((field, index) => {
                        return (
                            <div className="form-control" key={field.id}>
                                <select {...register(`doctorSpecialties.${index}.specialtyId` as const,
                                    {
                                        required: "Please select a specialization"
                                    })}
                                    disabled={isDisabled}>
                                    <option value="" disabled>Select an Option</option>
                                    {specializationOptions}
                                </select>
                                {
                                    !isDisabled &&
                                    index > 0 &&
                                    <div>
                                        <button type="button" onClick={() => specializationRemove(index)}>Remove</button>
                                    </div>
                                }
                            </div>);
                    })
                    }
                    {errors.doctorSpecialties && <span className="error">Please complete specialization details.</span>}
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
                {errors.fees && <span className="error">{errors.fees.message}</span>}
            </div>
            <div className="form-fields">
                <label htmlFor="waitingTime">Waiting Time</label>
                <input {...register("waitingTime", {required: "Waiting Time is Required."})} id="waitingTime" type="text" disabled={isDisabled} />
                {errors.waitingTime && <span className="error">{errors.waitingTime.message}</span>}
            </div>
            <div className="form-fields">
                <label htmlFor="isAcceptingNewPatients">IsAcceptingNewPatients</label>
                <input {...register("isAcceptingNewPatients")} id="isAcceptingNewPatients"
                    type="checkbox" disabled={isDisabled} />
            </div>
        </FormWrapper>);
}

export default MiscellaneousInformationForm;