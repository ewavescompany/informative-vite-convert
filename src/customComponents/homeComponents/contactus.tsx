import { useTranslation } from "react-i18next";
import contactusimgurl from "../../public/contactimg.png";
import ContactusForm from "../contactusComponents/contactusForm";
import SlideComponent from "../reavelAnimation/slideComponent";

export default function ContactUs() {
  const { t } = useTranslation();

  return (
    <div className="grid relative min:max-h-[60vh] lg:grid-cols-2 grid-cols-1 w-full h-full px-0 sm:px-5 lg:px-8 lg:pb-14 pb-4 sm:pb-10 lg:gap-10 gap-5 ">
      <div className="flex flex-col gap-3 w-full h-full overflow-hidden">
        <h3 className="lg:text-6xl text-3xl font-medium capitalize text-grayblack ">
          <SlideComponent dir="down">
            {t("contactus.dont_hesitate")}
          </SlideComponent>
          <SlideComponent dir="up">{t("contactus.say_hi")}</SlideComponent>
        </h3>
        <ContactusForm />
      </div>
      <div className="w-full h-full  dotbg items-center justify-center overflow-hidden lg:flex hidden">
        <SlideComponent dir="right">
          <img
            src={contactusimgurl}
            alt="contact us image"
            className="w-full h-full"
          />
        </SlideComponent>
      </div>
    </div>
  );
}
