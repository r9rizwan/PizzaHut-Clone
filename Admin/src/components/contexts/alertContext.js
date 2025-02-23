import { createContext } from "react";

export const AlertContext = createContext({
  alert: "",
  successAlert: () => null,
  errorAlert: () => null,
  infoAlert: () => null,
});
