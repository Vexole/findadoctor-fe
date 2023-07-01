import React from "react";
import { FormWrapper } from "../../components/FormWrapper";

export function AddressForm(props) {
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
            <div className="form-fields">
                <label htmlFor="street">Street Address</label>
                <input {...register("street", { required: 'Street Address is required' })}
                    id="street" type="text" disabled={isDisabled} />
                {errors.street && <span className="error">{errors.street.message}</span>}
            </div>
            <div className="form-fields">
                <label htmlFor="cityId">City</label>
                <select {...register("cityId", {
                    validate: (fieldValue: string) => {
                        return fieldValue !== "" || "Please select a city";
                    }
                })} id="city" disabled={isDisabled}>
                    <option value="">Select an option</option>
                    {cityOptions}
                </select>
                {errors.cityId && <span className="error">{errors.cityId.message}</span>}
            </div>
            <div className="form-fields">
                <label htmlFor="postalCode">Postal Code</label>
                <input {...register("postalCode", { required: 'Postal Code is required' })}
                    id="postalCode" type="text" disabled={isDisabled} />
                {errors.postalCode && <span className="error">{errors.postalCode.message}</span>}
            </div>
        </FormWrapper>);
}