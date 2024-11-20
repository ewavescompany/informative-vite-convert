import React from "react";
import {
  Home,
  Layers3,
  Lightbulb,
  Package2,
  Newspaper,
  Fingerprint,
  Eye,
  Signature,
  Users,
  ShieldCheck,
  Menu,
  Mails,
  Settings,
} from "lucide-react";
import { SidebarLink } from "../links/sidebarLink";
import { DropdownNavItem } from "@/customComponents/layoutComponents/dropdownNavItem";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Assuming you're using ShadCN's Sheet component
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { pageAdmin } from "@/data/admin/pagesURLs";

const SidebarSheet: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Button to toggle the sheet (for mobile view) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        {/* The actual sheet content for the navigation menu */}
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link to={`/`} className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span>Acme Inc</span>
            </Link>
            <DropdownNavItem
              icon={Home}
              label={t("sidebar.home")}
              items={[
                {
                  href: pageAdmin.home.logo, // Use locale from cookies
                  label: t("sidebar.stats_section"),
                },
                {
                  // href: `/${locale}/admin/dashboard/video-section`, // Use locale from cookies
                  href: pageAdmin.home.video, // Use locale from cookies
                  label: t("sidebar.video_section"),
                },
                {
                  // href: `/${locale}/admin/dashboard/stats-section`, // Use locale from cookies
                  href: pageAdmin.home.stats, // Use locale from cookies
                  label: t("sidebar.stats_section"),
                },
              ]}
            />
            <DropdownNavItem
              icon={Newspaper}
              label={t("sidebar.blogs")}
              items={[
                {
                  // href: `/${locale}/admin/dashboard/blogs`,
                  href: pageAdmin.blogs.manage,
                  label: t("sidebar.show_blogs"),
                }, // Use locale from cookies
                {
                  // href: `/${locale}/admin/dashboard/blogs/add-blogs`, // Use locale from cookies
                  href: pageAdmin.blogs.add,
                  label: t("sidebar.add_blogs"),
                },
              ]}
            />
            <DropdownNavItem
              icon={Fingerprint}
              label={t("sidebar.portfolios")}
              items={[
                {
                  // href: `/${locale}/admin/dashboard/portfolio`, // Use locale from cookies
                  href: pageAdmin.portfolio.manage,
                  label: t("sidebar.show_portfolio"),
                },
                {
                  // href: `/${locale}/admin/dashboard/portfolio/add-portfolios`, // Use locale from cookies
                  href: pageAdmin.portfolio.add,
                  label: t("sidebar.add_portfolio"),
                },
              ]}
            />
            <DropdownNavItem
              icon={Layers3}
              label={t("sidebar.services")}
              items={[
                {
                  // href: `/${locale}/admin/dashboard/service`,
                  href: pageAdmin.services.manage,
                  label: t("sidebar.show_services"),
                }, // Use locale from cookies
                {
                  // href: `/${locale}/admin/dashboard/service/add-services`, // Use locale from cookies
                  href: pageAdmin.services.add,
                  label: t("sidebar.add_services"),
                },
              ]}
            />
            <DropdownNavItem
              icon={Users}
              label={t("sidebar.teams")}
              items={[
                {
                  // href: `/${locale}/admin/dashboard/team`,
                  href: pageAdmin.team.manage,
                  label: t("sidebar.show_team"),
                }, // Use locale from cookies
                {
                  // href: `/${locale}/admin/dashboard/team/add-teams`, // Use locale from cookies
                  href: pageAdmin.team.add,
                  label: t("sidebar.add_teams"),
                },
              ]}
            />
            <DropdownNavItem
              icon={ShieldCheck}
              label={t("sidebar.testimonials")}
              items={[
                {
                  // href: `/${locale}/admin/dashboard/testimonials`, // Use locale from cookies
                  href: pageAdmin.testimonials.manage,
                  label: t("sidebar.show_testimonials"),
                },
                {
                  // href: `/${locale}/admin/dashboard/testimonials/add-testimonial`, // Use locale from cookies
                  href: pageAdmin.testimonials.add,
                  label: t("sidebar.add_testimonials"),
                },
              ]}
            />
            <SidebarLink
              // href={`/${locale}/admin/dashboard/about-us`} // Use locale from cookies
              href={pageAdmin.about_us.main}
              icon={Signature}
              label={t("sidebar.about_us")}
            />
            <SidebarLink
              // href={`/${locale}/admin/dashboard/mission`}
              href={pageAdmin.mission.main}
              icon={Lightbulb}
              label={t("sidebar.mission")}
            />
            {/* Use locale from cookies */}
            <SidebarLink
              // href={`/${locale}/admin/dashboard/vission`}
              href={pageAdmin.vision.main}
              icon={Eye}
              label={t("sidebar.vision")}
            />
            {/* Use locale from cookies */}
            <SidebarLink
              // href={`/${locale}/admin/dashboard/contact-messages`}
              href={pageAdmin.contacts_messages.main}
              icon={Mails}
              label={t("sidebar.contact_message")}
            />
            {/* Use locale from cookies */}
            <SidebarLink
              // href={`/${locale}/admin/dashboard/settings`} // Use locale from cookies
              href={pageAdmin.settings.main}
              icon={Settings}
              label={t("sidebar.settings")}
            />
          </nav>
        </SheetContent>
      </Sheet>

      {/* Static sidebar for larger screens */}
    </>
  );
};

export default SidebarSheet;
