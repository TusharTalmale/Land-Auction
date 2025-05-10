import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Start with null instead of empty string
  const [user, setUser] = useState(null); // Start with null instead of empty array
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const [updating, setUpdating] = useState(false); 
  const [updateError, setUpdateError] = useState(null);
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
        const errorText = await res.text();
       throw new Error(`Failed to fetch user data: ${res.status} ${res.statusText} - ${errorText}`);
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





  const updateUser = async (updatedUserData) => {
    setUpdating(true); // Start update loading
    setUpdateError(null); // Clear previous update errors
    // Note: We don't clear the main 'error' or 'loading' state here
    // as they might be related to the initial fetch or other operations.

    try {
        const res = await fetch('/rest/user/profile', {
            method: 'PUT', // Use PUT for updating the resource
            headers: {
                'Content-Type': 'application/json', // Tell the backend the body is JSON
            },
            credentials: 'include', // Crucial for sending the session cookie
            body: JSON.stringify(updatedUserData), // Send the updated data as JSON string
        });

        if (!res.ok) {
            // Read the error message from the backend if available
            const errorBody = await res.text(); // Read as text first
            let errorMessage = `Profile update failed: ${res.status} ${res.statusText}`;
            if (errorBody) {
               try {
                   // Attempt to parse as JSON if the backend sends JSON errors
                   const errorJson = JSON.parse(errorBody);
                   // Adjust based on your backend's error response structure
                   errorMessage = errorJson.message || errorJson.error || errorBody;
               } catch (parseError) {
                   // If not JSON, use the text body
                   errorMessage = `${errorMessage} - ${errorBody}`;
               }
            }
            console.error("Profile update failed:", errorMessage);
            throw new Error(errorMessage); // Throw an error with details
        }

        // Assuming the backend returns the updated user object on success
        const updatedUser = await res.json();

        // Update the currentUser state in the context
        setCurrentUser(updatedUser);

        setUpdating(false);
        console.log("updated user ",updatedUser,"current user",currentUser) // Stop update loading on success
        return updatedUser; // Return the updated user data
    } catch (e) {
        console.error("An error occurred during profile update:", e);
        setUpdateError(e.message); // Set the update error state
        setUpdating(false); // Stop update loading on error
        // Do NOT set currentUser to null on update error, keep the last good data
        throw e; // Re-throw to allow components to handle the error (e.g., display message)
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
    updating, 
    error,
    updateError, // Specific update error
    updateUser, // Provide the update function to components
 setUpdateError  ,
    refetchCurrentUser: fetchCurrentUser // Add refetch capability
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};