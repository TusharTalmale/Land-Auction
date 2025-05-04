import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [user, setUser] = useState([]);
  
  
  const fetchCurrentUser = async () => {
    let res = await fetch("/api/whoami");
    try {
      let user = await res.json();
      if (user) {
        setCurrentUser(user);
      }
    } catch (e) {
      console.log("No User yet", e);
    }
  };
  
    const fetchUser = async (id) => {
      let res = await fetch(`/rest/user/${id}`);
      res = await res.json();
      setUser(res);
    };
  
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const values = {
    currentUser,
    setCurrentUser,
    user,
    fetchUser,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
