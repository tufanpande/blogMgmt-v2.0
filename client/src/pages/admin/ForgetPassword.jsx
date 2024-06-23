import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoImg from "../assets/logo.png";

import Notify from "../components/Alert";
import { generateFPToken } from "../services/users";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await generateFPToken({ email });
      if (data) {
        setMessage(data?.data);
        setTimeout(() => {
          navigate("/verify-password", { state: { email } });
        }, 3000);
      }
    } catch (e) {
      console.log({ e });
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
                <h2 className="text-center mt-2">Forget Password</h2>
                {error && <Notify msg={error} />}
                {message && <Notify variant={"success"} msg={message} />}
                <form className="mb-3" onSubmit={(e) => handleSubmit(e)}>
                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="form-text">
                      You will receive 6 digit token in your email address.
                    </div>
                  </div>
                  <div className="d-grid col-6 mx-auto">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Generate Token
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

export default ForgetPassword;
