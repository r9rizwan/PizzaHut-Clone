import { SearchBox } from "./search-box";
import { ThemeToggler } from "./theme-toggler";
import { UserDropdown } from "./user-dropdown";

export const DashboardAppHeader = () => {
  return (
    <header className="w-full bg-card text-card-foreground border border-border h-16 flex items-center px-3 rounded-xl justify-between sticky top-4 before:content-[''] before:absolute before:top-[-18px] before:left-0 before:h-5 before:w-full before:bg-background before:z-20">
      <SearchBox />
      <div className="flex items-center gap-4">
        <ThemeToggler />
        <UserDropdown />
      </div>
    </header>
  );
};
