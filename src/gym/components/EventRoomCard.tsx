import { MdModeEditOutline } from "react-icons/md";
import { EventRoom } from "../../types/EventRoom";

interface IEventRoomCardProps {
  eventRoom: EventRoom;
  onCardClick: (eventRoomId: string) => void;
}

export default function EventRoomCard(props: IEventRoomCardProps) {
  // Function to format time as "HH:MM AM/PM"
  const formatTime = (time: string) => {
    const d = new Date(`1970-01-01T${time}Z`);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const startTime = props.eventRoom.startTime ? formatTime(props.eventRoom.startTime) : null;
  const endTime = props.eventRoom.endTime ? formatTime(props.eventRoom.endTime) : null;

  return (
    <div className="w-[15rem] rounded-lg scale-light shadow-lg bg-white overflow-hidden">
      {/* Top section with event room name and time */}
      <div className="p-4 bg-indigo-400 text-white">
        {/* Event Room Title */}
        <div className="text-center mb-2">
          <h3 className="font-serif text-xl italic font-bold mb-1">{props.eventRoom.name}</h3>
        </div>

        {/* Time Information */}
        <div className="font-medium text-white text-sm">
          <p className="flex justify-center items-center">
            <span className="mr-2">🕒</span>
            {startTime}
            {startTime && endTime && <span className="ml-2">- {endTime}</span>}
          </p>
        </div>
      </div>

      {/* Bottom section with details of event room */}
      <div className="p-4 bg-white rounded-b-lg text-sm">
        {/* Location */}
        {props.eventRoom.location && (
          <div className="text-center text-sm text-gray-600 mb-3">
            <p>{props.eventRoom.location}</p>
          </div>
        )}

        {/* Edit Button */}
        <div className="absolute top-2 right-2">
          <button
            onClick={() => props.onCardClick(props.eventRoom.id)}
            aria-label={`Edit event room: ${props.eventRoom.name}`}
            className="text-white hover:bg-primary-dark  p-1 transition-colors duration-300"
          >
            <MdModeEditOutline size={15} />
          </button>
        </div>

        {/* Divider */}
        <hr className="my-3 text-gray-300" />

        {/* Room Information */}
        <div className="flex flex-col gap-2">

          {/* Capacity */}
          <p className="flex justify-between">
            <span className="font-semibold text-gray-500">Capacity</span>
            <span className="text-gray-600">{props.eventRoom.capacity || "Not Specified"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
