import { alertContext } from "@/components/contexts";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

// 1. create a context
// 2. Wrap context provider within your required app tree.
// 3. pass values to context provider.
// 4. consume the context where ever needed by passing the created context.

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  const { pathname } = useLocation();
  useEffect(() => {
    if (alert) setAlert(null);
  }, [pathname]);

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
    <alertContext.Provider
      value={{
        alert,
        successAlert,
        errorAlert,
        infoAlert,
        clearAlert,
      }}
    >
      {children}
    </alertContext.Provider>
  );
};
