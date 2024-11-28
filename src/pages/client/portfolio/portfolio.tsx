import { useEffect, useState } from "react";
import AboutusVideoSection from "@/customComponents/aboutUsComponent/aboutusVideoSection";
import SimplePortfolioCard from "@/customComponents/portfolioComponents/simplePortfolioCard";
import { getPortfolios } from "@/requests/generic/getPortfolio";
import { Portfolio } from "@/interfaces/dashboardInterface";
import Loading from "../loading";
import withMetaTags from "@/hocs/withMetaTags";
import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import { pageClient } from "@/data/client/pagesURLs";
import { useTranslation } from "react-i18next";

function PortfolioClientPage() {
  const [portfolioData, setPortfolioData] = useState<Portfolio[] | undefined>();
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

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
        header={t("videoSection.portfolio.header")}
        sub_header={t("videoSection.portfolio.sub_header")}
        description={t("videoSection.portfolio.description")}
      />
      <div className="w-full h-full px-8 sm:px-20 py-4 sm:py-10 md:py-24 flex flex-col gap-10 items-center justify-center">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 gap-5">
          {portfolioData?.map((project, key) => (
            <SimplePortfolioCard project={project} key={key} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default withMetaTags(
  PortfolioClientPage,
  `${clientBaseServerUrl}${serverUrls.seo}/portfolio-page`,
  pageClient.portfolio
);
