import { useRoutes } from "react-router-dom";
import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";
import MainLayout from "@/layouts/main-layout";
import DealsCard from "@/pages/landing/deals";
import DealsDetail from "@/pages/details/dealsDetails";
import MeltsCard from "@/pages/landing/melts";
import BlankLayout from "@/layouts/blank-layout";
import SidesCard from "@/pages/landing/sides";
import DessertsCard from "@/pages/landing/desserts";
import DrinksCard from "@/pages/landing/drinks";
import DipsCard from "@/pages/landing/dips";
import Pizzas from "@/pages/landing/pizzas";
import Details from "@/pages/details/details";
import TodosPage from "@/pages/landing/todos";
import Checkout from "@/pages/landing/checkout";
import Exit from "@/pages/landing/exit";

function Router() {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/home/deals", // Path for displaying all deals
          element: <DealsCard />,
        },
        {
          path: "/home/deals/:id", // Path for detailed view of a specific deal
          element: <DealsDetail />,
        },
        {
          path: "/home/pizzas",
          element: <Pizzas />,
        },
        {
          path: "/home/pizzas/:id", // Dynamic route for a specific pizza
          element: <Details />,
        },
        {
          path: "/home/sides",
          element: <SidesCard />,
        },
        {
          path: "/home/melts",
          element: <MeltsCard />,
        },
        {
          path: "/home/drinks",
          element: <DrinksCard />,
        },
        {
          path: "/home/dips",
          element: <DipsCard />,
        },
        {
          path: "/home/desserts",
          element: <DessertsCard />,
        },
        {
          path: "/misc/todos",
          element: <TodosPage />,
        },
        {
          path: "/home/checkout",
          element: <Checkout />,
        },
        {
          path: "/home/exit",

          element: <Exit />,
        },
      ],
    },
    {
      path: "/auth",
      element: <BlankLayout />,
      children: [
        {
          path: "/auth/login",
          element: <LoginPage />,
        },
        {
          path: "/auth/register",
          element: <RegisterPage />,
        },
      ],
    },
  ]);
}

export default Router;
