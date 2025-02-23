import { loginApi } from "@/api";
import { Button, FormGroup, Input, InputError } from "@/components/ui";
import { handleLogin } from "@/store/slices/auth-slice";
import { FORM_MODE } from "@/utils/constants";
import { loginInitialValues } from "@/utils/initial-values";
import { loginValidationSchema } from "@/utils/validations-schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

export const LoginForm = ({ successAlert, errorAlert }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState } = useForm({
    mode: FORM_MODE,
    defaultValues: loginInitialValues,
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmitHandler = async (values) => {
    try {
      const res = await loginApi(values);
      const { message, user, token } = res.data;
      successAlert(message);

      // call action to handle login
      dispatch(handleLogin({ user: user, token: token }));
      navigate("/home/deals");
    } catch (error) {
      console.log(error);
      errorAlert(error.message);
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

      <Link to="/">
        <Button type="button" color="outline-primary" className="block w-full">
          Continue As Guest
        </Button>
      </Link>
    </form>
  );
};
