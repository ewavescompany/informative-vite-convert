import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import AboutusVideoSection from "@/customComponents/aboutUsComponent/aboutusVideoSection";
import MainBlogCard from "@/customComponents/blogComponents/mainBlogCard";
import { pageClient } from "@/data/client/pagesURLs";
import withMetaTags from "@/hocs/withMetaTags";
import { getBlogs } from "@/utills/api";
import { useQuery } from "@tanstack/react-query";
import Loading from "../loading";
import ErrorPage from "../error";

function BlogClientPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getBlogs"],
    queryFn: getBlogs,
  });

  if (isLoading) return <Loading />;

  if (isError) return <ErrorPage />;

  return (
    <div className="min-h-screen w-full h-full flex flex-col gap-10">
      <AboutusVideoSection
        title1="articles"
        title2="stories and news"
        descriptionEn="Discover a wealth of insightful materials meticulously crafted to provide you with a comprehensive understanding of the latest trends."
        descriptionAr="اكتشف كنز من المواد المهنية المصممة بعناية لتقديم لك معرفة كاملة عن أحدث الاتجاهات."
      />
      <div className="w-full h-full px-8 sm:px-20 py-4 sm:py-10 md:py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center justify-center">
        {data?.map((blog, index) => (
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
