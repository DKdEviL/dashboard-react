import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../config/firebase";
import { UserInterfaceProps } from "../interfaces/pages.interface";
import { UserContext } from "../providers/UserProvider";
import NavBar from "./components/NavBar";

const Dashboard = () => {
  const user:any = useContext(UserContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserInterfaceProps>({displayName: '', photoURL: ''});

  useEffect(() => {
    if (!user.user) {
      navigate("/home");
    }else{
        setUserData({displayName: user.user.displayName, photoURL: user.user.photoURL})
    }
  }, [user]);
  return (
    <div>
        <NavBar displayName={userData.displayName} photoURL={userData.photoURL}/>
    </div>
  );
};

export default Dashboard;
