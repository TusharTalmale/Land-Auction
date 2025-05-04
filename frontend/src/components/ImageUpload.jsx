import { useState } from 'react'

let formData = new FormData()

export const ImageUpload = () => {

  const [preview1, setPreview1] = useState('src/images/upload.png')
  const [preview2, setPreview2] = useState('src/images/upload.png')
  const [preview3, setPreview3] = useState('src/images/upload.png')
  const [noFiles, setNoFiles] = useState(false)

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

  async function onFilesSubmit(e) {
    e.preventDefault()

    if (formData.getAll('files').length === 0) {
      setNoFiles(true)
    }
    else

    
    try {
      await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      } catch (error) {
      console.error(e);      
    }
  }

  return (
    <div>
      <div className="w-full p-4 flex justify-center font-medium text-indigo-600">
        Click an image to upload
      </div>
      <form className="">
        <div className="w-full h-32 px-8 grid grid-rows-2 grid-cols-3 gap-4">

          <div className="image-upload w-40 h-32 row-span-2 col-span-2">
            <label htmlFor="image1">
              <img className="object-cover max-h-32" src={preview1} alt="" />
            </label>
            <input id="image1" accept="image/*" type="file" onChange={e => onAddImage(e, 1)} />
          </div>

          <div className="image-upload">
            <label htmlFor="image2">
              <img className="object-cover max-h-16" src={preview2} alt="" />
            </label>
            <input accept="image/*" type="file" id="image2" onChange={e => onAddImage(e, 2)} />
          </div>

          <div className="image-upload">
            <label htmlFor="image3">
              <img className="object-cover max-h-16" src={preview3} alt="" />
            </label>
            <input accept="image/*" type="file" id="image3" onChange={e => onAddImage(e, 3)} />
          </div>
        </div >
        {noFiles && <div className="w-full text-center text-sm text-red-600">You must add at least one image</div>}
      </form>
    </div>

  )
}


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
