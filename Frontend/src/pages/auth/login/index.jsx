import { Link } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { useAlert } from "@/utils/hooks/use-alert";
import { AuthSideImage, LoginForm } from "@/pages/components/auth";
import { useState } from "react";
import { useMemo } from "react";

const LoginPage = () => {
  const { alert, successAlert, errorAlert } = useAlert();

  const renderLoginForm = useMemo(
    () => <LoginForm successAlert={successAlert} errorAlert={errorAlert} />,
    []
  );

  return (
    <div className="flex items-center">
      <AuthSideImage />
      <div className="flex w-6/12 justify-center items-center">
        <Card className="w-7/12">
          <CardHeader>
            <CardTitle>Login Here</CardTitle>
            <CardDescription>All Fields Are Compulsory</CardDescription>
          </CardHeader>
          <CardBody>
            <Alert alert={alert} />
            {renderLoginForm}
          </CardBody>
          <CardFooter className="flex justify-center">
            Don't have an account. Click To
            <Link
              to="/auth/register"
              className="ms-1 text-link hover:underline underline-offset-2"
            >
              Register
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
