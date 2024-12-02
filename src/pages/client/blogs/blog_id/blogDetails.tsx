import { Button } from "@/components/ui/button";
import BlogHeader from "@/customComponents/blogComponents/blogHeader";
import RelatedBlogs from "@/customComponents/blogComponents/relatedBlogs";
import { pageClient } from "@/data/client/pagesURLs";
import { blogsInterface } from "@/interfaces/clientInterface";
import { fetchBlogById } from "@/requests/generic/fetchBlogById";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

export default function BlogDetailsClientPage() {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [blogData, setBlogData] = useState<blogsInterface | undefined>();

  useEffect(() => {
    async function getBlogsData() {
      if (id) {
        try {
          const res = await fetchBlogById(id);
          setBlogData(res);
        } catch (error) {
          console.log(error);
        }
      }
    }
    getBlogsData();
  }, []);

  if (!id) {
    return (
      <div>
        <h1>There is no blog in that id</h1>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="min-h-screen flex justify-center items-center flex-col gap-4">
        <p className="text-3xl md:text-5xl font-bold text-muted-foreground">
          404
        </p>
        <h1 className="text-xl md:text-2xl font-semibold">
          {lang === "en"
            ? "There is no blog with this title"
            : "لا يوجد مدونة بهذا العنوان"}
        </h1>
        <Link to={pageClient.blogs}>
          <Button className="bg-stone-500 text-lg">
            {lang === "en" ? "Go to Blogs page" : "اذهب الي المدونة الاساسية"}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{lang === "en" ? blogData.title_en : blogData.title_ar}</title>
        <meta
          name="description"
          content={
            lang === "en" ? blogData.description_en : blogData.description_ar
          }
        />
        <meta
          name="keywords"
          content={lang === "en" ? blogData.keywords_en : blogData.keywords_ar}
        />
        <link rel="canonical" href={pageClient.blog_details} />
      </Helmet>

      <div className="min-h-screen w-full h-full flex flex-col gap-10 pt-20 bg">
        <div className="w-full h-full px-8 sm:px-20 py-4 sm:py-10 md:py-24 flex flex-col gap-10 items-center justify-center ">
          <div className="w-full h-full flex flex-col gap-10 xl:max-w-5xl lg:max-w-3xl max-w-full">
            <BlogHeader blog={blogData} />
            <RelatedBlogs />
          </div>
        </div>
      </div>
    </>
  );
}
