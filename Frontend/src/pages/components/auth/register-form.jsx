import { registerApi } from "@/api";
import { Button, FormGroup, Input, InputError } from "@/components/ui";
import { FORM_MODE } from "@/utils/constants";
import { registerInitialValues } from "@/utils/initial-values";
import { registerValidationSchema } from "@/utils/validations-schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const RegisterForm = ({ successAlert, errorAlert }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm({
    mode: FORM_MODE,
    defaultValues: registerInitialValues,
    resolver: yupResolver(registerValidationSchema),
  });

  const onSubmitHandler = async (values) => {
    try {
      const response = await registerApi(values);
      successAlert(response.data.name);
      navigate("/auth/login");
    } catch (error) {
      errorAlert(error?.response?.data ?? "Runtime Exception!");
    }
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
  };

  const fNameError = formState.errors.firstName;
  const lNameError = formState.errors.lastName;
  const phoneError = formState.errors.contactNumber;
  const emailError = formState.errors.email;
  const passwordError = formState.errors.password;

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col w-full py-2 gap-4 mt-6">
      <div className="flex w-full items-start gap-5">
        <FormGroup>
          <Input
            type="fName"
            label="First Name"
            id="register-fname"
            placeholder="First Name"
            {...register("firstName")}
          />
          <InputError error={fNameError} />
        </FormGroup>

        <FormGroup>
          <Input
            type="lName"
            label="Last Name"
            id="register-lname"
            placeholder="Last Name"
            {...register("lastName")}
          />
          <InputError error={lNameError} />
        </FormGroup>
      </div>

      <FormGroup>
        <Input
          type="phone"
          id="register-phone"
          label="Contact Number"
          placeholder="07xxxxxxx"
          {...register("contactNumber")}
        />
        <InputError error={phoneError} />
      </FormGroup>

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

      <FormGroup>
        <Input
          id="register-password"
          placeholder="xxxxxxxx"
          label="Password"
          type="password"
          {...register("password")}
        />
        <InputError error={passwordError} />
      </FormGroup>
      <Button className="mt-8" type="submit" loading={formState.isSubmitting}>
        Register
      </Button>
    </form>
  );
};
