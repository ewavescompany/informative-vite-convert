import BlogHeader from "@/customComponents/blogComponents/blogHeader";
import RelatedBlogs from "@/customComponents/blogComponents/relatedBlogs";
import { blogsInterface } from "@/interfaces/clientInterface";
import { fetchBlogById } from "@/requests/generic/fetchBlogById";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BlogDetailsClientPage() {
  const { id } = useParams();

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
    return null;
  }

  return (
    <div className="min-h-screen w-full h-full flex flex-col gap-10 pt-20 bg">
      <div className="w-full h-full px-8 sm:px-20 py-4 sm:py-10 md:py-24 flex flex-col gap-10 items-center justify-center ">
        <div className="w-full h-full flex flex-col gap-10 xl:max-w-5xl lg:max-w-3xl max-w-full">
          <BlogHeader blog={blogData} />
          <RelatedBlogs />
        </div>
      </div>
    </div>
  );
}
