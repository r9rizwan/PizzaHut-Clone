import { AlertContext } from "../contexts";
import { useState } from "react";

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const successAlert = (msg) => {
    if (!msg) return null;
    setAlert({ message: msg, type: "success" });
  };
  const errorAlert = (msg) => {
    if (!msg) return null;
    setAlert({ message: msg, type: "error" });
  };
  const infoAlert = (msg) => {
    if (!msg) return null;
    setAlert({ message: msg, type: "info" });
  };
  const clearAlert = () => setAlert(null);

  return (
    <AlertContext.Provider
      value={{
        alert,
        successAlert,
        errorAlert,
        infoAlert,
        clearAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
