import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { useParams } from "react-router";
import { fetchCompanyByCompanyId } from "../../../../../app/actions/company";
import { getAllOrders } from "../../../../../app/actions/restaurant/orders";
import { MenuItemWithQuantity } from "../../../../../types/Restaurant/MenuItem";
import { IPayProps } from "../../../pages/Customer/Pay";

export default function BootstrapPay({ WrappedComponent }: { WrappedComponent: React.FunctionComponent<IPayProps> }) {
  const dispatch = useAppDispatch();
  const selectedCompany = useAppSelector(s => s.companies.selectedCompany);
  const params = useParams();

  const [orderItems, setOrderItems] = useState<MenuItemWithQuantity[]>([]);

  useEffect(() => {
    async function fetchData(companyId: string) {
      const urlParams = new URLSearchParams(window.location.search);
      const tableNumber = urlParams.get('tableNumber');
      if (!tableNumber) {
        console.log('Table number does not exists');
        return;
      }
      const [err, res] = await dispatch(getAllOrders(+tableNumber, companyId));
      if (err) {
        console.error(err);
        return;
      }
      setOrderItems(res || []);
    }
    if (params.companyId) {
      fetchData(params.companyId);
      if (!selectedCompany) dispatch(fetchCompanyByCompanyId(params.companyId));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.companyId])

  return <WrappedComponent orderItems={orderItems} />;
}
