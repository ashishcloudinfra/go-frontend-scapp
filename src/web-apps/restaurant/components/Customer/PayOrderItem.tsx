import { MenuItemWithQuantity } from "../../../../types/Restaurant/MenuItem"

interface IPayOrderItemProps {
  item: MenuItemWithQuantity;
}

export default function PayOrderItem(props: IPayOrderItemProps) {

  return (
    <div className="flex p-2 bg-gray-100 rounded-lg justify-between gap-2">
      <div className="flex">
        <img src={props.item.Photo} />
        <div>
          <h3 className="text-md font-bold font-nunito text-gray-700">{props.item.Name}</h3>
          <p className="text-xs text-gray-600">{props.item.Description}</p>
          <p className="text-sm font-light">₹ {props.item.Price}</p>
        </div>
      </div>
      <div>
        <p className="text-sm font-light relative top-3 bg-sky-700 text-gray-100 p-2 rounded-full">{props.item.Quantity}</p>
      </div>
    </div>
  )
}
