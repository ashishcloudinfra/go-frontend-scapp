import { goFetch } from "../../../goFetch";
import { IPaymentGateway } from "../../../types/PaymentGateway";
import { AppDispatch } from "../../store";

export const createPaymentOrder = (data: IPaymentGateway) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/create-payment-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      return ['Error adding asset item', null];
    }
    const result = await response.json();
    return [null, result.data.id];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}