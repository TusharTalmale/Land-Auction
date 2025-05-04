import { HomeAuctionList } from "../lists/HomeAuctionList";
import { useEffect, useState, useContext } from "react";
import { Search } from "../components/search/Search";
import { AuctionDetailsContext } from "../contexts/AuctionDetailsContext";
import { Categories } from "../components/search/Categories";
import homeTop from "../images/auction.jpg"; // Ensure this path is absolutely correct!
import {
  Container,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";

// Styled component for the Hero section using background-image
const HeroSection = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '50vh', // Generous height for the hero
  width: '100%',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column', // Stack content vertically
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  // Use background-image CSS property
  backgroundImage: `url(${homeTop})`, // Use the imported image as background
  backgroundSize: 'cover', // Cover the entire area
  backgroundPosition: 'center', // Center the background image
  backgroundRepeat: 'no-repeat', // Do not repeat the image
  color: 'white', // Default text color for the hero content
  // Add an overlay using a pseudo-element or directly on the container
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // Darker, slightly earthy overlay for a land theme
    background: 'rgba(50, 40, 30, 0.6)', // Dark brown/grey with transparency
    zIndex: 0, // Ensure overlay is between background and text
  },
}));

// Styled box for the main hero text content
const HeroContent = styled(Box)({
  position: 'relative',
  zIndex: 1, // Ensure text is on top of the overlay
  padding: '0 16px', // Add some horizontal padding
});


export const Home = () => {
  const [page, setPage] = useState(0);
  const { filteredAuctionItems, fetchFilteredAuctionItems } = useContext(AuctionDetailsContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));


  // DEFAULT FILTER PARAMETERS IN HOME PAGE. EVERYTHING IS SET TO NULL
  const [filterParams, setFilterParams] = useState({
    search: null,
    categoryId: null,
    priceFrom: null,
    priceTo: null,
    buttonSelection: "default",
    page: page
  });

  useEffect(() => {
    if (page !== 0) {
      setFilterParams((prev) => ({ ...prev, page: page }))
    }
  }, [page])

  useEffect(() => {
    // Review this reset logic if it causes issues
    if (filterParams.page === 0 && page !== 0) {
      setPage(0);
    }
  }, [filterParams, page]);


  useEffect(() => {
    const x = setTimeout(() => {
      fetchFilteredAuctionItems(filterParams);
    }, 500); // Debounce the fetch
    return () => {
      clearTimeout(x);
    };
  }, [filterParams, fetchFilteredAuctionItems]);


  return (
    <Box className="min-h-screen bg-gray-100">
      {/* Hero Section - Land Auction Theme */}
      {/* Using the styled HeroSection component with background-image */}
      <HeroSection>
        {/* No need for an <img> tag here, the image is set via CSS background */}
        {/* Using the styled HeroContent box */}
        <HeroContent>
          {/* Updated text for Land Auction theme */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-md mb-4">
            Find Your Perfect Piece of Land
          </h1>
          {/* Updated text for Land Auction theme */}
          <p className="text-lg md:text-xl text-gray-200 opacity-95 max-w-3xl mx-auto">
            Browse and bid on land properties for sale.
          </p>
        </HeroContent>
      </HeroSection>

      {/* Main Content */}
      <Container maxWidth="xl" className="py-8 px-4 lg:px-8">
        {/* Search and Filters - Layout Improved */}
        <Box
          className={`relative -mt-20 -mb-10 z-10 bg-white shadow-xl rounded-lg p-6 ${isMobile ? 'mx-auto w-11/12' : 'mx-auto max-w-4xl'}`} // Centered, wider on larger screens, higher shadow
        >
          {/* Using flexbox or a more refined grid for layout */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: isMedium ? 'column' : 'row', // Stack on medium/small, side-by-side on large
              gap: isMedium ? theme.spacing(3) : theme.spacing(4), // Add space between items
              alignItems: isMedium ? 'stretch' : 'flex-start', // Stretch items in column, align to start in row
            }}
          >
            <Box sx={{ flexGrow: 1 }}> {/* Search takes available space */}
              <Search handleFilters={setFilterParams} />
            </Box>

            <Box sx={{ width: isMedium ? '100%' : 'auto' }}> {/* Categories adjusts width */}
              {/* Assuming Categories component is relevant to land types (Residential, Commercial, etc.) */}
              <Categories handleFilters={setFilterParams} />
            </Box>
          </Box>
        </Box>

     
 
                {/* Auction List */}    

        <Box className="mb-8 ">

          <HomeAuctionList filteredAuctionItems={filteredAuctionItems} />

        </Box>



        {/* Load More Button */}

        <Box className="text-center mt-8">

          <Button

            variant="contained"

            color="primary"

            size="large"

            onClick={() => setPage(page + 1)}

            className="py-3 px-12 rounded-full shadow-lg hover:shadow-xl transition-all"

            sx={{

              background: 'linear-gradient(45deg, #6B46C1 30%, #805AD5 90%)',

              '&:hover': {

                transform: 'translateY(-2px)'

              }

            }}

          >

            Load More

          </Button>

        </Box>

      </Container>
    </Box>
  );
};
