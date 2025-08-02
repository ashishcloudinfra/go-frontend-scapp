import { useMemo } from 'react';
import { MenuItem } from '../../../../types/Restaurant/MenuItem';
import CartItem from '../../components/Customer/CartItem';
import { OrderItemRequestBody, OrderRequestBody } from '../../../../types/Orders';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { registerOrder } from '../../../../app/actions/restaurant/orders';
import { setToastData } from '../../../../app/features/toast';
import { useNavigate } from 'react-router';
import useNavigateWithQueryParams from '../../../../hooks/useNavigateWithQueryParams';

function getCart(menuItems: Record<string, MenuItem>) {
  const sccart = localStorage.getItem('sccart');
  if (sccart) {
    const cart = JSON.parse(sccart);
    const items: MenuItem[] = [];
    for (const key in cart) {
      if (cart[key] > 0) items.push(menuItems[key]);
    }
    return items;
  }
  return [];
}

export interface IOrderProps {
  menuItems: Record<string, MenuItem>;
}

export default function Order(props: IOrderProps) {
  const selectedCompany = useAppSelector(s => s.companies.selectedCompany);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { getNewUrlWithQueryParams } = useNavigateWithQueryParams();

  const orders = useMemo(() => getCart(props.menuItems), [props.menuItems]);

  const onPlaceOrderClickHandler = async () => {
    const sccart = localStorage.getItem('sccart');
    if (sccart) {
      const cart = JSON.parse(sccart);
      const items: OrderItemRequestBody[] = [];
      for (const key in cart) {
        if (cart[key] > 0) items.push({
          menuItemPricingId: key,
          quantity: cart[key]
        });
      }
      const urlParams = new URLSearchParams(window.location.search);
      const tableNumber = urlParams.get('tableNumber');
      if (!tableNumber) {
        console.log('Table number does not exists');
        return;
      }
      const order: OrderRequestBody = {
        tableNumber,
        items,
        isDineIn: true,
        status: 'New',
        phone: '',
        email: '',
        companyId: selectedCompany?.id || '',
      };
      const [err] = await dispatch(registerOrder(order));
      if (err) {
        dispatch(setToastData({
          type: 'ERROR',
          text: 'Something failed while placing order',
        }))
        return;
      }
      localStorage.removeItem('sccart');
      dispatch(setToastData({
        type: 'SUCCESS',
        text: 'Order placed successfully',
      }))
      navigate(getNewUrlWithQueryParams(`/restaurant/customer/menu/${selectedCompany?.id || ''}`));
    }
  }

  if (!Object.keys(props.menuItems).length) return null;

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl'>Orders</h1>
      {orders.length === 0 && <h2 className='text-xl text-gray-600'>You have no items selected</h2>}
      <div className='flex flex-col gap-2'>
        {orders.map((item) => (
          <CartItem
            key={item.menuItemId}
            item={item}
          />
        ))}
      </div>
      <div className='flex justify-end'>
        {!!orders.length && <button
          className='bg-zinc-900 text-gray-100 rounded-md px-3 py-2 hover:bg-zinc-800 scale-light'
          onClick={onPlaceOrderClickHandler}
        >
          Place order
        </button>}
      </div>
    </div>
  )
}
