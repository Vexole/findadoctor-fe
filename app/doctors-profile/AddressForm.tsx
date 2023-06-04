import React from "react";
import { FormWrapper } from "../../components/FormWrapper";

export function AddressForm(props) {
    const { register, errors } = props;
    const { cityOptions } = props;

    return (
        <FormWrapper title="Address Details">
            <div className="form-fields">
                <label htmlFor="street">Street Address</label>
                <input {...register("street", { required: 'Street Address is required' })}
                    id="street" type="text" />
                {errors.street && <span className="error">{errors.street.message}</span>}
            </div>
            <div className="form-fields">
                <label htmlFor="cityId">City</label>
                <select {...register("cityId", {
                    validate: (fieldValue: string) => {
                        return fieldValue !== "" || "Please select a city";
                    }
                })} id="city">
                    <option value="">Select an option</option>
                    {cityOptions}
                </select>
                {errors.cityId && <span className="error">{errors.cityId.message}</span>}
            </div>
            <div className="form-fields">
                <label htmlFor="postalCode">Postal Code</label>
                <input {...register("postalCode", { required: 'Postal Code is required' })}
                    id="postalCode" type="text" />
                {errors.postalCode && <span className="error">{errors.postalCode.message}</span>}
            </div>
        </FormWrapper>);
}