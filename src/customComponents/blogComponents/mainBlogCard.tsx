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
  // jus display first two tags

  return (
    <div className="w-full h-full grid gap-3 aspect-square">
      <div className="w-full h-full overflow-hidden rounded-xl min-h-[100px]">
        <Link to={`${pageClient.blog_details}/${blog.id}`}>
          <img
            src={`${imagesPath}blogs/${blog.image}`}
            alt="blog img"
            className="hover:scale-125 duration-500 object-cover w-full h-full"
          />
        </Link>
      </div>

      <div className="row-span-2 overflow-hidden">
        <span className="text-gray-500 uppercase font-medium text-xs whitespace-normal">
          {blogTagFormate}
        </span>
        <h3 className="text-grayblack text-lg xl:text-xl font-bold">
          {`${blogTitle.slice(0, 40)} ${blogTitle.length > 40 ? "...." : ""}`}
        </h3>
        {/* <div className="w-fit flex flex-row gap-5 items-center justify-center font-medium">
          <h5>{formatDateForPortfolio(blog.created_at)}</h5>
        </div> */}
        <p className="text-gray-500 line-clamp-3 text-xs">
          {`${blogDescription.slice(0, 100)} ${
            blogDescription.length > 100 ? "...." : ""
          }`}
        </p>
      </div>
    </div>
  );
}

export default MainBlogCard;
