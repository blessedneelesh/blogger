import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { auth, db } from "../../../firebase";
import "./userRegister.css";

const UserRegister = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [name, setName] = useState();

  const history = useHistory();

  console.log(email, password, confirmPassword, "hello");

  const { signUp, currentUser } = useAuth();

  const handleSignup = async (e) => {
    console.log("click submit");
    e.preventDefault();
    try {
      await signUp(email, password, name);
      console.log("successfulyy registered");
    } catch (err) {
      console.log(err, "error");
    }
  };

  useEffect(() => {
    if (currentUser && currentUser !== null) {
      history.push("/");
    }
  }, []);

  return (
    <div>
      <div className="register-container">
        <form className="register-form">
          <div className="register-form-header">Sign Up</div>
          <div class="form-group mt-4">
            <label for="exampleInputEmail1">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div class="form-group mt-4">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="form-group mt-4">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div class="form-group mt-4">
            <label for="exampleInputPassword1"> Confirm Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            // type="submit"
            onClick={(e) => handleSignup(e)}
            class="btn btn-primary form-control btn-block mt-4"
          >
            Sign Up
          </button>
          <div className="register-signup mt-4">
            <span>Already have account?</span>
            <Link to="/">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
