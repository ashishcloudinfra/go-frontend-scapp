import { EventWithOrganiserAndEventRoomName } from "../../types/Event";

export interface IEventCardProps {
  event: EventWithOrganiserAndEventRoomName;
}

export default function EventCard(props: IEventCardProps) {
  // Function to format the date as "Month Day, Year" (e.g., "March 21, 2025")
  const formatDate = (date: string) => {
    const d = new Date(date);
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return d.toLocaleDateString('en-US', options);
  };

  // Function to format time as "HH:MM AM/PM"
  const formatTime = (time: string) => {
    const d = new Date(`1970-01-01T${time}Z`);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  // Format the start date and end date
  const formattedStartDate = formatDate(props.event.startDate);
  const formattedEndDate = props.event.startDate !== props.event.endDate
    ? formatDate(props.event.endDate)
    : null;

  // Format the time
  const startTime = props.event.isAllDayEvent
    ? "All Day"
    : formatTime(props.event.startTime);
  const endTime = props.event.isAllDayEvent
    ? "All Day"
    : formatTime(props.event.endTime);

  return (
    <div className="w-[15rem] rounded-lg scale-light shadow-lg">
      {/* Top section with different background color */}
      <div className="p-4 bg-indigo-400 text-white rounded-t-lg">
        {/* Title, Date & Time at the Top */}
        <div className="text-center mb-4">
          {/* Event Title */}
          <h2 className="font-serif text-xl italic text-white font-bold mb-2">
            {props.event.name}
          </h2>

          {/* Event Date & Time */}
          <div className=" font-medium text-white text-sm">
            {/* Date */}
            <p className="flex justify-center items-center ">
              <span className="mr-2">📅</span>
              <span className="font-semibold">{formattedStartDate}</span>
              {formattedEndDate && (
                <span className="ml-2 font-semibold">
                  - {formattedEndDate}
                </span>
              )}
            </p>

            {/* Time */}
            <p className="flex justify-center items-center ">
              <span className="mr-2">🕒</span>
              <span className="font-semibold">{startTime}</span>
              {startTime !== "All Day" && (
                <span className="ml-2 font-semibold">
                  - {endTime}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom section with white background for clarity */}
      <div className="p-4 rounded-b-lg text-sm flex flex-col gap-1">
        {/* Description Section */}
        <p className=" text-center">
          <span className="text-gray-600">{props.event.description}</span>
        </p>

        <hr className="text-gray-300 mx-8 my-3" />

        <div className="flex flex-col gap-2 text-sm">
          <p className="flex justify-between">
            <span className="font-semibold text-gray-500">Recurring</span>
            <span className={props.event.isRecurring ? "text-green-600" : "text-red-600"}>
              {props.event.isRecurring ? "Yes" : "No"}
            </span>
          </p>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Status</span>
            <span className="text-gray-600">{props.event.status}</span>
          </div>
          {props.event.isRecurring && (
            <p className="flex justify-between">
              <span className="font-semibold text-gray-500 basis-0 grow-1">Recurrence Type</span>
              <span className="basis-0 grow-1 text-end text-gray-600">{props.event.recurrenceType || "Not Specified"}</span>
            </p>
          )}
          <p className="flex justify-between">
            <span className="font-semibold text-gray-500 basis-0 grow-1">Organizer</span>
            <span className="basis-0 grow-1 text-end text-gray-600">{props.event.organiser}</span>
          </p>

          {props.event.eventRoomId && (
            <div>
              <p className="flex justify-between">
                <span className="font-semibold text-gray-500 basis-0 grow-1">Room</span>
                <span className="basis-0 grow-1 text-end text-gray-600">{props.event.eventRoomName || "Not Specified"}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
