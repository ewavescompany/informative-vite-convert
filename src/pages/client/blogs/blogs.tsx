import AboutusVideoSection from "@/customComponents/aboutUsComponent/aboutusVideoSection";
import MainBlogCard from "@/customComponents/blogComponents/mainBlogCard";
import { blogsInterface } from "@/interfaces/clientInterface";
import { getBlogs } from "@/requests/generic/getBlogs";
import { useEffect, useState } from "react";

export default function BlogClientPage() {
  const [blogsRes, setBlogsRes] = useState<blogsInterface[] | null>(null);

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
        title1="articles"
        title2="stories and news"
        descriptionEn="Discover a wealth of insightful materials meticulously crafted to provide you with a comprehensive understanding of the latest trends."
        descriptionAr="اكتشف كنز من المواد المهنية المصممة بعناية لتقديم لك معرفة كاملة عن أحدث الاتجاهات."
      />
      <div className="w-full h-full px-8 sm:px-20 py-4 sm:py-10 md:py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center justify-center">
        {blogsRes?.map((blog, index) => (
          <MainBlogCard blog={blog} key={index} />
        ))}
      </div>
    </div>
  );
}
