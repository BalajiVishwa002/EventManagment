import Link from "next/link";
import "./navbar.css"

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          <img
            height={50}
            src="https://www.logoai.com/oss/icons/2021/12/02/SU8HhT2n6tL-p-_.png"
            alt=""
          />
        </Link>
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
              <Link className="nav-link active" aria-current="page" href="/">
                Events
              </Link>
            </li>
          </ul>

          <Link className="btn btn-outline-success" href="/login">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
