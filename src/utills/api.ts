import { BASE_API_URL, REQUESTS } from "./apiUrls";
import { BlogsResponseHttpData } from "./types";

export const getBlogs = async (): Promise<Array<BlogsResponseHttpData>> => {
  const res = await fetch(`${BASE_API_URL}/${REQUESTS.BLOGS.GET}`);
  const data = await res.json();
  return data.data;
};
