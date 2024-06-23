import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoImg from "../assets/logo.png";

import Notify from "../components/Alert";

import { register } from "../services/users";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const registerForm = useRef();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const form = registerForm.current;
      const formData = new FormData(form);
      const { data } = await register(formData);
      if (data) {
        setMessage(data?.data?.message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (e) {
      const error = e?.response?.data?.msg.includes("E11000")
        ? "Email already in use"
        : e?.response?.data?.msg;
      setError(error);
    } finally {
      setTimeout(() => {
        setError("");
        setMessage("");
      }, 3000);
    }
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#efefef" }}
    >
      <div className="flex align-items-center">
        <div className="col-md-4 w-100">
          <div className="card shadow">
            <div className="card-body">
              <div className="row d-flex justify-content-center align-items-center">
                <img src={LogoImg} style={{ maxWidth: "100px" }} />
                <h2 className="text-center mt-2">Register</h2>
                {error && <Notify msg={error} />}
                {message && <Notify variant={"success"} msg={message} />}
                <form
                  className="mb-3"
                  ref={registerForm}
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Upload your picture</label>
                    <input
                      type="file"
                      className="form-control"
                      name="pictureUrl"
                    />
                  </div>
                  <div className="d-grid col-6 mx-auto">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Register
                    </button>
                  </div>
                </form>
                <hr />
                <div className="d-flex justify-content-center">
                  <Link to="/login" className="text-decoration-none">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;