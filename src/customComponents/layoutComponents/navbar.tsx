"use client";
import { useEffect, useState } from "react";
import { Facebook, Youtube, Twitter, Instagram } from "lucide-react";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Navbar({ logo }: { logo: string }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const locale = i18n.language;
  const { t } = useTranslation();

  // Function to handle scroll event
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  // Add scroll event listener on mount and cleanup on unmount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`w-full h-fit min-h-20 px-8 sm:px-20 flex flex-row items-center text-graywhite gap-10 fixed transition-all duration-300 z-50 shadow-md ${
        scrollPosition > 50 ? "bg-grayblack" : "bg-grayblack/50"
      }`}
    >
      <div className="p-1 w-48 h-20">
        <Link to={"/"}>
          {logo ? (
            <img
              src={logo}
              alt="Company Logo"
              className="max-w-48 max-h-24 h-full w-full object-cover"
            />
          ) : (
            <h2 className="text-white font-semibold text-xl">Company Logo</h2>
          )}
        </Link>
      </div>
      {/* Navigation Links */}
      <div className="flex flex-row gap-4 ">
        <Link to={"/"} className="text-base font-semibold">
          {t("navbar.home")}
        </Link>
        {/* <Link
          href={`/${locale}/client/about-us`}
          className="text-base font-semibold"
        >
          {t("navbar.about_us")}
        </Link> */}
        <Link
          to={`/${locale}/client/services`}
          className="text-base font-semibold"
        >
          {t("navbar.services")}
        </Link>
        <Link
          to={`/${locale}/client/portfolio`}
          className="text-base font-semibold"
        >
          {t("navbar.portfolio")}
        </Link>
        <Link
          to={`/${locale}/client/blogs`}
          className="text-base font-semibold"
        >
          {t("navbar.blogs")}
        </Link>
        <Link
          to={`/${locale}/client/contact-us`}
          className="text-base font-semibold"
        >
          {t("navbar.contact_us")}
        </Link>
      </div>
      <div
        className={`w-fit flex flex-row gap-3 ${
          locale === "en" ? "flex-row ml-auto" : "flex-row-reverse mr-auto"
        }`}
      >
        <Link to={"/home"} className="lg:text-lg text-base text-graywhite">
          <Facebook size={20} />
        </Link>
        <Link to={"/home"} className="lg:text-lg text-base text-graywhite">
          <Youtube size={20} />
        </Link>
        <Link to={"/home"} className="lg:text-lg text-base text-graywhite">
          <Twitter size={20} />
        </Link>
        <Link to={"/home"} className="lg:text-lg text-base text-graywhite">
          <Instagram size={20} />
        </Link>
      </div>
    </div>
  );
}
