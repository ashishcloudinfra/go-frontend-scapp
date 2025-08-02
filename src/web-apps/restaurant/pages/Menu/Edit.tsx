import { useNavigate } from "react-router";
import { deleteMenuItemWithId, updateMenuItem } from "../../../../app/actions/restaurant/menuItem";
import { useAppDispatch } from "../../../../app/hooks";
import { useMemo } from "react";
import { MenuItem, MenuItemRequestBody } from "../../../../types/Restaurant/MenuItem";
import AddMenuItemForm from "../../components/Customer/AddMenuItemForm";

export interface IEditMenuItemProps {
  menuItems: MenuItem[];
}

export default function EditMenuItem(props: IEditMenuItemProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const menuItemMap = useMemo(() => props.menuItems.reduce((memo, curr) => {
    if (!memo[curr.menuItemId]) {
      memo[curr.menuItemId] = {
        name: curr.menuItemName,
        description: curr.menuItemDescription,
        photo: curr.menuItemPhoto,
        isVeg: curr.isVeg,
        category: curr.categoryName,
        cookingTime: curr.cookingTime,
        varieties: [{
          id: curr.pricingId,
          name: curr.varietyType,
          price: curr.price
        }]
      };
    } else {
      memo[curr.menuItemId].varieties.push({
        id: curr.pricingId,
        name: curr.varietyType,
        price: curr.price
      });
    }
    return memo;
  }, {} as Record<string, MenuItemRequestBody>), [props.menuItems]);

  const onFormSubmit = async (formValues: MenuItemRequestBody) => {
    const [err] = await dispatch(updateMenuItem(formValues, props.menuItems[0].menuItemId));
    if (err) {
      return;
    }
    navigate('/restaurant/admin/menu/list');
  }

  const onDeleteMenuItem = async () => {
    const [err] = await dispatch(deleteMenuItemWithId(props.menuItems[0].menuItemId));
    if (err) {
      return;
    }
    navigate('/restaurant/admin/menu/list');
  }

  return (
    <div>
      <AddMenuItemForm formValues={menuItemMap[props.menuItems[0].menuItemId]} onFormSubmit={onFormSubmit} />
      <button
        type="button"
        className="mx-8 mb-8 focus:outline-hidden text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
        onClick={onDeleteMenuItem}
      >
        Delete menu item
      </button>
    </div>
  )
}
