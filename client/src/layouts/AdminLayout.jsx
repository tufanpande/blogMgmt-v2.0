import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
  return (
    <div>
      <main className="d-flex vh-100">
        <AdminNavbar />
        <div className="col-md-9 mt-5">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
