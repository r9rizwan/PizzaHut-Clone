// Button.js remains unchanged
import { IconLoader } from "@tabler/icons-react";
import { cn } from "../../../utils/cn";

export const Button = ({
  children,
  type = "submit",
  className = "",
  loading = false,
  color = "primary",
  ...props
}) => {
  return (
    <button
      type={type}
      className={cn(
        "rounded-md h-10 inline-flex justify-center items-center gap-4 font-medium px-4",
        color === "primary" &&
          "bg-primary hover:bg-primary-dark text-primary-foreground",
        color === "error" &&
          "bg-error text-error-foreground",
        color === "outline-primary" &&
          "bg-transparent border border-primary text-primary hover:bg-secondary",
        className
      )}
      {...props}>
      {loading ? <IconLoader className="animate-spin" size={24} /> : children}
    </button>
  );
};

export default Button;
