import { blogsInterface } from "@/interfaces/clientInterface";
import { imagesPath } from "@/constants/urls";
import { formatDateForPortfolio } from "@/utility/generic";
import i18n from "@/i18n";
import { Link } from "react-router-dom";
import { pageClient } from "@/data/client/pagesURLs";

function MainBlogCard({ blog }: { blog: blogsInterface }) {
  const locale = i18n.language;
  const blogTitle = locale === "en" ? blog.title_en : blog.title_ar;
  const blogDescription =
    locale === "en" ? blog.description_en : blog.description_ar;

  return (
    <div className="w-full h-full grid grid-rows-1 gap-3 aspect-square">
      <div className="w-full h-full overflow-hidden rounded-2xl">
        <Link to={`${pageClient.blog_details}/${blog.id}`}>
          <img
            src={`${imagesPath}blogs/${blog.image}`}
            alt="blog img"
            className="hover:scale-125 duration-500 object-cover w-full h-full"
          />
        </Link>
      </div>

      <div className="space-x-3 row-span-2 overflow-hidden">
        <span className="text-gray-500 uppercase font-medium text-sm">
          {locale === "en" ? blog.tags_en : blog.tags_ar}
        </span>
        <h4 className="text-grayblack text-xl xl:text-3xl font-bold">
          {`${blogTitle.slice(0, 50)} ${blogTitle.length > 50 ? "...." : ""}`}
        </h4>
        <div className="w-fit flex flex-row gap-5 items-center justify-center font-medium">
          <h5>{formatDateForPortfolio(blog.created_at)}</h5>
        </div>
        <p className="text-gray-500 line-clamp-3">
          {`${blogDescription.slice(0, 100)} ${
            blogDescription.length > 100 ? "...." : ""
          }`}
        </p>
      </div>
    </div>
  );
}

export default MainBlogCard;
