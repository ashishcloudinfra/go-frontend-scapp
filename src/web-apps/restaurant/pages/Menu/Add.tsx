// import { useNavigate } from "react-router";
// import { registerMenuItem } from "../../../../app/actions/restaurant/menuItem";
// import { useAppDispatch } from "../../../../app/hooks";
import { MenuItemRequestBody } from "../../../../types/Restaurant/MenuItem";
import AddMenuItemForm from "../../components/Customer/AddMenuItemForm";

export default function AddMenuItem() {
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const onFormSubmit = async (formValues: MenuItemRequestBody) => {
    console.log('formValues', formValues);
    // const [err] = await dispatch(registerMenuItem(formValues));
    // if (err) {
    //   return;
    // }
    // navigate('/restaurant/admin/menu/list');
  }

  return (
    <div>
      <AddMenuItemForm onFormSubmit={onFormSubmit} />
    </div>
  )
}
