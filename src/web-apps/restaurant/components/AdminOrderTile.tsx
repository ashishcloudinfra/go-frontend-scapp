import { AdminOrder } from "../../../types/Orders";
import { getOrderTileBackwardBtnData, getOrderTileForwardBtnData } from "../utils/orderTile";

interface IAdminOrderTileProps {
  orders: AdminOrder[];
  isNextStageDisabled: boolean;
  isPreviousStageDisabled: boolean;
  OnNextStageClickHandler: () => void;
  OnPreviousStageClickHandler: () => void;
}

export default function AdminOrderTile(props: IAdminOrderTileProps) {
  return (
    <div className="p-3 rounded-lg relative w-full bg-gray-100 shadow-md flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        {props.orders[0].TableNumber && <div className="flex justify-between">
          <h4 className="text-xs text-gray-500 font-bold">Table Number</h4>
          <h4 className="text-xs text-gray-500 font-bold">{props.orders[0].TableNumber}</h4>
        </div>}
        <hr className="border-gray-200" />
        {props.orders.map((order, idx) => (
          <div key={`${order.OrderId}${idx}`} className="flex justify-between gap-2 items-center py-1 rounded-lg text-gray-600">
            <p className="text-xs font-light">{order.MenuitemName}</p>
            <p className="text-xs font-light">{order.Quantity}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          className={getOrderTileBackwardBtnData(props.orders[0].Status).class}
          onClick={props.OnPreviousStageClickHandler}
        >
          <span className="text-xs">{getOrderTileBackwardBtnData(props.orders[0].Status).text}</span>
        </button>
        <button
          className={getOrderTileForwardBtnData(props.orders[0].Status).class}
          onClick={props.OnNextStageClickHandler}
        >
          <span className="text-xs">{getOrderTileForwardBtnData(props.orders[0].Status).text}</span>
        </button>
      </div>
    </div>
  )
}
