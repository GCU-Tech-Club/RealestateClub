import { FaRegCalendarAlt } from "react-icons/fa";
import { Event } from "../types/event";
import { formatDate, formatTime } from "../util/util";

interface EventComponentProps {
  event: Event
}

const TypeComponent = ({ type }: { type: string }) => {
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "IN_PERSON":
        return "In Person";
      case "VIRTUAL":
        return "Virtual";
      case "HYBRID":
        return "Hybrid";
      default:
        return "Unknown";
    }
  };

  const getTypeStyle = (type: string) => {
    switch (type) {
      case "IN_PERSON":
        return "bg-gray-300";
      case "VIRTUAL":
        return "bg-green-500";
      case "HYBRID":
        return "bg-yellow-500";
      default:
        return "";
    }
  }

  return <h3 className={`${getTypeStyle(type)} rounded-xl text-center w-24 py-0.5 text-sm`}>{getTypeLabel(type)}</h3>
};

export const EventComponent = ({ event }: EventComponentProps) => {
  return (
    <div key={event.id} className="w-96 text-black font-inter rounded-xl shadow-lg">
      <div className="relative">
        <img src={event.icon} className="w-full rounded-t-xl blur-[1px]" />
        <div className="p-5 absolute bottom-0 left-0 = z-10 text-white rounded-br-xl">
          <h1 className="font-bold text-3xl">{formatDate(event.date)}</h1>
          <span className="font-bold text-xl">{formatTime(event.date)} • {event.location}</span>
        </div>
      </div>
      <div className="p-5">
        <TypeComponent type={event.type} />
        <h1 className="mt-2 text-3xl font-semibold">{event.title}</h1>
        <p style={{ whiteSpace: "pre-line" }} className="text-sm mt-2">{event.description}</p>
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