import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../config/firebase";
import { UserContext } from "../providers/UserProvider";

const Dashboard = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.user) {
      navigate("/home");
    }
  }, [user]);
  return (
    <div>
      <h1> Welcome back to Skrate!!</h1>
      <button onClick={logOut}>Sign out with google</button>
    </div>
  );
};

export default Dashboard;
