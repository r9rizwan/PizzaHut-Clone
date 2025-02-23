import React from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, CartIcon } from ".";
import { CollectionGPS, Scooter } from "../icons";
import { useNavigate } from "react-router-dom";

export const DeliveryTypeDialog = ({
  deliveryType,
  handleIconClick,
  cart = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // const toggleDialog = () => setIsOpen(!isOpen);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!deliveryType) return openDialog();
    // navigate to checkout

    // Navigate to checkout after logic
    navigate("/home/checkout");
  };

  if (cart.length === 0) return null;
  return (
    <>
      <div className="text-end">
        <Button type="button" onClick={handleCheckout} color="primary">
          Checkout
        </Button>
      </div>
      {isOpen &&
        createPortal(
          <div className="relative">
            <div className="fixed w-screen h-screen bg-black/40 inset-0 z-40">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white min-w-80 p-5 rounded-lg">
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between">
                    <h3 className="text-xl font-semibold tracking-wide w-11/12">
                      Please select your delivery type?
                    </h3>
                    <div>
                      <button
                        onClick={closeDialog}
                        title="Close Dialog"
                        className="rounded-full w-7 h-7 text-error hover:bg-red-500/10 p-1">
                        <XMarkIcon />
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="flex space-x-1 bg-muted p-2 rounded-md border-muted">
                      {/* Delivery options */}
                      <CartIcon
                        icon={Scooter}
                        activeBackground="bg-background"
                        defaultBackground="bg-muted"
                        isActive={deliveryType === "scooter"}
                        onClick={() => handleIconClick("scooter")}>
                        <div className="flex flex-col text-sm items-start">
                          <span>Deliver</span>
                          <span>£2.49</span>
                        </div>
                      </CartIcon>

                      <CartIcon
                        icon={CollectionGPS}
                        activeBackground="bg-background"
                        defaultBackground="bg-muted"
                        isActive={deliveryType === "collectionGPS"}
                        onClick={() => handleIconClick("collectionGPS")}>
                        <div className="flex flex-col text-sm items-start">
                          <span>Collect</span>
                          <span>Free</span>
                        </div>
                      </CartIcon>
                    </div>
                  </div>
                  <div className="text-center">
                    <Button
                      type="button"
                      onClick={handleCheckout}
                      color="outline-primary">
                      Checkout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.getElementById("root")
        )}
    </>
  );
};
