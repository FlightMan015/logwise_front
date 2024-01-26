import { Routes, Route } from "react-router-dom";
import LogIn from "../views/login";
import Register from "../views/register";
import MyDetail from "../views/detail";
import ErrorPage from "../views/error-page";
import HomePage from "../views/homepage";
import { AuthRoute } from "./AuthRoute";
import { ProtectedRoute } from "./ProtectedRoute";
import { SettingRoute } from "./SettingRoute";
import GithubIntegration from "../views/setting/github";
import SentryIntegration from "../views/setting/sentry";

function Router() {
  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard" element={<Navigate to={"/login"} />} /> */}
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<MyDetail />} />
        {/* <Route path="/" element={<Navigate to={"/dashboard"} />} /> */}
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route element={<SettingRoute />}>
        <Route path="/setting">
          <Route path="integrations">
            <Route path="github" element={<GithubIntegration />} />
            <Route path="sentry" element={<SentryIntegration />} />
          </Route>
        </Route>
      </Route>

      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}

export default Router;
