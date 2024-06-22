import { Navigate } from "react-router-dom";

import { isLoggedIn, isValidRoles } from "../utils/login";
const PrivateRoute = ({ children, roles }) => {
  return (
    <>
      {isLoggedIn() && isValidRoles(roles) ? (
        children
      ) : isLoggedIn() && !isValidRoles(roles) ? (
        <Navigate replace to="/admin/profile" />
      ) : (
        <Navigate replace to="/login" />
      )}
    </>
  );
};

export default PrivateRoute;
