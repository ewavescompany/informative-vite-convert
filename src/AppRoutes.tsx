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
import ClientLayout from "@/pages/client/layout";
import { pageClient } from "@/data/client/pagesURLs";
import ClientPage from "@/pages/client/page";
import BlogClientPage from "@/pages/client/blogs/blogs";
import ContactUsClientPage from "./pages/client/contact-us/page";
import ServicesClientPage from "./pages/client/services/services";
import AboutUsClientPage from "./pages/client/about-us/page";
import PortfolioClientPage from "./pages/client/portfolio/portfolio";
import LoginPage from "./pages/admin/login/page";
import NavLogoPage from "./pages/admin/home/nav-logo/navLogoPage";
import StatsSection from "./pages/admin/home/stats-section/statsSection";
import VideoSection from "./pages/admin/home/video-section/videoSection";
import BlogDetailsClientPage from "./pages/client/blogs/blog_id/blogDetails";
import ProjectDetailsClientPage from "./pages/client/portfolio/projectDetails/projectDetails";
import PartnersPage from "./pages/admin/partners/partners";
import AddPartnerPage from "./pages/admin/partners/add/addPartner";
import EditPartnerPage from "./pages/admin/partners/edit/editPartner";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ADMIN ROUTES */}

      {/* LOGIN */}
      <Route path={pageAdmin.login} element={<LoginPage />} />

      <Route element={<DashboardLayout />}>
        {/* BLOGS */}
        <Route path={pageAdmin.home.video} element={<VideoSection />} />
        <Route path={pageAdmin.home.stats} element={<StatsSection />} />
        <Route path={pageAdmin.home.logo} element={<NavLogoPage />} />

        {/* BLOGS */}
        <Route path={pageAdmin.blogs.manage} element={<BlogsPage />} />
        <Route path={pageAdmin.blogs.add} element={<AddBlogsPage />} />
        <Route
          path={pageAdmin.blogs.edit + "/:id"}
          element={<EditBlogPage />}
        />

        {/* PORTFOLIOS */}
        <Route path={pageAdmin.portfolio.manage} element={<PortfolioPage />} />
        <Route path={pageAdmin.portfolio.add} element={<AddPortfoliosPage />} />
        <Route
          path={pageAdmin.portfolio.edit + "/:id"}
          element={<EditPortfoliosPage />}
        />

        {/* SERVICES */}
        <Route path={pageAdmin.services.manage} element={<ServicesPage />} />
        <Route path={pageAdmin.services.add} element={<AddServicesPage />} />
        <Route
          path={pageAdmin.services.edit + "/:id"}
          element={<EditServicesPage />}
        />

        {/* TEAM */}
        <Route path={pageAdmin.team.manage} element={<TeamPage />} />
        <Route path={pageAdmin.team.add} element={<AddTeamPage />} />
        <Route path={pageAdmin.team.edit + "/:id"} element={<EditTeamPage />} />

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
          path={pageAdmin.testimonials.edit + "/:id"}
          element={<EditTestimonialsPage />}
        />

        {/* ABOUT_US */}
        <Route path={pageAdmin.about_us.main} element={<AboutUsPage />} />

        {/* PARTNERS */}
        <Route path={pageAdmin.partners.main} element={<PartnersPage />} />
        <Route path={pageAdmin.partners.add} element={<AddPartnerPage />} />
        <Route
          path={pageAdmin.partners.edit + "/:id"}
          element={<EditPartnerPage />}
        />

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
        <Route path={pageClient.blogs} element={<BlogClientPage />} />
        <Route
          path={pageClient.blog_details + "/:id"}
          element={<BlogDetailsClientPage />}
        />
        <Route path={pageClient.contact_us} element={<ContactUsClientPage />} />
        <Route path={pageClient.portfolio} element={<PortfolioClientPage />} />
        <Route
          path={pageClient.portfolio_details + "/:id"}
          element={<ProjectDetailsClientPage />}
        />
        <Route path={pageClient.services} element={<ServicesClientPage />} />
        <Route path={pageClient.about_us} element={<AboutUsClientPage />} />
      </Route>
    </Routes>
  );
}
