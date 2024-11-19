import { useEffect, useState } from "react";
import AboutusVideoSection from "@/customComponents/aboutUsComponent/aboutusVideoSection";
import SimplePortfolioCard from "@/customComponents/portfolioComponents/simplePortfolioCard";
import { getPortfolios } from "@/requests/generic/getPortfolio";
import { Portfolio } from "@/interfaces/dashboardInterface";
import Loading from "../loading";

export default function PortfolioClientPage() {
  const [portfolioData, setPortfolioData] = useState<Portfolio[] | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const portfolioRes = await getPortfolios();
        portfolioRes?.length && setPortfolioData(portfolioRes);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen w-full h-full flex flex-col gap-10">
      <AboutusVideoSection
        title1="portfolio"
        title2=""
        descriptionEn="We guide game-changing companies, across platforms and places, through agile design and digital experience."
        descriptionAr="نحن نرشد الشركات التي تغير العالم، عبر الأنظمة والأماكن، من خلال تصميم متطور وتجربة رقمية متطورة."
      />
      <div className="w-full h-full px-8 sm:px-20 py-4 sm:py-10 md:py-24 flex flex-col gap-10 items-center justify-center">
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5">
          {portfolioData?.map((project, key) => (
            <SimplePortfolioCard project={project} key={key} />
          ))}
        </div>
      </div>
    </div>
  );
}
