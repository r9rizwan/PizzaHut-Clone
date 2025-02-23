import { cn } from "@/utils/cn";

const variantClasses = {
  h1: "text-5xl font-medium text-primary",
  h2: "text-[2.5rem] font-medium text-foreground",
  h3: "text-4xl font-medium text-foreground",
  h4: "text-3xl font-semibold text-foreground",
  h5: "text-2xl font-semibold text-foreground",
  h6: "text-xl font-semibold text-foreground",
  p: "text-base font-normal text-foreground",
  span: "text-sm font-normal text-muted-foreground",
  caption: "text-base font-semibold text-foreground",
  small: "text-xs font-normal text-muted-foreground",
};

// eslint-disable-next-line react/prop-types
export const Typography = ({ type, className = "", children, ...props }) => {
  const Comp = type;
  return (
    <Comp className={cn(className, variantClasses[type])} {...props}>
      {children}
    </Comp>
  );
};
