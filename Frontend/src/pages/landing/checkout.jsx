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
import { checkoutInitialValues } from "@/utils/initial-values";
import { useState } from "react";
import { useMemo } from "react";
import { CheckoutForm } from "../components/auth/checkout-form";
import Typography from "@/components/ui/typography";
import { useSelector } from "react-redux";

const Checkout = () => {
  const { successAlert, errorAlert } = useAlert();

  const totalValue = useSelector((state) => state.cart.totalValue);

  const renderCheckoutForm = useMemo(
    () => <CheckoutForm successAlert={successAlert} errorAlert={errorAlert} />,
    []
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <Typography className="text-3xl">CHECKOUT</Typography>

      <div>{renderCheckoutForm}</div>

      <div className="flex py-8">
        <Typography className="text-xl font-bold mr-4">Total: </Typography>
        <Typography className="text-xl font-bold text-primary">
          £{totalValue.toFixed(2)}
        </Typography>
      </div>
    </div>
  );
};

export default Checkout;
