import { useState } from "react";
import { MenuItem } from "../../../../types/Restaurant/MenuItem"

interface IItemProps {
  item: MenuItem;
}

export default function CartItem(props: IItemProps) {
  const [count, setCount] = useState(JSON.parse(localStorage.getItem('sccart') || '[]')?.[props.item.pricingId] || 0);

  const onPlusBtnClickHandler = () => {
    const sccart = localStorage.getItem('sccart');
    if (!sccart) {
      return;
    }
    const cart = JSON.parse(sccart);
    cart[props.item.pricingId] = (cart[props.item.pricingId] || 0) + 1;
    localStorage.setItem('sccart', JSON.stringify(cart));
    setCount(cart[props.item.pricingId]);
  }

  const onMinusBtnClickHandler = () => {
    const sccart = localStorage.getItem('sccart');
    if (!sccart) {
      return;
    }
    const cart = JSON.parse(sccart);
    cart[props.item.pricingId] = (cart[props.item.pricingId] || 0) - 1;
    localStorage.setItem('sccart', JSON.stringify(cart));
    setCount(cart[props.item.pricingId]);
  }

  if (count === 0) return null;

  return (
    <div className="flex p-2 bg-gray-100 rounded-lg justify-between gap-2">
      <div className="flex">
        <img src={props.item.menuItemPhoto} />
        <div>
          <h3 className="text-md font-bold font-nunito text-gray-700">{props.item.menuItemName}</h3>
          {props.item.varietyType !== 'default' && <p className="text-xs text-gray-600">{props.item.varietyType}</p>}
          <p className="text-sm font-light">₹ {props.item.price}</p>
        </div>
      </div>
      <div>
        {count > 0 && <div className="flex gap-2">
          <button className="bg-sky-600 text-sm text-gray-100 rounded-md px-2 py-1.5 relative top-1" onClick={onMinusBtnClickHandler}>-</button>
          <p className="text-sm font-light relative top-3">{count}</p>
          <button className="bg-sky-600 text-sm text-gray-100 rounded-md px-2 py-1.5 relative top-1" onClick={onPlusBtnClickHandler}>+</button>
        </div>}
      </div>
    </div>
  )
}
