import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createUser } from "../../../slices/userSlice";

const UserAdd = () => {
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    email: "",
    name: "",
    password: "",
    roles: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(payload));
    navigate("/admin/users");
  };
  return (
    <div className="container mt-5 d-grid gap-4">
      <div className="d-flex justify-content-between">
        <h2>Add new Users</h2>
      </div>
      {error ? <>{JSON.stringify(error)}</> : <></>}
      <div className="d-flex">
        <div className="card w-100 shadow">
          <div className="card-body">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={payload?.name}
                  onChange={(e) =>
                    setPayload((prev) => {
                      return { ...prev, name: e.target.value };
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  value={payload?.email}
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
                  type="text"
                  className="form-control"
                  value={payload?.password}
                  onChange={(e) =>
                    setPayload((prev) => {
                      return { ...prev, password: e.target.value };
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Roles</label>
                <select
                  className="form-control"
                  value={payload?.roles[0]}
                  onChange={(e) =>
                    setPayload((prev) => {
                      return { ...prev, roles: [e.target.value] };
                    })
                  }
                >
                  <option value="">Select one Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAdd;
