import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { EventRoom } from "../../types/EventRoom";
import { fetchAllEventRooms } from "../../app/actions/gym/eventRoom";
import { IListEventRoomProps } from "../pages/eventRoom/List";

export default function BootstrapEventRoomList({ WrappedComponent }: { WrappedComponent: React.FunctionComponent<IListEventRoomProps> }) {
  const dispatch = useAppDispatch();
  const { selectedCompany } = useAppSelector(s => s.companies);

  const [eventRooms, setEventRooms] = useState<EventRoom[]>([]);

  const fetchData = async (companyId: string) => {
    const [err, data] = await dispatch(fetchAllEventRooms(companyId));
    if (err) {
      return;
    }
    setEventRooms(data.data || []);
  };

  useEffect(() => {
    if (selectedCompany) fetchData(selectedCompany.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany]);

  return <WrappedComponent eventRooms={eventRooms} />;
}
