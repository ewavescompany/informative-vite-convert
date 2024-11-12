// src/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./pages/admin/layout";
import DashboardMain from "./pages/admin/page";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Client Routes */}
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<DashboardMain />} />
        {/* <Route path="/about" element={<AboutPage />} /> */}
      </Route>

      {/* Dashboard Routes */}
      {/* <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/dashboard/settings" element={<DashboardSettings />} />
      </Route> */}
    </Routes>
  );
}
