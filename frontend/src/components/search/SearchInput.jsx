import TextField from "@mui/material/TextField";
import { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import debounce  from "lodash/debounce"

export const SearchInput = ({  handleFilters }) => {
  // const [state, setState] = useState(false);

  const handleDebounce = useCallback(
    debounce((searchVal) => {
      console.log("deboucne");
      handleFilters((prev)=>({ ...prev, page: 0, search: searchVal }));
  //  setState(false);

    }, 500)
  );


  const handleSearch = (e) => {
    // setTimeout(()=>{
    //   setState(true);

    // },1000)
    handleDebounce(e.target.value);
  };

  return (
    <div>
      {/* {state && <div>Loading....</div>} */}
      <Box sx={{ width: 300, maxWidth: "100%" }}>
        <TextField
          className="bg-white pb-8 h-14 rounded-md justify-center align-middle"
          color="secondary"
          fullWidth
          label="Search"
          onChange={handleSearch}
        />
      </Box>
    </div>
  );
};