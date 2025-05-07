// import { useContext, useState, useEffect } from "react";
// import { AuctionDetailsContext } from "../contexts/AuctionDetailsContext";
// import { UserContext } from "../contexts/UserContext";
// import { useHistory } from "react-router-dom";

// export const Buying = () => {
//   const { userBuyingItems, fetchUserBuyingItems } = useContext(AuctionDetailsContext);
//   const { currentUser } = useContext(UserContext);

//   //for render mapping
//   const [currentAuctions, setCurrentAuctions] = useState([]);
//   const [wonAuctions, setWonAuctions] = useState([]);
//   const [lostAuctions, setLostAuctions] = useState([]);

//   //toggles
//   const [toggleBidding, setToggleBidding] = useState(true);
//   const [toggleWon, setToggleWon] = useState(true);
//   const [toggleLost, setToggleLost] = useState(true);

//   const history = useHistory();
//   const currentTime = new Date().getTime();



//   useEffect(() => {
//     if (!currentUser) return
//     fetchUserBuyingItems();
//   }, [currentUser]);

//   useEffect(() => {
//     let currentAuctionsTemp = []
//     let wonAuctionsTemp = []
//     let lostAuctionsTemp = []
//     userBuyingItems.map((item) => {
//       item.endTime > currentTime
//         ? currentAuctionsTemp.push(item)
//         : item.highestBid > item.userBid
//           ? lostAuctionsTemp.push(item)
//           : wonAuctionsTemp.push(item);
//     });
//     setCurrentAuctions(currentAuctionsTemp)
//     setWonAuctions(wonAuctionsTemp)
//     setLostAuctions(lostAuctionsTemp)


//   }, [userBuyingItems]);


//   return (
//     <div className="bg-myAw h-full pb-20">
//       <div className="w-full text-center font-myHtext text-4xl py-6">Buying</div>
//       <div className="font-bold font-myHtext text-xl py-2 mx-3 border-b-4 flex justify-between">
//         <span>Currently bidding on</span>
//         <button className="text-base underline" onClick={() => setToggleBidding(p => !p)}> {toggleBidding ? "Hide" : "Show"}</button>
//       </div>
//       {toggleBidding && currentAuctions.map((item) => (
//         <div className="bg-white mx-3 my-2 px-2 py-1 border border-solid" key={item.id} onClick={() => { history.push(`/auction-details/${item.id}`) }} >
//           <div className="font-myPtext text-lg">{item.title}</div>
//           <div className="w-full flex justify-items-start text-xs py-0.5">
//             <div className="w-4/12 bg-myPr-dark p-1 rounded-sm mr-1 text-center">
//               <span className="text-myGr-light">Your bid : </span>
//               <span className="text-white">{item.userBid + " €"}</span>
//             </div>
//             <div className="w-4/12 bg-myGr-light p-1 mr-1 rounded-sm text-center">
//               <span className="text-black">Current : </span>
//               <span className="text-white">{item.highestBid + " €"}</span>
//             </div>
//             <div className="w-5/12 text-right" key={item.id}>{<LocalCountdown className="text-black" auctionEndTime={item.endTime} />}</div>
//           </div>
//         </div>
//       ))}
//       <br />
//       <div className="font-bold font-myHtext text-xl py-2 mx-3 border-b-4 flex justify-between">
//         <span>Won Auctions</span>
//         <button className="text-base underline" onClick={() => setToggleWon(p => !p)}> {toggleWon ? "Hide" : "Show"}</button>
//       </div>
//       {toggleWon && wonAuctions.map((item) => (
//         <div className="mx-3 my-2 px-2 py-1 border border-solid bg-gray-200 rounded-sm" key={item.id} onClick={() => { history.push(`/auction-details/${item.id}`) }}>
//           <div className="text-sm flex justify-between text-gray-500">
//             <div className="font-myPtext whitespace-nowrap overflow-x-hidden font-bold overflow-ellipsis" style={{ maxWidth: "150px" }} >{item.title}</div>
//             <div className="flex justify-end">
//               <div className="text-xs mr-2 leading-5"> {new Date(+item.endTime).toLocaleDateString()}  </div>
//               <div className="w-20 bg-gray-400 p-px pl-1 text-left rounded-sm">
//                 <span className="text-xs font-normal text-black">Paid:  </span>
//                 <span className="text-xs text-white font-bold">{item.highestBid + " €"}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//       <br />
//       <div className="bg-myAwfont-bold font-myHtext text-xl pb-2 mt-4 mx-3 border-b-4 flex justify-between ">
//         <span>Lost Auctions</span>
//         <button className="text-base underline" onClick={() => setToggleLost(p => !p)}> {toggleLost ? "Hide" : "Show"}</button>
//       </div>
//       {toggleLost && lostAuctions.map((item) => (
//         <div className="text-sm mx-3 my-2 px-2 py-1 border border-solid bg-gray-200 rounded-sm" key={item.id}>
//           <div className=" whitespace-nowrap overflow-x-hidden font-bold overflow-ellipsis flex justify-between text-gray-500">
//             <div className="font-myPtext font-bold" style={{ maxWidth: "150px" }}>{item.title}</div>
//             <div className="flex justify-end">
//               <div className="text-xs mr-2 font-normal leading-5"> {new Date(+item.endTime).toLocaleDateString()}  </div>
//               <div className="w-20 bg-gray-400 p-px pl-1 text-left rounded-sm">
//                 <span className="text-xs font-normal text-black">Price: </span>
//                 <span className="text-xs text-white font-bold">{item.highestBid + " €"}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };



// export default function LocalCountdown({ auctionEndTime }) {
//   const [currentTime] = useState(new Date().getTime());
//   const [countdown, setCountdown] = useState(auctionEndTime - currentTime);
//   const [formattedTime, setFormattedTime] = useState(["..."]);

//   const formatTime = () => {
//     let format = [];
//     let days = Math.floor(countdown / (1000 * 60 * 60 * 24));
//     let hours = Math.floor((countdown / (1000 * 60 * 60)) % 24);
//     let minutes = Math.floor((countdown / (1000 * 60)) % 60);
//     let seconds = Math.floor((countdown / 1000) % 60);

//     if (countdown < 0) {
//       format = ["Auction expired"];
//     }
//     if (countdown > 172800000) {
//       format = [days, " days"];
//     }
//     if (countdown > 86400000 && countdown < 172800000) {
//       format = [days, " day "];
//     }
//     if (countdown > 3600000 && countdown < 86400000) {
//       format = [hours, " hours"];
//     }
//     if (countdown > 60000 && countdown < 3600000) {
//       format = [minutes, " min ", seconds, " s"];
//     }
//     if (countdown > 0 && countdown < 60000) {
//       format = [seconds, " s"];
//     }
//     return format;
//   };

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCountdown(countdown - 1000);
//       setFormattedTime(formatTime());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [countdown]);

//   return <div>{formattedTime}</div>;
// }

import { useContext, useState, useEffect } from "react";
import { AuctionDetailsContext } from "../contexts/AuctionDetailsContext";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";

// SVG Icons with better sizing
const ClockIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
);

const TrophyIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
  </svg>
);

const XCircleIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
  </svg>
);

export const Buying = () => {
  const { userBuyingItems, fetchUserBuyingItems } = useContext(AuctionDetailsContext);
  const { currentUser } = useContext(UserContext);
  const history = useHistory();
  
  const [currentAuctions, setCurrentAuctions] = useState([]);
  const [wonAuctions, setWonAuctions] = useState([]);
  const [lostAuctions, setLostAuctions] = useState([]);
  
  const [toggleBidding, setToggleBidding] = useState(true);
  const [toggleWon, setToggleWon] = useState(true);
  const [toggleLost, setToggleLost] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    fetchUserBuyingItems();
  }, [currentUser]);

  useEffect(() => {
    const now = Date.now();
    const { current, won, lost } = userBuyingItems.reduce((acc, item) => {
      if (item.endTime > now) {
        acc.current.push(item);
      } else {
        item.highestBid > item.userBid ? acc.lost.push(item) : acc.won.push(item);
      }
      return acc;
    }, { current: [], won: [], lost: [] });
    
    setCurrentAuctions(current);
    setWonAuctions(won);
    setLostAuctions(lost);
  }, [userBuyingItems]);

  const AuctionSection = ({ title, items, toggle, setToggle, icon, children }) => (
    <div className="mb-8 bg-white rounded-xl shadow-md overflow-hidden">
      <div 
        className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setToggle(!toggle)}
      >
        <div className="flex items-center space-x-3">
          <span className="text-blue-500">{icon}</span>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full text-sm font-medium">
            {items.length}
          </span>
        </div>
        <button className="text-gray-500 hover:text-gray-700 transition-colors">
          {toggle ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
      </div>
      {toggle && (
        <div className="border-t border-gray-200">
          {items.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {items.map(children)}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              No {title.toLowerCase()} found
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8" style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('src/images/createback.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Bidding Activity</h1>
          <p className="text-gray-600">Track all your active and completed bids</p>
        </div>

        <div className="space-y-6">
          <AuctionSection
            title="Active Bids"
            items={currentAuctions}
            toggle={toggleBidding}
            setToggle={setToggleBidding}
            icon={<ClockIcon className="w-6 h-6" />}
          >
            {(item) => (
              <div 
                key={item.id}
                onClick={() => history.push(`/auction-details/${item.id}`)}
                className="p-5 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">{item.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <ClockIcon className="w-3 h-3 mr-1" />
                        <LocalCountdown auctionEndTime={item.endTime} />
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end">
                    <div className="flex gap-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Current: ₹{item.highestBid}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        Your Bid: ₹{item.userBid}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </AuctionSection>

          <AuctionSection
            title="Won Auctions"
            items={wonAuctions}
            toggle={toggleWon}
            setToggle={setToggleWon}
            icon={<TrophyIcon className="w-6 h-6 text-yellow-500" />}
          >
            {(item) => (
              <div 
                key={item.id}
                onClick={() => history.push(`/auction-details/${item.id}`)}
                className="p-5 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">{item.title}</h3>
                    <div className="text-sm text-gray-500 mt-1">
                      Won on {new Date(item.endTime).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Winning Bid: ₹{item.highestBid}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </AuctionSection>

          <AuctionSection
            title="Lost Auctions"
            items={lostAuctions}
            toggle={toggleLost}
            setToggle={setToggleLost}
            icon={<XCircleIcon className="w-6 h-6 text-red-500" />}
          >
            {(item) => (
              <div className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">{item.title}</h3>
                    <div className="text-sm text-gray-500 mt-1">
                      Ended on {new Date(item.endTime).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2 sm:mt-0">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                      Final Price: ₹{item.highestBid}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      Your Bid: ₹{item.userBid}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </AuctionSection>
        </div>
      </div>
    </div>
  );
};

const LocalCountdown = ({ auctionEndTime }) => {
  const [timeLeft, setTimeLeft] = useState(auctionEndTime - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = auctionEndTime - Date.now();
      setTimeLeft(newTime > 0 ? newTime : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, [auctionEndTime]);

  const formatTime = () => {
    if (timeLeft <= 0) return "Ended";
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  return <span>{formatTime()}</span>;
};