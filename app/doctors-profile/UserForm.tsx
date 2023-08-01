import { useFieldArray } from "react-hook-form";
import { FormWrapper } from "../../components/FormWrapper";
import { FormInput, FormSelect } from "@/components";
import { FormSelectNoLoop } from "@/components/FormSelectNoLoop";
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Select } from "@chakra-ui/react";

export function UserForm(props: any) {
    const { register, control, errors } = props;
    const { languageOptions, genderOptions, isDisabled, isEditMode, profilePictureUrl, handleProfilePictureChange } = props;

    const { fields: languageFields, append: languageAppend, remove: languageRemove } = useFieldArray({
        name: 'doctorLanguages',
        control
    })

    const title = ["Dr.", "Dr.(Ms.)", "Dr.(Mrs.)", "Dr.(Miss)", "Dr.(Mr.)"];

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

            {!isDisabled && !isEditMode && <FormControl>
                <img className="profile-image" src={profilePictureUrl} alt="Profile Picture" />
                <FormLabel htmlFor="profilePicture">Profile Picture</FormLabel>
                <Input type="file" accept="image/*"  {...register("profilePicture")}
                    onChange={e => handleProfilePictureChange(e)} />
            </FormControl>
            }

            {!isDisabled && isEditMode && <FormControl>
                <img className="profile-image" src={profilePictureUrl} alt="Profile Picture" />
                <FormLabel htmlFor="profilePicture">Change Profile Picture</FormLabel>
                <Input type="file" accept="image/*"  {...register("profilePicture")}
                    onChange={e => handleProfilePictureChange(e)} />
            </FormControl>
            }

            {isDisabled && !isEditMode && <FormControl>
                <img className="profile-image" src={profilePictureUrl} alt="Profile Picture" />
            </FormControl>
            }

            <FormSelect
                label="Title"
                options={title.map((title) => ({ label: title, value: title })) || []}
                register={register('title')}
                isDisabled={isDisabled}
                isInvalid={Boolean(errors.title)}
                helperText={errors.title ? String(errors.title?.message) : ''}
            />

            <FormInput
                label="First Name"
                placeholder='Enter your first name'
                register={register('firstName')}
                isDisabled={isDisabled}
                isInvalid={Boolean(errors.firstName)}
                helperText={errors.firstName ? String(errors.firstName?.message) : ''}
            />

            <FormInput
                label="Middle Name"
                placeholder='Enter your middle name'
                register={register('middleName')}
                isDisabled={isDisabled}
                isInvalid={Boolean(errors.middleName)}
                helperText={errors.middleName ? String(errors.middleName?.message) : ''}
            />

            <FormInput
                type="text"
                label="Last Name"
                placeholder='Enter your last name'
                isDisabled={isDisabled}
                register={register('lastName')}
                isInvalid={Boolean(errors.lastName)}
                helperText={errors.lastName ? String(errors.lastName?.message) : ''}
            />

            <FormInput
                label="Phone Number"
                placeholder='Enter your phone number'
                isDisabled={isDisabled}
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

            <FormSelectNoLoop
                label="Gender"
                options={genderOptions || []}
                register={register("gender", {
                    validate: (fieldValue: string) => {
                        return fieldValue !== "" || "Please select a gender";
                    }
                })}
                isDisabled={isDisabled}
                isInvalid={Boolean(errors.gender)}
                helperText={errors.gender ? String(errors.gender?.message) : ''}
            />

            <FormControl>
                <FormLabel fontWeight="bold" color="#1A365D">Languages</FormLabel>
                {languageFields.map((field, index) => {
                    return (
                        <div className="form-control" key={field.id}>
                            <Select placeholder="Select an option"
                                isDisabled={isDisabled}
                                {...register(`doctorLanguages.${index}.languageId` as const,
                                    {
                                        validate: (fieldValue: any) => {
                                            return (fieldValue != "" || "Please select a language")
                                        }
                                    })}>
                                {languageOptions}
                            </Select>
                            {!isDisabled && index > 0 &&
                                <div className="btn_remove">
                                    <button type="button" onClick={() => languageRemove(index)}>Remove</button>
                                </div>
                            }
                            {Boolean(errors.doctorLanguages) ? (
                                <FormErrorMessage>{errors.doctorLanguages ? String(errors.doctorLanguages?.message) : ''}</FormErrorMessage>
                            ) : (
                                <FormHelperText>{errors.doctorLanguages ? String(errors.doctorLanguages?.message) : ''}</FormHelperText>
                            )}
                        </div>);
                })
                }
                {!isDisabled && <div className="btn_add_more">
                    <button type="button" onClick={() => languageAppend({ languageId: "" })}>Add More</button>
                </div>}
            </FormControl>
        </FormWrapper>
    )
}