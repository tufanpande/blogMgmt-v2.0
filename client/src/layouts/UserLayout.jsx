import { Outlet } from "react-router-dom";

import UserNavbar from "./UserNavbar";
import UserFooter from "./UserFooter";

const UserLayout = () => {
  return (
    <div>
      <UserNavbar />
      <main
        className="container-fluid overflow-auto"
        style={{ height: "79vh" }}
      >
        <Outlet />
      </main>
      <UserFooter />
    </div>
  );
};

export default UserLayout;
