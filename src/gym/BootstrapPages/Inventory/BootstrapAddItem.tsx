import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { fetchEquipments } from "../../../app/actions/gym/inventory";
import { Equipment } from "../../../types/Inventory";
import { IAddNewEquipmentProps } from "../../pages/inventory/AddNewEquipment";

export default function BootstrapAddItem({ WrappedComponent }: { WrappedComponent: React.FunctionComponent<IAddNewEquipmentProps> }) {
  const dispatch = useAppDispatch();

  const [equipments, setEquipments] = useState<Equipment[]>([]);

  const fetchData = async () => {
    const [err, data] = await dispatch(fetchEquipments());
    if (err) {
      return;
    }
    setEquipments(data || []);
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <WrappedComponent equipments={equipments} />;
}
