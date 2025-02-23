import { cn } from "../../utils";

export const Label = ({ children, className, required = false, ...props }) => {
  return (
    <label
      className={cn(
        "tracking-wide text-primary font-medium text-sm",
        required && "after:content-['*'] after:ms-1",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
};
