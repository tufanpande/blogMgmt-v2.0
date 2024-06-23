import React from "react";

const BlogList = () => {
  return (
    <>
      <div className="container mt-5 d-grid gap-4">
        <div className="d-flex justify-content-between">
          <h2>Blogs</h2>
          <button className="btn btn-dark">
            <i className="fa fa-plus"></i>&nbsp;New Blog
          </button>
        </div>
        <div className="d-flex">
          <div className="card w-100 shadow">
            <div className="card-body">
              <table className="table table-hover table-bordered rounded-circle">
                <thead className="table-secondary">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td rowSpan="1">
                      How to be a super good and efficient developer? Part 20
                    </td>
                    <td>Raktim Shrestha</td>
                    <td>
                      <div className="d-flex align-self-start">
                        <label className="form-check-label">Draft&nbsp;</label>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                          />
                          <label className="form-check-label">Published</label>
                        </div>
                      </div>
                    </td>
                    <td>
                      <button className="btn btn-custom">
                        <i className="fa fa-eye"></i>
                      </button>
                    </td>
                  </tr>
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
                        <label className="form-check-label">Draft&nbsp;</label>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                          />
                          <label className="form-check-label">Published</label>
                        </div>
                      </div>
                    </td>
                    <td>
                      <button className="btn btn-custom">
                        <i className="fa fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="d-flex justify-content-center d-grid gap-2">
                <ul className="pagination">
                  <select className="page-item">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                  </select>
                </ul>
                <nav aria-label="Page navigation example">
                  <ul className="pagination pagination-sm">
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogList;