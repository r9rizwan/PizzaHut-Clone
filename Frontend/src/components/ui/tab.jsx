import { Link } from "react-router-dom";
import { cn } from "@/utils";

export const Tab = (props) => {
  const {
    idx,
    path,
    title,
    activeTab,
    assignRef,
    handleActiveTabChange,
    ...restProps
  } = props;

  return (
    <li className="px-3">
      <Link
        to={path}
        ref={(element) => assignRef(element, idx)}
        className={cn(
          "px-3 py-1 relative z-10 transition-colors rounded-md",
          activeTab === idx
            ? "text-primary-foreground"
            : "text-foreground hover:bg-muted"
        )}
        onClick={(e) => handleActiveTabChange(e.target, idx)}
        {...restProps}
      >
        {title}
      </Link>
    </li>
  );
};
