/* eslint-disable react/prop-types */
import { cn } from "@/utils/cn";
import { IconX } from "@tabler/icons-react";
import { useEffect } from "react";

export const Dialog = ({
  isOpen,
  toggle,
  title,
  children,
  center = true,
  closeable,
}) => {
  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e) => {
        if (e.shiftKey || e.altKey || e.ctrlKey) return null;
        if (e.key === "Escape") return closeable ? toggle() : null;
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, toggle, closeable]);

  if (!isOpen) return null;
  return (
    <div
      onClick={() => (closeable ? toggle : null)}
      className="fixed w-screen h-screen bg-black/70 top-0 left-0"
    >
      <div
        className={cn(
          "h-full flex justify-center",
          center ? "items-center" : "items-start pt-10"
        )}
      >
        <div
          role="dialog"
          onClick={(e) => e.stopPropagation()}
          className="bg-popover text-foreground p-5 w-[450px] rounded-lg"
        >
          <div
            className={cn(
              "flex items-start",
              title ? "justify-between" : "justify-end"
            )}
          >
            {title && <h3 className="text-2xl font-semibold">{title}</h3>}
            <button
              className="text-error hover:bg-red-500/10 size-8 rounded-full inline-flex justify-center items-center"
              title="Close Dialog"
              type="button"
              onClick={toggle}
            >
              <IconX size={18} />
            </button>
          </div>
          <div className="flex flex-col gap-5 mt-2">{children}</div>
        </div>
      </div>
    </div>
  );
};
