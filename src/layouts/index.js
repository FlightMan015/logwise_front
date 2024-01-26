// const imageAssets = import.meta.globEager(
//   '/src/assets/images/*.{jpg,jpeg,png,svg}'
// );

import { Outlet } from "react-router-dom";
import Header from "./header";

function Layout () {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;