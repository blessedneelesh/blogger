import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const NavBar = () => {
  const { logout } = useAuth();

  const history = useHistory();

  const handleLogout = async () => {
    console.log("clicked");
    try {
      await logout();
      history.push("/user-login");
    } catch (err) {
      console.log(err, "error");
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
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
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blogs">
                  Blogs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/post-blogs">
                  Post Blogs
                </Link>
              </li>
            </ul>
            <form class="d-flex">
              <button
                class="btn btn-outline-success"
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
