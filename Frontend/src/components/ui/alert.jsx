import { useContext } from "react";
import { alertContext } from "../contexts";
import { cn } from "@/utils";

export const Alert = ({ alert, className, ...props }) => {
  const { clearAlert } = useContext(alertContext);
  if (!alert) return null;
  return (
    <div
      role="alert"
      className={cn(
        "flex items-center gap-5 p-3 rounded-lg",
        alert.type === "error" && "bg-red-200 text-red-600",
        alert.type === "success" && "bg-green-100 text-green-600",
        alert.type === "info" && "bg-cyan-100 text-cyan-600",
        className
      )}
      {...props}
    >
      <p className="flex-grow">{alert.message}</p>
      <button type="button" onClick={clearAlert}>
        x
      </button>
    </div>
  );
};
