import { Link } from "react-router";
import PageHeading from "../../components/PageHeading";
import { MdClass } from "react-icons/md";
import { EventWithOrganiserAndEventRoomName } from "../../../types/Event";
import EventCard from "../../components/EventCard";

export interface IManageEventProps {
  events: EventWithOrganiserAndEventRoomName[];
}

export default function ManageEvent(props: IManageEventProps) {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <PageHeading
          title="Manage events"
          description="Manage events"
        />
        <Link
          to={'/gym/admin/event/add'}
          type="button"
          className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center me-2 dark:bg-primary dark:hover:bg-gray-700 hover:scale-105 transform transition duration-200 self-start"
        >
          <MdClass className="mr-2" size={20} />
          Add event
        </Link>
      </div>
      <div className="mt-8 flex flex-wrap gap-6">
        {props.events.map(event => <EventCard key={event.id} event={event} />)}
      </div>
    </div>
  )
}
