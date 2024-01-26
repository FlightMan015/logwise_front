import React from "react";

const useAuth = () => {
  let token = localStorage.getItem("token");
  if (token) {
    return true;
  } else {
    return false;
  }
};

function Header() {
  const currentUser = useAuth();

  return (
    <div className="border-b border-[#242542] bg-[#121534]">
      <div className="flex justify-between items-center h-[50px] inner-container">
        <div className="flex justify-start">
          <ul className="flex justify-start items-center">
            <li className="header-letter">
              <a href="/" className="flex justify-between items-center">
                {/* <img src="/logo.png" alt="logo" className="h-[24px] pr-[5px] cursor-pointer" /> */}
                Logwise
              </a>
            </li>
            <li className="header-letter">Features</li>
            <li className="header-letter">Method</li>
            <li className="header-letter">Customers</li>
            <li className="header-letter">Changelog</li>
            <li className="header-letter">Integrations</li>
            <li className="header-letter">Pricing</li>
            <li className="header-letter">Contact</li>
            <li className="header-letter">Company</li>
          </ul>
        </div>
        {!currentUser ? (
          <div>
            <a href="/login" className="px-4 mx-3 text-[14px] font-medium cursor-pointer">
              Log in
            </a>
            <a
              href="/register"
              className="btn-primary px-[18px] py-[8px] text-[14px] cursor-pointer"
            >
              Sign Up
            </a>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Header;
