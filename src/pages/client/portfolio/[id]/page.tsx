import PortfolioDescription from "@/customComponents/portfolioComponents/portfolioDescription";
import PortfolioGallary from "@/customComponents/portfolioComponents/portfolioGallary";
import PortfolioHeader from "@/customComponents/portfolioComponents/portfolioHeader";
import RelatedPortfolios from "@/customComponents/portfolioComponents/relatedPortfolios";
import { fetchPortfolioById } from "@/requests/generic/fetchPortfolioById";
import { fetchRelatedPortfolios } from "@/requests/generic/fetchRelatedPortfolios";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Portfolio } from "@/interfaces/dashboardInterface";

type PortfolioImages = {
  id: number;
  image: string;
  portfolio_id: number;
};

type Project =
  | {
      id: number;
      client: string;
      title_ar: string;
      title_en: string;
      content_ar: string;
      content_en: string;
      description_ar: string;
      description_en: string;
      keywords_ar: string;
      keywords_en: string;
      status: string;
      start_date: string;
      end_date: string;
      image: string;
      website_link: string;
      created_at: string;
      updated_at: string;
      portfolio_images: PortfolioImages[];
    }
  | undefined;

function PortfolioPage({ id }: { id: string }) {
  const [project, setProject] = useState<Project>();
  const [relatedProjects, setRelatedProjects] = useState<
    Portfolio[] | undefined
  >([]);

  useEffect(() => {
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
  }, [id]);

  if (!project) return <div>Loading...</div>;

  return (
    <div className="min-h-screen w-full h-full flex flex-col gap-10 justify-center items-center">
      {/* Set dynamic metadata */}
      <Helmet>
        <title>{`${project.title_en} | eWaves Portfolio`}</title>
        <meta name="description" content={project.description_en} />
        <meta
          property="og:title"
          content={`${project.title_en} | eWaves Portfolio`}
        />
        <meta property="og:description" content={project.description_en} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${project.title_en} | eWaves Portfolio`}
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

export default PortfolioPage;
