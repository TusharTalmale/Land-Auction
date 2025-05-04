// import {useState } from "react";
// import RangeSlider from "./Slider";

// export const RangeFilter = ({ handleFilters }) => {
//   const[range,setRange] =useState({
//     min: 0,
//     max:2000
//   })

//   return (
//       <div className="flex justify-between content-between items-center">
//       <div className="bg-white w-14 text-center mt-4 mr-2 rounded-lg">
//           {range.min}
//         </div>
//         <RangeSlider  range={setRange} handleFilters={handleFilters} />
//       <div className="bg-white w-14 text-center mt-4 ml-2 rounded-lg">
//           {range.max==2000? `${range.max}+` : range.max}
//         </div>
//       </div>
//   );
// };
import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Slider,
  TextField,
  InputAdornment,
  Typography,
  Paper,
  useTheme,
  useMediaQuery
} from "@mui/material";
import debounce from "lodash/debounce";

export const RangeFilter = ({ handleFilters }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const MAX_VALUE = 10000000; // ₹1 Crore
  const MIN_VALUE = 0;

  const [range, setRange] = useState({ min: 0, max: MAX_VALUE });
  const [sliderValue, setSliderValue] = useState([0, MAX_VALUE]);

  const updateFilters = useCallback(
    debounce((min, max) => {
      handleFilters((prev) => ({
        ...prev,
        page: 0,
        priceFrom: min !== "" ? Number(min) : null,
        priceTo: max !== "" ? Number(max) : null,
      }));
    }, 500),
    []
  );

  useEffect(() => {
    updateFilters(range.min, range.max);
  }, [range]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, "");
    setRange((prev) => ({
      ...prev,
      [name]: numericValue === "" ? "" : Number(numericValue),
    }));
    if (name === "min") {
      setSliderValue([Number(numericValue), range.max]);
    } else {
      setSliderValue([range.min, Number(numericValue)]);
    }
  };

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    setRange({ min: newValue[0], max: newValue[1] });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, backgroundColor: "#FAF9F6" }}>
      <Typography variant="h6" gutterBottom>
        Price Range (INR)
      </Typography>

      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        alignItems="center"
        gap={2}
        mb={2}
      >
        <TextField
          label="Min Price"
          name="min"
          value={range.min}
          onChange={handleInputChange}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
        />
        <TextField
          label="Max Price"
          name="max"
          value={range.max}
          onChange={handleInputChange}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
        />
      </Box>

      <Box px={isMobile ? 1 : 3}>
        <Slider
          value={sliderValue}
          min={MIN_VALUE}
          max={MAX_VALUE}
          step={10000}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          sx={{
            color: "#7B2CBF",
          }}
        />
      </Box>
    </Paper>
  );
};
