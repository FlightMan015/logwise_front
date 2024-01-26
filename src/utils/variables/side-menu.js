import { atom } from "recoil";

const sideMenu = atom({
  key: "sideMenu",
  default: {
    menu: [
      {
        icon: "Home",
        pathname: "/dashboard",
        title: "Dashboard",
      },
      {
        icon: "User",
        title: "Employees",
        subMenu: [
          {
            icon: "",
            pathname: "/employees/all-employees",
            title: "All Employees",
          },
        ],
      },
      {
        icon: "ShoppingBag",
        title: "Sales",

        subMenu: [
          {
            icon: "",
            pathname: "/sales",
            title: "Dashboard",
          },
        ],
      },
      {
        icon: "BookOpen",
        title: "Menu",
        subMenu: [
          {
            icon: "",
            pathname: "/menu/categories",
            title: "Categories",
          },
        ],
      },
    ],
  },
});

export { sideMenu };
