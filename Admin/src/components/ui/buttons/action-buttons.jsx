import { cn } from "@/utils/cn";
import { IconTrash } from "@tabler/icons-react";
import { IconEdit } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export const EditActionButton = ({
  type = "button",
  className = "",
  path = "#",
  ...props
}) => {
  return (
    <Link
      to={path}
      className={cn(
        "text-primary hover:bg-secondary size-9 inline-flex justify-center items-center rounded-lg",
        className
      )}
      type={type}
      {...props}
    >
      <IconEdit />
    </Link>
  );
};

export const DeleteActionButton = ({
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={cn(
        "size-9 text-error hover:bg-red-500/10 rounded-lg inline-flex justify-center items-center",
        className
      )}
      {...props}
    >
      <IconTrash />
    </button>
  );
};
