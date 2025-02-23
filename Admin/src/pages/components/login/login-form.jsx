import { loginApi } from "@/api/auth";
import { Button } from "@/components/ui/buttons";
import { FormGroup } from "@/components/ui/form-group";

import { Input, InputError } from "@/components/ui/input";
import { FORM_MODE } from "@/utils/form-mode";

import { loginInitialValues } from "@/utils/initial-values";
import { loginValidationSchema } from "@/utils/validation-schemas";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/components/contexts";

export const LoginForm = ({ successAlert, errorAlert }) => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // get login from AuthContext

  const { register, handleSubmit, formState } = useForm({
    mode: FORM_MODE,
    defaultValues: loginInitialValues,
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmitHandler = async (values) => {
    try {
      const jsonRes = await loginApi(values);
      const res = await jsonRes.json();
      if (jsonRes.ok) {
        const user = res.user;
        const token = res.token;
        const message = res.message;
        console.log(user, token)
        successAlert(message);

        // Call the login function from AuthContext
        login({ user, token });

        navigate("/home");
      } else {
        errorAlert(res.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      errorAlert("An unexpected error occurred.");
    }
  };

  const emailError = formState.errors.email;
  const passwordError = formState.errors.password;

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col w-full py-2 gap-5 mt-6"
    >
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

      <div className="flex justify-end">
        <Link
          to="/auth/forget-password"
          className="hover:underline text-primary underline-offset-2"
        >
          Forget password?
        </Link>
      </div>

      <Button type="submit" loading={formState.isSubmitting}>
        Login
      </Button>
    </form>
  );
};
