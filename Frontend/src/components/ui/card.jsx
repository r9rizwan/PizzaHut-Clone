import { twMerge } from "tailwind-merge";

export const CardTitle = ({ children, className = "", ...props }) => (
  <h4
    className={twMerge(
      "text-2xl font-semibold tracking-wide leading-8",
      className
    )}
    {...props}>
    {children}
  </h4>
);
export const CardSubTitle = ({ children, className = "", ...props }) => (
  <h6
    className={twMerge("text-base font-medium leading-5", className)}
    {...props}>
    {children}
  </h6>
);
export const CardDescription = ({ children, className = "", ...props }) => (
  <p
    className={twMerge(
      "text-sm leading-5 text-muted-foreground w-10/12",
      className
    )}
    {...props}>
    {children}
  </p>
);

export const CardHeader = ({ children, className, ...props }) => {
  return (
    <div className={twMerge("header", className)} {...props}>
      {children}
    </div>
  );
};

export const CardBody = ({ children, className, ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className, ...props }) => (
  <div
    className={twMerge("border-t pt-2 border-background", className)}
    {...props}>
    {children}
  </div>
);

// Image component
export const CardImage = ({ src, alt, className = "", ...props }) => (
  <img
    src={src}
    alt={alt}
    className={twMerge("object-contain", className)}
    {...props}
  />
);

export const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={twMerge(
        "text-sm bg-transparent flex flex-col gap-4 p-5 mt-1 ring-1 ring-border shadow-lg rounded-lg",
        className
      )}
      {...props}>
      {children}
    </div>
  );
};
