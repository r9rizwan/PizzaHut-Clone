import { cn } from "@/utils/cn";

export const InputError = ({ error }) => {
  return (
    <span
      role="alert"
      className={cn(
        "text-xs transition-[width] ease-linear duration-700 text-rose-500 whitespace-nowrap font-medium overflow-hidden",
        error ? "w-full ms-1" : "w-px"
      )}>
      {error?.message ?? ""}
    </span>
  );
};
