// // import { useContext, useState, useEffect, useMemo } from "react";
// // import { AuctionDetailsContext } from "../contexts/AuctionDetailsContext";
// // import { UserContext } from "../contexts/UserContext";
// // import { useHistory } from "react-router-dom";

// // export const Selling = () => {
// //   const { userSellingItems, fetchUserSellingItems } = useContext(AuctionDetailsContext);
// //   const {currentUser} = useContext(UserContext)
// //   const [activeItems, setActivateItems] = useState([]);
// //   const [inactiveItems, setInactivateItems] = useState([]);
// //   const [toggleSelling,setToggleSelling]=useState(true)
// //   const [toggleHistory, setToggleHistory] = useState(true);
// //   const history=useHistory()

// //   const now =new Date().getTime()

// //     useEffect(() => {
// //       if (!currentUser) return;
// //       fetchUserSellingItems();    
// //     }, [currentUser]);

// //     useEffect(() => {
// //     let activeTemp=[]
// //     let inactiveTemp=[]
// //       userSellingItems.map((item) => {
// //         item.endTime > now ? activeTemp.push(item): inactiveTemp.push(item);
// //       });
// //       setActivateItems(activeTemp)
// //       setInactivateItems(inactiveTemp)
// //     }, [userSellingItems]);


// //   return (
// //     <div className="bg-myAw h-full pb-20">
// //       <div className="w-full text-center font-myHtext text-4xl  py-6">Selling</div>
// //       <div className="font-bold text-xl font-myHtext py-2 mx-3 border-b-4 flex justify-between">
// //         <span>Currently selling</span>
// //         <button className="text-base underline" onClick={()=>setToggleSelling(p=>!p)}> {toggleSelling?"Hide":"Show"}</button>
// //       </div>
// //       {toggleSelling&& activeItems.map((item) => (
// //         <div className="bg-white mx-3 my-2 px-2 py-1 border border-solid" key={item.id} onClick={()=>{history.push(`/auction-details/${item.id}`)}} >
// //           <div className="font-myPtext text-lg">{item.title}</div>
// //           <div className="w-full flex justify-items-start text-xs py-0.5">
// //             <div className="w-3/12 bg-myPr-dark p-px rounded-sm mr-1 text-center">
// //               <span className="text-myGr-light">Bids : </span>
// //               <span className="text-white">{item.numberOfBids}</span>
// //             </div>
// //             <div className="w-4/12 bg-myGr-light p-px mr-1 rounded-sm text-center">
// //               <span className="text-myPr-dark">{item.numberOfBids > 0 ? "Highest Bid: " : "Start price: "}</span>
// //               <span className="text-white">{item.highestBid}</span>
// //             </div>
// //             <div className="w-5/12 text-right" key={item.id}>{<LocalCountdown className="text-black" auctionEndTime={item.endTime}/>}</div>
// //           </div>
// //         </div>
// //       ))}
// //       <br />
// //       <div className="font-bold font-myHtext py-2 mx-3 border-b-4 flex justify-between">
// //         <span>Passed items</span>
// //         <button className="text-base underline" onClick={()=>setToggleHistory(p=>!p)}> {toggleHistory?"Hide":"Show"}</button>
// //       </div>
// //       {toggleHistory && inactiveItems.map((item) => (
// //         <div className="mx-3 my-2 px-2 py-1 border border-solid bg-gray-200 rounded-sm" key={item.id}>
// //           <div className="text-sm flex justify-between text-gray-500">
// //             <div className="font-myPtext whitespace-nowrap overflow-x-hidden font-bold overflow-ellipsis" style={{ maxWidth: "150px" }} >{item.title}</div>
// //             <div className="flex justify-end">
// //               <div className="text-xs mr-2 leading-5"> {new Date(+item.endTime).toLocaleDateString()}  </div>
// //               <div className="w-20 bg-gray-400 p-px pl-1 text-left rounded-sm">
// //                 <span className="text-xs font-normal text-black">Price: </span>
// //                 <span className="text-white font-bold">{item.highestBid + " €"}</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };



// // export default function LocalCountdown({ auctionEndTime }) {
// //   const [currentTime] = useState(new Date().getTime());
// //   const [countdown, setCountdown] = useState(auctionEndTime - currentTime);
// //   const [formattedTime, setFormattedTime] = useState(["..."]);

// //   const formatTime = () => {
// //     let format = [];
// //     let days = Math.floor(countdown / (1000 * 60 * 60 * 24));
// //     let hours = Math.floor((countdown / (1000 * 60 * 60)) % 24);
// //     let minutes = Math.floor((countdown / (1000 * 60)) % 60);
// //     let seconds = Math.floor((countdown / 1000) % 60);

// //     if (countdown < 0) {
// //       format = ["Auction expired"];
// //     }
// //     if (countdown > 172800000) {
// //       format = [days, " days"];
// //     }
// //     if (countdown > 86400000 && countdown < 172800000) {
// //       format = [days, " day "];
// //     }
// //     if (countdown > 3600000 && countdown < 86400000) {
// //       format = [hours, " hours"];
// //     }
// //     if (countdown > 60000 && countdown < 3600000) {
// //       format = [minutes, " min ", seconds, " s"];
// //     }
// //     if (countdown > 0 && countdown < 60000) {
// //       format = [seconds, " s"];
// //     }
// //     return format;
// //   };

// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setCountdown(countdown - 1000);
// //       setFormattedTime(formatTime());
// //     }, 1000);
// //     return () => clearInterval(timer);
// //   },[countdown]);

// //   return <div>{formattedTime}</div>;
// // }
// import { useContext, useState, useEffect } from "react";
// import { AuctionDetailsContext } from "../contexts/AuctionDetailsContext";
// import { UserContext } from "../contexts/UserContext";
// import { useHistory } from "react-router-dom";

// export const Selling = () => {
//   const { userSellingItems, fetchUserSellingItems } = useContext(AuctionDetailsContext);
//   const { currentUser } = useContext(UserContext);
//   const [activeItems, setActiveItems] = useState([]);
//   const [inactiveItems, setInactiveItems] = useState([]);
//   const [toggleSelling, setToggleSelling] = useState(true);
//   const [toggleHistory, setToggleHistory] = useState(true);
//   const history = useHistory();

//   const now = new Date().getTime();

//   useEffect(() => {
//     if (!currentUser) return;
//     fetchUserSellingItems();    
//   }, [currentUser]);

//   useEffect(() => {
//     const activeTemp = [];
//     const inactiveTemp = [];
//     userSellingItems.forEach((item) => {
//       item.endTime > now ? activeTemp.push(item) : inactiveTemp.push(item);
//     });
//     setActiveItems(activeTemp);
//     setInactiveItems(inactiveTemp);
//   }, [userSellingItems]);

//   return (
//     <div className="min-h-screen bg-gray-50 pb-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center py-8">
//           <h1 className="text-3xl font-bold text-gray-900">Your Listings</h1>
//           <p className="mt-2 text-lg text-gray-600">Manage your active and past auctions</p>
//         </div>

//         {/* Active Listings Section */}
//         <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
//           <div 
//             className="px-6 py-4 border-b border-gray-200 flex justify-between items-center cursor-pointer"
//             onClick={() => setToggleSelling(!toggleSelling)}
//           >
//             <h2 className="text-xl font-semibold text-gray-800">
//               Active Listings ({activeItems.length})
//             </h2>
//             <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
//               {toggleSelling ? 'Hide' : 'Show'}
//             </button>
//           </div>
          
//           {toggleSelling && (
//             <div className="divide-y divide-gray-200">
//               {activeItems.length > 0 ? (
//                 activeItems.map((item) => (
//                   <div 
//                     key={item.id} 
//                     className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
//                     onClick={() => history.push(`/auction-details/${item.id}`)}
//                   >
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//                       <div className="flex-1 min-w-0">
//                         <h3 className="text-lg font-medium text-gray-900 truncate">{item.title}</h3>
//                         <div className="mt-1 flex flex-wrap gap-2">
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
//                             {item.numberOfBids} {item.numberOfBids === 1 ? 'bid' : 'bids'}
//                           </span>
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                             {item.numberOfBids > 0 ? `€${item.highestBid}` : `Starting at €${item.highestBid}`}
//                           </span>
//                         </div>
//                       </div>
//                       <div className="mt-2 sm:mt-0 sm:ml-4">
//                         <LocalCountdown auctionEndTime={item.endTime} />
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="px-6 py-8 text-center">
//                   <p className="text-gray-500">You don't have any active listings</p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Past Listings Section */}
//         <div className="bg-white shadow rounded-lg overflow-hidden">
//           <div 
//             className="px-6 py-4 border-b border-gray-200 flex justify-between items-center cursor-pointer"
//             onClick={() => setToggleHistory(!toggleHistory)}
//           >
//             <h2 className="text-xl font-semibold text-gray-800">
//               Past Listings ({inactiveItems.length})
//             </h2>
//             <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
//               {toggleHistory ? 'Hide' : 'Show'}
//             </button>
//           </div>
          
//           {toggleHistory && (
//             <div className="divide-y divide-gray-200">
//               {inactiveItems.length > 0 ? (
//                 inactiveItems.map((item) => (
//                   <div key={item.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//                       <div className="flex-1 min-w-0">
//                         <h3 className="text-lg font-medium text-gray-900 truncate">{item.title}</h3>
//                         <p className="mt-1 text-sm text-gray-500">
//                           Ended on {new Date(+item.endTime).toLocaleDateString()}
//                         </p>
//                       </div>
//                       <div className="mt-2 sm:mt-0 sm:ml-4">
//                         <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
//                           Sold for €{item.highestBid}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="px-6 py-8 text-center">
//                   <p className="text-gray-500">No past listings to show</p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function LocalCountdown({ auctionEndTime }) {
//   const [currentTime] = useState(new Date().getTime());
//   const [countdown, setCountdown] = useState(auctionEndTime - currentTime);

//   const formatTime = () => {
//     if (countdown < 0) {
//       return <span className="text-red-600 font-medium">Ended</span>;
//     }

//     const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((countdown / (1000 * 60 * 60)) % 24);
//     const minutes = Math.floor((countdown / (1000 * 60)) % 60);
//     const seconds = Math.floor((countdown / 1000) % 60);

//     if (days > 2) {
//       return (
//         <div className="flex items-center">
//           <span className="text-2xl font-bold text-gray-900">{days}</span>
//           <span className="ml-1 text-gray-600">days left</span>
//         </div>
//       );
//     }
//     if (days > 0) {
//       return (
//         <div className="flex items-center">
//           <span className="text-2xl font-bold text-gray-900">{days}</span>
//           <span className="ml-1 text-gray-600">day{days > 1 ? 's' : ''}</span>
//           <span className="mx-1 text-gray-900 font-bold">{hours}</span>
//           <span className="text-gray-600">hrs</span>
//         </div>
//       );
//     }
//     if (hours > 0) {
//       return (
//         <div className="flex items-center">
//           <span className="text-2xl font-bold text-gray-900">{hours}</span>
//           <span className="ml-1 text-gray-600">hr{hours > 1 ? 's' : ''}</span>
//           <span className="mx-1 text-gray-900 font-bold">{minutes}</span>
//           <span className="text-gray-600">min</span>
//         </div>
//       );
//     }
//     if (minutes > 0) {
//       return (
//         <div className="flex items-center">
//           <span className="text-2xl font-bold text-gray-900">{minutes}</span>
//           <span className="ml-1 text-gray-600">min</span>
//           <span className="mx-1 text-gray-900 font-bold">{seconds}</span>
//           <span className="text-gray-600">sec</span>
//         </div>
//       );
//     }
//     return (
//       <div className="flex items-center">
//         <span className="text-2xl font-bold text-gray-900">{seconds}</span>
//         <span className="ml-1 text-gray-600">seconds</span>
//       </div>
//     );
//   };

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCountdown(prev => prev - 1000);
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="bg-indigo-50 px-3 py-2 rounded-lg">
//       {formatTime()}
//     </div>
//   );
// }
import { useContext, useState, useEffect } from "react";
import { AuctionDetailsContext } from "../contexts/AuctionDetailsContext";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";

export const Selling = () => {
  const { userSellingItems, fetchUserSellingItems } = useContext(AuctionDetailsContext);
  const { currentUser } = useContext(UserContext);
  const [activeItems, setActiveItems] = useState([]);
  const [inactiveItems, setInactiveItems] = useState([]);
  const [toggleSelling, setToggleSelling] = useState(true);
  const [toggleHistory, setToggleHistory] = useState(true);
  const history = useHistory();

  const now = new Date().getTime();

  useEffect(() => {
    if (!currentUser) return;
    fetchUserSellingItems();    
  }, [currentUser]);

  useEffect(() => {
    const activeTemp = [];
    const inactiveTemp = [];
    userSellingItems.forEach((item) => {
      item.endTime > now ? activeTemp.push(item) : inactiveTemp.push(item);
    });
    setActiveItems(activeTemp);
    setInactiveItems(inactiveTemp);
  }, [userSellingItems]);

  return (
    <div className="min-h-screen bg-gray-100"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('src/images/createback.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Main Container */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Listings</h1>
          <p className="mt-2 text-gray-600">Manage your active and past auctions</p>
        </div>

        {/* Content Container with Scroll */}
        <div className="space-y-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {/* Active Listings Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div 
              className="px-5 py-4 border-b border-gray-200 flex justify-between items-center cursor-pointer bg-gray-50"
              onClick={() => setToggleSelling(!toggleSelling)}
            >
              <div className="flex items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Active Listings
                </h2>
                <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {activeItems.length}
                </span>
              </div>
              <svg 
                className={`w-5 h-5 text-gray-500 transition-transform ${toggleSelling ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {toggleSelling && (
              <div className="divide-y divide-gray-200">
                {activeItems.length > 0 ? (
                  activeItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="px-5 py-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                      onClick={() => history.push(`/auction-details/${item.id}`)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0 mr-4">
                          <h3 className="text-base font-medium text-gray-900 truncate">{item.title}</h3>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              {item.numberOfBids} {item.numberOfBids === 1 ? 'bid' : 'bids'}
                            </span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              {item.numberOfBids > 0 ? `€${item.highestBid}` : `Starting at €${item.highestBid}`}
                            </span>
                          </div>
                        </div>
                        <LocalCountdown auctionEndTime={item.endTime} />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-5 py-6 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">No active listings found</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Past Listings Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div 
              className="px-5 py-4 border-b border-gray-200 flex justify-between items-center cursor-pointer bg-gray-50"
              onClick={() => setToggleHistory(!toggleHistory)}
            >
              <div className="flex items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Past Listings
                </h2>
                <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {inactiveItems.length}
                </span>
              </div>
              <svg 
                className={`w-5 h-5 text-gray-500 transition-transform ${toggleHistory ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {toggleHistory && (
              <div className="divide-y divide-gray-200">
                {inactiveItems.length > 0 ? (
                  inactiveItems.map((item) => (
                    <div key={item.id} className="px-5 py-4 hover:bg-gray-50 transition-colors duration-150">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-medium text-gray-900 truncate">{item.title}</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Ended on {new Date(+item.endTime).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                            €{item.highestBid}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-5 py-6 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">No past listings to show</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const LocalCountdown = ({ auctionEndTime }) => {
  const [countdown, setCountdown] = useState(auctionEndTime - new Date().getTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1000);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    if (countdown < 0) {
      return (
        <div className="bg-red-100 px-3 py-1 rounded-full">
          <span className="text-red-800 text-xs font-medium">Ended</span>
        </div>
      );
    }

    const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
    const hours = Math.floor((countdown / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((countdown / (1000 * 60)) % 60);
    const seconds = Math.floor((countdown / 1000) % 60);

    if (days > 0) {
      return (
        <div className="bg-indigo-100 px-3 py-1 rounded-full">
          <span className="text-indigo-800 text-xs font-medium">
            {days}d {hours}h
          </span>
        </div>
      );
    }
    if (hours > 0) {
      return (
        <div className="bg-indigo-100 px-3 py-1 rounded-full">
          <span className="text-indigo-800 text-xs font-medium">
            {hours}h {minutes}m
          </span>
        </div>
      );
    }
    return (
      <div className="bg-indigo-100 px-3 py-1 rounded-full">
        <span className="text-indigo-800 text-xs font-medium">
          {minutes}m {seconds}s
        </span>
      </div>
    );
  };

  return formatTime();
};