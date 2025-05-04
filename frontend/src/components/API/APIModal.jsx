/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { tooltipClasses } from '@mui/material'

export default function APIModal({ activateModal, api }) {

  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  const [inputList, setInputList] = useState([])
  const [textAreaValue, setTextAreaValue] = useState('')

  useEffect(() => {
    setInputList([])
    setOpen(activateModal !== "init")
    if (api.method === "GET") createInputList()
    if (api.method === "POST") {
      setTextAreaValue(api.template.replaceAll("\\n", "\n"))
    }
  }, [activateModal])

  const createInputList = () => {
    let list = []
    let string = api.url
    while(string) {
      let i = string.indexOf('{') + 1
      let ii = string.indexOf('}')

      if(i) {
        list.push({name: string.substring(i, ii)})
        string = string.substring(ii + 1)
      } else string = ''
    }
    setInputList(list)
  }

  const execute = () => {
    if(api.method === 'GET') executeGet()
    else if(api.method === 'POST') executePost()
    setOpen(false)
  } 

  const executeGet = async () => {
    var elements = document.querySelectorAll(`input[id^="${api.url}"]`)
    let newUrl = includeValues(elements)

    let res = await fetch(newUrl)
    if (res.status === 200) {
      res = await res.json()
      document.getElementById('API-response').value = JSON.stringify(res, undefined, 4)
    } else {
      document.getElementById('API-response').value = res.status
    }
  }

  const executePost = async () => {
    var element = document.getElementById('API-textarea')

    let res = await fetch(api.url, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: element.value,
    })
    if(res.status === 200) {
      res = await res.json()
      document.getElementById('API-response').value = JSON.stringify(res, undefined, 4)
    } else {
      document.getElementById('API-response').value = res.status
    }
  }

  const includeValues = (elements) => {
    var regex = /\{(.*?)\}/;
    var strToMatch = api.url;
    for(let i = 0; i < elements.length; i++) {
      var matched = regex.exec(strToMatch)[0]
      strToMatch = strToMatch.replace(matched, elements[i].value)
    }
    return strToMatch
  }

  return (
    <Transition.Root show={open} as={Fragment} className="top-1/3 fixed w-full">
      <Dialog as="div" className="flex justify-center z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
        <div className="flex items-end justify-center pt-4 px-4 pb-20 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-myGr-dark rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-myGr-dark px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="text-xs text-white text-center">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-white">
                      {api.url}
                    </Dialog.Title>
                  </div>
                  {api.method === "GET" && api.template}
                </div>
              </div>
              <div className="bg-myGr-dark px-4 py-3">
                {inputList.map(i => (
                  <input
                    key={`${api.url}-${i.name}`}
                    id={`${api.url}-${i.name}`}
                    type="text"
                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-2 py-2 my-1 bg-white text-base font-medium text-black text-center"
                    placeholder={i.name}
                  />
                ))}
                {api.method === 'POST' && (
                  <textarea
                    id="API-textarea"
                    className="w-full h-40 inline-flex justify-center rounded-md border border-gray-300 shadow-sm my-1 bg-white text-base font-medium text-black"
                    value={textAreaValue}
                    onChange={e => setTextAreaValue(e.target.value)}
                  />
                )}
                <button
                  type="button"
                  className="mt-5 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-20 py-2 bg-myGr-light text-base font-medium text-white focus:bg-myGr-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-myGr-dark"
                  onClick={() => execute()}
                >
                  Execute
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
