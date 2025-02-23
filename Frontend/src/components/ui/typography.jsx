import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const Typography = ({
  children,
  color = "text-gray-700",
  size = "text-3xl",
  className = "",
}) => {
  const classes = twMerge(clsx(color, size, "font-bold"), className);

  return <p className={classes}>{children}</p>;
};

export default Typography;
