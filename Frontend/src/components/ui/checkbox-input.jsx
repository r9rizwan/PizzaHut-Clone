import React from "react";
import { Tick } from "../icons/tick";

export const CheckboxInput = ({
  className = "",
  onChange = () => {},
  value,
  checked = false,
  ...props
}) => {
  return (
    <div className="relative flex items-center justify-center">
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="peer appearance-none h-5 w-5 border border-foreground checked:border-error rounded checked:bg-error transition-[colors_border] duration-150"
        {...props}
      />
      {/* Show tick when checkbox is checked */}
      <div className="peer-checked:block hidden absolute pointer-events-none">
        <Tick className="text-background" />
      </div>
    </div>
  );
};
