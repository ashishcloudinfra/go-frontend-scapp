import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { MenuItemWithVariety } from "../../../../types/Restaurant/MenuItem";
import { useState } from "react";
import Item from "./Item";

interface IItemDropDownProps {
  title: string;
  menuItems: Record<string, MenuItemWithVariety>;
}

export default function ItemDropDown(props: IItemDropDownProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <div
        className="bg-gray-300 py-2 px-3 rounded-md flex justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>{props.title}</span>
        {isExpanded ? <FaCaretUp className="relative top-1" /> : <FaCaretDown className="relative top-1" />}
      </div>
      <div>
        {isExpanded && (
          <div className="flex flex-col gap-2 mt-2 p-2">
            {Object.keys(props.menuItems).map(item => <Item
              key={props.menuItems[item].menuItemId}
              name={item}
              item={props.menuItems[item]}
            />)}
          </div>
        )}
      </div>
    </div>
  )
}
