import React, { useState, useEffect } from "react";

export default function CountdownTimer({ auctionEndTime }) {
  const [currentTime] = useState(new Date().getTime());
  const [countdown, setCountdown] = useState(+auctionEndTime - currentTime);
  const [formattedTime, setFormattedTime] = useState(["..."]);

  const formatTime = () => {
    let format = [];
    let days = Math.floor(countdown / (1000 * 60 * 60 * 24));
    let hours = Math.floor((countdown / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((countdown / (1000 * 60)) % 60);
    let seconds = Math.floor((countdown / 1000) % 60);

    if (countdown < 0) {
      format = ["Auction expired"];
    }
    if (countdown > 172800000) {
      format = [days, " days"];
    }
    if (countdown > 86400000 && countdown < 172800000) {
      format = [days, " day ", hours, " hours"];
    }
    if (countdown > 3600000 && countdown < 86400000) {
      format = [hours, " hours ", minutes, " min"];
    }
    if (countdown > 60000 && countdown < 3600000) {
      format = [minutes, " min ", seconds, " s"];
    }
    if (countdown > 0 && countdown < 60000) {
      format = [seconds, " s"];
    }
    return format;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(countdown ? countdown - 1000 : +auctionEndTime - currentTime);
        setFormattedTime(formatTime());
    }, 1000);
    return ()=> clearInterval(timer);
  });

  return <div>{formattedTime}</div>;
}
