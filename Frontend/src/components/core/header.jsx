import { useRef } from "react";
import { Tab } from "../ui/index";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import UserMenu from "../ui/userMenu";

const tabs = [
  { path: "/home/deals", title: "Deals" },
  { path: "/home/pizzas", title: "Pizzas" },
  { path: "/home/melts", title: "Melts" },
  { path: "/home/sides", title: "Sides" },
  { path: "/home/desserts", title: "Desserts" },
  { path: "/home/drinks", title: "Drinks" },
  { path: "/home/dips", title: "Dips" },
  { path: "/misc/todos", title: "Todos" },
];

export const Header = () => {
  const [activeTab, setActiveTab] = useState(-1);

  const highlighterRef = useRef(null);
  const tabsRef = useRef([]);

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (tabsRef.current.length > 0) {
      const foundIndex = tabs.findIndex((tab) => pathname === tab.path);
      const foundTab = tabsRef.current[foundIndex];
      handleActiveTabChange(foundTab, foundIndex);
    }
  }, [pathname]); // Re-run on pathname change

  const handleActiveTabChange = (element, idx) => {
    if (!element || !highlighterRef.current) return;
    setActiveTab(idx);

    highlighterRef.current.style.height = `${element.offsetHeight}px`;
    highlighterRef.current.style.width = `${element.offsetWidth}px`;
    highlighterRef.current.style.left = `${element.offsetLeft}px`;
  };

  const assignRef = (element, idx) => (tabsRef.current[idx] = element);

  return (
    <header className="flex flex-col items-center justify-between  bg-primary px-2 h-36 shadow-md z-10">
      <div className="flex w-full items-end justify-end">
        <UserMenu />
      </div>

      <ul className="w-4/5 font-semibold bg-background py-[0.9rem] hidden lg:flex items-center rounded-t-lg shadow drop-shadow p-1 relative divide-x divide-border">
        {tabs.map((tab, idx) => (
          <Tab
            key={idx}
            idx={idx}
            assignRef={assignRef}
            activeTab={activeTab}
            handleActiveTabChange={handleActiveTabChange}
            {...tab}
          />
        ))}
        <li
          ref={highlighterRef}
          className="absolute transition-all duration-500 ease-in-out bg-primary h-full rounded-md"></li>
      </ul>
    </header>
  );
};
