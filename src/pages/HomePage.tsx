import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../config/firebase";
import HomePageProps from "../interfaces/pages.interface";
import { UserContext } from "../providers/UserProvider";

import wave from '../assets/wave.svg';
import girl from '../assets/bg-image.svg';

const HomePage = (props: HomePageProps) => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.user) {
      navigate("/dashboard");
    }
  }, [user]);
  return (
    <>
    <div style={{position: 'absolute', top: '0', right: '0'}}>
        <img src={wave} style={{width: '40vw', aspectRatio: '1'}}/>
      </div>
      <div className='d-md-block d-none' style={{position: 'absolute', bottom: '0', right: '0'}}>
        <img src={girl} style={{height: '50vh', aspectRatio: '1'}}/>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center align-items-md-start vw-100 vh-100 px-5">
      <h1> Welcome back to Skrate!!</h1>
      <Button variant="primary" onClick={signInWithGoogle}>Sign in with google</Button>
    </div>
      </>
    
  );
};

export default HomePage;
