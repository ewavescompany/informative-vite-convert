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
  Mails,
  Settings,
  Handshake,
  MonitorCog,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SidebarLink } from "./sidebarLink";
import { DropdownNavItem } from "./dropdownNavItem";
import "@/i18n";
import { useTranslation } from "react-i18next";
import { pageAdmin } from "@/data/admin/pagesURLs";

const Sidebar: React.FC = () => {
  // Read the locale from cookies (stored in 'locale')
  // const locale = Cookies.get("NEXT_LOCALE") || "en"; // Default to 'en' if no locale is found
  const { t } = useTranslation();

  return (
    <div className="hidden border-r bg-muted/40 md:block ">
      <div className="flex h-full max-h-screen min-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            to={pageAdmin.home.video}
            className="flex items-center gap-2 font-semibold"
          >
            <Package2 className="h-6 w-6" />
            <span>{t("sidebar.company_name")}</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 text-muted-foreground transition-all hover:text-primary">
            <DropdownNavItem
              icon={Home}
              label={t("sidebar.home")}
              items={[
                {
                  // href: `/${locale}/admin/dashboard/nav-logo`, // Use locale from cookies
                  href: pageAdmin.home.logo, // Use locale from cookies
                  label: t("sidebar.nav_logo"),
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
                  // href: `/${locale}/admin/dashboard/team/add-team`, // Use locale from cookies
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
            <DropdownNavItem
              icon={Handshake}
              label={t("sidebar.partners")}
              items={[
                {
                  href: pageAdmin.partners.main,
                  label: t("sidebar.partner_title"),
                },
                {
                  href: pageAdmin.partners.add,
                  label: t("sidebar.add_partner"),
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
              href={pageAdmin.vision.main}
              icon={Eye}
              label={t("sidebar.vision")}
            />
            {/* Use locale from cookies */}
            <SidebarLink
              href={pageAdmin.contacts_messages.main}
              icon={Mails}
              label={t("sidebar.contact_message")}
            />
            {/* Use locale from cookies */}
            <SidebarLink
              href={pageAdmin.seo_manage.main}
              icon={MonitorCog}
              label={t("sidebar.seo_manage")}
            />
            <SidebarLink
              href={pageAdmin.settings.main}
              icon={Settings}
              label={t("sidebar.settings")}
            />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
