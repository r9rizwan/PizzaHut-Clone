import React from "react";
import { Footer, Header } from "@/components/core";
import { Outlet, useLocation } from "react-router-dom";
import Banner from "../pages/landing/banner";
import { Alert } from "@/components/ui";
import { useAlert } from "@/utils/hooks/use-alert";
import Cart from "../pages/cart/index";
import { TempHeader } from "@/components/ui/temp-header";
import Exit from "@/pages/landing/exit";

function MainLayout() {
  const { alert } = useAlert();
  const location = useLocation();

  // Determine if we are on the checkout page
  const isCheckoutPage = location.pathname === "/home/checkout";
  const isExitPage = location.pathname === "/home/exit";

  const isCheckoutOrExit =
    location.pathname === "/home/checkout" ||
    location.pathname === "/home/exit";

  // // TempHeader for Checkout page
  // const tempHeader = (
  //   <div className="bg-primary text-white p-4">
  //     <h1 className="text-xl font-bold">Checkout</h1>
  //   </div>
  // );

  // Hide banner if the current route matches /home/pizzas/:id
  const showBanner =
    !location.pathname.startsWith("/home/pizzas/") && !isCheckoutPage;

  return (
    <div
      className={`flex flex-col flex-grow relative bg-background min-h-screen h-full ${
        isCheckoutPage || isExitPage ? "w-full" : "w-4/5"
      }`}>
      {/* <div className="flex-grow flex relative"> */}
      <div className="flex-grow flex flex-col gap-4">
        {/* Conditionally render Header or tempHeader */}
        {isCheckoutOrExit ? <TempHeader /> : <Header />}

        <main>
          <Alert alert={alert} />
          {showBanner && <Banner />}
          <Outlet />
        </main>
      </div>
      {/* Conditionally render Cart */}
      {!(isCheckoutPage || isExitPage) && <Cart />}
      {/* </div> */}
      <Footer />
    </div>
  );
}

export default MainLayout;
