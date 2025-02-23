/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AlertContext } from "@/components/contexts";
import { cn } from "@/utils/cn";
import { IconX } from "@tabler/icons-react";

export const Alert = ({ alert, className, ...props }) => {
  const { clearAlert } = useContext(AlertContext);
  if (!alert) return null;
  return (
    <div
      role="alert"
      className={cn(
        "flex items-center gap-5 p-3 rounded-lg my-5",
        alert.type === "error" && "bg-red-200 text-red-600",
        alert.type === "success" && "bg-green-100 text-green-600",
        alert.type === "info" && "bg-cyan-100 text-cyan-600",
        className
      )}
      {...props}
    >
      <p className="flex-grow">{alert.message}</p>
      <button type="button" onClick={clearAlert} className="hover:bg-red-500/10 p-2 rounded-lg" title="Dismiss">
        <IconX size={16}/>
      </button>
    </div>
  );
};
