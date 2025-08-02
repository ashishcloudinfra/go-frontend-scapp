import { useNavigate } from "react-router";
import { registerEvent } from "../../../app/actions/gym/event";
import { setNotificationData } from "../../../app/features/notification";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { EventFormValues } from "../../../types/Event";
import { EventRoom } from "../../../types/EventRoom";
import AddEventForm from "../../components/AddEventForm";
import PageHeading from "../../components/PageHeading";

export interface IAddEvent {
  eventRooms: EventRoom[];
}

export default function AddEvent(props: IAddEvent) {
  const { data: tokenData } = useAppSelector(s => s.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (formValues: EventFormValues) => {
    formValues.organiserId = tokenData?.id || '';
    if (tokenData?.role === 'admin') formValues.status = 'authorized';
    const [err] = await dispatch(registerEvent(formValues));
    if (err) {
      dispatch(setNotificationData({
        type: 'ERROR',
        heading: 'Failed',
        description: 'Failed to add event'
      }))
      return;
    }
    navigate('/gym/admin/event/list');
  }
  return (
    <div className="p-8">
      <PageHeading
        title="Add event"
        description="Add event"
      />
      <AddEventForm eventRooms={props.eventRooms} onFormSubmit={onFormSubmit} />
    </div>
  )
}
