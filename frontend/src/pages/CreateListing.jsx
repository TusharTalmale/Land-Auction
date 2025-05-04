import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Datepicker from "../components/Datepicker";
let formData = new FormData()
import util from "../styles/util"

export const CreateListing = () => {

  const history = useHistory()
  const { currentUser } = useContext(UserContext)
  const [loginAlert, setLoginAlert] = useState(false)
  //Image Upload functions
  const [preview1, setPreview1] = useState('src/images/upload.png')
  const [preview2, setPreview2] = useState('src/images/upload.png')
  const [preview3, setPreview3] = useState('src/images/upload.png')
  const [noFiles, setNoFiles] = useState(false)
  // const [buyNowCheckBox, setBuyNowCheckBox] = useState(false)


  //dynamically gathers input values into an object which will be passed on submit
  const [auctionData, setAuctionData] = useState({
    title: "",
    description: "",
    category: "",
    startPrice: 0,
    buyNowPrice: 0,
    endTime: new Date().getTime() + 86399000, // if calendar is not clicked default value is  today + 1 day
  });

  const categories = [
    { id: 2, name: "Choose", value: "" },
    { id: 1, name: "Shoes", value: "Shoes" },
    { id: 4, name: "Accessories", value: "Accessories" },
    { id: 600, name: "Dresses", value: "Dresses" },
    { id: 603, name: "Shirts", value: "Shirts" },
    { id: 604, name: "Pants", value: "Pants" },
    { id: 602, name: "Hats", value: "Hats" },
    { id: 601, name: "Shorts", value: "Shorts" },
    { id: 605, name: "Jackets", value: "Jackets" }
  ]

  const handleFormSubmit = async (e, value) => {
    e.preventDefault()

    // It is not possible to create a listing without a logged in user 
    if (!currentUser) {
      setLoginAlert(true)
      return;
    }


    let a = auctionData;
    let u = currentUser;
    let catId = "";
    categories.forEach((item) => { //get the id of the chosen category
      if (a.category === item.name) {
        catId = item.id
        return;
      }
    });

    let newAuctionObj = {
      userId: null,
      description: a.description,
      title: a.title,
      endTime: a.endTime,
      currentBid: 0,
      startPrice: a.startPrice,
      categoryId: catId,
      imagePath: value,
      // buyNowPrice: a.buyNowPrice,
      tags: a.tags
    };

    try {
      let res = await fetch("/rest/auctionItem", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newAuctionObj)
      });
      res = await res.json();

      history.push(`/auction-details/${res.id}`)
    } catch (error) {
      console.log("the new listing was not submitted")
    }
  }

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
      try {
        let res = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        res.json().then((r) => {
          let value = r.generatedString
          if (value) {
            handleFormSubmit(e, value)
          }
        })
        formData.delete("files");

      } catch (error) {
        console.error(e);
      }
  }

  return (
    <div>
      <div className=" font-myHtext text-2xl text-center  py-6 bg-myAw">Create a listing</div>
      <div className="p-6">

        {/* Image upload */}

        <label className="w-full p-4 flex justify-center font-myPtext font-bold font-block text-base">Upload photos*</label>
        <div className="w-full px-4 flex flex-wrap justify-center mt-4">
          <form className="w-96 flex flex-wrap justify-center">
            <div className="w-80 h-48 px-5 grid grid-rows-2 grid-cols-3 gap-x-4 gap-y-4 ">
              <div className="image-upload h-48 w-48 row-span-2 col-span-2">
                <label htmlFor="image1">
                  <img className="object-contain h-48 w-48" src={preview1} alt="" />
                </label>
                <input id="image1" accept="image/*" type="file" onChange={e => onAddImage(e, 1)} />
              </div>

              <div className=" h-20 w-24 image-upload flex flex-wrap justify-center ">
                <label htmlFor="image2">
                  <img className="object-contain h-20 " src={preview2} alt="" />
                </label>
                <input accept="image/*" type="file" id="image2" onChange={e => onAddImage(e, 2)} />
              </div>

              <div className=" h-20 w-24 image-upload flex flex-wrap -mt-4 justify-center">
                <label htmlFor="image3">
                  <img className="object-contain h-20 " src={preview3} alt="" />
                </label>
                <input accept="image/*" type="file" id="image3" onChange={e => onAddImage(e, 3)} />
              </div>
            </div >
            {noFiles && <div className="w-full text-center text-sm text-red-600">You must add at least one image</div>}
          </form>
        </div>
      </div>

      <form className="p-6" onSubmit={imageUploadSubmit}>

        {/* Title input */}
        <div className="">
          <label htmlFor="title" className="font-myPtext font-bold block text-base">Title*</label>
          <input
            type="text"
            name="title"
            id="title"
            className={util.input}
            placeholder="Title"
            onChange={(e) => {
              setAuctionData((prev) => ({ ...prev, title: e.target.value }));
            }}
            required
          />
        </div>

        {/* Description input */}
        <div className="">
          <label htmlFor="description" className="font-myPtext font-bold block text-base">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            className={"h-20 " + util.input}
            placeholder="Description"
            onChange={(e) => {
              setAuctionData((prev) => ({ ...prev, description: e.target.value }));
            }}
          />
        </div>

        {/* Category input */}
        <div className="">
          <label htmlFor="category" className="font-myPtext font-bold block text-base">
            Category*
          </label>
          <div className="text-sm">
            <select
              id="category"
              name="category"
              className={"pl-0.5 " + util.input}
              onChange={(e) => {
                setAuctionData((prev) => ({ ...prev, category: e.target.value }));
              }}
              required
            >
              {categories.map((cat) => <option value={cat.value} key={cat.id}>{cat.name}</option>)}
            </select>
          </div>
        </div>

        {/* Tags input */}
        <div className="">
          <label htmlFor="starting-price" className="font-myPtext font-bold block text-base">#Tags</label>
          <input
            type="text"
            name="tags"
            id="tags"
            className={util.input}
            placeholder='seperate tags with a space (" ")'
            onChange={(e) => {
              setAuctionData((prev) => ({ ...prev, tags: e.target.value }));
            }}
          />
        </div>

        {/* Price input */}
        <div className="">
          <label htmlFor="starting-price" className="font-myPtext font-bold block text-base">Starting price*</label>
          <input
            type="text"
            name="starting-price"
            id="starting-price"
            className={util.input}
            placeholder="0"
            onChange={(e) => {
              setAuctionData((prev) => ({ ...prev, startPrice: e.target.value }));
            }}
            required
          />
        </div>

        {/* Buy Now input */}
        {/* <div className="flex justify-between ">
          <div className="flex items-center pr-2 py-2.5 mb-8 mt-1">
            <input
              id="buy-now"
              name="buy-now"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 font-myPtext text-sm rounded"
              placeholder="0"
              onChange={(e) => {
                setBuyNowCheckBox(e.target.checked)
              }
              }
            />
            <label htmlFor="buy-now" className="ml-2 font-myPtext font-bold block text-base">
              Buy now
            </label>
          </div>

          {buyNowCheckBox &&
            <input
              type="buy-now-price"
              name="buy-now-price"
              id="buy-now-price"
              className={"w-1/2 mb-0" + util.input}
              placeholder="0"
              onChange={(e) => {
                setAuctionData((prev) => ({ ...prev, buyNowPrice: e.target.value }));
              }}
            />
          }

        </div> */}

        {/* Set end Date */}
        <div className="">
          <label htmlFor="end-date" className="ml-2 block font-myPtext font-bold text-base">
            End Date
          </label>
          <Datepicker callback={setAuctionData} />
        </div>

        {/* Submit button */}
        <div className="flex justify-center pt-2 pb-4">
          <button
            type="submit"
            className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-myPr-dark hover:bg-myPr-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Done
          </button>
        </div>
        {loginAlert && <div className="text-center text-myRe text-xs p-1">Sir, you need to login first</div>}
      </form>
    </div>
  );
};

// helper function to convert canvas image to file
// should be in a utility file
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

