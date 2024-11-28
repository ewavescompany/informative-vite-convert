import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import AboutusVideoSection from "@/customComponents/aboutUsComponent/aboutusVideoSection";
import MainBlogCard from "@/customComponents/blogComponents/mainBlogCard";
import { pageClient } from "@/data/client/pagesURLs";
import withMetaTags from "@/hocs/withMetaTags";
import { blogsInterface } from "@/interfaces/clientInterface";
import { getBlogs } from "@/requests/generic/getBlogs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function BlogClientPage() {
  const [blogsRes, setBlogsRes] = useState<blogsInterface[] | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getBlogs();
        setBlogsRes(res.data); // Assuming `getBlogs()` returns an object with `data`
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen w-full h-full flex flex-col gap-10">
      <AboutusVideoSection
        header={t("videoSection.blogs.header")}
        sub_header={t("videoSection.blogs.sub_header")}
        description={t("videoSection.blogs.description")}
      />
      <div className="w-full h-full px-8 sm:px-20 py-4 sm:py-10 md:py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center justify-center">
        {blogsRes?.map((blog, index) => (
          <MainBlogCard blog={blog} key={index} />
        ))}
      </div>
    </div>
  );
}

export default withMetaTags(
  BlogClientPage,
  `${clientBaseServerUrl}${serverUrls.seo}/blog-page`,
  pageClient.blogs
);
