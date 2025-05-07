import { createContext, useState } from 'react';

// Create the context for Land Listing details and related data
export const LandDetailsContext = createContext();

// Provider component to wrap your application or relevant parts
export default function LandDetailsProvider(props) {
    // State to hold the details of a single land listing
    const [landListing, setLandListing] = useState(null);
    // State to hold filtered land listings (if you implement a filtered list page)
    const [filteredLandListings, setFilteredLandListings] = useState([]);
    // State to hold land listings created by the current user
    const [userSellingLandListings, setUserSellingLandListings] = useState([]);
    // State to hold land listings the user is "buying" or interested in (conceptual)
    const [userBuyingLandListings, setUserBuyingLandListings] = useState([]);

    // Function to fetch a single land listing by ID
    const fetchLandListing = async (id) => {
        try {
            // Fetch from the backend endpoint
            let res = await fetch(`/rest/landListings/${id}`);
            if (!res.ok) {
                // Handle non-OK responses (e.g., 404)
                console.error(`Error fetching land listing ${id}: ${res.status}`);
                setLandListing(null); // Clear state if not found
                // Optionally throw an error or return null
                return null;
            }
            const data = await res.json();
            setLandListing(data); // Update state with fetched data
            return data; // Return the data
        } catch (error) {
            console.error(`Fetch error for land listing ${id}:`, error);
            setLandListing(null); // Clear state on error
            // Handle error (e.g., show error message)
            return null;
        }
    };

    // Function to fetch filtered land listings (implementation based on your backend endpoint)
    const fetchFilteredLandListings = async (filterObj) => {
        try {
            // Assuming your backend /filtered endpoint accepts query parameters
            // You might need to build the query string from filterObj
            const queryString = new URLSearchParams(filterObj).toString();
            let res = await fetch(`/rest/landListings/filtered?${queryString}`);

             if (!res.ok) {
                console.error(`Error fetching filtered land listings: ${res.status}`);
                setFilteredLandListings([]);
                return [];
            }

            const data = await res.json();
            // TODO: Implement pagination logic if needed (concatenate results)
            setFilteredLandListings(data);
            return data;
        } catch (error) {
            console.error('Fetch error for filtered land listings:', error);
            setFilteredLandListings([]);
            return [];
        }
    };

    // Function to fetch land listings created by the current user
    const fetchUserSellingLandListings = async () => {
        try {
            let res = await fetch(`/rest/landListings/userSelling`);
             if (!res.ok) {
                console.error(`Error fetching user selling land listings: ${res.status}`);
                setUserSellingLandListings([]);
                 // Handle 403 Forbidden if user is not logged in
                if (res.status === 403) {
                    console.warn("User not logged in to fetch selling listings.");
                    // Optionally redirect to login or show a message
                }
                return [];
            }
            const data = await res.json();
            setUserSellingLandListings(data);
            return data;
        } catch (error) {
            console.error('Fetch error for user selling land listings:', error);
            setUserSellingLandListings([]);
            return [];
        }
    };

     // Function to fetch land listings the user is "buying" (conceptual)
    const fetchUserBuyingLandListings = async () => {
        try {
            let res = await fetch(`/rest/landListings/userBuying`);
             if (!res.ok) {
                console.error(`Error fetching user buying land listings: ${res.status}`);
                setUserBuyingLandListings([]);
                 if (res.status === 403) {
                    console.warn("User not logged in to fetch buying listings.");
                }
                return [];
            }
            const data = await res.json();
            setUserBuyingLandListings(data);
            return data;
        } catch (error) {
            console.error('Fetch error for user buying land listings:', error);
            setUserBuyingLandListings([]);
            return [];
        }
    };


    // Value object to be provided by the context
    const values = {
        landListing,
        filteredLandListings,
        userSellingLandListings,
        userBuyingLandListings,
        fetchLandListing,
        fetchFilteredLandListings,
        fetchUserSellingLandListings,
        fetchUserBuyingLandListings
    };

    // Provide the context value to children
    return (
        <LandDetailsContext.Provider value={values}>
            {props.children}
        </LandDetailsContext.Provider>
    );
}
