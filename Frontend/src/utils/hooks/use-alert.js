import { useContext } from "react";
import { alertContext } from "@/components/contexts";


export const useAlert = () => useContext(alertContext);
