import { createContext, useState, useEffect } from "react";

export const APIContext = createContext();

export default function APIContextProvider(props) {

  const [apis, setAPIs] = useState([]);

  const fetchAPIs = async () => {
    let res = await fetch("rest/API");
    res = await res.json();
    setAPIs(res)
  }

  useEffect(() => {
    fetchAPIs()
  }, []);

  const values = {
    apis,
    fetchAPIs
  }

  return (
    <APIContext.Provider value={values}>
      {props.children}
    </APIContext.Provider>
  );
}