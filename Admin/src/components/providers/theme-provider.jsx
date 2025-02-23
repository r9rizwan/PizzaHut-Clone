import { useState } from "react";
import { ThemeContext } from "../contexts";
import { useRef } from "react";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("app-theme") ?? "light"
  );
  const bodyRef = useRef(document.body);

  const changeTheme = (desiredTheme) => {
    setTheme(desiredTheme);
    localStorage.setItem("app-theme", desiredTheme);
    bodyRef.current.classList.toggle("dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
