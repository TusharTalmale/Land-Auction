// // import { AuctionCard } from "../cards/AuctionCard";

// // export const HomeAuctionList = ({ filteredAuctionItems }) => {

// //   const renderedAuctionItems = filteredAuctionItems.map((auction) => {
// //     return (
// //       <AuctionCard
// //         className={"h-12  w-20 border-solid border-gray-200 border-2"}
// //         auction={auction}
// //         key={auction.id}
// //       />
// //     )
// //   })

// //   return <div className="h-auto bg-myAw p-2 w-full flex flex-col col-span-1 pt-4">{renderedAuctionItems}</div>
// // };
// import { AuctionCard } from "../cards/AuctionCard";
// import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
// import { styled } from "@mui/system";

// const StyledGridContainer = styled(Grid)(({ theme }) => ({
//   padding: theme.spacing(2),
//   [theme.breakpoints.up('sm')]: {
//     padding: theme.spacing(4),
//   },
// }));

// export const HomeAuctionList = ({ filteredAuctionItems }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

//   return (
//     <Box className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
//       <StyledGridContainer container spacing={3}>
//         {filteredAuctionItems.map((auction) => (
//           <Grid 
//             item 
//             xs={12} 
//             sm={6} 
//             md={6} 
//             lg={8} 
//             key={auction.id}
//             className="transition-all duration-300 hover:scale-[1.02]"
//           >
//             <AuctionCard
//               auction={auction}
//               sx={{
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 borderRadius: '12px',
//                 boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
//                 transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                 '&:hover': {
//                   boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
//                 }
//               }}
//             />
//           </Grid>
//         ))}
//       </StyledGridContainer>
//     </Box>
//   );
// };
import { AuctionCard } from "../cards/AuctionCard";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/system";

const StyledGridContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

export const HomeAuctionList = ({ filteredAuctionItems }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <Box className="min-h-screen bg-gradient-to-b ">
      {/* Added justifyContent="center" here */}
      <StyledGridContainer container justifyContent="center">
        {filteredAuctionItems.map((auction) => (
          <Grid
            item
            xs={12}  // Full width on extra small screens
            sm={6}   // Half width on small screens (2 per row)
            md={6}   // Half width on medium screens (2 per row)
            lg={8}   // One-third width on large screens (3 per row)
            key={auction.id}
            className="transition-all    shadow-xl rounded-lg duration-300 hover:scale-[1.02]"
          >
            <AuctionCard
              auction={auction}
             
            />
          </Grid>
        ))}
      </StyledGridContainer>
    </Box>
  );
};