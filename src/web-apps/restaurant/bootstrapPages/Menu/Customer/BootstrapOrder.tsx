import { useEffect, useState } from "react";
import { getAllMenuItems } from "../../../../../app/actions/restaurant/menuItem";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { MenuItem } from "../../../../../types/Restaurant/MenuItem";
import { useParams } from "react-router";
import { IOrderProps } from "../../../pages/Customer/Order";  
import { fetchCompanyByCompanyId } from "../../../../../app/actions/company";

export default function BootstrapOrder({ WrappedComponent }: { WrappedComponent: React.FunctionComponent<IOrderProps> }) {
  const dispatch = useAppDispatch();
  const selectedCompany = useAppSelector(s => s.companies.selectedCompany);
  const params = useParams();

  const [menuItems, setMenuItems] = useState<Record<string, MenuItem>>({});

  useEffect(() => {
    async function fetchData(companyId: string) {
      const [err, res] = await dispatch(getAllMenuItems(companyId));
      if (err) {
        console.error(err);
        return;
      }
      setMenuItems((res as MenuItem[]).reduce((memo, curr) => {
        memo[curr.pricingId] = curr;
        return memo;
      }, {} as Record<string, MenuItem>) || {});
    }
    if (params.companyId) {
      fetchData(params.companyId);
      if (!selectedCompany) dispatch(fetchCompanyByCompanyId(params.companyId));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.companyId])

  return <WrappedComponent menuItems={menuItems} />;
}
