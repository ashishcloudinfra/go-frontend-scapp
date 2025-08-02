import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { EventWithOrganiserAndEventRoomName } from "../../../types/Event";
import { fetchAllEvents } from "../../../app/actions/gym/event";
import { IManageEventProps } from "../../pages/event/Manage";

export default function BootstrapManageEvent({ WrappedComponent }: { WrappedComponent: React.FunctionComponent<IManageEventProps> }) {
  const dispatch = useAppDispatch();
  const { selectedCompany } = useAppSelector(s => s.companies);
  
  const [events, setEvents] = useState<EventWithOrganiserAndEventRoomName[]>([]);

  const fetchData = async (companyId: string) => {
    const [err, data] = await dispatch(fetchAllEvents(companyId));
    if (err) {
      return;
    }
    setEvents(data.data || []);
  };

  useEffect(() => {
    if (selectedCompany) fetchData(selectedCompany.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany]);

  return <WrappedComponent events={events} />;
}
