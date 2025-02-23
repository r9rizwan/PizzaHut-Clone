import { useContext } from "react";
import { AlertContext } from "@/components/contexts";

export const useAlert = () => useContext(AlertContext);
