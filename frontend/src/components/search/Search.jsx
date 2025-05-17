import { RangeFilter } from "./RangeFilter";
import { SearchInput } from "./SearchInput";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export const Search = ({ handleFilters }) => {
  const [value, setValue] = useState(0);
  const [showSlider, setShowSlider] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue !== 0) {
      handleFilters((prev)=>({ ...prev, page: 0, priceFrom: null, priceTo: null , buttonSelection: event.target.name}));
      setShowSlider(false);
    } else {
      setShowSlider(true)
      handleFilters((prev)=>({ ...prev, page: 0, buttonSelection: event.target.name }));};
  };

  

  return (
    <div className="grid place-items-center -mt-4">
      <SearchInput handleFilters={handleFilters} />
      <Box sx={{ width: "18em", marginTop: "2.3em", bgcolor: "rgba(255,255,255,0.12)", borderTopLeftRadius: "0.25rem", borderTopRightRadius: "0.25rem" }}>
        <Tabs sx={{ marginTop: "0.15em"}} value={value} onChange={handleChange} centered>
          <Tab style={{ fontWeight: "bold", color: "white", marginRight: "0.1em", textShadow: "1px 1px 0px #000000"}} label="Price" name="default" />
          <Tab style={{ fontWeight: "bold", color: "white", marginRight: "0.1em", textShadow: "1px 1px 0px #000000" }} label="Popular" name="popular" />
          <Tab style={{ fontWeight: "bold", color: "white", marginRight: "0.1em", textShadow: "1px 1px 0px #000000" }} label="Latest" name="latest" />
        </Tabs>
      </Box>
      {showSlider && (
        <RangeFilter  handleFilters={handleFilters} />
      )}
      <br />
    </div>
  );
};