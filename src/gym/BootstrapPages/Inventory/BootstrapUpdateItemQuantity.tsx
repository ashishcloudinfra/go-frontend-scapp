import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getItemTypes } from "../../../app/actions/gym/inventory";
import { IInventoryManagementProps } from "../../pages/inventory/manage";
import { EquipmentsByStatus } from "../../../types/Inventory";

export default function BootstrapUpdateItemQuantity({ WrappedComponent }: { WrappedComponent: React.FunctionComponent<IInventoryManagementProps> }) {
  const dispatch = useAppDispatch();
  const { selectedCompany } = useAppSelector(s => s.companies);

  const [itemTypes, setItemTypes] = useState<EquipmentsByStatus>({
    available: [],
    maintenance: [],
    decommissioned: [],
  });

  const fetchData = async (companyId: string) => {
    const [err, data] = await dispatch(getItemTypes(companyId));
    if (err) {
      return;
    }
    setItemTypes(data || []);
  };

  useEffect(() => {
    if (selectedCompany) fetchData(selectedCompany.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany]);

  return <WrappedComponent itemTypes={itemTypes} fetchData={fetchData} />;
}
