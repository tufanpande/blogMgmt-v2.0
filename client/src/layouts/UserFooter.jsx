import { Link } from "react-router-dom";

import Logo from "../assets/logo.png";

const UserFooter = () => {
  return (
    <div>
      <div className="container-fluid">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <Link
              to="/"
              className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
            >
              <img src={Logo} width="32" className="img-fluid" />
            </Link>
            <span className="mb-3 mb-md-0 text-body-secondary">
              © 2024 Blogify, Inc
            </span>
          </div>
          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <Link className="text-body-secondary" to="#" target="_blank">
                <i className="fa fa-twitter"></i>
              </Link>
            </li>
            <li className="ms-3">
              <Link className="text-body-secondary" to="#" target="_blank">
                <i className="fa fa-instagram"></i>
              </Link>
            </li>
            <li className="ms-3">
              <Link className="text-body-secondary" to="#" target="_blank">
                <i className="fa fa-facebook"></i>
              </Link>
            </li>
            <li className="ms-3">
              <Link className="text-body-secondary" to="#" target="_blank">
                <i className="fa fa-github"></i>
              </Link>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
};

export default UserFooter;
