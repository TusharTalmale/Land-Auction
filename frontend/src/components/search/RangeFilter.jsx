import { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";

export const RangeFilter = ({ handleFilters }) => {
  const MAX_VALUE = 10000000;
  const MIN_VALUE = 0;

  const [range, setRange] = useState({ min: MIN_VALUE, max: MAX_VALUE });
  const [sliderValue, setSliderValue] = useState([MIN_VALUE, MAX_VALUE]);

  const updateFilters = useCallback(
    debounce((min, max) => {
      handleFilters((prev) => ({
        ...prev,
        page: 0,
        priceFrom: min !== "" ? Number(min) : null,
        priceTo: max !== "" ? Number(max) : null,
      }));
    }, 500),
    [handleFilters]
  );

  useEffect(() => {
    updateFilters(range.min, range.max);
    return () => updateFilters.cancel();
  }, [range, updateFilters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, "");
    const numValue = numericValue === "" ? MIN_VALUE : Math.min(Number(numericValue), MAX_VALUE);

    setRange((prev) => ({
      ...prev,
      [name]: numValue,
    }));

    if (name === "min") {
      setSliderValue([numValue, Math.max(numValue, sliderValue[1])]);
    } else {
      setSliderValue([Math.min(numValue, sliderValue[0]), numValue]);
    }
  };

  const handleSliderChange = (e) => {
    const newMin = Number(e.target.value);
    const newMax = sliderValue[1];
    setSliderValue([newMin, newMax]);
    setRange({ min: newMin, max: newMax });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    })
      .format(value)
      .replace(/^(\D+)/, "$1 ");
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 transition-all hover:shadow-xl w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Price Range</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
            <input
              type="text"
              name="min"
              value={range.min === MIN_VALUE ? "" : range.min}
              onChange={handleInputChange}
              className="w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Min"
            />
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
            <input
              type="text"
              name="max"
              value={range.max === MAX_VALUE ? "" : range.max}
              onChange={handleInputChange}
              className="w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      {/* Custom Slider */}
      <div className="mt-4">
        <input
          type="range"
          min={MIN_VALUE}
          max={MAX_VALUE}
          step={100000}
          value={sliderValue[0]}
          onChange={(e) => handleSliderChange(e)}
          className="w-full h-2 bg-blue-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <span>{formatCurrency(MIN_VALUE)}</span>
        <span>{formatCurrency(MAX_VALUE)}</span>
      </div>
    </div>
  );
};
