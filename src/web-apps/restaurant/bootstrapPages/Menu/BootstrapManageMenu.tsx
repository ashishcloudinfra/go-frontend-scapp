import { useEffect, useState } from "react";
import { IListProps } from "../../pages/Menu/List";
import { MenuItem } from "../../../../types/Restaurant/MenuItem";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { getAllMenuItems } from "../../../../app/actions/restaurant/menuItem";

export default function BootstrapManageMenuItem({ WrappedComponent }: { WrappedComponent: React.FunctionComponent<IListProps> }) {
  const dispatch = useAppDispatch();
  const selectedCompany = useAppSelector(s => s.companies.selectedCompany)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    async function fetchData(companyId: string) {
      const [err, res] = await dispatch(getAllMenuItems(companyId));
      if (err) {
        console.error(err);
        return;
      }
      setMenuItems(res || []);
    }
    if (selectedCompany) fetchData(selectedCompany.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany])

  return <WrappedComponent menuItems={menuItems} />;
}
