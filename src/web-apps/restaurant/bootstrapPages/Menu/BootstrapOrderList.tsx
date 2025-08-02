import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { AdminOrder } from "../../../../types/Orders";
import { IOrderListProps } from "../../pages/Orders/List";
import { getAllOrdersAdmin } from "../../../../app/actions/restaurant/orders";

export default function BootstrapOrderList({ WrappedComponent }: { WrappedComponent: React.FunctionComponent<IOrderListProps> }) {
  const dispatch = useAppDispatch();
  const selectedCompany = useAppSelector(s => s.companies.selectedCompany)
  const [orders, setOrders] = useState<AdminOrder[]>([]);

  async function fetchData(companyId: string, shouldShowLoader?: boolean) {
    const [err, res] = await dispatch(getAllOrdersAdmin(companyId, shouldShowLoader));
    if (err) {
      console.error(err);
      return;
    }
    setOrders(res || []);
  }

  useEffect(() => {
    let myInterval: NodeJS.Timeout;
    if (selectedCompany) {
      fetchData(selectedCompany.id, true);
      myInterval = setInterval(() => {
        fetchData(selectedCompany.id, false);
      }, 100000);
    }
    
    return () => {
      clearInterval(myInterval);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany]);

  const callFetch = () => {
    fetchData(selectedCompany?.id || '');
  }

  return <WrappedComponent orders={orders} callFetch={callFetch} />;
}
