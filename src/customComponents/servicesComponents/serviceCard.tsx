import { ArrowUpRight } from "lucide-react";
import img1 from "../../../../public/services/service1.jpg";
import { Link } from "react-router-dom";
import { pageClient } from "@/data/client/pagesURLs";

function ServiceCard() {
  return (
    <div className="w-full h-full  text-graywhite flex flex-col justify-between rounded-2xl relative group overflow-hidden aspect-video md:p-4 p-2">
      <img
        className="absolute inset-0 saturate-100 lg:saturate-0 md:group-hover:saturate-100 group-hover:scale-110 transition-all duration-500"
        src={img1}
        alt="service1"
      />
      <Link
        className="ml-auto w-fit z-10 relative hover:scale-150 duration-500"
        to={pageClient.services}
      >
        <ArrowUpRight size={38} className=" text-graywhite" />
      </Link>
      <div className="w-full h-fit flex flex-col relative z-10 gap-2">
        <h3 className="text-graywhite lg:text-4xl text-2xl font-medium">
          Connect
        </h3>
        <p className="w-full h-full text-graywhite lg:text-xl md:text-lg text-sm relative z-10 font-medium">
          In the digital age, Search Engine Optimization (SEO) has become a
          vital component for any business looking to establish a strong online
          presence.
        </p>
      </div>
    </div>
  );
}

export default ServiceCard;
