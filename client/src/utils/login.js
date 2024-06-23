import moment from "moment";
import { jwtDecode } from "jwt-decode";

import { getToken } from "./token";

export const isLoggedIn = () => {
  try {
    const token = getToken();
    if (!token) return false;
    const { exp } = jwtDecode(token);
    const now = moment(new Date().valueOf());
    const expDate = moment.unix(exp);
    if (now < expDate) return true;
    return false;
  } catch (e) {
    localStorage.removeItem("access_token");
    return false;
  }
};

export const isValidRoles = (roles = []) => {
  try {
    if (roles === "") return true;
    const token = getToken();
    if (!token) return false;
    const { data: user } = jwtDecode(token);
    const isValid = roles.some((r) => user.role.includes(r));
    if (!isValid) return false;
    return true;
  } catch (e) {
    localStorage.removeItem("access_token");
    return false;
  }
};

export const setCurrentUser = () => {
  const token = getToken();
  const { data } = jwtDecode(token);
  localStorage.setItem("currentUser", JSON.stringify(data));
};