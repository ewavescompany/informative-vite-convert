import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/pages/admin/layout";
import BlogsPage from "@/pages/admin/blogs/blogs";
import AddBlogsPage from "@/pages/admin/blogs/add-blogs/addBlogs";
import EditBlogPage from "@/pages/admin/blogs/edit-blogs/editBlog";
import { pageAdmin } from "@/data/admin/pagesURLs";
import PortfolioPage from "@/pages/admin/portfolio/portfolio";
import AddPortfoliosPage from "@/pages/admin/portfolio/add-portfolios/addPortfolios";
import EditPortfoliosPage from "@/pages/admin/portfolio/edit-portfolios/editPortfolios";
import ServicesPage from "@/pages/admin/service/services";
import AddServicesPage from "@/pages/admin/service/add-services/addServices";
import EditServicesPage from "@/pages/admin/service/edit-services/editServices";
import TeamPage from "@/pages/admin/team/team";
import AddTeamPage from "@/pages/admin/team/add-team/addTeam";
import EditTeamPage from "@/pages/admin/team/edit-team/editTeam";
import TestimonialsPage from "@/pages/admin/testimonials/testimonials";
import AddTestimonialsPage from "@/pages/admin/testimonials/add-testimonial/addTestimonial";
import EditTestimonialsPage from "@/pages/admin/testimonials/edit-testimonial/editTestimonial";
import AboutUsPage from "@/pages/admin/about-us/aboutUs";
import MissionPage from "@/pages/admin/mission/mission";
import ContactMessagesPage from "@/pages/admin/contact-messages/contactMessages";
import VisionPage from "@/pages/admin/vision/vision";
import SettingsPage from "@/pages/admin/settings/settings";
import ClientLayout from "./pages/client/layout";
import { pageClient } from "./data/client/pagesURLs";
import ClientPage from "./pages/client/page";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ADMIN ROUTES */}
      <Route element={<DashboardLayout />}>
        {/* BLOGS */}
        <Route path={pageAdmin.blogs.manage} element={<BlogsPage />} />
        <Route path={pageAdmin.blogs.add} element={<AddBlogsPage />} />
        <Route path={pageAdmin.blogs.edit} element={<EditBlogPage />} />

        {/* PORTFOLIOS */}
        <Route path={pageAdmin.portfolio.manage} element={<PortfolioPage />} />
        <Route path={pageAdmin.portfolio.add} element={<AddPortfoliosPage />} />
        <Route
          path={pageAdmin.portfolio.edit}
          element={<EditPortfoliosPage />}
        />

        {/* SERVICES */}
        <Route path={pageAdmin.services.manage} element={<ServicesPage />} />
        <Route path={pageAdmin.services.add} element={<AddServicesPage />} />
        <Route path={pageAdmin.services.edit} element={<EditServicesPage />} />

        {/* TEAM */}
        <Route path={pageAdmin.team.manage} element={<TeamPage />} />
        <Route path={pageAdmin.team.add} element={<AddTeamPage />} />
        <Route path={pageAdmin.team.edit} element={<EditTeamPage />} />

        {/* TESTIMONIAL */}
        <Route
          path={pageAdmin.testimonials.manage}
          element={<TestimonialsPage />}
        />
        <Route
          path={pageAdmin.testimonials.add}
          element={<AddTestimonialsPage />}
        />
        <Route
          path={pageAdmin.testimonials.edit}
          element={<EditTestimonialsPage />}
        />

        {/* ABOUT_US */}
        <Route path={pageAdmin.about_us.main} element={<AboutUsPage />} />

        {/* MISSION */}
        <Route path={pageAdmin.mission.main} element={<MissionPage />} />

        {/* CONTACTS_MESSAGES */}
        <Route
          path={pageAdmin.contacts_messages.main}
          element={<ContactMessagesPage />}
        />

        {/* VISION */}
        <Route path={pageAdmin.vision.main} element={<VisionPage />} />

        {/* SETTINGS */}
        <Route path={pageAdmin.settings.main} element={<SettingsPage />} />
      </Route>

      {/* CLIENT ROUTES */}
      <Route element={<ClientLayout />}>
        <Route path={pageClient.main} element={<ClientPage />} />
      </Route>
    </Routes>
  );
}
