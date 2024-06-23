import { useSelector } from "react-redux";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import Logo from "../assets/logo.png";

const UserNavbar = () => {
  const { quantity } = useSelector((state) => state.cart);
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
        <Container fluid>
          <Link className="navbar-brand" to="/">
            <img src={Logo} width="32" alt="Logo" className="img-fluid m-1" />
            Blogify
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blogs">
                  Blogs
                </Link>
              </li>
            </ul>
            <div className="btn-toolbar">
              <div className="btn-group p-1">
                <Link className="btn btn-outline-light" to="/login">
                  <i className="fa fa-sign-in fa-lg"></i>
                </Link>
              </div>
              <div className="btn-group p-1">
                <Link className="btn btn-secondary" to="/bookmarks">
                  <i className="fa fa-bookmark fa-lg"></i>
                  <span className="badge badge-danger">{quantity}</span>
                </Link>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default UserNavbar;
