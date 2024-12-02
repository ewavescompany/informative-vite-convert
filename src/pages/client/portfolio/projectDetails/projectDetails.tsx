import PortfolioDescription from "@/customComponents/portfolioComponents/portfolioDescription";
import PortfolioGallary from "@/customComponents/portfolioComponents/portfolioGallary";
import PortfolioHeader from "@/customComponents/portfolioComponents/portfolioHeader";
import RelatedPortfolios from "@/customComponents/portfolioComponents/relatedPortfolios";
import { fetchPortfolioById } from "@/requests/generic/fetchPortfolioById";
import { fetchRelatedPortfolios } from "@/requests/generic/fetchRelatedPortfolios";
import { useEffect, useState } from "react";
import { Portfolio } from "@/interfaces/dashboardInterface";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { pageClient } from "@/data/client/pagesURLs";
import { Button } from "@/components/ui/button";

export default function ProjectDetailsClientPage() {
  const { id } = useParams();
  const [project, setProject] = useState<
    Portfolio | undefined | "bad input!"
  >();
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

  if (!project || project === "bad input!") {
    return (
      <div className="flex justify-center items-center flex-col gap-8 pt-16 md:pt-28">
        <div className="flex flex-col gap-4 items-center justify-center md:h-[40vh]">
          <p className="text-5xl font-bold text-muted-foreground">404</p>
          <h1 className="text-xl md:text-2xl font-semibold">
            {locale === "en"
              ? "There is no project with this title"
              : "لا يوجد مشروع بهذا العنوان"}
          </h1>
          <Link to={pageClient.portfolio}>
            <Button className="bg-stone-500 text-lg">
              {locale === "en"
                ? "Go to main project page"
                : "اذهب الي صفحة المشاريع الاساسية"}
            </Button>
          </Link>
        </div>
        <div className="mx-4">
          <RelatedPortfolios relatedProjects={relatedProjects} />
        </div>
      </div>
    );
  }

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
