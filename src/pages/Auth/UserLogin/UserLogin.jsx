import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import "./userLogin.css";
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const { login, currentUser } = useAuth();

  console.log(email, password);

  const handleLogin = async (e) => {
    console.log("submit clicked");
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      console.log(err.message, "error login");
    }
  };

  console.log(history.location.state, "console");

  useEffect(() => {
    if (currentUser && currentUser !== null) {
      history.push("/");
    }
  }, [currentUser]);

  return (
    <div className="login-container">
      <form className="login-form">
        <div className="login-form-header">Login</div>
        <div className="form-group mt-4">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group mt-4">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          // type="submit"
          onClick={(e) => handleLogin(e)}
          className="btn btn-primary form-control btn-block mt-4"
        >
          Login
        </button>
        <div className="login-signup mt-4">
          Don't have account? <Link to="/user-register">Sign Up</Link>{" "}
        </div>
      </form>
    </div>
  );
};

export default UserLogin;
