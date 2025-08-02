import { updateOrderStatus } from "../../../app/actions/restaurant/orders";
import { useAppDispatch } from "../../../app/hooks";
import { AdminOrder, OrderStatus } from "../../../types/Orders";
import AdminOrderTile from "./AdminOrderTile";

interface IOrderStatusSectionProps {
  id: string;
  name: keyof typeof OrderStatus;
  stageIndex: number;
  orderIds: string[];
  orderStatuses: Array<keyof typeof OrderStatus>;
  allItems: Record<string, AdminOrder[]>;
  callFetch: () => void;
}

export default function OrderStatusSection(props: IOrderStatusSectionProps) {
  const dispatch = useAppDispatch();

  const OnNextStageClickHandler = async (key: string) => {
    if (props.stageIndex >= props.orderStatuses.length - 1) {
      await dispatch(updateOrderStatus(key, OrderStatus.Paid));
      props.callFetch();
      return;
    }
    await dispatch(updateOrderStatus(key, props.orderStatuses[props.stageIndex + 1]));
    props.callFetch();
  }

  const OnPreviousStageClickHandler = async (key: string) => {
    if (props.stageIndex <= 0) {
      await dispatch(updateOrderStatus(key, OrderStatus.OutOfStock));
      props.callFetch();
      return;
    }
    await dispatch(updateOrderStatus(key, props.orderStatuses[props.stageIndex - 1]));
    props.callFetch();
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg text-gray-700">{OrderStatus[props.name]} <hr className="border-gray-300" /></h3>

      <div className="flex gap-4 flex-wrap">
        {props.orderIds.map((key, idx) => <AdminOrderTile
          key={`${key}${idx}`}
          orders={props.allItems[key]}
          isNextStageDisabled={(props.stageIndex >= props.orderStatuses.length - 1)}
          isPreviousStageDisabled={(props.stageIndex <= 0)}
          OnNextStageClickHandler={() => OnNextStageClickHandler(key)}
          OnPreviousStageClickHandler={() => OnPreviousStageClickHandler(key)}
        />)}
      </div>
    </div>
  )
}
