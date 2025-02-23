import { twMerge } from "tailwind-merge";

export const FormGroup = ({ children, className, ...props }) => {
  return (
    <div
      className={twMerge("inline-flex flex-col gap-1", className)}
      {...props}>
      {children}
    </div>
  );
};
