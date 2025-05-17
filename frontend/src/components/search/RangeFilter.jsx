import {useState } from "react";
import RangeSlider from "./Slider";

export const RangeFilter = ({ handleFilters }) => {
  const[range,setRange] =useState({
    min: 0,
    max:2000
  })

  return (
      <div className="flex justify-between content-between items-center">
      <div className="bg-white w-14 text-center mt-4 mr-2 rounded-lg">
          {range.min}
        </div>
        <RangeSlider  range={setRange} handleFilters={handleFilters} />
      <div className="bg-white w-14 text-center mt-4 ml-2 rounded-lg">
          {range.max==2000? `${range.max}+` : range.max}
        </div>
      </div>
  );
};