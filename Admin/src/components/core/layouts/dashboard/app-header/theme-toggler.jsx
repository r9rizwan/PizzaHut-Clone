import { useTheme } from "@/utils/hooks";
import * as Icons from "@/components/ui/icons";

export const ThemeToggler = () => {
  const { theme, changeTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    changeTheme(newTheme);
  };

  return (
    <div className="hover:bg-foreground p-2 transition duration-300 ease-in-out rounded hover:ring-1 hover:ring-foreground flex items-center justify-center">
      <button
        onClick={toggleTheme}
        className="cursor-pointer flex items-center justify-center"
        title={
          theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"
        }
      >
        {theme === "light" ? (
          <Icons.DarkIcon className="h-5 w-5" />
        ) : (
          <Icons.LightIcon className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};
