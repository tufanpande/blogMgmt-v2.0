import { useState, useEffect } from "react";

import { publishedBlogs } from "../services/blogs";

const useBlog = ({ title, sort }) => {
  // Replace this entire code with tanstack query
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [limit, setLimit] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, msg } = await publishedBlogs({
          title,
          sort,
          page: currentPage,
          limit,
        });
        setMsg(msg);
        setData(data?.data);
        setTotal(data?.data?.total);
      } catch (e) {
        const err = e?.response?.data?.msg || "something went wrong";
        setError(err);
      } finally {
        setLoading(false);
        setTimeout(() => {
          setError("");
          setMsg("");
        }, 3000);
      }
    };
    fetchData();
  }, [title, limit, currentPage, sort]);

  return {
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
  };
};

export default useBlog;
