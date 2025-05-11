import { Fragment, useEffect, useRef, useState, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { AuctionDetailsContext } from '../contexts/AuctionDetailsContext';
import CountdownTimer from "../components/CountdownTimer"
import { TimeProgressBar } from './TimeProgressBar';

export default function BidModal({ activateModal, id,  startPrice , AuctionstartTime ,auctionEndTime}) {
  const [open, setOpen] = useState(false);
  const [bid, setBid] = useState('');
  const [highestBid, setHighestBid] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const cancelButtonRef = useRef(null);
  const { fetchAuctionItem } = useContext(AuctionDetailsContext);

  const placeBid = async () => {
    if (!bid || !id) return;

    if (parseFloat(bid) < parseFloat(startPrice)) {
      setErrorMsg(`Bid must be at least more than  ₹ ${startPrice}`);
      return;
    }

    let obj = {
      itemId: id,
      bid: bid,
    };

    let res = await fetch("/api/bid/placeBid", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(obj),
    });

    res = await res.json();

    if (res.highestBid) {
      setHighestBid(res.highestBid);
      setErrorMsg('');
    } else {
      setOpen(false);
    }

    await fetchAuctionItem(id);
  };

  useEffect(() => {
    setOpen(activateModal !== "init");
  }, [activateModal]);

  useEffect(() => {
    if (!open) {
      setHighestBid('');
      setErrorMsg('');
      setBid('');
    }
  }, [open]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-center" initialFocus={cancelButtonRef} onClose={setOpen}>
        <div className="min-h-screen flex items-center justify-center px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-60 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:align-middle sm:max-w-lg w-full">
              <div className="px-6 pt-6 pb-4">
                <Dialog.Title as="h4" className="text-2xl font-semibold text-white mb-2">
                  Time left: <CountdownTimer auctionEndTime={auctionEndTime} />
                </Dialog.Title>
                <TimeProgressBar 
                        startTime={AuctionstartTime} 
                        endTime={auctionEndTime} 
                      />
                <p className="text-gray-300 text-sm mb-4">Minimum Bid : ₹ {startPrice}</p>

                <input
                  type="number"
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-100 text-black text-center focus:outline-none focus:ring-2 focus:ring-green-400"
                  onChange={(e) => setBid(e.target.value)}
                  value={bid}
                  placeholder="Enter your bid in SEK"
                />

                {errorMsg && (
                  <p className="mt-2 text-sm text-red-500 font-medium text-center">{errorMsg}</p>
                )}

                <button
                  type="button"
                  className="mt-5 w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
                  onClick={placeBid}
                >
                  Place Bid
                </button>

                {highestBid && (
                  <p className="mt-4 text-lg font-bold text-green-300 text-center">
                    Current Price: SEK {highestBid}
                  </p>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}