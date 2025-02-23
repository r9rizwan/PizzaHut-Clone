import { Alert } from "@/components/ui/alert";
import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/cards";
import { useAlert } from "@/utils/hooks/use-alert";
import { LoginForm } from "./components/login/login-form";
import { useMemo } from "react";

const LoginPage = () => {
  const { alert, successAlert, errorAlert } = useAlert();

  const renderLoginForm = useMemo(
    () => <LoginForm successAlert={successAlert} errorAlert={errorAlert} />,
    [successAlert, errorAlert]
  );

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Login Here</CardTitle>
            <CardDescription>All Fields Are Compulsory</CardDescription>
          </CardHeader>
          <CardBody>
            <Alert alert={alert} />
            {renderLoginForm}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
