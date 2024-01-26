import React from "react";
import { Dropdown } from "antd";

const UserSetting = () => {
  const items = [
    {
      label: <a>Help</a>,
      key: "0",
    },
    {
      label: <a className="border-b border-slate-600"></a>,
      key: "1",
    },
    {
      label: (
        <a
          onClick={() => {
            localStorage.removeItem("isAuthenticated");
            window.location.href = "/";
          }}
        >
          Log out
        </a>
      ),
      key: "2",
    },
  ];
  return (
    <>
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
        placement="bottomLeft"
      >
        <div className=" rounded-full w-[18px] h-[18px] bg-[#b662c7]"></div>
      </Dropdown>
    </>
  );
};

export default UserSetting;
