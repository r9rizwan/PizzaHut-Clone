// handling for fetch api
// const jsonRes = await fetch("http://localhost:5000/api/register", {
//   method: "POST",
//   body: JSON.stringify(values),
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
// const res = await jsonRes.json();
// if (jsonRes.ok) {
//   successAlert(res);
//   navigate("/auth/login");
// } else {
//   errorAlert(res);
// }

import { Button, FormGroup, Input, InputError } from "@/components/ui";
import { FORM_MODE } from "@/utils/constants";
import { checkoutInitialValues } from "@/utils/initial-values";
import { checkoutValidationSchema } from "@/utils/validations-schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Typography from "@/components/ui/typography";
import { useGetCurrentUser } from "@/api/hooks/users";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const CheckoutForm = () => {
  const { data = {} } = useGetCurrentUser();

  const { register, formState, handleSubmit, reset } = useForm({
    mode: FORM_MODE,
    defaultValues: checkoutInitialValues,
    resolver: yupResolver(checkoutValidationSchema),
  });

  useEffect(() => {
    if (data) {
      const { firstName, lastName, contactNumber, email } = data;
      reset((prev) => ({ ...prev, firstName, lastName, contactNumber, email }));
    }
  }, [Object.keys(data)?.length]);

  const navigate = useNavigate();

  const onSubmitHandler = (values) => {
    console.log("On Submit Handlers", values);
  };

  // Error handling variables for each field
  const fNameError = formState.errors.firstName;
  const lNameError = formState.errors.lastName;
  const phoneError = formState.errors.contactNumber;
  const emailError = formState.errors.email;
  const addressError = formState.errors.add1;
  const postcodeError = formState.errors.postcode;

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col w-full gap-6 mt-6">
      <Typography className="text-xl mt-8">
        Who Are We Delivering To?
      </Typography>

      {/* First Name */}
      <FormGroup>
        <Input
          type="text"
          label="First Name"
          id="register-fname"
          placeholder="First Name"
          className="w-[740px] "
          {...register("firstName")}
        />
        <InputError error={fNameError} />
      </FormGroup>

      {/* Last Name */}
      <FormGroup>
        <Input
          type="text"
          label="Last Name"
          id="register-lname"
          placeholder="Last Name"
          {...register("lastName")}
        />
        <InputError error={lNameError} />
      </FormGroup>

      {/* Contact Number */}
      <FormGroup>
        <Input
          type="tel"
          id="register-phone"
          label="Contact Number"
          placeholder="07xxxxxxx"
          {...register("contactNumber")}
        />
        <InputError error={phoneError} />
      </FormGroup>

      {/* Email */}
      <FormGroup>
        <Input
          id="register-email"
          placeholder="johndoe@mail.com"
          label="Email"
          type="email"
          {...register("email")}
        />
        <InputError error={emailError} />
      </FormGroup>

      <Typography className="text-xl mt-8">Delivery Address</Typography>

      {/* Address Line 1 */}
      <FormGroup>
        <Input
          id="Add-1"
          placeholder="Address Line 1"
          label="Address Line 1"
          type="text"
          {...register("add1")}
        />
        <InputError error={addressError} />
      </FormGroup>

      {/* Address Line 2 (Optional) */}
      <FormGroup>
        <Input
          id="add2"
          placeholder="Address Line 2 (optional)"
          label="Address Line 2 (optional)"
          type="text"
          {...register("add2")}
        />
        <InputError error={addressError} />
      </FormGroup>

      {/* Postcode */}
      <FormGroup>
        <Input
          id="postcode"
          placeholder="Enter Postcode"
          label="Enter Postcode"
          type="text"
          {...register("postcode")}
        />
        <InputError error={postcodeError} />
      </FormGroup>

      {/* Additional Instructions (Optional) */}
      <Typography className="font-medium text-base">
        Any other details you wish to add? (Optional)
      </Typography>
      <FormGroup>
        <Input
          id="instructions"
          placeholder="Instructions Optional"
          label="Instructions (Optional)"
          type="text"
          {...register("instructions")}
        />
        <InputError error={emailError} />
      </FormGroup>

      <div className="flex justify-center">
        <Button
          className="mt-8 w-44"
          type="submit"
          onClick={() => navigate("/home/exit")}>
          Order Now
        </Button>
      </div>
    </form>
  );
};
