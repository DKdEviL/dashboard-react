import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../config/firebase";
import HomePageProps from "../interfaces/pages.interface";
import { UserContext } from "../providers/UserProvider";

const HomePage = (props: HomePageProps) => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.user) {
      navigate("/dashboard");
    }
  }, [user]);
  return (
    <div>
      <h1> Welcome back to Skrate!!</h1>
      <button onClick={signInWithGoogle}>Sign in with google</button>
    </div>
  );
};

export default HomePage;
