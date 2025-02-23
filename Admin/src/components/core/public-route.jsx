import { Navigate } from "react-router-dom";
import { useAuth } from "@/utils/hooks";

export const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/home" replace />;
  return children;
};
