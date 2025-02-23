import { IconLoader2 } from "@tabler/icons-react";
import React from "react";

export const PageLoader = () => {
  return (
    <div className="h-full flex justify-center items-center flex-col gap-4">
      <IconLoader2 size={48} className="text-primary animate-spin" />
      <h3 className="text-2xl font-semibold">Loading Page...</h3>
    </div>
  );
};
