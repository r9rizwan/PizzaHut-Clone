import { NavLink } from "./nav-link";
import { useLocation } from "react-router-dom";
import * as Icons from "@/components/ui/icons";
import { removeUserFromPresistentStorage } from "@/utils";
import { useAuth } from "@/utils/hooks";

// {
//   title: "Dashboard",
//   path: "/dashboard",
//   Icon: Icons.Dashboard,
// },
// {
//   title: "Products",
//   path: "/products",
//   Icon: Icons.Add,
// },
// {
//   title: "Categories",
//   path: "/categories",
//   Icon: Icons.Settings,
// },
// {
//   title: "Deals",
//   path: "/deals",
//   Icon: Icons.Calendar,
// },
// {
//   title: "Coupons",
//   path: "/coupons",
//   Icon: Icons.Admin,
// },
// {
//   title: "Toppings",
//   path: "/toppings",
//   Icon: null,
// },
// ];

const menuItemFactory = (title, path, Icon, children, onClick) => ({
  title: title,
  path: path,
  Icon: Icon,
  children: children,
  onClick: onClick,
});

const mainMenuItems = [
  menuItemFactory("Home", "/home", Icons.Home),
  menuItemFactory("Products", "/home/products", Icons.Add),
  menuItemFactory("Crusts", "/home/crusts", Icons.Add),
  menuItemFactory("Sizes", "/home/sizes", Icons.Add),
  // menuItemFactory("Pizzas", "/home/pizzas", Icons.PizzaIcon), // Separate menu item for Pizzas
  // menuItemFactory("Sides", "/home/sides", Icons.SideIcon), // Separate menu item for Sides
  // menuItemFactory("Drinks", "/home/drinks", Icons.DrinkIcon), // Separate menu item for Drinks
  // menuItemFactory("Deals", "/home/deals", Icons.ChartPieIcon),
  menuItemFactory("Users", "/home/users", Icons.UserIcon),
];

// Bottom menu items (Users, LogIn)

export const Navigation = () => {
  const { pathname } = useLocation();
  const { logout } = useAuth();

  const bottomMenuItems = [
    menuItemFactory("Settings", "/home/settings", Icons.Settings),
    menuItemFactory("Log Out", "/auth/login", Icons.LoginIcon, null, logout),
  ];
  return (
    <>
      <ul className="flex flex-col gap-2 ">
        {mainMenuItems.map((menuItem, index) => (
          <li key={index}>
            <NavLink pathname={pathname} menuItem={menuItem} />
          </li>
        ))}
      </ul>

      <ul className="mt-auto flex flex-col gap-1">
        {bottomMenuItems.map((menuItem, index) => (
          <NavLink key={index} pathname={pathname} menuItem={menuItem} />
        ))}
      </ul>
    </>
  );
};
