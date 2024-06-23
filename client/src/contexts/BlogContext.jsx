import { useContext, createContext, useState } from "react";
import useBlog from "../hooks/useBlog";

const BlogContext = createContext(null);

export const BlogContextProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [sort, setSort] = useState("");
  const {
    data,
    error,
    loading,
    msg,
    total,
    limit,
    currentPage,
    setLimit,
    setTotal,
    setCurrentPage,
  } = useBlog({
    title,
    sort,
  });
  return (
    <>
      <BlogContext.Provider
        value={{
          blogs: data?.data,
          loading,
          error,
          msg,
          limit,
          currentPage,
          total,
          setTitle,
          setSort,
          setLimit,
          setCurrentPage,
          setTotal,
        }}
      >
        {children}
      </BlogContext.Provider>
    </>
  );
};

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (!context) throw new Error("Blog Context must be wrapped inside provider");
  return context;
};
