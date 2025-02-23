import { IconLoader3 } from "@tabler/icons-react";
import React from "react";

export const RootLoader = () => {
  return (
    <div className="flex justify-center items-center gap-5 h-screen flex-col">
      <h3 className="text-4xl text-black font-semibold">App Logo</h3>
      <IconLoader3 className="text-black size-10 animate-spin" />
    </div>
  );
};
