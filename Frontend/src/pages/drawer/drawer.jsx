import React from "react";
import { DrawwerSpicy, DrawwerLeaf, DrawwerV } from "@/components/icons";
import { Button } from "@/components/ui";

const Drawer = ({ isOpen, onClose }) => {
  return (
    <div
      className={`container fixed top-0 left-0 h-screen w-1/5 bg-background border-r-2 border-muted shadow-lg transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 z-50`}>
      <div className="p-5 flex flex-col gap-4 h-full">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">Select Filters</h3>
          <button
            onClick={onClose}
            className="text-lg font-bold text-primary hover:text-secondary transition">
            X
          </button>
        </div>
        <div className="flex flex-col mt-4">
          <div className="flex flex-row space-x-4 mb-4">
            <div className="flex  px-2 py-1 bg-muted shadow-sm gap-1 items-center rounded-2xl hover:bg-muted-foreground hover:bg-opacity-80 transition-all ease-in-out duration-200">
              <DrawwerV />
              <p className="text-xs">Vegetarian</p>
            </div>
            <div className="flex flex-row  px-3 py-1 bg-muted shadow-sm gap-2 items-center rounded-2xl hover:bg-muted-foreground hover:bg-opacity-80 transition-all ease-in-out duration-200">
              <DrawwerLeaf />
              <p className="text-xs">Plant Based</p>
            </div>
          </div>
          <div className="flex  px-3 w-min py-1 bg-muted shadow-sm gap-3 items-center rounded-2xl hover:bg-muted-foreground hover:bg-opacity-10 transition-all ease-in-out duration-200">
            <DrawwerSpicy />
            <p className="text-xs">Spicy</p>
          </div>
        </div>
        <div className="text-sm mt-6 text-foreground">
          <p className="text-wrap">
            Dietary preferences do not represent allergens present. Please refer
            to{" "}
            <span className="text-indigo-900 hover:underline hover:cursor-pointer font-semibold">
              Nutrition & Allergen Information
            </span>{" "}
            for our full allergen guidance.
          </p>
        </div>
        <div className="flex flex-row mt-6 gap-2">
          <Button className="flex flex-grow px-8 py-4" loading={false}>
            Apply
          </Button>
          <Button
            className="flex flex-grow px-2 py-4 bg-background hover:bg-muted text-primary border border-primary"
            loading={false}>
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
