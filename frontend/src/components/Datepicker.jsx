import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { addDays } from "date-fns";
import util from "../styles/util"

export default function Datepicker({ callback }) {
  const [selectedDate, setSelectedDate] = useState(addDays(new Date(), 1));

  const handleChosenDate = (selectedDate) => {
    callback(prev=>({...prev, endTime: selectedDate.getTime()}));
    setSelectedDate(selectedDate);

  };

  return (
    <DatePicker
      showPopperArrow={false}
      selected={selectedDate}
      className={"font-myPtext text-base h-8 " + util.input}
      onChange={handleChosenDate}
      minDate={addDays(new Date(), 1)}
      maxDate={addDays(new Date(), 30)}
      dateFormat="dd/MM yyyy h:mm"
      placeholderText="Select a date"
    />
  );
}
