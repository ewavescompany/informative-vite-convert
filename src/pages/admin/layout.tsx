import { Outlet } from "react-router-dom";
import Header from "./component/header";
import Sidebar from "./component/sidebar";
import { changeLanguage } from "i18next";
import { Button } from "@/components/ui/button";

export default function DashboardLayout() {
  return (
    <div className="grid min-h-screen h-full w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] antialiased font-[family-name:var(--font-geist-sans)]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Button type="button" onClick={() => changeLanguage("ar")}>
            change language to arabic
          </Button>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
