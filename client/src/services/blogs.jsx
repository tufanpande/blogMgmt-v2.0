import instance from "../utils/axios";
import { APIs } from "../constants";

export const publishedBlogs = ({
  title = "",
  sort = "",
  limit = 20,
  page = 1,
}) => {
  return instance.get(
    APIs.BLOGS +
      `/published-only?title=${title}&sortBy=${sort}&limit=${limit}&page=${page}`
  );
};

export const getBlogBySlug = (slug) => {
  return instance.get(APIs.BLOGS + `/${slug}`);
};