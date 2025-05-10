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

import createBack from "../images/createback.jpg";

// Styled components
const HeroSection = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '70vh',
  width: '100%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  backgroundImage: `
    url(${homeTop})
  `,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
 
}));


const HeroContent = styled('div')({
  position: 'relative',
  zIndex: 1,
  padding: '0 1.5rem',
  animation: 'fadeInUp 1s ease-out',
  '& h1': {
    textShadow: '2px 4px 8px rgba(0,0,0,0.3)',
    letterSpacing: '-0.05em',
    lineHeight: 1.1,
    marginBottom: '1.5rem',
  
  },
  '& p': {
    textShadow: '1px 2px 4px rgba(0,0,0,0.2)',
    backdropFilter: 'blur(2px)',
    padding: '0.5rem 1rem',
    borderRadius: '12px',
    display: 'inline-block'
  },
  '@keyframes fadeInUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  }
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
    
    <HeroSection>
  <HeroContent>
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 transform transition-all duration-500 hover:scale-105">
      Discover Your Dream Land
    </h1>
    <p className="text-xl md:text-2xl text-gray-100 opacity-95 max-w-2xl mx-auto mb-8 font-medium">
      Explore & Invest in Premium Earth Properties
    </p>
    <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      Start Exploring
    </button>
  </HeroContent>
</HeroSection>

     {/* Main Content */}
<Container maxWidth="xl" className="py-8 px-4 lg:px-8"   style={{
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${createBack})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundAttachment: 'fixed',
  backgroundRepeat: 'no-repeat'
}}
>
  {/* Floating Filter Section */}
  <Box className={`relative -mt-24 -mb-12 z-10 bg-gradient-to-br from-white to-blue-50 shadow-2xl rounded-2xl p-6 ${isMobile ? 'mx-auto w-11/12' : 'mx-auto max-w-5xl'}`}
    sx={{
      border: '1px solid rgba(255,255,255,0.3)',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'translateY(-2px)'
      }
    }}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMedium ? 'column' : 'row',
        gap: isMedium ? theme.spacing(3) : theme.spacing(4),
        alignItems: 'stretch',
      }}
    >
      {/* Search Area */}
      <Box sx={{ 
        flexGrow: 1,
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: '2px',
          height: '60%',
          bgcolor: isMedium ? 'transparent' : 'divider',
          borderRadius: '2px'
        }
      }}>
        <Search handleFilters={setFilterParams} />
      </Box>

      {/* Categories */}
      <Box sx={{ 
        width: isMedium ? '100%' : 'auto',
        pl: isMedium ? 0 : 4,
        position: 'relative'
      }}>
        <Categories handleFilters={setFilterParams} />
      </Box>
    </Box>
  </Box>

  {/* Auction List */}
  <Box className="mb-2" sx={{
    mt: 8,
    position: 'relative',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: -20,
      left: '50%',
      transform: 'translateX(-50%)',
   
      background: 'linear-gradient(to right, transparent 0%, #e0e7ff 50%, transparent 100%)'
    }
    
  }}

  >
    <HomeAuctionList filteredAuctionItems={filteredAuctionItems} />
  </Box>

  {/* Load More Button */}
  <Box className="text-center mt-12" sx={{
    position: 'relative',
    zIndex: 1
  }}>
    <Button
      variant="contained"
      size="large"
      onClick={() => setPage(page + 1)}
      className="py-4 px-16 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all"
      sx={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        fontSize: '1.125rem',
        fontWeight: 700,
        letterSpacing: '0.025em',
        '&:hover': {
          transform: 'scale(1.05) rotate(-1deg)',
          background: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)',
          boxShadow: '0 10px 20px rgba(99,102,241,0.3)'
        },
        '&:active': {
          transform: 'scale(0.98)'
        }
      }}
    >
      Show More Properties
    </Button>
  </Box>
</Container>
    </Box>
  );
};
