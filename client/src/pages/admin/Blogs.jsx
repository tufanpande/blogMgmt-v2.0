import { Link } from "react-router-dom";

import { useDebounce } from "../hooks/useDebounce";
import { useBlogContext } from "../contexts/BlogContext";

import LogoImg from "../assets/logo.png";
import { BlogLoader } from "../components/Loader";
import { dateFormatter } from "../utils/date";
import { useEffect, useState } from "react";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";

import { Paginate } from "../components/Paginate";

const Blogs = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const {
    blogs,
    loading,
    setTitle,
    setSort,
    limit,
    currentPage,
    total,
    setLimit,
    setCurrentPage,
  } = useBlogContext();

  const { delayTerm } = useDebounce({ title: query, delay: 500 });

  const handleErrorImg = (e) => {
    e.target.src = LogoImg;
  };

  useEffect(() => {
    if (delayTerm) {
      setTitle(delayTerm);
      setSortBy("");
      setSort("");
    }
    if (sortBy) {
      setSort(sortBy);
      setTitle("");
    }
  }, [setTitle, setSort, delayTerm, sortBy]);

  return (
    <>
      <div className="">
        <div className="row">
          <h4>Blogs</h4>
          <div className="col-8">
            <div className="input-group mb-3" style={{ maxWidth: "500px" }}>
              <span className="input-group-text">
                <i className="fa fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by Blog Title"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="col-4">
            <div className="d-flex justify-content-end">
              <select
                className="form-select"
                style={{ maxWidth: "200px" }}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="alphabetical-a-z">Alphabetical (A to Z)</option>
                <option value="latest">Latest</option>
                <option value="alphabetical-z-a">Alphabetical (Z to A)</option>
              </select>
            </div>
          </div>
        </div>
        {/* Blog Data Loop */}
        <div className="row">
          {loading && (
            <>
              <BlogLoader />
              <BlogLoader />
              <BlogLoader />
            </>
          )}

          {blogs &&
            blogs?.length > 0 &&
            blogs.map((blog) => {
              return (
                <div key={blog?.slug} className="col-md-3">
                  <div className="card mb-3">
                    <img
                      src={blog?.pictureUrl}
                      className="card-img-top"
                      onError={(e) => handleErrorImg(e)}
                      style={{
                        width: "100%",
                        height: "17vw",
                        objectFit: "cover",
                      }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{blog?.title}</h5>
                      <p className="card-text">
                        <em>{blog?.content.slice(0, 47).concat("...")}</em>
                      </p>
                      <i className="fa fa-user"></i>&nbsp;{blog?.author} &nbsp;
                      <i className="fa fa-calendar"></i>&nbsp;
                      {dateFormatter(blog?.createdAt, "Do MMMM, YYYY")}
                      <div className="d-flex justify-content-between mt-4">
                        <Link
                          to={`/blogs/${blog?.slug}`}
                          className="btn btn-custom"
                        >
                          Read more
                        </Link>
                        <Link
                          className="btn btn-light"
                          onClick={() => {
                            dispatch(addToCart(blog));
                          }}
                        >
                          <i className="fa fa-bookmark"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {/* Pagination */}
        <Paginate
          total={total}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          limit={limit}
          setLimit={setLimit}
        />
      </div>
    </>
  );
};

export default Blogs;
