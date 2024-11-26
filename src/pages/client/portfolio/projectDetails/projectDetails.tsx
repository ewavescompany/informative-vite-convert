import PortfolioDescription from "@/customComponents/portfolioComponents/portfolioDescription";
import PortfolioGallary from "@/customComponents/portfolioComponents/portfolioGallary";
import PortfolioHeader from "@/customComponents/portfolioComponents/portfolioHeader";
import RelatedPortfolios from "@/customComponents/portfolioComponents/relatedPortfolios";
import { fetchPortfolioById } from "@/requests/generic/fetchPortfolioById";
import { fetchRelatedPortfolios } from "@/requests/generic/fetchRelatedPortfolios";
import { useEffect, useState } from "react";
import { Portfolio } from "@/interfaces/dashboardInterface";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { pageClient } from "@/data/client/pagesURLs";

export default function ProjectDetailsClientPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Portfolio | undefined>();
  const [relatedProjects, setRelatedProjects] = useState<
    Portfolio[] | undefined
  >([]);
  const { i18n } = useTranslation();
  const locale = i18n.language;

  useEffect(() => {
    if (id) {
      // Fetch portfolio data and related projects
      const fetchData = async () => {
        const [projectRes, relatedProjectsRes] = await Promise.all([
          fetchPortfolioById(id),
          fetchRelatedPortfolios(id),
        ]);
        setProject(projectRes);
        setRelatedProjects(relatedProjectsRes);
      };

      fetchData();
    }
  }, [id]);

  if (!project) return <div>Loading...</div>;

  // return <h1 className="h-[1000px]">hello i am here</h1>;

  return (
    <div className="min-h-screen w-full h-full flex flex-col gap-10 justify-center items-center">
      <Helmet>
        <title>{locale === "en" ? project.title_en : project.title_ar}</title>
        <meta
          name="description"
          content={
            locale === "en" ? project.description_en : project.description_ar
          }
        />
        <meta
          name="keywords"
          content={locale === "en" ? project.keywords_en : project.keywords_ar}
        />
        <link
          rel="canonical"
          href={`${pageClient.portfolio_details}/${project.id}`}
        />
      </Helmet>

      <PortfolioHeader
        titleEn={project.title_en || ""}
        titleAr={project.title_ar || ""}
        descriptionEn={project.description_en || ""}
        descriptionAr={project.description_ar || ""}
        image={project.image || ""}
      />
      <PortfolioDescription
        projectDate={project.created_at || ""}
        descriptionEn={project.content_en || ""}
        descriptionAr={project.content_ar || ""}
        client={project.client || ""}
        titleEn={project.title_en || ""}
        titleAr={project.title_ar || ""}
        projectLink={project.website_link || ""}
        projectStatus={project.status || ""}
      />
      <PortfolioGallary images={project.portfolio_images || []} />
      <RelatedPortfolios relatedProjects={relatedProjects} />
    </div>
  );
}
