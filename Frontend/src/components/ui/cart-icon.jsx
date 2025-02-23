import React from "react";

export const CartIcon = ({
  icon: Icon,
  children,
  activeBackground = "bg-background border-2 rounded shadow-lg",
  defaultBackground = "bg-muted",
  isActive = false,
  onClick,
}) => {
  return (
    <div
      className={`flex flex-grow p-2 cursor-pointer items-center justify-center rounded-md transition-all ease-in-out duration-200 ${
        isActive ? activeBackground : defaultBackground
      } ${
        !isActive
          ? "hover:bg-muted-dark border hover:border-gray-300 hover:shadow-md"
          : ""
      }`}
      onClick={onClick}>
      {/* Pass down additional props to the icon */}
      {Icon && (
        <Icon
          className="w-6 h-6 mr-4"
          color={isActive ? "#c8102e" : "#322f32"} // Set the color based on isActive
        />
      )}
      <div className="flex items-center justify-center">{children}</div>
    </div>
  );
};
