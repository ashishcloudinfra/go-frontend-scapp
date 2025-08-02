import { useState } from "react";
import { Variety } from "../../../../types/Restaurant/MenuItem";

interface IItemVarietyProps {
 variety: Variety;
}

export default function ItemVariety(props: IItemVarietyProps) {
  const [count, setCount] = useState(JSON.parse(localStorage.getItem('sccart') || '[]')?.[props.variety.pricingId] || 0);
  
  const onAddBtnClickHandler = () => {
    const sccart = localStorage.getItem('sccart');
    if (!sccart) {
      localStorage.setItem('sccart', JSON.stringify({[props.variety.pricingId]: 1}));
      setCount(1);
      return;
    }
    const cart = JSON.parse(sccart);
    cart[props.variety.pricingId] = (cart[props.variety.pricingId] || 0) + 1;
    localStorage.setItem('sccart', JSON.stringify(cart));
    setCount(cart[props.variety.pricingId]);
  }

  const onPlusBtnClickHandler = () => {
    const sccart = localStorage.getItem('sccart');
    if (!sccart) {
      return;
    }
    const cart = JSON.parse(sccart);
    cart[props.variety.pricingId] = (cart[props.variety.pricingId] || 0) + 1;
    localStorage.setItem('sccart', JSON.stringify(cart));
    setCount(cart[props.variety.pricingId]);
  }

  const onMinusBtnClickHandler = () => {
    const sccart = localStorage.getItem('sccart');
    if (!sccart) {
      return;
    }
    const cart = JSON.parse(sccart);
    cart[props.variety.pricingId] = (cart[props.variety.pricingId] || 0) - 1;
    localStorage.setItem('sccart', JSON.stringify(cart));
    setCount(cart[props.variety.pricingId]);
  }

  return (
    <div>
      {count === 0 && <button className="bg-sky-600 text-sm text-gray-100 rounded-md px-2 py-1.5 relative top-1" onClick={onAddBtnClickHandler}>Add</button>}
      {count > 0 && <div className="flex gap-2">
        <button className="bg-sky-600 text-sm text-gray-100 rounded-md px-2 py-1.5 relative top-1" onClick={onMinusBtnClickHandler}>-</button>
        <p className="text-sm font-light relative top-3">{count}</p>
        <button className="bg-sky-600 text-sm text-gray-100 rounded-md px-2 py-1.5 relative top-1" onClick={onPlusBtnClickHandler}>+</button>
      </div>}
    </div>
  )
}
