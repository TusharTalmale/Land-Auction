import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Datepicker from "../components/Datepicker";
let formData = new FormData();
import util from "../styles/util";
import { TermsAndConditions } from "../components/TermsAndCondition";

export const CreateListing = () => {
  const history = useHistory();
  const { currentUser } = useContext(UserContext);
  const [loginAlert, setLoginAlert] = useState(false);
  const [preview1, setPreview1] = useState('src/images/upload.png');
  const [preview2, setPreview2] = useState('src/images/upload.png');
  const [preview3, setPreview3] = useState('src/images/upload.png');
  const [noFiles, setNoFiles] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState('false'); 

  const [plotData, setPlotData] = useState({
    title: "",
    plotSize: "",
    plotFacing: "North",
    tagline: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    landmarks: "",
    ownershipType: "Sole Owner",
    startPrice: 0,
    endTime: new Date().getTime() + 86399000,
    latitude: null,
    longitude: null,
    sectorNumber: "", 
    plotNumber: "",
  });

  const facingOptions = ["North", "East", "West", "South"];
  const ownershipTypes = [
    "Sole Owner", 
    "Joint Owner", 
    "Inherited", 
    "Leasehold"
  ];
  const handleTermsChange = (e) => {
  // setTermsAccepted(e.target.checked);
  setTermsAccepted('true')  // Change to boolean for simplicity
}


  const handleFormSubmit = async (e, value) => {
    e.preventDefault();

    if (!currentUser) {
      setLoginAlert(true);
      return;
    }

 

    const newPlotObj = {
      ...plotData,
     
      block: plotData.sectorNumber,
      plotNumber: plotData.plotNumber,
      termsAcceptance: termsAccepted,
      userId: currentUser.id,
      imagePath: value,
      currentBid: 0,
      
    };
    console.log(newPlotObj);

    try {
      
      const res = await fetch("/rest/auctionItem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlotObj),
      });
      if (!res.ok) {
        // Handle non-200 responses
        const errorText = await res.text();
        console.error("Submission failed with status:", res.status, errorText);
        alert(`Submission failed: ${res.status} - ${errorText}`); // Provide user feedback
        return;
   }
      const data = await res.json();
      console.log("Submission successful:", data);
      history.push(`/auction-details/${data.id}`);
        } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  // Keep existing image upload functions (onAddImage, updateFormData, imageUploadSubmit)
  async function onAddImage(e, number) {
    const maxWidth = 2500
    const maxHeight = 1500

    try {
      let file = e.target.files[0]
      let image = new Image()
      image.src = URL.createObjectURL(file)

      image.onload = async () => {

        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')

        const ratio = Math.min(maxWidth / image.width, maxHeight / image.height)
        const width = image.width * ratio + .5 | 0
        const height = image.height * ratio + .5 | 0
        canvas.width = width
        canvas.height = height

        ctx.drawImage(image, 0, 0, width, height)
        let compressedFile = dataURItoBlob(canvas.toDataURL('image/jpeg', 0.6))

        if (number === 1) {
          updateFormData('_img1.jpg', compressedFile)
          setPreview1(image.src)
        }

        if (number === 2) {
          updateFormData('_img2.jpg', compressedFile)
          setPreview2(image.src)
        }

        if (number === 3) {
          updateFormData('_img3.jpg', compressedFile)
          setPreview3(image.src)
        }
      }
    }
    catch (e) { console.error(e); }
  }
  function updateFormData(imgname, file) {

    const tempData = formData.getAll('files')
    formData.delete('files')

    tempData
      .filter(file => file.name !== imgname)
      .forEach(file => formData.append('files', file))

    formData.append('files', file, imgname)
  }
  async function imageUploadSubmit(e) {
    e.preventDefault()

    if (formData.getAll('files').length === 0) {
      setNoFiles(true)
    }
    else
    console.log(formData)
      try {
        let res = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        console.log(res.json)
        res.json().then((r) => {
          let value = r.generatedString
          if (value) {
            handleFormSubmit(e, value)
          }
        })
        formData.delete("files");

      } catch (e) {
        console.error(e);
      }
  }

//   return (
//     <div>
//       <div className="font-myHtext text-2xl text-center py-6 bg-myAw">
//         Create Land Listing
//       </div>
      
//       <div className="p-6">
//       <label className="w-full p-4 flex justify-center font-myPtext font-bold font-block text-base">Upload photos*</label>
//         <div className="w-full px-4 flex flex-wrap justify-center mt-4">
//           <form className="w-96 flex flex-wrap justify-center">
//             <div className="w-80 h-48 px-5 grid grid-rows-2 grid-cols-3 gap-x-4 gap-y-4 ">
//               <div className="image-upload h-48 w-48 row-span-2 col-span-2">
//                 <label htmlFor="image1">
//                   <img className="object-contain h-48 w-48" src={preview1} alt="" />
//                 </label>
//                 <input id="image1" accept="image/*" type="file" onChange={e => onAddImage(e, 1)} />
//               </div>

//               <div className=" h-20 w-24 image-upload flex flex-wrap justify-center ">
//                 <label htmlFor="image2">
//                   <img className="object-contain h-20 " src={preview2} alt="" />
//                 </label>
//                 <input accept="image/*" type="file" id="image2" onChange={e => onAddImage(e, 2)} />
//               </div>

//               <div className=" h-20 w-24 image-upload flex flex-wrap -mt-4 justify-center">
//                 <label htmlFor="image3">
//                   <img className="object-contain h-20 " src={preview3} alt="" />
//                 </label>
//                 <input accept="image/*" type="file" id="image3" onChange={e => onAddImage(e, 3)} />
//               </div>
//             </div >
//             {noFiles && <div className="w-full text-center text-sm text-red-600">You must add at least one image</div>}
//           </form>
//           </div>
//       </div>

//       <form className="p-6" onSubmit={imageUploadSubmit}>
//         {/* 🧾 Basic Plot Information */}
//         <div className="mb-8">
//           <h3 className="text-xl font-bold mb-4">Basic Plot Information</h3>
          
//           <div className="mb-4">
//             <label className="font-myPtext font-bold block text-base">
//               Plot Title*
//             </label>
//             <input
//               type="text"
//               className={util.input}
//               value={plotData.title}
//               onChange={(e) => setPlotData({...plotData, title: e.target.value})}
//               required
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className="font-myPtext font-bold block text-base">
//                 Plot Size (sq ft)*
//               </label>
//               <input
//                 type="number"
//                 className={util.input}
//                 value={plotData.plotSize}
//                 onChange={(e) => setPlotData({...plotData, plotSize: e.target.value})}
//                 required
//               />
//             </div>
            
//             <div>
//               <label className="font-myPtext font-bold block text-base">
//                 Plot Facing
//               </label>
//               <select
//                 className={util.input}
//                 value={plotData.plotFacing}
//                 onChange={(e) => setPlotData({...plotData, plotFacing: e.target.value})}
//               >
//                 {facingOptions.map(option => (
//                   <option key={option} value={option}>{option}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="mb-4">
//             <label className="font-myPtext font-bold block text-base">
//               Tagline
//             </label>
//             <input
//               type="text"
//               className={util.input}
//               value={plotData.tagline}
//               onChange={(e) => setPlotData({...plotData, tagline: e.target.value})}
//               placeholder="Short promotional sentence"
//             />
//           </div>
//         </div>

//         {/* 📍 Location Information */}
//         <div className="mb-8">
//           <h3 className="text-xl font-bold mb-4">Location Details</h3>

// <div className="grid grid-cols-2 gap-4 mb-4">
//   <div>
//     <label className="font-myPtext font-bold block text-base">
// Block no/Sector no  </label>
//     <input
//       type="text"
//       className={util.input}
//       value={plotData.sectorNumber}
//       onChange={(e) => setPlotData({...plotData, sectorNumber: e.target.value})}
//       required
//     />
//   </div>
  
//   <div>
//     <label className="font-myPtext font-bold block text-base">
// PLOT NO     </label>
//     <input
//       type="text"
//       className={util.input}
//       value={plotData.plotNumber}
//       onChange={(e) => setPlotData({...plotData, plotNumber: e.target.value})}
//       required
//     />
//   </div>
// </div>
          
//           <div className="mb-4">
//             <label className="font-myPtext font-bold block text-base">
//               Full Address*
//             </label>
//             <textarea
//               className={`h-20 ${util.input}`}
//               value={plotData.address}
//               onChange={(e) => setPlotData({...plotData, address: e.target.value})}
//               required
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className="font-myPtext font-bold block text-base">
//                 City*
//               </label>
//               <input
//                 type="text"
//                 className={util.input}
//                 value={plotData.city}
//                 onChange={(e) => setPlotData({...plotData, city: e.target.value})}
//                 required
//               />
//             </div>
            
//             <div>
//               <label className="font-myPtext font-bold block text-base">
//                 State*
//               </label>
//               <input
//                 type="text"
//                 className={util.input}
//                 value={plotData.state}
//                 onChange={(e) => setPlotData({...plotData, state: e.target.value})}
//                 required
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className="font-myPtext font-bold block text-base">
//                 PIN Code*
//               </label>
//               <input
//                 type="text"
//                 className={util.input}
//                 value={plotData.pinCode}
//                 onChange={(e) => setPlotData({...plotData, pinCode: e.target.value})}
//                 required
//               />
//             </div>
            
//             <div>
//               <label className="font-myPtext font-bold block text-base">
//                 Nearby Landmarks
//               </label>
//               <input
//                 type="text"
//                 className={util.input}
//                 value={plotData.landmarks}
//                 onChange={(e) => setPlotData({...plotData, landmarks: e.target.value})}
//                 placeholder="e.g., 1km from Railway Station"
//               />
//             </div>
//           </div>
//         </div>
// <div className="mb-8">
//   <h3 className="text-xl font-bold mb-4">Select Exact Location</h3>
//   <div className="h-96 w-full bg-gray-100 rounded-lg">
//     {/* <MapComponent 
//       onLocationSelect={(lat, lng) => {
//         setPlotData(prev => ({
//           ...prev,
//           latitude: lat,
//           longitude: lng
//         }))
//       }}
//     /> */}
//     <input type="number" placeholder="Latitude" onChange={(e) => setPlotData({...plotData, latitude: parseFloat(e.target.value)})} />
// <input type="number" placeholder="longitude" onChange={(e) => setPlotData({...plotData, longitude: parseFloat(e.target.value)})} />

//   </div>
// </div>
//         {/* ⚖️ Legal Information */}
//         <div className="mb-8">
//           <h3 className="text-xl font-bold mb-4">Legal & Ownership</h3>
          
//           <div className="mb-4">
//             <label className="font-myPtext font-bold block text-base">
//               Ownership Type*
//             </label>
//             <select
//               className={util.input}
//               value={plotData.ownershipType}
//               onChange={(e) => setPlotData({...plotData, ownershipType: e.target.value})}
//             >
//               {ownershipTypes.map(type => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="font-myPtext font-bold block text-base">
//               Starting Price (₹)*
//             </label>
//             <input
//               type="number"
//               className={util.input}
//               value={plotData.startPrice}
//               onChange={(e) => setPlotData({...plotData, startPrice: e.target.value})}
//               required
//             />
//           </div>
//         </div>

//         {/* 📅 Auction End Date */}
//         <div className="mb-8">
//           <h3 className="text-xl font-bold mb-4">Auction Details</h3>
//           <div className="mb-4">
//             <label className="block font-myPtext font-bold text-base">
//               Auction End Date*
//             </label>
//             <Datepicker callback={(date) => setPlotData({...plotData, endTime: date})} />
//           </div>
//         </div>

//         {/* ✅ Terms & Conditions */}
//         <div className="mb-8">
//           <div className="flex items-center mb-4">
         
//           <input
//   type="checkbox"
//   id="terms"
//   checked={termsAccepted}
//   onChange={handleTermsChange}
// />
// <label htmlFor="terms">I accept the terms and conditions</label>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-center pt-2 pb-4">
//         <button
//     type="submit"
//     disabled={termsAccepted !== 'true'}
//     className={`group relative w-1/2 flex justify-center py-2 px-4 border text-base font-medium rounded-md ${
//       termsAccepted === 'true' 
//         ? 'bg-green-600 text-white hover:bg-green-700' 
//         : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//     }`}
//   >
//     Submit Listing
//   </button>
//         </div>
        
//         {loginAlert && (
//           <div className="text-center text-myRe text-xs p-1">
//             Please login to create a listing
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };


// helper function to convert canvas image to file
// should be in a utility file



return (
  <div className="min-h-screen bg-gray-50"  style={{
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('src/images/createback.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat'
  }}>
    {/* Header */}
    <div className="font-myHtext text-2xl text-center py-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
      Create Land Listing
    </div>
    
    {/* Main Form Container */}
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Image Upload Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <label className="w-full p-4 flex justify-center font-myPtext font-bold text-lg text-gray-700">
          Upload photos*
        </label>
        <div className="w-full flex justify-center">
          <form className="w-full md:w-96">
            <div className="grid grid-rows-2 grid-cols-3 gap-4">
              {/* Main Image */}
              <div className="image-upload h-48 w-full row-span-2 col-span-2 relative border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
                <label htmlFor="image1" className="cursor-pointer w-full h-full flex items-center justify-center">
                  <img 
                    className="object-cover h-full w-full rounded-lg" 
                    src={preview1} 
                    alt="Main plot image" 
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white font-medium">Click to upload</span>
                  </div>
                </label>
                <input id="image1" className="hidden" accept="image/*" type="file" onChange={e => onAddImage(e, 1)} />
              </div>

              {/* Secondary Images */}
              {[2, 3].map((num) => (
                <div key={num} className="h-20 w-full image-upload relative border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
                  <label htmlFor={`image${num}`} className="cursor-pointer w-full h-full flex items-center justify-center">
                    <img 
                      className="object-cover h-full w-full rounded-lg" 
                      src={num === 2 ? preview2 : preview3} 
                      alt={`Secondary image ${num-1}`} 
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <span className="text-white text-sm">Click to upload</span>
                    </div>
                  </label>
                  <input id={`image${num}`} className="hidden" accept="image/*" type="file" onChange={e => onAddImage(e, num)} />
                </div>
              ))}
            </div>
            {noFiles && (
              <div className="w-full text-center mt-2 text-sm text-red-600">
                You must add at least one image
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Form Sections */}
      <form className="space-y-8" onSubmit={imageUploadSubmit}>
        {/* Basic Plot Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
            Basic Plot Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Plot Title*
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={plotData.title}
                onChange={(e) => setPlotData({...plotData, title: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Plot Size (sq ft)*
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={plotData.plotSize}
                  onChange={(e) => setPlotData({...plotData, plotSize: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Plot Facing
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={plotData.plotFacing}
                  onChange={(e) => setPlotData({...plotData, plotFacing: e.target.value})}
                >
                  {facingOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Tagline
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={plotData.tagline}
                onChange={(e) => setPlotData({...plotData, tagline: e.target.value})}
                placeholder="Short promotional sentence"
              />
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
            Location Details
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Block no/Sector no*
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={plotData.sectorNumber}
                  onChange={(e) => setPlotData({...plotData, sectorNumber: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Plot No*
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={plotData.plotNumber}
                  onChange={(e) => setPlotData({...plotData, plotNumber: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Address*
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={plotData.address}
                onChange={(e) => setPlotData({...plotData, address: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  City*
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={plotData.city}
                  onChange={(e) => setPlotData({...plotData, city: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  State*
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={plotData.state}
                  onChange={(e) => setPlotData({...plotData, state: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  PIN Code*
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={plotData.pinCode}
                  onChange={(e) => setPlotData({...plotData, pinCode: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Nearby Landmarks
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={plotData.landmarks}
                  onChange={(e) => setPlotData({...plotData, landmarks: e.target.value})}
                  placeholder="e.g., 1km from Railway Station"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
            Select Exact Location
          </h3>
          <div className="h-96 w-full bg-gray-100 rounded-lg flex items-center justify-center">
            {/* Map component would go here */}
            <div className="space-y-4 w-full max-w-md p-4">
              <input 
                type="number" 
                placeholder="Latitude" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                onChange={(e) => setPlotData({...plotData, latitude: parseFloat(e.target.value)})} 
              />
              <input 
                type="number" 
                placeholder="Longitude" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                onChange={(e) => setPlotData({...plotData, longitude: parseFloat(e.target.value)})} 
              />
            </div>
          </div>
        </div>

        {/* Legal Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
            Legal & Ownership
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Ownership Type*
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={plotData.ownershipType}
                onChange={(e) => setPlotData({...plotData, ownershipType: e.target.value})}
              >
                {ownershipTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Starting Price (₹)*
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">₹</span>
                <input
                  type="number"
                  className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={plotData.startPrice}
                  onChange={(e) => setPlotData({...plotData, startPrice: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Auction Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
            Auction Details
          </h3>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Auction End Date*
            </label>
            <Datepicker callback={(date) => setPlotData({...plotData, endTime: date})} />
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted === 'true'}
                onChange={handleTermsChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-medium text-gray-700">
                I accept the terms and conditions
              </label>
              <p className="text-gray-500">You must accept the terms to submit your listing</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4 pb-8">
          <button
            type="submit"
            disabled={termsAccepted !== 'true'}
            className={`px-8 py-3 rounded-md text-lg font-medium shadow-sm transition-colors duration-200 ${
              termsAccepted === 'true' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit Listing
          </button>
        </div>
        
        {loginAlert && (
          <div className="text-center text-red-600 text-sm p-2 bg-red-50 rounded-md">
            Please login to create a listing
          </div>
        )}
      </form>
    </div>
  </div>
);
};

function dataURItoBlob(dataURI) {
  let byteString = atob(dataURI.split(',')[1]);
  let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  let ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  let blob = new Blob([ab], { type: mimeString });
  return blob;
}