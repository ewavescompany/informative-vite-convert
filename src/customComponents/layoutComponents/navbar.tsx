import { useEffect, useState } from "react";
import { Facebook, Youtube, Twitter, Instagram, Menu } from "lucide-react";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { pageClient } from "@/data/client/pagesURLs";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Navbar({ logo }: { logo: string }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

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
        className={`hidden w-full h-fit min-h-20 px-8 sm:px-20 md:flex flex-row items-center text-graywhite gap-10 fixed transition-all duration-300 z-50 shadow-md ${
          scrollPosition > 50 ? "bg-grayblack" : "bg-grayblack/50"
        }`}
      >
        <NavLogo logo={logo} className="p-1 w-48 h-20" />
        <NavLinks className="flex flex-row gap-4" />
        <NavSocialIcons
          size={20}
          className={`w-fit flex flex-row gap-3 ${
            locale === "en" ? "flex-row ml-auto" : "flex-row-reverse mr-auto"
          }`}
        />
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
              size={29}
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
  size,
}: {
  className: string;
  size?: number;
}) {
  return (
    <div className={className}>
      <Link to={"/home"} className="lg:text-lg text-base text-graywhite">
        <Facebook size={size || 20} />
      </Link>
      <Link to={"/home"} className="lg:text-lg text-base text-graywhite">
        <Youtube size={size || 20} />
      </Link>
      <Link to={"/home"} className="lg:text-lg text-base text-graywhite">
        <Twitter size={size || 20} />
      </Link>
      <Link to={"/home"} className="lg:text-lg text-base text-graywhite">
        <Instagram size={size || 20} />
      </Link>
    </div>
  );
}
