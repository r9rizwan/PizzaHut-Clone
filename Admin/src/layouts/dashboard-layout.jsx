import { Outlet } from "react-router-dom";
import Breadcrumbs from "../components/ui/breadcrumbs";
import {
  DashboardAppHeader,
  DashboardSidebar,
} from "@/components/core/layouts";
import { Suspense } from "react";
import { PageLoader } from "@/components/ui/loaders";
import { useAlert } from "@/utils/hooks/use-alert";
import { Alert } from "@/components/ui/alert";

const MainContent = () => {
  const { alert } = useAlert();
  return (
    <main className="ms-[18rem] flex-grow px-8 bg-background text-foreground">
      <DashboardAppHeader />
      <Breadcrumbs />
      <Alert alert={alert} />
      <div className="mt-5 h-[calc(100vh-164px)]">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </div>
    </main>
  );
};

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <MainContent />
    </div>
  );
}
