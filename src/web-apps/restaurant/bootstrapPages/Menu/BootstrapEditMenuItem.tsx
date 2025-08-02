import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MenuItem } from "../../../../types/Restaurant/MenuItem";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { getMenuItemWithId } from "../../../../app/actions/restaurant/menuItem";
import { IEditMenuItemProps } from "../../pages/Menu/Edit";

export default function BootstrapEditMenuItem({ WrappedComponent }: { WrappedComponent: React.FunctionComponent<IEditMenuItemProps> }) {
  const dispatch = useAppDispatch();
  const params = useParams();
  const selectedCompany = useAppSelector(s => s.companies.selectedCompany)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    async function fetchData(companyId: string) {
      const [err, res] = await dispatch(getMenuItemWithId(companyId, params.menuItemId || ''));
      if (err) {
        console.error(err);
        return;
      }
      setMenuItems(res || []);
    }
    if (selectedCompany) fetchData(selectedCompany.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany]);

  if (!menuItems.length) return null;

  return <WrappedComponent menuItems={menuItems} />;
}
