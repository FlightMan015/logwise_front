import axios from "axios";

const instant = axios.create({ baseURL: process.env.REACT_APP_APP_API_ENDPOINT });
instant.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      // localStorage.setItem("access_token", null);
      // localStorage.setItem("isAuthenticated", false);
      // // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instant;
