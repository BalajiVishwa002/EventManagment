"use client";
import Link from "next/link";
import nav from "./navbar.module.css";
import { signOut } from "next-auth/react";

export default function Navbar() {
 // const logout = signOut({ redirect: "/login" });

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            height={50}
            src="https://www.logoai.com/oss/icons/2021/12/02/SU8HhT2n6tL-p-_.png"
            alt=""
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                href="/admin/dashboard"
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Events
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" href="/admin/events">
                    Add Events
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" href="/admin/events/manage-events">
                    Manage Event
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <button className="btn btn-outline-success" type="button" onClick={ ()=>signOut({redirect:"/login"})}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
