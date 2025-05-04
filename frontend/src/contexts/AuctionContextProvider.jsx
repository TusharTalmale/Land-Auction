import { createContext, useState, useEffect } from "react";

export const AuctionContext = createContext();

export default function AuctionContextProvider(props) {

    const [auctions, setAuctions] = useState([]);

    const fetchAuctions = async () => {
        let res = await fetch("/rest/auctionItem");

        try {
            res = await res.json();
            if (res) {
                setAuctions(res)
            }
        } catch {
        }
    }

    useEffect(() => {
        fetchAuctions()
    }, []);

    const values = {
        auctions,
        fetchAuctions
    }

    return (
        <AuctionContext.Provider value={values}>
            {props.children}
        </AuctionContext.Provider>
    );
}