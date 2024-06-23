export const setToken = (payload) => {
    return localStorage.setItem("access_token", payload);
  };
  
  export const getToken = () => {
    return localStorage.getItem("access_token");
  };
  
  export const removeToken = () => {
    return localStorage.removeItem("access_token");
  };