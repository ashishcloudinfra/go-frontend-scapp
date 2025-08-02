import { useMemo } from "react";
import { MenuItem } from "../../../../types/Restaurant/MenuItem";
import ItemDropDown from "../../components/Customer/ItemDropDown";
import { groupByCuisine } from "../../../../utils/menu";

export interface IMenuProps {
  menuItems: MenuItem[];
}

export default function Menu(props: IMenuProps) {
  const menu = useMemo(() => groupByCuisine(props.menuItems), [props.menuItems]);

  return (
    <div className="flex flex-col gap-4">
      <div className="mt-8 flex flex-col gap-2">
        {Object.keys(menu).map(category => <ItemDropDown
          key={category}
          title={category}
          menuItems={menu[category]}
        />)}
      </div>
    </div>
  )
}
