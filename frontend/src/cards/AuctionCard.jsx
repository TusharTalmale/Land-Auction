import { useHistory } from "react-router-dom";
import { TimeProgressBar } from "../components/TimeProgressBar";

export const AuctionCard = ({ auction, sx }) => { // Added sx prop here
  const history = useHistory();

  const goToAuctionDetails = () => {
    history.push(`/auction-details/${auction.id}`);
  };
  return (
    <div
      onClick={goToAuctionDetails}
      className="cursor-pointer mb-2 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
    >
    
<div className="mx-auto flex max-w-sm items-center gap-x- rounded-xl bg-white  shadow-lg outline outline-black/5 ">
        <img
          src={
            false
              ? "https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              : `uploads/${auction.imagePath}_img1.jpg`
          }
          alt={auction.title}
          className="w-full h-full rounded-xl object-cover"
        />
        {console.log('a',auction)}
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between flex-grow w-full gap-3">
        {/* Title */}
        <div className="flex justify-between items-center">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
         Title :  {auction.title}
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400"> {auction.city} , {auction.state}</span>
</div>
        {/* Price + Bid Count */}
        <div className="flex justify-between items-center">
          <span className="text-green-600 dark:text-green-400 font-bold text-base sm:text-lg">
            {/* {auction.highestBid === "0"
              ? ` ₹ ${auction.startPrice} `
              : `₹ ${auction.highestBid} `} */}
              ₹ {auction.startPrice}  
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {auction.numberOfBids} bid{auction.numberOfBids !== 1 && "s"}
          </span>
        </div>

       
         {/* Time progress bar */}
         <TimeProgressBar
                startTime={auction.startTime} 
                endTime={auction.endTime} 
              />
      </div>
    </div>
  );
};
