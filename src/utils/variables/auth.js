import { atom } from "recoil";

const userToken = atom({
  key: "userTokenValue",
  default: localStorage.getItem("access_token"),
});

const isAuthenticated = atom({
  key: "isAuthenticatedValue",
  default: JSON.parse(localStorage.getItem("isAuthenticated")),
});

export { userToken, isAuthenticated };
