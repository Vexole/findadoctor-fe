import { useFieldArray } from "react-hook-form";
import { FormWrapper } from "../../components/FormWrapper";
import { FormInput } from "@/components";

export function UserForm(props) {
    const { register, control, errors } = props;
    const { languageOptions, genderOptions, isDisabled } = props;

    const { fields: languageFields, append: languageAppend, remove: languageRemove } = useFieldArray({
        name: 'doctorLanguages',
        control
    })

    return (
        <FormWrapper title="Doctor Details"
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

            <FormInput
                label="First Name"
                placeholder='Enter your first name'
                register={register('firstName')}
                disabled={isDisabled}
                isInvalid={Boolean(errors.firstName)}
                helperText={errors.firstName ? String(errors.firstName?.message) : ''}
            />

            <FormInput
                label="Middle Name"
                placeholder='Enter your middle name'
                register={register('middleName')}
                disabled={isDisabled}
                isInvalid={Boolean(errors.middleName)}
                helperText={errors.middleName ? String(errors.middleName?.message) : ''}
            />

            <FormInput
                type="text"
                label="Last Name"
                placeholder='Enter your last name'
                disabled={isDisabled}
                register={register('lastName')}
                isInvalid={Boolean(errors.lastName)}
                helperText={errors.lastName ? String(errors.lastName?.message) : ''}
            />

            <FormInput
                label="Phone Number"
                placeholder='Enter your phone number'
                disabled={isDisabled}
                register={register("phone", {
                    required: "Phone Number is requred",
                    pattern: {
                        value: /^\d{10}$/,
                        message: 'Invalid phone number format'
                    }
                })}
                isInvalid={Boolean(errors.phone)}
                helperText={errors.phone ? String(errors.phone?.message) : ''}
            />

            <div className="form-fields">
                <label htmlFor="gender">Gender</label>
                <div>
                    <select {...register("gender", {
                        validate: (fieldValue: string) => {
                            return fieldValue !== "" || "Please select a gender";
                        }
                    })} id="gender" disabled={isDisabled}>
                        <option value="">Select an Option</option>
                        {genderOptions}
                    </select>

                    {errors.gender && <span className="error">Please select a gender.</span>}
                </div>
            </div>

            <div className="form-fields">
                <label htmlFor="doctorLanguages">Languages</label>
                <div className="dynamic-lists">
                    {languageFields.map((field, index) => {
                        return (
                            <div className="form-control" key={field.id}>
                                <select {...register(`doctorLanguages.${index}.languageId` as const,
                                    {
                                        validate: (fieldValue: any) => {
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