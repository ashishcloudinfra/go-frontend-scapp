import { SiGoogleclassroom } from "react-icons/si";
import { Link, useNavigate } from "react-router";
import PageHeading from "../../components/PageHeading";
import { EventRoom } from "../../../types/EventRoom";
import EventRoomCard from "../../components/EventRoomCard";

export interface IListEventRoomProps {
  eventRooms: EventRoom[];
}

export default function ListEventRoom(props: IListEventRoomProps) {
  const navigate = useNavigate();

  const eventRoomCardClickHandler = (eventRoomId: string) => {
    console.log(eventRoomId);
    navigate(`/gym/admin/event-room/edit/${eventRoomId}`);
  }

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <PageHeading
          title="Manage event rooms"
          description="Manage your event rooms"
        />
        <Link
          to={'/gym/admin/event-room/add'}
          type="button"
          className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center me-2 dark:bg-primary dark:hover:bg-gray-700 hover:scale-105 transform transition duration-200 self-start"
        >
          <SiGoogleclassroom className="mr-2" size={20} />
          Add event room
        </Link>
      </div>
      <div className="mt-8 flex flex-wrap gap-6">
        {props.eventRooms.map(eventRoom => <EventRoomCard key={eventRoom.id} eventRoom={eventRoom} onCardClick={eventRoomCardClickHandler} />)}
      </div>
    </div>
  )
}
