import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import DashboardLayout from "../layouts/dashboard-layout";
import { ProtectedRoute } from "../components/core/protected-routes";
import EditProductsPage from "@/pages/products/edit-products";
import EditCrust from "@/pages/crusts/edit-crusts";
import { Navigate } from "react-router-dom";
import { getUserAuthStatusFromPresistentStorage } from "@/utils";
import { PublicRoute } from "@/components/core/public-route";

// Lazy loading of pages
// auth pages
const LoginPage = lazy(() => import("@/pages/Login"));

// home page
const HomePage = lazy(() => import("@/pages/home"));

// products pages
const ProductsPage = lazy(() => import("@/pages/products/index"));
const AddProductsPage = lazy(() => import("@/pages/products/add-products"));

// crusts pages
const CrustLanding = lazy(() => import("@/pages/crusts/crustsLanding"));
const AddCrusts = lazy(() => import("@/pages/crusts/add-crusts"));

// sizes pages
const SizesPage = lazy(() => import("@/pages/sizes"));
const EditSizes = lazy(() => import("@/pages/sizes/edit-sizes")); 
const AddSizes = lazy(() => import("@/pages/sizes/add-sizes"));

// bottom (footer) links
const SettingsPage = lazy(() => import("@/pages/settings"));
const UsersPage = lazy(() => import("@/pages/users"));

const getHomeRoute = () => {
  const { isAuthenticated } = getUserAuthStatusFromPresistentStorage();
  if (!isAuthenticated) return "/auth/login";
  return "/home";
};

function Router() {
  const routes = useRoutes([
    {
      path: "/auth/login",
      element: (
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      ),
    },
    {
      path: "/",
      element: <Navigate to={getHomeRoute()} replace />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/home",
          element: <HomePage />,
        },
        {
          path: "/home/products",
          element: <ProductsPage />,
        },
        {
          path: "/home/products/add",
          element: <AddProductsPage />,
        },
        {
          path: "/home/products/edit/:id",
          element: <EditProductsPage />,
        },
        {
          path: "/home/crusts",
          element: <CrustLanding />,
        },
        {
          path: "/home/crusts/add",
          element: <AddCrusts />,
        },
        {
          path: "/home/crusts/edit/:id",
          element: <EditCrust />,
        },
        {
          path: "/home/sizes",
          element: <SizesPage />,
        },
        {
          path: "/home/sizes/add",
          element: <AddSizes />,
        },
        {
          path: "/home/sizes/edit/:id",
          element: <EditSizes />,
        },
        {
          path: "/home/settings",
          element: <SettingsPage />,
        },
        {
          path: "/home/users",
          element: <UsersPage />,
        },
      ],
    },
  ]);

  return routes;
}

export default Router;
