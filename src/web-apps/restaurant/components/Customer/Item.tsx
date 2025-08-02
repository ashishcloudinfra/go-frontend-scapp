import { Link } from "react-router";
import { MenuItemWithVariety } from "../../../../types/Restaurant/MenuItem"
import { useAppSelector } from "../../../../app/hooks";
import ItemVariety from "./ItemVariety";

interface IItemProps {
  name: string;
  item: MenuItemWithVariety;
}

export default function Item(props: IItemProps) {
  const tokenData = useAppSelector(s => s.token.data);

  return (
    <div className="flex p-2 bg-gray-100 rounded-lg justify-between gap-2">
      <div className="flex justify-between w-full">
        {props.item.menuItemPhoto && <img src={props.item.menuItemPhoto} />}
        <div className="flex flex-col gap-2">
          <h3 className="text-md font-bold font-nunito text-gray-700">{props.name}</h3>
          <p className="text-xs text-gray-600">{props.item.menuItemDescription}</p>
        </div>
        <div className="flex gap-3">
          <div className="flex gap-3">
            {props.item.varieties.map(variety => <div
              key={variety.pricingId}
              className="bg-sky-200 text-gray-700 px-2 py-2 grid place-items-center rounded-md"
            >
              <p className="text-sm font-light">₹ {variety.price}</p>
              {variety.varietyType !== 'default' && <p className="text-xs">{variety.varietyType}</p>}
              {tokenData?.role !== 'admin' && <ItemVariety
                variety={variety}
              />}
            </div>)}
          </div>
          {tokenData?.role === 'admin' && <Link
            to={`/restaurant/admin/menu/edit/${props.item.menuItemId}`}
            className="cursor-pointer text-xs"
          >
            Edit
          </Link>}
        </div>
      </div>
    </div>
  )
}
