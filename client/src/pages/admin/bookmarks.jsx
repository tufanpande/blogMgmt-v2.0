import { Link } from "react-router-dom";
import { removeAll, removeFromCart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

import { dateFormatter } from "../utils/date";
import { ConfirmDelete } from "../components/Swal";

export const Bookmarks = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  return (
    <>
      <div className="container mt-5 mb-5">
        <h1 className="text-center">My Bookmarks</h1>
        <div className="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-5">
          <div className="flex d-flex flex-row-reverse">
            <button
              className="btn btn-danger"
              onClick={() => dispatch(removeAll())}
            >
              Remove All
            </button>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Author</th>
                <th scope="col">Published Date</th>
                <th scope="col">Added Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.length > 0 ? (
                cart.map((item, index) => {
                  return (
                    <tr key={item?.slug}>
                      <th scope="row">{index + 1}</th>
                      <td>{item?.title}</td>
                      <td>{item?.author}</td>
                      <td>{dateFormatter(item?.createdAt)}</td>
                      <td>{dateFormatter(item?.addedTime)}</td>
                      <td>
                        <div>
                          <Link to={`/blogs/${item?.slug}`}>
                            <i className="fa fa-eye text-success px-3"></i>
                          </Link>
                          <i
                            className="fa fa-close text-danger"
                            onClick={() =>
                              ConfirmDelete({
                                dispatch,
                                fn: removeFromCart,
                                slug: item?.slug,
                              })
                            }
                          ></i>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6}>
                    No items found. Click <Link to="/blogs">here</Link> to start
                    bookmarking!!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export const NoBookmarks = () => {
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-5">
          <h1 className="text-body-emphasis">No Bookmarks found...</h1>
          <p className="col-lg-6 mx-auto mb-4">
            Bookmark a blog to get started. You can book mark a blog from&nbsp;
            <Link className="text-decoration-none" to="/blogs">
              here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
