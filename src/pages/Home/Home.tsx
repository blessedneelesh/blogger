import React from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { NavBar } from "../../components";
const Home = () => {
  const { logout, currentUser } = useAuth();
  console.log(currentUser, "currentUser");
  const history = useHistory();

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   await logout();
  //   history.push("/user-login");
  // };

  return (
    <>
      <NavBar />
      <div>Logged in as {JSON.stringify(currentUser.claims.email)}</div>
    </>
  );
};

export default Home;
