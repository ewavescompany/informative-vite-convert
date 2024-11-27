import { useEffect, useState } from "react";
import { Facebook, Youtube, Twitter, Instagram, Menu } from "lucide-react";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { pageClient } from "@/data/client/pagesURLs";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { changeLanguage } from "i18next";
import { settings } from "@/interfaces/dashboardInterface";

const savedLanguage =
  localStorage.getItem("i18nextLng") || i18n.language || "en";

export default function Navbar({
  logo,
  dataSetting,
}: {
  logo: string;
  dataSetting: settings;
}) {
  const [currentLang, setCurrentLang] = useState<"en" | "ar">(
    savedLanguage as "ar" | "en"
  );
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  function handleChangeLang(lang: "ar" | "en") {
    setCurrentLang(lang);
    changeLanguage(lang);
  }

  const locale = i18n.language;

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
    <>
      <div
        className={`hidden w-full h-fit min-h-20 px-8 md:px-4 lg:px-8 sm:px-20 md:flex flex-row items-center text-graywhite gap-10 fixed transition-all duration-300 z-50 shadow-md ${
          scrollPosition > 50 ? "bg-grayblack" : "bg-grayblack/50"
        }`}
      >
        <NavLogo logo={logo} className="p-1 w-48 h-20" />
        <NavLinks className="flex flex-row gap-4" />

        <div
          className={`w-fit flex flex-row gap-5 items-center ${
            locale === "en" ? "flex-row ml-auto" : "flex-row mr-auto"
          }`}
        >
          <Select
            value={currentLang}
            onValueChange={(value: "ar" | "en") => handleChangeLang(value)}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* <div className="border h-9 rounded-md flex items-center px-4"> */}
          <NavSocialIcons
            dataSetting={dataSetting}
            className="w-fit flex flex-row gap-2"
          />
          {/* </div> */}
        </div>
      </div>

      <Button
        size="icon"
        variant="secondary"
        className="md:hidden absolute top-2 right-2 z-50"
        onClick={() => setIsSheetOpen(true)}
      >
        <Menu size="20" />
      </Button>

      <div className="md:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent
            className="dark"
            style={{
              display: "grid",
              gridTemplateRows: "auto 1fr auto",
            }}
          >
            <SheetHeader>
              <NavLogo
                logo={logo}
                className="w-full h-20 p-4 overflow-hidden"
              />
            </SheetHeader>
            <NavLinks className="py-2 text-white flex flex-col items-center gap-4 text-xl" />
            <NavSocialIcons
              dataSetting={dataSetting}
              className={`w-full justify-center flex flex-row gap-4 ${
                locale === "en" ? "flex-row" : "flex-row-reverse"
              }`}
            />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

function NavLogo({ logo, className }: { logo: string; className: string }) {
  return (
    <div className={className}>
      <Link to={"/"}>
        {logo ? (
          <img
            src={logo}
            alt="Company Logo"
            className="md:max-w-48 md:max-h-24 h-full w-full object-cover"
          />
        ) : (
          <h2 className="text-white font-semibold text-xl">Company Logo</h2>
        )}
      </Link>
    </div>
  );
}

function NavLinks({ className }: { className: string }) {
  const { t } = useTranslation();

  return (
    <div className={className}>
      <Link to={"/"} className="md:text-base font-semibold">
        {t("navbar.home")}
      </Link>
      {/* <Link
          href={`/${locale}/client/about-us`}
          className="text-base font-semibold"
        >
          {t("navbar.about_us")}
        </Link> */}
      <Link
        // to={`/${locale}/client/services`}
        to={pageClient.services}
        className="md:text-base font-semibold"
      >
        {t("navbar.services")}
      </Link>
      <Link
        // to={`/${locale}/client/portfolio`}
        to={pageClient.portfolio}
        className="md:text-base font-semibold"
      >
        {t("navbar.portfolio")}
      </Link>
      <Link
        // to={`/${locale}/client/blogs`}
        to={pageClient.blogs}
        className="md:text-base font-semibold"
      >
        {t("navbar.blogs")}
      </Link>
      <Link
        // to={`/${locale}/client/contact-us`}
        to={pageClient.contact_us}
        className="md:text-base font-semibold"
      >
        {t("navbar.contact_us")}
      </Link>
    </div>
  );
}

function NavSocialIcons({
  className,
  dataSetting,
}: {
  className: string;
  dataSetting: settings;
}) {
  // const [navLinksData, setNavLinksData] = useState();

  // useEffect(() => {
  //   async function getSettingsData() {
  //     try {
  //       const res = await fetchSettings();
  //       console.log(res);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getSettingsData();
  // }, []);

  return (
    <div className={className}>
      <Link
        to={dataSetting.social_facebook}
        target="_blank"
        className="lg:text-lg text-base text-graywhite md:border md:rounded-md md:py-1 md:px-2"
      >
        <Facebook className="w-7 md:w-5" />
      </Link>
      <Link
        to={dataSetting.social_tiktok}
        target="_blank"
        className="lg:text-lg text-base text-graywhite md:border md:rounded-md md:py-1 md:px-2"
      >
        <Youtube className="w-7 md:w-5" />
      </Link>
      <Link
        to={dataSetting.social_x}
        target="_blank"
        className="lg:text-lg text-base text-graywhite md:border md:rounded-md md:py-1 md:px-2"
      >
        <Twitter className="w-7 md:w-5" />
      </Link>
      <Link
        to={dataSetting.social_insta}
        target="_blank"
        className="lg:text-lg text-base text-graywhite md:border md:rounded-md md:py-1 md:px-2"
      >
        <Instagram className="w-7 md:w-5" />
      </Link>
    </div>
  );
}
