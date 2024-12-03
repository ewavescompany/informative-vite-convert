import { blogsInterface } from "@/interfaces/clientInterface";
import { imagesPath } from "@/constants/urls";
// import { formatDateForPortfolio } from "@/utility/generic";
import { Link } from "react-router-dom";
import { pageClient } from "@/data/client/pagesURLs";
import { useTranslation } from "react-i18next";

function MainBlogCard({ blog }: { blog: blogsInterface }) {
  const { i18n } = useTranslation();
  const locale = i18n.language;
  const blogTitle = locale === "en" ? blog.title_en : blog.title_ar;
  const blogDescription =
    locale === "en" ? blog.description_en : blog.description_ar;
  const blogTag = locale === "en" ? blog.tags_en : blog.tags_ar;
  const blogTagFormate = blogTag?.split(", ").slice(0, 2).join(", ");

  return (
    <div className="">
      <div className="aspect-video rounded-lg overflow-hidden">
        <Link to={`${pageClient.blog_details}/${blog.id}`}>
          <img
            src={`${imagesPath}blogs/${blog.image}`}
            alt="blog img"
            className="hover:scale-125 duration-500 object-cover w-full h-full"
          />
        </Link>
      </div>

      <div className="">
        <span className="text-gray-500 uppercase font-medium text-xs whitespace-normal">
          {blogTagFormate}
        </span>
        <h3 className="text-grayblack text-lg lg:text-2xl font-bold">
          {blogTitle}
        </h3>
        {/* <div className="w-fit flex flex-row gap-5 items-center justify-center font-medium">
          <h5>{formatDateForPortfolio(blog.created_at)}</h5>
        </div> */}
        <p className="text-gray-500 line-clamp-3 text-xs md:text-sm">
          {`${blogDescription.slice(0, 100)} ${
            blogDescription.length > 100 ? "...." : ""
          }`}
        </p>
      </div>
    </div>
  );
}

export default MainBlogCard;
