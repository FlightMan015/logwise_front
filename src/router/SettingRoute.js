import { Navigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isAuthenticated as isAuthenticatedValue } from "../utils/variables/auth";
import SettingLayout from "../layouts/setting";

export const SettingRoute = () => {
  // const [isAuthenticated, setAuthenticated] = useRecoilState(isAuthenticatedValue);
  const isAuthenticated = useRecoilValue(isAuthenticatedValue);
  const location = useLocation();

  //   useEffect(() => {
  //     //Check auth
  //     const curTime = Date.now();
  //     const loginTime = localStorage.getItem("logintime");
  //     const user = localStorage.getItem("user");
  //     setTimeout(() => {
  //       localStorage.removeItem("logintime");
  //       navigate("/login");
  //     }, 1000 * 60 * 60 * 24);

  //     if (curTime - loginTime <= 1000 * 60 * 60 * 24 && user) {
  //       setAuthenticated(() => "1");
  //       localStorage.setItem("isAuthenticated", true);
  //     } else {
  //       localStorage.removeItem("token");
  //       localStorage.removeItem("user");
  //       localStorage.removeItem("isAuthenticated");
  //       setToken(() => null);
  //       setAuthenticated(() => null);
  //       navigate("/login");
  //     }
  //     setLoading(false);
  //   }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <SettingLayout />;
};
