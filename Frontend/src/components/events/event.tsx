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
      setFormattedDate(formatDate(new Date(event.Date)));
      setFormattedTime(formatTime(new Date(event.Date)));
    } catch (error) {
      console.error('Error formatting date:', error);
    }
  }, [event.Date]);

  return (
    <div key={event.UID} className="w-96 shrink-0 relative justify-between flex flex-col bg-slate-300 text-black font-inter rounded-xl shadow-lg">
      {/* Event Body */}
      <div className="p-5">
        <img src={event.icon} className="w-full overflow-hidden rounded-t-xl blur-[1px]" />
        <h1 className="mt-2 text-3xl font-semibold">{event.EventName}</h1>
        <p style={{ whiteSpace: "pre-line" }} className="text-sm mt-2">{event.Description}</p>
      </div>

      {/* Bottom date and time */}
      <div className="p-5 absolute w-full justify-between flex bottom-0 left-0 z-10 text-white rounded-br-xl">
        <div className="flex flex-col">
          <h1 className="font-bold text-2xl">{formattedDate}</h1>
          <span className="font-bold text-lg">{formattedTime} • {event.Location}</span>
        </div>
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