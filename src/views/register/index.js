import React from "react";
import { useState } from "react";
import { register } from "../../services/auth.service";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = () => {
    if (name === "" || name === undefined) return;
    if (email === "" || email === undefined) return;
    if (password === "" || password === undefined) return;
    let user = {
      name,
      email,
      password,
    };

    register(user)
      .then((res) => {
        console.log("signUp", res);
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
          <p className="text-[26px] font-semibold text-center">Create an account</p>
        </div>
        <div className="my-8">
          <div className="my-4">
            <input
              type="text"
              placeholder="Name"
              className="custom-input"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
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
          <div className="my-4">
            <input
              type="password"
              placeholder="Password"
              className="custom-input"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="my-4">
            <button className="w-full btn-primary" onClick={signUp}>
              Sign Up
            </button>
          </div>
        </div>

        <div className="my-8 px-[20px]">
          <p className="text-center text-[13px] text-[#767889]">
            By signing up, you agree to the Terms of Service and Data Processing Agreement.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
