import { useContext } from "react";
import { AuthContext } from "@/components/contexts";

export const useAuth = () => useContext(AuthContext);
