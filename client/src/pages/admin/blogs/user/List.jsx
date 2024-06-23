import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listUsers,
  changeStatus,
  setCurrentPage,
  setLimit,
} from "../../../slices/userSlice";
import { Paginate } from "../../../components/Paginate";

const List = () => {
  const dispatch = useDispatch();
  const { users, currentPage, limit, loading, total } = useSelector(
    (state) => state.users
  );

  const initFetch = useCallback(() => {
    dispatch(listUsers({ limit, page: currentPage, name: "" }));
  }, [dispatch, currentPage, limit]);

  const handleStatus = async (e, email) => {
    e.preventDefault();
    dispatch(changeStatus(email));
  };

  useEffect(() => {
    initFetch();
  }, [initFetch]);
  return (
    <>
      <div className="container mt-5 d-grid gap-4">
        <div className="d-flex justify-content-between">
          <h2>Users</h2>
          <Link to="/admin/users/add" className="btn btn-dark">
            <i className="fa fa-plus"></i>&nbsp;New User
          </Link>
        </div>
        <div className="d-flex">
          <div className="card w-100 shadow">
            <div className="card-body">
              <table className="table table-hover table-bordered rounded-circle">
                <thead className="table-secondary">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && users.length === 0 && (
                    <tr>
                      <th scope="row" className="placeholder-glow">
                        <span className="placeholder col-9"></span>
                      </th>
                      <td className="placeholder-glow">
                        <span className="placeholder col-9"></span>
                      </td>
                      <td className="placeholder-glow">
                        <span className="placeholder col-9"></span>
                      </td>
                      <td>
                        <div className="d-flex align-self-start">
                          <label className="form-check-label">
                            Draft&nbsp;
                          </label>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="flexSwitchCheckDefault"
                            />
                            <label className="form-check-label">
                              Published
                            </label>
                          </div>
                        </div>
                      </td>
                      <td>
                        <button className="btn btn-custom">
                          <i className="fa fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  )}
                  {users && users.length > 0 ? (
                    users.map((user, index) => {
                      return (
                        <tr key={user?._id}>
                          <th scope="row">{index + 1}</th>
                          <td rowSpan="1">{user?.name}</td>
                          <td>{user?.email}</td>
                          <td>
                            <div className="d-flex align-self-start">
                              <label className="form-check-label">
                                Blocked&nbsp;
                              </label>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  checked={user?.isActive}
                                  type="checkbox"
                                  role="switch"
                                  onChange={(e) => handleStatus(e, user?.email)}
                                />
                                <label className="form-check-label">
                                  Active
                                </label>
                              </div>
                            </div>
                          </td>
                          <td>
                            <Link
                              to={`/admin/users/${user?._id}`}
                              className="btn btn-custom"
                            >
                              <i className="fa fa-eye"></i>
                            </Link>
                            <button className="btn btn-custom">
                              <i className="fa fa-trash text-danger"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center">
                        No Data Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="row">
              <Paginate
                total={total}
                limit={limit}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setLimit={setLimit}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;