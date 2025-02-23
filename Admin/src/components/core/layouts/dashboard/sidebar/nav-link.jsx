import React from "react";
import { Link } from "react-router-dom";

export const NavLink = ({ pathname, menuItem }) => {
  return (
    <li
      className={`rounded-3xl transition-all duration-200 px-8 py-3 ${
        pathname === menuItem.path
          ? "bg-primary text-primary-foreground"
          : "hover:bg-accent"
      }`}>
      <Link to={menuItem.path} onClick={menuItem?.onClick} className="w-full flex items-center gap-2">
        {menuItem.Icon ? <menuItem.Icon className="size-4" /> : null}
        <span className="truncate">{menuItem.title}</span>
      </Link>
    </li>
  );
};
