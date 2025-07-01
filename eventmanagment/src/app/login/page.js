"use client";
import { useEffect, useState } from "react";
import login from "./login.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

export default function HomePage() {
  const [data, setdata] = useState({"username":"","password":""});
  const [disbale, setdisable] = useState(false);
  const router = useRouter();

  const handleChanges = (e) => {
    setdata((pres) => ({ ...pres, [e.target.name]: e.target.value }));
  };

  function showError(ele, msg) {
    const small = document.createElement("small");
    small.className = "error-text text-danger";
    small.textContent = msg;
    ele.classList.add("is-invalid");
    ele.parentElement.appendChild(small);
  }

  function clearError(ele) {
    ele.classList.remove("is-invalid");
  }

    function initCap(str) {
    return str.charAt(0).toLocaleUpperCase() + str.slice(1);
  }

  const handleSubmit = async (e) => {
    try {
      setdisable(true);
      e.preventDefault();

      var valid = true;
      document.querySelectorAll(".error-text").forEach((ele) => ele.remove());
      var keys = Object.keys(data);
      keys.forEach((ele) => {
        var docEle = document.getElementById(ele);
        if (!data[ele]) {
          showError(docEle, `${initCap(ele)} missing`);
          valid = false;
        } else {
          clearError(docEle);
        }
      });

      if (valid) {
        const res = await signIn("credentials", {
          redirect: false,
          username: data.username,
          password: data.password,
        });
        if (res.ok) {
          console.log(res);

          router.push("/admin/dashboard");
        } else {
          toast("Login failed");
        }
      }
    } catch (err) {
      toast(err.message);
    } finally {
      setdisable(false);
    }
  };

  return (
    <div className={login.login}>
      <ToastContainer />
      <div className={login.logincontainer}>
        <h1 className="text-center mb-5">Welcome</h1>
        <form method="POST" action="javascript:void(0)">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              onChange={(e) => handleChanges(e)}
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Enter username"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              onChange={(e) => handleChanges(e)}
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter password"
            />
          </div>
          <div className="mb-3">
            {disbale ? (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <input
                type="button"
                onClick={handleSubmit}
                value="Submit"
                className="btn btn-success"
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
