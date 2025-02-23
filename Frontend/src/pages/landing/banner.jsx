import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Filter } from "@/components/icons";
import Drawer from "../drawer/drawer";
import { CardImage } from "@/components/ui";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const Banner = () => {
  const [banner, setBanner] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation(); // Hook to get current location

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/banner");
        const data = await response.json();
        setBanner(data[0]);
      } catch (error) {
        console.error("Error fetching banner image:", error);
      }
    };

    fetchBanner();
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Check if the current route is exactly "/home/deals"
  const showBannerImage = location.pathname === "/home/deals";

  // Check if the current route is "/home/deals" (to show filter button) or not
  const showFilterButton =
    location.pathname !== "/home/deals" &&
    !location.pathname.startsWith("/home/deals/");

  return (
    <>
      <div className="container flex flex-col">
        {/* Render the filter button only when not on /home/deals or its subpages */}
        {showFilterButton && (
          <div className="flex gap-10 justify-start w-full max-w-6xl mx-auto">
            <button
              onClick={toggleDrawer}
              className="flex items-center space-x-2 border-2 border-primary text-primary px-2 py-1 rounded hover:shadow-lg transition-all"
            >
              <Filter />
              <span>Filters</span>
            </button>
            <button onClick={() => null}>
              <ShoppingCartIcon className="block xl:hidden w-10 h-10 " />
            </button>
          </div>
        )}

        {/* Conditionally render Banner Image on /home/deals only */}
        {showBannerImage && banner && (
          <div className="mt-4 max-w-6xl mx-auto h-36">
            <CardImage
              src={banner.image}
              alt="Banner"
              className="h-36 w-full"
            />
          </div>
        )}
      </div>

      {/* Overlay with subtle shadow effect */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-40"
          onClick={closeDrawer} // Closes drawer when clicking outside
        ></div>
      )}

      {/* Drawer Component */}
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </>
  );
};

export default Banner;
