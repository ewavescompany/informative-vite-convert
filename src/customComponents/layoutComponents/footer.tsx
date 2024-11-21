import {
  Facebook,
  Youtube,
  Twitter,
  Instagram,
  Route,
  Share2,
  Send,
  MailCheck,
} from "lucide-react";
import { FaSnapchat } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { pageClient } from "@/data/client/pagesURLs";
import { settings } from "@/interfaces/dashboardInterface";

function Footer({ dataSetting }: { dataSetting: settings }) {
  const { t } = useTranslation();

  return (
    <div className="w-full relative min-h-[60px] bg-grayblack px-6 md:px-8 md:pb-20 sm:px-20 py-9 sm:py-10 grid gap-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 dotbg z-50">
      <img
        className="w-full h-full absolute object-cover top-0 bottom-0 left-0 right-0"
        alt="mission"
        src="/Services-How-BG.webp"
      />
      <div className="flex flex-col gap-1 md:gap-3 relative z-10">
        <h4 className="mb-1 lg:text-3xl text-2xl text-zinc-300 font-medium flex flex-row items-center justify-center w-fit gap-3">
          <Route className="hidden md:inline" />
          <span>pages</span>
        </h4>

        <div className="flex md:flex-col flex-wrap md:flex-nowrap gap-2 md:gap-3">
          <Link
            to={"/"}
            className="lg:text-lg text-base text-graywhite font-medium"
          >
            {t("navbar.home")}
          </Link>

          {/* <Link
          className="lg:text-lg text-base text-graywhite font-medium"
          href={"/about-us"}
        >
          About us
        </Link> */}

          <Link
            to={pageClient.services}
            className="lg:text-lg text-base text-graywhite font-medium"
          >
            {t("navbar.services")}
          </Link>
          <Link
            to={pageClient.portfolio}
            className="lg:text-lg text-base text-graywhite font-medium"
          >
            {t("navbar.portfolio")}
          </Link>
          <Link
            to={pageClient.blogs}
            className="lg:text-lg text-base text-graywhite font-medium"
          >
            {t("navbar.blogs")}
          </Link>
          <Link
            to={pageClient.contact_us}
            className="lg:text-lg text-base text-graywhite font-medium"
          >
            {t("navbar.contact_us")}
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-1 md:gap-3 relative z-10">
        <h4 className="mb-1 lg:text-3xl text-xl text-zinc-300 font-medium flex flex-row items-center justify-center w-fit gap-3">
          <Share2 className="hidden md:inline" />
          <span>Social media</span>
        </h4>

        <div className="flex md:flex-col flex-wrap md:flex-nowrap gap-2 md:gap-3">
          <Link
            className="lg:text-lg text-base text-graywhite font-medium flex flex-row gap-2 items-center justify-center w-fit border p-1 rounded-md md:border-0 md:p-0 md:rounded-none"
            to={dataSetting.social_facebook}
            target="_blank"
          >
            <Facebook size={20} />
            <span className="hidden md:inline">Facebook</span>
          </Link>

          <Link
            className="lg:text-lg text-base text-graywhite font-medium flex flex-row gap-2 items-center justify-center w-fit border p-1 rounded-md md:border-0 md:p-0 md:rounded-none"
            to={dataSetting.social_tiktok}
            target="_blank"
          >
            <Youtube size={20} />
            <span className="hidden md:inline">Youtube</span>
          </Link>
          <Link
            className="lg:text-lg text-base text-graywhite font-medium flex flex-row gap-2 items-center justify-center w-fit border p-1 rounded-md md:border-0 md:p-0 md:rounded-none"
            to={dataSetting.social_x}
            target="_blank"
          >
            <Twitter size={20} />
            <span className="hidden md:inline">Twitter</span>
          </Link>
          <Link
            className="lg:text-lg text-base text-graywhite font-medium flex flex-row gap-2 items-center justify-center w-fit border p-1 rounded-md md:border-0 md:p-0 md:rounded-none"
            to={dataSetting.social_insta}
            target="_blank"
          >
            <Instagram size={20} />
            <span className="hidden md:inline">Instagram</span>
          </Link>
          <Link
            className="lg:text-lg text-base text-graywhite font-medium flex flex-row gap-2 items-center justify-center w-fit border p-1 rounded-md md:border-0 md:p-0 md:rounded-none"
            to={dataSetting.social_snap}
            target="_blank"
          >
            <FaSnapchat size={20} />
            <span className="hidden md:inline">Snapchat</span>
          </Link>
          <Link
            className="lg:text-lg text-base text-graywhite font-medium flex flex-row gap-2 items-center justify-center w-fit border p-1 rounded-md md:border-0 md:p-0 md:rounded-none"
            to={dataSetting.social_tiktok}
            target="_blank"
          >
            <FaTiktok size={20} />
            <span className="hidden md:inline">Tiktok</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-2 md:gap-3 relative z-10">
        <h4 className="mb-1 lg:text-3xl text-xl text-zinc-300 font-medium flex flex-row items-center justify-center w-fit gap-3">
          <Send className="hidden md:inline" />
          <span>Contact us</span>
        </h4>
        <Link
          className="lg:text-lg text-base text-graywhite font-medium -mt-2"
          to={"mailto:example@gmail.com"}
        >
          Mail: example@gmail.com
        </Link>
        <Link
          className="lg:text-lg text-base text-graywhite font-medium -mt-2"
          to={"mailto:example@gmail.com"}
        >
          Phone: +19777
        </Link>
        <h4 className="lg:text-3xl md:text-xl text-graywhite font-medium flex flex-row items-center justify-center w-fit gap-3">
          <MailCheck />
          <span>Subscribe to our news letter</span>
        </h4>
        <div className="flex flex-row items-center md:flex-wrap gap-1 md:gap-3">
          <Input
            placeholder="example@mail.com"
            className="max-w-[300px] md:h-10 text-white text-lg"
          />
          <Button className="h-auto" variant={"secondary"}>
            subscribe
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
