import { Dropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { removeToken } from "../utils/token";
import Logo from "../assets/logo.png";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const getUserInfo = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogOut = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <>
      <div className="col-md-3 border" style={{ maxWidth: "220px" }}>
        <div
          className="d-flex flex-column p-3 vh-100"
          style={{ width: "220px" }}
        >
          <Link
            to="/admin"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          >
            <img className="img-fluid p-2" src={Logo} width={50} />
            <span className="fs-4">Blogify</span>
          </Link>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link
                to="/admin"
                className={`nav-link link-body-emphasis ${
                  pathname === "/admin" ? "active" : ""
                }`}
              >
                <i className="fa fa-home"></i>
                &nbsp;Home
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className={`nav-link link-body-emphasis ${
                  pathname.includes("users") ? "active text-light" : ""
                }`}
              >
                <i className="fa fa-users"></i>&nbsp;Users
              </Link>
            </li>
            <li>
              <Link
                to="/admin/blogs"
                className={`nav-link link-body-emphasis ${
                  pathname.includes("blogs") ? "text-light active" : ""
                }`}
              >
                <i className="fa fa-book"></i>
                &nbsp;Blogs
              </Link>
            </li>
          </ul>
          <hr />
          <Dropdown>
            <Dropdown.Toggle variant="light">
              <strong className="text-dark">
                {getUserInfo?.name || "User"}
              </strong>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/admin/profile">Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogOut}>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
