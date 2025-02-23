import React from "react";

export const SearchBox = () => {
  return (
    <input
      type="text"
      placeholder="Search..."
      className="outline-none w-2/4 py-2 px-4 bg-background focus:ring-1 focus:ring-foreground focus:ring-opacity-70 transition duration-300 ease-in-out rounded-lg"
    />
  );
};
