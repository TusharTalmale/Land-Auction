import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Start with null instead of empty string
  const [user, setUser] = useState(null); // Start with null instead of empty array
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch("/api/whoami", {
        credentials: 'include' // Ensure cookies are sent
      });

      // Check if response is OK (status 200-299)
      if (!res.ok) {
        throw new Error(res.status === 401 ? "Not authenticated" : "Failed to fetch user");
      }

      // Check if response has content
      const text = await res.text();
      if (!text) {
        setCurrentUser(null);
        return;
      }

      const user = JSON.parse(text);
      setCurrentUser(user);
    } catch (e) {
      console.error("Failed to fetch current user:", e);
      setError(e.message);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch(`/rest/user/${id}`, {
        credentials: 'include'
      });

      if (!res.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await res.json();
      setUser(userData);
    } catch (e) {
      console.error("Failed to fetch user:", e);
      setError(e.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const values = {
    currentUser,
    setCurrentUser,
    user,
    fetchUser,
    loading,
    error,
    refetchCurrentUser: fetchCurrentUser // Add refetch capability
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};