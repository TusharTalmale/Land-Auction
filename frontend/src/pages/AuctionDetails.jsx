import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AuctionDetailsContext } from "../contexts/AuctionDetailsContext";
import { TagContext } from "../contexts/TagContext";
import { UserContext } from "../contexts/UserContext";
import BidModal from "../components/bidModal";
import { socket } from "../socket";
import { DocumentTextIcon, TagIcon, UserIcon, HomeIcon, MapIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router-dom";
import util from "../styles/util"
import CountdownTimer from "../components/CountdownTimer"
import { TimeProgressBar } from "../components/TimeProgressBar";

export const AuctionDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const [activateModal, setActivateModal] = useState('init')
  const { auctionItem, fetchAuctionItem, userBuyingItems, fetchUserBuyingItems } = useContext(AuctionDetailsContext);
  const { tags, fetchTags } = useContext(TagContext);
  const { user, fetchUser, currentUser } = useContext(UserContext);
  const [bigImg, setBigImg] = useState('_img1.jpg')
  const [secondImg, setSecondImg] = useState('_img2.jpg')
  const [thirdImg, setThirdImg] = useState('_img3.jpg')
  const [disabled, setDisabled] = useState(false)
  const [isInactive, setIsInactive] = useState(false)
  const topRef=useRef(null)

  useEffect(() => {
    socket.on("bidUpdate", (obj) => {
      if (obj.itemId == id) fetchAuctionItem(id);
    });
  }, [])
  
  useEffect(() => {
    fetchAuctionItem(id);
    fetchTags(id);
  }, [id]);

  useEffect(() => {
    if (!currentUser) return;
    if (userBuyingItems.length < 1)
      fetchUserBuyingItems();
  }, [userBuyingItems, currentUser]);

  useEffect(() => {
    if (auctionItem?.userId) {
      fetchUser(auctionItem.userId)
      setDisabled(!currentUser || currentUser?.id == auctionItem?.userId)
      setIsInactive(auctionItem?.endTime < new Date().getTime())   
    }

    if (bigImg === "_img1.jpg" && auctionItem.id) {
      let elems = document.querySelectorAll(`img[id^="${auctionItem.id}"]`)
      elems.forEach( (el)=>{ el.onerror = () => {  el.remove()}})
      topRef.current.scrollIntoView({ behaviour: "smooth" })
    }
  }, [auctionItem?.userId, currentUser, bigImg]);

  async function handleBigImg(i) {
    const bi = bigImg[4]
    return (i == 2) ? (setBigImg(`_img${secondImg[4]}.jpg`), setSecondImg(`_img${bi}.jpg`)) : (setBigImg(`_img${thirdImg[4]}.jpg`), setThirdImg(`_img${bi}.jpg`))
  }

  const handleBtnClick = (e) => {
    if (disabled || isInactive) {
      handleDisable(e, "Place bid", "")
    } else {
      setActivateModal(!activateModal)
    }
  }

  const goChatWithSeller = (e) => {
    if (!disabled) {
      history.push(`/conversation/${auctionItem.id}/${user.id}`);
    } else {
      handleDisable(e, "Chat with seller", "You can't chat with yourself", 1)
    }
  }

  const handleDisable = (e, placeholder, replacer, skip) => {
    if (isInactive && !skip) {
      e.target.innerHTML = "This item has expired"
    } else if (currentUser) {
      e.target.innerHTML = "This is your item...<br>" + replacer
    } else {
      e.target.innerHTML = "Sign in!"
      let icon = document.getElementById('iconRef')
      icon.click()
    }
    setTimeout(() => {
      e.target.innerHTML = placeholder
      e.target.blur();
    }, 1500)
  }

  return (
    <div className=" max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BidModal activateModal={activateModal} id={id} startPrice = {auctionItem.startPrice} AuctionstartTime = {auctionItem.startTime} auctionEndTime={auctionItem.endTime} />
      <div ref={topRef}></div>

      {/* Image Gallery Section */}
      <div className="mb-3 space-y-4">
        <img 
          id={`${auctionItem.id}-1`} 
          className="w-full h-80 object-cover rounded-xl shadow-lg"
          src={"/uploads/" + auctionItem.imagePath + bigImg}
          alt="Main auction item"
        />
        <div className="flex gap-2 justify-center">
          <img 
            id={`${auctionItem.id}-2`} 
            className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-gray-200"
            src={"/uploads/" + auctionItem.imagePath + secondImg} 
            onClick={() => handleBigImg(2)}
          />
          <img 
            id={`${auctionItem.id}-3`} 
            className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-gray-200"
            src={"/uploads/" + auctionItem.imagePath + thirdImg} 
            onClick={() => handleBigImg(3)}
          />
        </div>
      </div>


      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
  {/* Title with subtle decoration */}
  <div className="text-center mb-6 relative">
    <h1 className="text-3xl font-bold text-gray-900 inline-block relative">
      {auctionItem.title}
      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></span>
    </h1>
  </div>
  
  {/* Stats Grid */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
    {/* Highest Bid */}
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="text-sm font-medium text-gray-500 mb-1">
        {auctionItem.numberOfBids > 0 ? "Highest Bid" : "Starting Price"}
      </div>
      <div className="text-xl font-bold text-gray-900">
        ₹{auctionItem.highestBid}
      </div>
    </div>
    
    {/* Time Remaining */}
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="text-sm font-medium text-gray-500 mb-1">Ends In</div>
      <CountdownTimer 
        key={auctionItem.id} 
        auctionEndTime={auctionItem.endTime} 
        className="text-xl font-bold text-gray-900"
      />
    </div>
    
    {/* Total Bids */}
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="text-sm font-medium text-gray-500 mb-1">Total Bids</div>
      <div className="text-xl font-bold text-gray-900">
        {auctionItem.numberOfBids}
      </div>
    </div>
    
    {/* Starting Price */}
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="text-sm font-medium text-gray-500 mb-1">Starting Price</div>
      <div className="text-xl font-bold text-gray-900">
        ₹{auctionItem.startPrice}
      </div>
    </div>
  </div>
  
  {/* Status Message or Bid Button */}
  {auctionItem.winner === 'true' ? (
    <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 text-green-800 p-4 rounded-lg text-center font-medium shadow-inner">
      <div className="flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
        Congratulations, you won this auction!
      </div>
    </div>
  ) : (
    <button
      onClick={(e) => handleBtnClick(e)}
      className={`w-full py-4 px-6 text-lg font-medium rounded-lg transition-all duration-200
        ${disabled || isInactive 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-sm' 
          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:-translate-y-0.5 transform transition'}
        flex items-center justify-center gap-2`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {isInactive ? 'Auction Ended' : 'Place Bid'}
    </button>
  )}
</div>
 {/* Time progress bar */}
 <TimeProgressBar 
        startTime={auctionItem.startTime} 
        endTime={auctionItem.endTime} 
      />
      {/* Description & Details Sections */}
     
      <div className="space-y-8" >
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200" >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3 text-gray-800">
            <DocumentTextIcon className="w-6 h-6 text-blue-600" />
            Description
          </h2>
          <div className="text-gray-700 leading-relaxed prose max-w-none">
            {auctionItem?.description || 'No description available.'} {/* Default text if no description */}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3 text-gray-800">
            <TagIcon className="w-6 h-6 text-blue-600" />
            Tags
             {tags.length === 0 && <span className="text-base font-normal text-gray-500 ml-2">(No tags available)</span>} {/* Adjusted size and weight, added margin */}
          </h2>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200" // Added border to tags
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>

        {/* Property Details */}

        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200"> {/* Increased padding */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3 border-b pb-4">
            <HomeIcon className="w-7 h-7 text-blue-600" /> {/* Slightly larger icon */}
            Property Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8 text-gray-700">
            {/* Core Property Details */}
            <DetailItem label="Plot Size" value={auctionItem?.plotSize ? `${auctionItem.plotSize} sq ft` : 'N/A'} /> {/* Added optional chaining */}
            <DetailItem label="Facing" value={auctionItem?.plotFacing || 'N/A'} /> {/* Added optional chaining and fallback */}
            {/* Assuming plotSector and plotBlock might be relevant */}
             <DetailItem label="Sector" value={auctionItem?.plotSector || 'N/A'} /> {/* Added optional chaining and fallback */}
             <DetailItem label="Block" value={auctionItem?.plotBlock || 'N/A'} /> {/* Added optional chaining and fallback */}
            <DetailItem label="Ownership" value={auctionItem?.ownershipType || 'N/A'} /> {/* Added optional chaining and fallback */}
             {/* Add more core details here if available and appropriate for the initial grid row */}


            {/* Location Details Group - Spans across columns for visual grouping */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8 sm:col-span-2 lg:col-span-3 border-t pt-6 mt-6"> {/* Applied the grid directly to the spanning div and adjusted spacing */}
                 <h3 className="text-xl font-semibold text-gray-800 sm:col-span-2 lg:col-span-3 mb-4 -mt-2">Location Information</h3> {/* Made heading span columns, slightly adjusted negative margin */}
                 <DetailItem label="Address" value={auctionItem?.address || 'N/A'} /> {/* Added optional chaining and fallback */}
                 <DetailItem label="City" value={auctionItem?.city || 'N/A'} /> {/* Added optional chaining and fallback */}
                 <DetailItem label="State" value={auctionItem?.state || 'N/A'} /> {/* Added optional chaining and fallback */}
                 <DetailItem label="Pincode" value={auctionItem?.pinCode || 'N/A'} /> {/* Added optional chaining and fallback */}
                 <DetailItem label="Landmarks" value={auctionItem?.landmarks || 'None specified'} /> {/* Added optional chaining and fallback */}
            </div>
            </div>     </div>

        {/* Location Map */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MapIcon className="w-5 h-5 text-blue-600" />
            Location
          </h2>
          <div className="h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center">
            <p className="text-gray-400">Map view coming soon</p>
          </div>
        </div>

        {/* Seller Info */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserIcon className="w-8 h-8 text-blue-600 bg-blue-100 p-1.5 rounded-full" />
              <div>
                <h3 className="font-semibold text-gray-900">{user?.username}</h3>
                <p className="text-sm text-gray-500">Seller</p>
              </div>
            </div>
            <button
              onClick={(e) => goChatWithSeller(e)}
              className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Chat with Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for property details
const DetailItem = ({ label, value }) => (
  // Adjusted padding and border for items within the grids
  <div className="items-start py-2 border-b border-gray-200 last:border-b-0"> {/* Aligned items-start, slightly less vertical padding */}
    <span className="font-medium text-gray-600">{label}:</span> {/* Added colon for clarity */}
    <span className="text-gray-800 font-semibold text-right ml-4">{value || 'N/A'}</span> {/* Aligned value to the right, added left margin */}
  </div>
);
