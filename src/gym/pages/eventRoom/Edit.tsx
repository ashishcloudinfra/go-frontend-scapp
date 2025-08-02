import { useParams } from "react-router";
import { editEventRoom } from "../../../app/actions/gym/eventRoom";
import { useAppDispatch } from "../../../app/hooks";
import { EventRoom, EventRoomFormFormValues } from "../../../types/EventRoom";
import AddEventRoomForm from "../../components/AddEventRoomForm";
import PageHeading from "../../components/PageHeading";

export interface IEditEventRoomProps {
  eventRoom: EventRoom;
}

export default function EditEventRoom(props: IEditEventRoomProps) {
  const dispatch = useAppDispatch();
  const params = useParams();

  const onFormSubmit = async (formValues: EventRoomFormFormValues) => {
    await dispatch(editEventRoom(params?.eventRoomId || '', formValues));
  }

  return (
    <div className="p-8">
      <PageHeading
        title="Edit event room"
        description="Edit event room"
      />
      <AddEventRoomForm formValues={props.eventRoom} onFormSubmit={onFormSubmit} />
    </div>
  )
}