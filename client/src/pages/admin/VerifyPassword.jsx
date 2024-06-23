import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LogoImg from "../assets/logo.png";

import Notify from "../components/Alert";
import { verifyFPToken } from "../services/users";

const VerifyPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [payload, setPayload] = useState({
    email: location?.state?.email,
    token: "",
    newPassword: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await verifyFPToken(payload);
      if (data) {
        setMessage(data?.data);
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
        setPayload({
          email: location?.state?.email,
          token: "",
          newPassword: "",
        });
      }, 3000);
    }
  };

  useEffect(() => {
    const { state } = location;
    if (!state) {
      navigate("/login");
    }
  }, [location, navigate]);
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
                <h2 className="text-center mt-2">Verify Password</h2>
                {error && <Notify msg={error} />}
                {message && <Notify variant={"success"} msg={message} />}
                <form className="mb-3" onSubmit={(e) => handleSubmit(e)}>
                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      disabled
                      value={payload?.email}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Token</label>
                    <input
                      className="form-control"
                      required
                      maxLength={6}
                      onChange={(e) =>
                        setPayload((prev) => {
                          return {
                            ...prev,
                            token: e.target.value,
                          };
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input
                      className="form-control"
                      required
                      onChange={(e) =>
                        setPayload((prev) => {
                          return {
                            ...prev,
                            newPassword: e.target.value,
                          };
                        })
                      }
                    />
                  </div>
                  <div className="d-grid col-6 mx-auto">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Reset Password
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

export default VerifyPassword;
