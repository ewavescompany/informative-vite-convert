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
} from "lucide-react";
import { Link } from "react-router-dom";
import { SidebarLink } from "./sidebarLink";
import { DropdownNavItem } from "./dropdownNavItem";
import "@/i18n";
import { useTranslation } from "react-i18next";

const Sidebar: React.FC = () => {
  // Read the locale from cookies (stored in 'locale')
  // const locale = Cookies.get("NEXT_LOCALE") || "en"; // Default to 'en' if no locale is found
  const locale = "ar"; // Default to 'en' if no locale is found
  const { t } = useTranslation();

  return (
    <div className="hidden border-r bg-muted/40 md:block ">
      <div className="flex h-full max-h-screen min-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            to={`/${locale}`}
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
                  href: `/${locale}/admin/dashboard/video-section`, // Use locale from cookies
                  label: t("sidebar.video_section"),
                },
                {
                  href: `/${locale}/admin/dashboard/stats-section`, // Use locale from cookies
                  label: t("sidebar.stats_section"),
                },
                {
                  href: `/${locale}/admin/dashboard/nav-logo`, // Use locale from cookies
                  label: t("sidebar.nav_logo"),
                },
              ]}
            />
            <DropdownNavItem
              icon={Newspaper}
              label={t("sidebar.blogs")}
              items={[
                {
                  href: `/${locale}/admin/dashboard/blogs`,
                  label: t("sidebar.show_blogs"),
                }, // Use locale from cookies
                {
                  href: `/${locale}/admin/dashboard/blogs/add-blogs`, // Use locale from cookies
                  label: t("sidebar.add_blogs"),
                },
              ]}
            />
            <DropdownNavItem
              icon={Fingerprint}
              label={t("sidebar.portfolios")}
              items={[
                {
                  href: `/${locale}/admin/dashboard/portfolio`, // Use locale from cookies
                  label: t("sidebar.show_portfolio"),
                },
                {
                  href: `/${locale}/admin/dashboard/portfolio/add-portfolios`, // Use locale from cookies
                  label: t("sidebar.add_portfolio"),
                },
              ]}
            />
            <DropdownNavItem
              icon={Layers3}
              label={t("sidebar.services")}
              items={[
                {
                  href: `/${locale}/admin/dashboard/service`,
                  label: t("sidebar.show_services"),
                }, // Use locale from cookies
                {
                  href: `/${locale}/admin/dashboard/service/add-services`, // Use locale from cookies
                  label: t("sidebar.add_services"),
                },
              ]}
            />
            <DropdownNavItem
              icon={Users}
              label={t("sidebar.teams")}
              items={[
                {
                  href: `/${locale}/admin/dashboard/team`,
                  label: t("sidebar.show_team"),
                }, // Use locale from cookies
                {
                  href: `/${locale}/admin/dashboard/team/add-team`, // Use locale from cookies
                  label: t("sidebar.add_teams"),
                },
              ]}
            />
            <DropdownNavItem
              icon={ShieldCheck}
              label={t("sidebar.testimonials")}
              items={[
                {
                  href: `/${locale}/admin/dashboard/testimonials`, // Use locale from cookies
                  label: t("sidebar.show_testimonials"),
                },
                {
                  href: `/${locale}/admin/dashboard/testimonials/add-testimonial`, // Use locale from cookies
                  label: t("sidebar.add_testimonials"),
                },
              ]}
            />
            <SidebarLink
              href={`/${locale}/admin/dashboard/about-us`} // Use locale from cookies
              icon={Signature}
              label={t("sidebar.about_us")}
            />
            <SidebarLink
              href={`/${locale}/admin/dashboard/mission`}
              icon={Lightbulb}
              label={t("sidebar.mission")}
            />
            {/* Use locale from cookies */}
            <SidebarLink
              href={`/${locale}/admin/dashboard/vission`}
              icon={Eye}
              label={t("sidebar.vision")}
            />
            {/* Use locale from cookies */}
            <SidebarLink
              href={`/${locale}/admin/dashboard/contact-messages`}
              icon={Mails}
              label={t("sidebar.contact_message")}
            />
            {/* Use locale from cookies */}
            <SidebarLink
              href={`/${locale}/admin/dashboard/settings`} // Use locale from cookies
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
