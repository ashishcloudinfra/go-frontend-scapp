import { Link } from "react-router";
import PageHeading from "../../components/PageHeading";
import { RiMenuAddFill } from "react-icons/ri";
import { MenuItem } from "../../../../types/Restaurant/MenuItem";
import { useMemo } from "react";
import ItemDropDown from "../../components/Customer/ItemDropDown";
import { groupByCuisine } from "../../../../utils/menu";
import { MdOutlineDocumentScanner } from "react-icons/md";

export interface IListProps {
  menuItems: MenuItem[];
}

export default function List(props: IListProps) {
  const menu = useMemo(() => groupByCuisine(props.menuItems), [props.menuItems]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <PageHeading
          title="Manage menu"
          description="Manage your menu"
        />
        <div>
          <Link
            to={'/restaurant/admin/menu/scan'}
            type="button"
            className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center me-2 dark:bg-primary dark:hover:bg-gray-700 hover:scale-105 transform transition duration-200 self-start"
          >
            <MdOutlineDocumentScanner className="mr-2" size={20} />
            Scan menu
          </Link>
          <Link
            to={'/restaurant/admin/menu/add'}
            type="button"
            className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center me-2 dark:bg-primary dark:hover:bg-gray-700 hover:scale-105 transform transition duration-200 self-start"
          >
            <RiMenuAddFill className="mr-2" size={20} />
            Add menu item
          </Link>
        </div>
      </div>
      {!!Object.keys(menu).length && <div className="mt-8 flex flex-col gap-2">
        {Object.keys(menu).map(category => <ItemDropDown
          key={category}
          title={category}
          menuItems={menu[category]}
        />)}
      </div>}
    </div>
  )
}
