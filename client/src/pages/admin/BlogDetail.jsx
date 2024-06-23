import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlogBySlug } from "../services/blogs";

import { useBlogContext } from "../contexts/BlogContext";

import { dateFormatter } from "../utils/date";

const BlogDetail = () => {
  const { blogs } = useBlogContext();
  const [detail, setDetail] = useState({});
  const [randomBlogs, setRandomBlogs] = useState([]);

  const { id = "" } = useParams();

  const getRandom = useCallback(() => {
    const result = _.sampleSize(blogs, 3);
    setRandomBlogs(result);
  }, [blogs]);

  useEffect(() => {
    const getBlog = async () => {
      const { data } = await getBlogBySlug(id);
      setDetail(data.data);
    };
    getBlog();
    getRandom();
  }, [id, getRandom]);

  return (
    <div className="container mt-4">
      <div className="flex d-flex justify-content-center">
        <img
          src={detail?.pictureUrl}
          className="img-fluid"
          style={{ maxHeight: "500px", height: "500px" }}
        />
      </div>
      <div className="row mb-2">
        <div className="row">
          <h1 className="">
            {detail?.title} by {detail?.author?.name}
          </h1>
        </div>
        <div className="row">
          <div className="col-6">
            <span className="h5">Read Duration:</span>&nbsp;{detail?.duration}
            &nbsp;mins
          </div>
          <div className="col-6">
            <span className="h5">Published Date:</span>&nbsp;
            {dateFormatter(detail?.createdAt)}
          </div>
        </div>
      </div>
      <div className="row">
        <p className="lead">{detail?.content}</p>
      </div>
      {randomBlogs.length > 0 && (
        <div className="row">
          <h1 className="text-center">Recent Blogs</h1>
          <div className="card-group">
            {randomBlogs.map((blog) => {
              return (
                <div className="card" key={blog?.slug}>
                  <img
                    src={blog?.pictureUrl}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <Link
                      to={`/blogs/${blog?.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <h5 className="card-title">{blog?.title}</h5>
                    </Link>
                    <p className="card-text">
                      {blog?.content.slice(0, 50).concat("...")}
                    </p>
                    <p className="card-text">
                      <small className="text-body-secondary">
                        {dateFormatter(blog?.createAt)}
                      </small>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
