import { useRecoilValue } from "recoil";
import { HomeRoute } from "./HomeRoute";
import { isAuthenticated as isAuthenticatedValue } from "../utils/variables/auth";
import Layout from "../layouts";

export const AuthRoute = () => {
  // const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedValue);
  const isAuthenticated = useRecoilValue(isAuthenticatedValue);
  console.log("auth", isAuthenticated);

  if (isAuthenticated) {
    return <HomeRoute />;
  }

  return <Layout />;
};
