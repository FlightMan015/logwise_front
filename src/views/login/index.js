import React from "react";
import { useState } from "react";
import { login } from "../../services/auth.service";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusSignIn, setStatusSignIn] = useState({
    gmail: false,
    email: false,
    saml: false,
  });

  const signIn = () => {
    if (email === "" || email === undefined) return;
    if (password === "" || password === undefined) return;
    let user = {
      email: email,
      password,
    };

    login(user)
      .then((res) => {
        console.log("login", res);
        let session = res.data.session;
        localStorage.setItem("user", JSON.stringify(session.user));
        localStorage.setItem("access_token", session.access_token);
        localStorage.setItem("isAuthenticated", true);
        window.location.href = "/dashboard";
      })
      .catch((e) => {
        localStorage.setItem("isAuthenticated", false);
        console.log(e);
      });
  };

  return (
    <div className="flex justify-center">
      <div className="w-[360px] pt-[250px]">
        <div>
          <p className="text-[26px] font-semibold text-center">Login to Logwise</p>
        </div>
        <div className="my-8">
          <div
            className="my-4 h-[46px] bg-[#5e6ad2] rounded-md flex items-center hover:bg-[#7f89e7] cursor-pointer"
            onClick={() => {
              setStatusSignIn({
                gmail: true,
                email: false,
                saml: false,
              });
            }}
          >
            <p className="text-[13px] text-center font-medium w-full cursor-pointer">
              Continue with Google
            </p>
          </div>
          {statusSignIn?.email ? (
            <>
              <div className="my-[30px] border-b border-[#344054]"></div>
              <div className="my-4">
                <input
                  type="text"
                  placeholder="Enter your email address"
                  className="custom-input"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <input
                type="password"
                placeholder="Password"
                className="custom-input"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </>
          ) : (
            <></>
          )}

          <div
            className="my-4 h-[46px] bg-[#272939] rounded-md flex items-center hover:bg-[#232531] cursor-pointer"
            onClick={() => {
              if (statusSignIn.email) {
                signIn();
              } else {
                setStatusSignIn({
                  gmail: false,
                  email: true,
                  saml: false,
                });
              }
            }}
          >
            <p className="text-[13px] text-center font-medium w-full cursor-pointer">
              Continue with Email
            </p>
          </div>
          <div
            className="my-4 h-[46px] bg-[#272939] rounded-md flex items-center hover:bg-[#232531] cursor-pointer"
            onClick={() => {
              setStatusSignIn({
                gmail: false,
                email: false,
                saml: true,
              });
            }}
          >
            <p className="text-[13px] text-center font-medium w-full cursor-pointer">
              Continue with SAML SSO
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
