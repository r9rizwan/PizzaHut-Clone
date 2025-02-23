import { Typography } from "@/components/ui/typography";
import React from "react";

export const MainHeader = ({ title, subTitle }) => {
  return (
    <div>
      <Typography type="h1">{title}</Typography>
      <Typography type="span">{subTitle}</Typography>
    </div>
  );
};
