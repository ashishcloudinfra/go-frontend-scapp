import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { EventRoom } from "../../types/EventRoom";
import { fetchEventRoomById } from "../../app/actions/gym/eventRoom";
import { IEditEventRoomProps } from "../pages/eventRoom/Edit";
import { useParams } from "react-router";

export default function BootstrapEditEventRoom({ WrappedComponent }: { WrappedComponent: React.FunctionComponent<IEditEventRoomProps> }) {
  const dispatch = useAppDispatch();
  const { selectedCompany } = useAppSelector(s => s.companies);
  const params = useParams();

  const [eventRoom, setEventRoom] = useState<EventRoom | null>();

  const fetchData = async (companyId: string) => {
    const [err, data] = await dispatch(fetchEventRoomById(params.eventRoomId || '', companyId));
    if (err) {
      return;
    }
    setEventRoom(data.data || []);
  };

  useEffect(() => {
    if (selectedCompany) fetchData(selectedCompany.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany]);

  if (!eventRoom) return null;

  return <WrappedComponent eventRoom={eventRoom} />;
}
