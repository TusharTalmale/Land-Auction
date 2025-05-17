import React, { useState, useEffect } from 'react';
// Import the HomeAuctionList component you provided
// Import Box from Material UI, as used in HomeAuctionList (though HomeAuctionList imports it too,
// it's good practice to import components you directly use in this file if not just passing props)
import { Box } from "@mui/material";
import { HomeAuctionList } from '../lists/HomeAuctionList';


export const Home = () => {
    // State for filter parameters
    const [title, setTitle] = useState('');
    const [city, setCity] = useState('');
    const [plotFacing, setPlotFacing] = useState(''); // '' for no specific facing filter
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [active, setActive] = useState(true); // Default to true based on backend API behavior

    // State for fetched auction items
    const [auctionItems, setAuctionItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Options for Plot Facing dropdown
    const facingOptions = ["", "North", "East", "West", "South"]; // Added "" for 'Any' option

    // Function to fetch data from the filter API
    const fetchAuctionItems = async () => {
        setLoading(true);
        setError(null); // Clear previous errors

        // Construct the query parameters
        const queryParams = new URLSearchParams();
        if (title) queryParams.append('title', title);
        if (city) queryParams.append('city', city);
        if (plotFacing) queryParams.append('plotFacing', plotFacing);
        if (minPrice) queryParams.append('minPrice', minPrice);
        if (maxPrice) queryParams.append('maxPrice', maxPrice);

        // If 'active' checkbox is unchecked, we explicitly send active=false
        if (!active) {
             queryParams.append('active', false);
        } else if ( // If active is true, only send if other filters are applied, otherwise rely on backend default
             title || city || plotFacing || minPrice || maxPrice
        ) {
             queryParams.append('active', true);
        }


        const url = `/rest/auctionItem/filter?${queryParams.toString()}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            setAuctionItems(data);
        } catch (err) {
            console.error("Error fetching auction items:", err);
            setError("Failed to fetch auction items. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch auction items when the component mounts (initial load)
    // This will trigger the default active filter behavior from the backend
    useEffect(() => {
        fetchAuctionItems();
    }, []); // Empty dependency array means this runs only once on mount

    // Handle filter button click
    const handleFilterSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission if using a form
        fetchAuctionItems();
    };

    return (
        
        <Box className="container mx-auto p-4">
            {/* Hero Section */}
            <div className="relative h-96 mb-16 rounded-xl overflow-hidden shadow-2xl">
                {/* Background Image with Gradient Overlay */}
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        alt="Land for auction"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-emerald-900/90" />
                </div>

                {/* Hero Content */}
                <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                        Premium Land Auctions
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                        Discover exceptional land opportunities across India. Bid on prime residential, 
                        commercial, and agricultural properties with transparent transactions.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg
                                    transform transition-all duration-200 hover:scale-105 focus:outline-none
                                    focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Explore Listings
                    </button>
                </div>
            </div>

            {/* Stats Section
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-100">
                    <div className="text-3xl font-bold text-blue-600 mb-2">Secured</div>
                    <div className="text-gray-600">Active Listings</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-100">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">₹15B+</div>
                    <div className="text-gray-600">Total Value Transacted</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-100">
                    <div className="text-3xl font-bold text-amber-600 mb-2">98%</div>
                    <div className="text-gray-600">Customer Satisfaction</div>
                </div>
            </div> */}


            {/* Filter Section */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8" >
                <h2 className="text-xl font-semibold mb-4">Filter Listings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Title Filter */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* City Filter */}
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                        <input
                            type="text"
                            id="city"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    {/* Plot Facing Filter */}
                    <div>
                        <label htmlFor="plotFacing" className="block text-sm font-medium text-gray-700">Plot Facing</label>
                        <select
                            id="plotFacing"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={plotFacing}
                            onChange={(e) => setPlotFacing(e.target.value)}
                        >
                            {facingOptions.map(option => (
                                <option key={option} value={option}>{option === "" ? "Any" : option}</option>
                            ))}
                        </select>
                    </div>

                    {/* Min Price Filter */}
                    <div>
                        <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">Min Price (₹)</label>
                        <input
                            type="number"
                            id="minPrice"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                    </div>

                    {/* Max Price Filter */}
                    <div>
                        <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">Max Price (₹)</label>
                        <input
                            type="number"
                            id="maxPrice"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>

                     {/* Active/Inactive Toggle (Checkbox) */}
                    <div className="flex items-center mt-6">
                        <input
                            id="active"
                            name="active"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            checked={active}
                            onChange={(e) => setActive(e.target.checked)}
                        />
                        <label htmlFor="active" className="ml-2 block text-sm font-medium text-gray-700">Show Active Listings</label>
                    </div>

                </div>

                {/* Filter Button */}
                <div className="mt-6 text-center">
                    <button
                        onClick={handleFilterSubmit}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>

            {/* Auction Items List Section - Using HomeAuctionList */}
            <div className="mt-8">
                {loading && <p className="text-center text-blue-600">Loading auction items...</p>}
                {error && <p className="text-center text-red-600">{error}</p>}
                {!loading && !error && auctionItems.length === 0 && (
                    <p className="text-center text-gray-600">No auction items found matching your criteria.</p>
                )}
                {!loading && !error && auctionItems.length > 0 && (
                    // Pass the fetched auctionItems to the HomeAuctionList component
                    <HomeAuctionList filteredAuctionItems={auctionItems} />
                )}
            </div>
        </Box>
    );
};

 
