import { updateOrderStatus } from "../../../../app/actions/restaurant/orders";
import { useAppDispatch } from "../../../../app/hooks";
import { MenuItemWithQuantity } from "../../../../types/Restaurant/MenuItem";
import { OrderStatus } from "../../../../types/Orders";
export interface IPayProps {
  orderItems: MenuItemWithQuantity[];
}

export default function Pay(props: IPayProps) {
  const dispatch = useAppDispatch();

  const onPayClickHandler = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tableNumber = urlParams.get('tableNumber');
    if (!tableNumber) {
      console.log('Table number does not exists');
      return;
    }
    const [err] = await dispatch(updateOrderStatus(tableNumber, OrderStatus.Accepted)); // fix this later
    if (err) {
      console.log(err);
      return;
    }
  }

  if (!props.orderItems.length) return <>
    <h1 className='text-2xl mb-4'>Pay</h1>
    <h1 className="text-2xl text-gray-600">You have not placed any order yet</h1>
  </>

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl'>Pay</h1>
      <div className="flex flex-col gap-2">
        <table className="bg-green-50 p-2 rounded-lg">
          <thead>
            <tr className="text-gray-500 font-light">
              <th className="text-left p-1.5 font-light text-sm">Item</th>
              <th className="text-left p-1.5 font-light text-sm">Qty</th>
              <th className="text-left p-1.5 font-light text-sm">Price</th>
              <th className="text-left p-1.5 font-light text-sm">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {props.orderItems.map((item) => (
              <tr>
                <td className="p-1.5">{item.MenuitemName}{item.VarietyType !== 'default' ? ` (${item.VarietyType})` : ''}</td>
                <td className="p-1.5">{item.Quantity}</td>
                <td className="p-1.5">₹{item.Price}</td>
                <td className="p-1.5">₹{+item.Price * item.Quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between">
          <p className="text-gray-600 font-bold">Total</p>
          <p className="text-gray-600 font-bold">₹ {props.orderItems.reduce((acc, item) => acc + (+item.Price * item.Quantity), 0)}</p>
        </div>
      </div>
      <button
        className="bg-slate-900 w-fit text-slate-100 rounded-md px-3 py-2 self-end scale-light"
        onClick={onPayClickHandler}
      >
        Pay now
      </button>
    </div>
  )
}
