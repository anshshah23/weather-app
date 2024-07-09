import { useEffect, useState } from "react";
import moment from "moment-timezone";

const useDate = (timezone, datetime) => {
  const getAdjustedTime = () => {
    return datetime ? moment.tz(datetime, timezone) : moment.tz(timezone);
  };

  const [today, setDate] = useState(getAdjustedTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(getAdjustedTime);
    }, 60 * 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timezone, datetime]);

  const day = today.format('dddd');
  const date = `${day}, ${today.format('MMMM DD, YYYY')}`;
  const time = today.format('h:mm A');

  return {
    date, time
  };
};

export { useDate };
