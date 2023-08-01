import React from "react";
import { FormWrapper } from "../../components/FormWrapper";
import { FormInput, FormSelectNoLoop } from "@/components";

export function AddressForm(props: any) {
    const { register, errors } = props;
    const { cityOptions, isDisabled } = props;

    return (
        <FormWrapper title="Address Details"
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
            <FormInput
                label="Street Address"
                placeholder="Enter your street address"
                register={register("street", { required: 'Street Address is required' })}
                isInvalid={Boolean(errors.street)}
                isDisabled={isDisabled}
                helperText={errors.street ? String(errors.street?.message) : ''}
            />

            <FormSelectNoLoop
                label="City"
                options={cityOptions || []}
                register={register("cityId", {
                    validate: (fieldValue: string) => {
                        return fieldValue !== "" || "Please select a city";
                    }
                })}
                isDisabled={isDisabled}
                isInvalid={Boolean(errors.cityId)}
                helperText={errors.cityId ? String(errors.cityId?.message) : ''}
            />

            <FormInput
                label="Postal Code"
                placeholder="Enter your postal code"
                register={register("postalCode", { required: 'Postal Code is required' })}
                isInvalid={Boolean(errors.postalCode)}
                isDisabled={isDisabled}
                helperText={errors.postalCode ? String(errors.postalCode?.message) : ''}
            />
        </FormWrapper>);
}