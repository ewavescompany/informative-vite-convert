import { Outlet } from "react-router-dom";
import Header from "./component/header";
import Sidebar from "./component/sidebar";

export default function DashboardLayout() {
  return (
    <div className="grid min-h-screen h-full w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] antialiased font-[family-name:var(--font-geist-sans)]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
