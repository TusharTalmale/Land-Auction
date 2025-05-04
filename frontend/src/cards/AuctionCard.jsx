import { useHistory } from "react-router-dom";
import CountdownTimer from "../components/CountdownTimer";

export const AuctionCard = ({ auction, sx }) => { // Added sx prop here
  const history = useHistory();

  const goToAuctionDetails = () => {
    history.push(`/auction-details/${auction.id}`);
  };

  return (
    // Main container: flex-col on mobile, flex-row on sm and up. Removed fixed height (h-30). Added sx for external styles.
    <div
      onClick={goToAuctionDetails}
      className="flex flex-col sm:flex-row bg-white p-3"
    
      sx={sx} >
      {/* Image Container: full width on mobile, fixed width on sm and up. flex-shrink-0 prevents it from shrinking. Added spacing below image on mobile and to the right on sm+. */}
      <div className="w-full sm:w-32 flex-shrink-0 mb-2 sm:mb-0 sm:mr-4">
        {/* Image: full width and auto height on mobile, fixed w/h on sm+. object-cover to maintain aspect ratio */}
        {false ? ( 
          <img
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
            alt="Placeholder"
            className="w-full h-32 object-cover rounded-md sm:w-32 sm:h-32" // Added rounded corners
          />
        ) : (
          <img
            className="w-full object-cover  sm:w-32 sm:h-32" // Added rounded corners
            src={`uploads/${auction.imagePath}_img1.jpg`}
            alt=""
          />
        )}
      </div>

      {/* Text Content Container: Takes remaining width. flex-col to stack internal content. Removed fixed height (h-32). Added padding. */}
      <div className="flex flex-col ml-10 w-full p-1">

        {/* Title: Uses available space. Removed fixed height (h-1/2) and col-span. Added margin bottom. */}
        <div className="font-myHtext font-bold leading-tight mb-2 flex-grow"> {/* Added flex-grow to take available vertical space */}
          {auction.title}
        </div>

        {/* Price Row: flex row, justify between items. items-center for vertical alignment. Removed empty w-1/2 div. */}
        <div className="w-full flex justify-between items-center mb-1">
          <div className="font-myPtext text-black text-base font-bold">
            {auction.highestBid === "0"
              ? `${auction.startPrice} Rs`
              : `${auction.highestBid} Rs`}
          </div>
        </div>

        {/* Bids and Timer Row: flex row, justify between items. items-center for vertical alignment. */}
        <div className="w-full flex justify-between items-center text-sm"> {/* Moved text-sm up */}
          <div className="font-myPtext text-black"> {/* Removed w-1/3 */}
            {auction.numberOfBids} bids
          </div>
          <div className="font-myPtext mr-20 font-bold text-right text-danger "> {/* Removed w-2/3 */}
            {<CountdownTimer auctionEndTime={auction.endTime} />}
          </div>
        </div>
      </div>
    </div>
  );
};