import { useNavigate } from "react-router";
import { registerEventRoom } from "../../../app/actions/gym/eventRoom";
import { useAppDispatch } from "../../../app/hooks";
import { EventRoomFormFormValues } from "../../../types/EventRoom";
import AddEventRoomFormForm from "../../components/AddEventRoomForm";
import PageHeading from "../../components/PageHeading";

export default function AddEventRoom() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (formValues: EventRoomFormFormValues) => {
    await dispatch(registerEventRoom(formValues));
    navigate('/gym/admin/event-room/list');
  }

  return (
    <div className="p-8">
      <PageHeading
        title="Add event room"
        description="Add event room"
      />
      <AddEventRoomFormForm onFormSubmit={onFormSubmit} />
    </div>
  )
}
