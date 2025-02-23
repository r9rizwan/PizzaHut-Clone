import { cn } from "@/utils";
import { forwardRef } from "react";
import { Label } from ".";

export const Input = forwardRef(
  (
    {
      placeholder = "Enter ...",
      type = "text",
      className = "",
      float = true,
      label = "Label",
      labelProps = {},
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex items-center relative w-full ">
        <input
          ref={ref}
          type={type}
          id="test"
          placeholder={float ? "" : placeholder}
          className={cn(
            "outline-none w-full peer py-2.5 px-3 rounded ring-2 ring-border focus:ring-muted disabled:opacity-50 disabled:cursor-not-allowed read-only:opacity-70 read-only:cursor-not-allowed",
            className
          )}
          {...props}
        />
        <Label
          htmlFor="test"
          className="absolute left-3 px-1 origin-[0] scale-90 -translate-y-6  bg-background peer-focus:scale-90 peer-focus:-translate-y-6  peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 transition duration-150 pointer-events-none z-10"
          {...labelProps}>
          {label}
        </Label>
      </div>
    );
  }
);
