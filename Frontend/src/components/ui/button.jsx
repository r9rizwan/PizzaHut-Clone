import { cn } from "@/utils";
import { Loader } from "./index";

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
        " rounded h-10 inline-flex justify-center items-center gap-4 font-medium px-3",
        color === "primary" &&
          "bg-primary hover:bg-primary-dark text-primary-foreground",
        color === "outline-primary" &&
          "bg-transparent border border-primary text-primary hover:bg-secondary",
        className
      )}
      {...props}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};

export default Button;
