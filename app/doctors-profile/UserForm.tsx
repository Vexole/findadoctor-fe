import { useFieldArray } from "react-hook-form";
import { FormWrapper } from "../../components/FormWrapper";

export function UserForm(props) {
    const { register, control, errors } = props;
    const { languageOptions, isDisabled } = props;

    const { fields: languageFields, append: languageAppend, remove: languageRemove } = useFieldArray({
        name: 'doctorLanguages',
        control
    })

    return (
        <FormWrapper title="Doctor Details">
            {/* <div className="form-fields">
                <label htmlFor="profilePicture">Profile Picture</label>
                <input type="file" {...register("profilePicture")} />
            </div> */}
            <div className="form-fields">
                <label htmlFor="title">Title</label>
                <div>
                    <select {...register("title", { required: 'Title is required' })} id="title" disabled={isDisabled}>
                        <option value="">Select an option</option>
                        <option value="Dr.">Dr.</option>
                        <option value="Dr.(Ms.)">Dr.(Ms.)</option>
                        <option value="Dr.(Mrs.)">Dr.(Mrs.)</option>
                        <option value="Dr.(Miss)">Dr.(Miss)</option>
                        <option value="Dr.(Mr.)">Dr.(Mr.)</option>
                    </select>
                    {errors.title && <span className="error">{errors.title.message}</span>}
                </div>
            </div>
            <div className="form-fields">
                <label htmlFor="firstName">Fist Name</label>
                <div>
                    <input {...register("firstName", { required: 'First Name is required' })}
                        id="firstName" type="text" disabled={isDisabled} />
                    {errors.firstName && <span className="error">{errors.firstName.message}</span>}
                </div>
            </div>
            <div className="form-fields">
                <label htmlFor="middleName">Middle Name</label>

                <div><input {...register("middleName")}
                    id="middleName" type="text" disabled={isDisabled} />
                    {errors.middleName && <span className="error">{errors.middleName.message}</span>}</div>
            </div>
            <div className="form-fields">
                <label htmlFor="lastName">Last Name</label>

                <div><input {...register("lastName", { required: 'Last Name is required' })}
                    id="lastName" type="text" disabled={isDisabled} />
                    {errors.lastName && <span className="error">{errors.lastName.message}</span>}</div>
            </div>
            {/* <div className="form-fields">
                <label htmlFor="age">Age</label>

                <div><input {...register("age", { valueAsNumber: true, required: "Age must be between 18 and 74", min: 18, max: 75 })}
                    id="age" type="text" />
                    {errors.age && <span className="error">{errors.age.message}</span>}</div>
            </div> */}
            {/* <div className="form-fields">
                <label htmlFor="gender">Gender</label>
                <div>
                    <select {...register(`gender`,
                        {
                            validate: (fieldValue) => {
                                return (fieldValue != "" || "Please select a gender")
                            }
                        })}
                    >
                        <option value="" disabled>Select an Option</option>
                        <option value="M" disabled>Male</option>
                        <option value="F" disabled>Female</option>
                        <option value="O" disabled>Others</option>
                    </select>

                    {errors.doctorLanguages && <span className="error">Please select a gender.</span>}
                </div>
            </div> */}
            
            <div className="form-fields">
                <label htmlFor="phone">Phone Number</label>

                <div><input {...register("phone", {
                    required: "Phone Number is requred",
                    pattern: {
                        value: /^\d{10}$/,
                        message: 'Invalid phone number format'
                    }
                })} id="phone" type="text" disabled={isDisabled} />
                    {errors.phone && <span className="error">{errors.phone.message}</span>}</div>
            </div>
            <div className="form-fields">
                <label htmlFor="doctorLanguages">Languages</label>
                <div className="dynamic-lists">
                    {languageFields.map((field, index) => {
                        return (
                            <div className="form-control" key={field.id}>
                                <select {...register(`doctorLanguages.${index}.languageId` as const,
                                    {
                                        validate: (fieldValue) => {
                                            return (fieldValue != "" || "Please select a language")
                                        }
                                    })}
                                    disabled={isDisabled}>
                                    <option value="" disabled>Select an Option</option>
                                    {languageOptions}
                                </select>
                                {!isDisabled && index > 0 &&
                                    <div className="btn_remove">
                                        <button type="button" onClick={() => languageRemove(index)}>Remove</button>
                                    </div>
                                }
                            </div>);
                    })
                    }
                    {errors.doctorLanguages && <span className="error">Please select a language.</span>}
                    {!isDisabled && <div className="btn_add_more">
                        <button type="button" onClick={() => languageAppend({ languageId: "" })}>Add More</button>
                    </div>}
                </div>
            </div>
        </FormWrapper>
    )
}