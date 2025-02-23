import { Navigation } from "./navigation";
import { Header } from "./header";

export const DashboardSidebar = () => {
  return (
    <aside className="w-72 bg-card text-card-foreground p-4 h-screen flex flex-col justify-between fixed left-0 top-0 overflow-auto">
      <Header />
      <Navigation />
    </aside>
  );
};
