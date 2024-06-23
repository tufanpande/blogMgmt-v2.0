import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoImg from "../assets/logo.png";
import Notify from "../components/Alert";

import { login } from "../services/users";
import { setToken, getToken } from "../utils/token";
import { setCurrentUser } from "../utils/login";

const Login = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const { data } = await login(payload);
      if (data?.data) {
        setToken(data.data);
        setCurrentUser();
        navigate("/admin/blogs");
      }
    } catch (e) {
      const error = e?.response?.data?.msg || "Login failed";
      setError(error);
    } finally {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate("/");
    }
  }, [navigate]);

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
                <h2 className="text-center mt-2">Login</h2>
                {error && <Notify msg={error} />}
                <form className="mb-3" onSubmit={(e) => handleLogin(e)}>
                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      required
                      onChange={(e) =>
                        setPayload((prev) => {
                          return { ...prev, email: e.target.value };
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      required
                      onChange={(e) =>
                        setPayload((prev) => {
                          return { ...prev, password: e.target.value };
                        })
                      }
                    />
                  </div>
                  <div className="mb-3 d-flex flex-row-reverse">
                    <Link
                      to="/forget-password"
                      className="text-decoration-none"
                    >
                      Forget Password?
                    </Link>
                  </div>
                  <div className="d-grid col-6 mx-auto">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Login
                    </button>
                  </div>
                </form>
                <hr />
                <div className="d-flex justify-content-center">
                  <Link to="/register" className="text-decoration-none">
                    Register
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

export default Login;
