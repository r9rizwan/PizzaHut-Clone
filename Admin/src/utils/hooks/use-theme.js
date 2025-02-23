import { useContext } from "react";
import { ThemeContext } from "@/components/contexts";

export const useTheme = () => useContext(ThemeContext);
