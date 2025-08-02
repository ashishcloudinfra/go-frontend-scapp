import { useMemo } from "react";
import { AdminOrder, OrderStatus } from "../../../../types/Orders"
import OrderStatusSection from "../../components/OrderStatusSection";

const orderStatuses: Array<keyof typeof OrderStatus> = ['New', 'Accepted', 'Preparing', 'Completed'];

export interface IOrderListProps {
  orders: AdminOrder[];
  callFetch: () => void;
}

export default function OrderList(props: IOrderListProps) {
  const groupedItems = useMemo(() => props.orders.reduce((acc, item) => {
    if (!acc[item.OrderId]) {
      acc[item.OrderId] = [];
    }
    acc[item.OrderId].push(item);
    return acc;
  }, {} as Record<string, AdminOrder[]>), [props.orders]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl">Orders</h1>
      {!props.orders.length && <h2 className="text-xl text-gray-600">You have no orders yet</h2>}
      {!!props.orders.length && <div className="flex justify-between gap-8">
        {orderStatuses.map((status, idx) => (
          <div className="w-full" key={status}>
            <OrderStatusSection
              id={`${status}${idx}`}
              name={status}
              orderIds={Object.keys(groupedItems).filter(itemKey => groupedItems[itemKey][0].Status === status)}
              allItems={groupedItems}
              stageIndex={idx}
              orderStatuses={orderStatuses}
              callFetch={props.callFetch}
            />
          </div>
        ))}
      </div>}
    </div>
  )
}
