import { goFetch } from "../../../goFetch";
import { OrderRequestBody, OrderStatus } from "../../../types/Orders";
import { setToastData } from "../../features/toast";
import { AppDispatch } from "../../store";

export const registerOrder = (data: OrderRequestBody) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])('/orders/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (!response.ok) {
      return [null, res.data];
    }
    return [null, res];
  } catch (error) {
    console.error('Error:', error);
    return ['Something failed', null];
  }
}

export const getAllOrders = (tableNumber: number, companyId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/orders/tn/${tableNumber}/c/${companyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await response.json();
    if (!response.ok) {
      return [res.data, null];
    }
    return [null, res.data];
  } catch (error) {
    console.error('Error:', error);
    return ['Something failed', null];
  }
}

export const getAllOrdersAdmin = (companyId: string, shouldShowLoader?: boolean) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, shouldShowLoader ? ['FULL_APP'] : [])(`/orders/admin/c/${companyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await response.json();
    if (!response.ok) {
      return [res.data, null];
    }
    return [null, res.data];
  } catch (error) {
    console.error('Error:', error);
    return ['Something failed', null];
  }
}

export const updateOrderStatus = (orderId: string, status: keyof typeof OrderStatus) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/order/${orderId}/status/${status}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await response.json();
    if (!response.ok) {
      dispatch(setToastData({
        type: 'ERROR',
        text: 'Something failed while payment'
      }))
      return [res.data, null];
    }
    return [null, res.data];
  } catch (error) {
    console.error('Error:', error);
    return ['Something failed', null];
  }
}
