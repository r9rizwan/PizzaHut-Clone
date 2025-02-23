import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "@/store/slices/auth-slice";
import { Logoff } from "./logoff";

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleLogoffClick = () => {
    setClicked(true);
    dispatch(handleLogout());
    navigate("/auth/login");
    setTimeout(() => setClicked(false), 300);
  };

  return (
    <div className="user-menu ">
      {isAuthenticated ? (
        <div className="flex items-center text-foreground ">
          {/* Welcome Message */}
          <div className="flex items-center text-muted p-2 rounded-lg transition-all">
            <span className="mr-2">Welcome,</span>
            <span className="font-bold transition-transform duration-300 hover:scale-105">
              {user.firstName}
            </span>
            <span className="mx-3 font-semibold text-muted">|</span>
            {/* Logoff Button */}
            <button
              onClick={handleLogoffClick}
              className="relative group hover:bg-gray-100 p-[6px] rounded-lg hover:text-slate-700 transition-200">
              <Logoff />

              {/* Hover Text */}
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs bg-gray-700 text-muted p-[6px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Logout
              </span>
            </button>
          </div>
        </div>
      ) : (
        // Login Button
        <button
          onClick={() => navigate("/auth/login")}
          className="text-blue-600 hover:text-blue-800 font-medium">
          Login
        </button>
      )}
    </div>
  );
};

export default UserMenu;
