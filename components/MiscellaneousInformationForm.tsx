import { UseFormProps } from "@/models/UseFormProps";
import { FormWrapper } from "./FormWrapper";
import { useFieldArray } from "react-hook-form";


const MiscellaneousInformationForm = (props) => {
    const { register, control, errors } = props;
    const { specializationOptions } = props;

    const { fields: specializationFields, append: specializationAppend, remove: specializationRemove } = useFieldArray({
        name: 'doctorSpecialties',
        control
    })
    return (
        <FormWrapper title="Experience Details">
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
                                >
                                    <option value="" disabled>Select an Option</option>
                                    {specializationOptions}
                                </select>
                                {
                                    index > 0 &&
                                    <div>
                                        <button type="button" onClick={() => specializationRemove(index)}>Remove</button>
                                    </div>
                                }
                            </div>);
                    })
                    }
                    {errors.doctorSpecialties && <span className="error">Please complete specialization details.</span>}
                    <div className="btn_add_more">
                        <button type="button" onClick={() => specializationAppend({ specialtyId: "" })}>Add More</button>
                    </div>
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
                })} id="fees" type="text" />
                {errors.fees && <span className="error">{errors.fees.message}</span>}
            </div>
            <div className="form-fields">
                <label htmlFor="waitingTime">Waiting Time</label>
                <input {...register("waitingTime")} id="waitingTime" type="text" />
                {errors.waitingTime && <span className="error">{errors.waitingTime.message}</span>}
            </div>
            <div className="form-fields">
                <label htmlFor="isAcceptingNewPatients">IsAcceptingNewPatients</label>
                <input {...register("isAcceptingNewPatients")} id="isAcceptingNewPatients" type="checkbox" />
            </div>
        </FormWrapper>);
}

export default MiscellaneousInformationForm;