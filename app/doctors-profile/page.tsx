
"use client";
import { useForm, useFieldArray } from "react-hook-form";

const DoctorsProfile = () => {
    type FormValues = {
        profilePicture: string,
        title: string,
        firstName: string,
        middleName: string,
        lastName: string,
        age: number,
        phoneNumber: string,
        qualification: string,
        experience: string,
        waitingTime: string,
        address: {
            unitNumber: string,
            streetAddress: string,
            city: string,
            province: string
        },
        specializations: {
            specialization: string
        }[],
        languages: {
            language: string
        }[]
    };

    const { register, handleSubmit, control, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            profilePicture: "default.png",
            specializations: [{ specialization: "" }],
            languages: [{ language: "" }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        name: 'specializations',
        control
    })

    const { fields: languageFields, append: languageAppend, remove: languageRemove } = useFieldArray({
        name: 'languages',
        control
    })

    const submitProfile = (data: FormValues) => {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(submitProfile)}>
            <div>
                <input type="file" {...register("profilePicture")} name="profilePicture" />
            </div>
            <div>
                <label htmlFor="title">Title</label>
                <select {...register("title")} id="title" name="title">
                    <option value="">Select an option</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Dr.(Ms.)">Dr.(Ms.)</option>
                    <option value="Dr.(Mrs.)">Dr.(Mrs.)</option>
                    <option value="Dr.(Miss)">Dr.(Miss)</option>
                    <option value="Dr.(Mr.)">Dr.(Mr.)</option>
                </select>
                {errors.title && <span>{errors.title.message}</span>}
            </div>
            <div>
                <label htmlFor="firstName">Fist Name</label>
                <input {...register("firstName")} id="firstName" name="firstName" type="text" />
                {errors.firstName && <span>{errors.firstName.message}</span>}
            </div>
            <div>
                <label htmlFor="middleName">Middle Name</label>
                <input {...register("middleName")} id="middleName" name="middleName" type="text" />
                {errors.middleName && <span>{errors.middleName.message}</span>}
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input {...register("lastName")} id="lastName" name="lastName" type="text" />
                {errors.lastName && <span>{errors.lastName.message}</span>}
            </div>
            <div>
                <label htmlFor="age">Age</label>
                <input {...register("age", { valueAsNumber: true })} id="age" name="age" type="text" />
                {errors.age && <span>{errors.age.message}</span>}
            </div>
            <div>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input {...register("phoneNumber")} id="phoneNumber" name="phoneNumber" type="text" />
                {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
            </div>
            <div>
                <label htmlFor="qualification">Qualification</label>
                <input {...register("qualification")} id="qualification" name="qualification" type="text" />
                {errors.qualification && <span>{errors.qualification.message}</span>}
            </div>
            <div>
                <label htmlFor="experience">Experience</label>
                <input {...register("experience")} id="experience" name="experience" type="text" />
                {errors.experience && <span>{errors.experience.message}</span>}
            </div>
            <div>
                <label htmlFor="waitingTime">Waiting Time</label>
                <input {...register("waitingTime")} id="waitingTime" name="waitingTime" type="text" />
                {errors.waitingTime && <span>{errors.waitingTime.message}</span>}
            </div>
            <div>
                <label htmlFor="unitNumber">Unit Number</label>
                <input {...register("address.unitNumber")} id="unitNumber" name="unitNumber" type="text" />
                {errors.address?.unitNumber && <span>{errors.address.unitNumber.message}</span>}
            </div>
            <div>
                <label htmlFor="streetAddress">Street Address</label>
                <input {...register("address.streetAddress")} id="streetAddress" name="streetAddress" type="text" />
                {errors.address?.streetAddress && <span>{errors.address.streetAddress.message}</span>}
            </div>
            <div>
                <label htmlFor="city">city</label>
                <select {...register("address.city")} id="city" name="city">
                    <option value="">Select an option</option>
                    <option value="Waterloo">Waterloo</option>
                    <option value="Kitchener">Kitchener</option>
                </select>
                {errors.address?.city && <span>{errors.address?.city.message}</span>}
            </div>
            <div>
                <label htmlFor="specializations">Specializations</label>
                <div>
                    {fields.map((field, index) => {
                        return (
                            <div className="form-control" key={field.id}>
                                <select {...register(`specializations.${index}.specialization` as const)}
                                >
                                    <option value="">Select an Option</option>
                                    <option value="Cardiology">Cardiology</option>
                                    <option value="Surgeon">Surgeon</option>
                                </select>
                                {/* <input type="text"
                                    {...register(`specializations.${index}.specialization` as const)} /> */}
                                {index > 0 &&
                                    <button onClick={() => remove(index)}>-</button>
                                }
                            </div>);
                    })
                    }
                    <button onClick={() => append({ specialization: "" })}>+</button>
                </div>
            </div>
            <div>
                <label htmlFor="languages">Languages</label>
                <div>
                    {languageFields.map((field, index) => {
                        return (
                            <div className="form-control" key={field.id}>
                                <select {...register(`languages.${index}.language` as const)}
                                >
                                    <option value="">Select an Option</option>
                                    <option value="English">English</option>
                                    <option value="French">French</option>
                                </select>
                                {index > 0 &&
                                    <button onClick={() => languageRemove(index)}>-</button>
                                }
                            </div>);
                    })
                    }
                    <button onClick={() => languageAppend({ language: "" })}>+</button>
                </div>
            </div>
            <div>
                <input type="submit"></input>
            </div>
        </form>
    );
}

export default DoctorsProfile;