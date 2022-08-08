import React, { useState, useEffect, createContext } from "react";
import { auth } from "../config/firebase";
export const UserContext = createContext({ user: null });
export default (props: any) => {
  const [user, setuser] = useState<any>(null);
  useEffect(() => {
    auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        const { displayName, email, photoURL } = user;
        setuser({
          displayName,
          email,
          photoURL,
        });
      } else {
        setuser(null);
      }
    });
  }, []);
  return (
    <UserContext.Provider value={{ user }}>
      {props.children}
    </UserContext.Provider>
  );
};
