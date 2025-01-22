import { FaRegCalendarAlt } from "react-icons/fa";
import { Event } from "../../types/eventTypes";
import { formatDate, formatTime } from "../../util/util";
import { useEffect, useState } from "react";

interface EventComponentProps {
  event: Event
}

export const EventComponent = ({ event }: EventComponentProps) => {

  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    try {
      setFormattedDate(formatDate(event.Date));
      setFormattedTime(formatTime(event.Date));
    } catch (error) {
      console.error('Error formatting date:', error);
    }
  }, [event.Date]);

  return (
    <div key={event.UID} className="w-96 text-black font-inter rounded-xl shadow-lg">
      <div className="relative">
        <img src={event.icon} className="w-full overflow-hidden rounded-t-xl blur-[1px]" />
        <div className="p-5 absolute bottom-0 left-0 = z-10 text-white rounded-br-xl">
          <h1 className="font-bold text-3xl">{formattedDate}</h1>
          <span className="font-bold text-xl">{formattedTime} • {event.Location}</span>
        </div>
      </div>
      <div className="p-5">
        <h1 className="mt-2 text-3xl font-semibold">{event.EventName}</h1>
        <p style={{ whiteSpace: "pre-line" }} className="text-sm mt-2">{event.Description}</p>
        <div className="h-16 flex items-end justify-end">
          <button className="bg-[#8662FC] w-14 h-14 rounded-full flex flex-row items-center justify-center">
            <FaRegCalendarAlt className="text-white" size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventComponent;