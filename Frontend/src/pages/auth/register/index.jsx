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
import { AuthSideImage, RegisterForm } from "@/pages/components/auth";
import { useState } from "react";
import { useMemo } from "react";

// use memo => memoized the value and prevents the re-render of component if value remain same.
// [] dependency array acts same as useEffect dependency array if remains empty component will on renders initially.
// if it has a dependency the it will re-render when its value change.

const RegisterPage = () => {
  const { alert, successAlert, errorAlert } = useAlert();
  const [toggle, setToggle] = useState(false);

  const renderRegisterForm = useMemo(
    () => <RegisterForm successAlert={successAlert} errorAlert={errorAlert} />,
    []
  );

  return (
    <div className="flex items-center">
      <AuthSideImage />
      <div className="flex w-6/12 justify-center items-center">
        <Card className='w-7/12'>
          <CardHeader>
            {/* <Button onClick={() => setToggle(!toggle)}>Test</Button> */}
            <CardTitle>Registration For New User</CardTitle>
            <CardDescription>All Fields Are Compulsory</CardDescription>
          </CardHeader>
          <CardBody>
            <Alert alert={alert} />
            {renderRegisterForm}
          </CardBody>
          <CardFooter className="flex justify-center">
            Already have an account. Click To{" "}
            <Link
              to="/auth/login"
              className="ms-1 text-link hover:underline underline-offset-2"
            >
              Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
