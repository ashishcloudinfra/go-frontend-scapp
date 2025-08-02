import { goFetch } from "../../../goFetch";
import { setNotificationData } from "../../features/notification";
import { AppDispatch, RootState } from "../../store";

export const personalFinancePrompt = (data: unknown) => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const tokenData = getState().token.data;
    if (!tokenData?.id) {
      dispatch(setNotificationData({
        type: 'ERROR',
        heading: 'User not authenticated',
        description: 'User is not authenticated.',
      }));
      return ['User not authenticated', null];
    }
    const response = await goFetch(dispatch, [], ['PROMPTING'])(`/${tokenData.id}/personalFinance/prompt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      dispatch(setNotificationData({
        type: 'ERROR',
        heading: 'Error prompting',
        description: 'Something went wrong. Please try again.',
      }));
      return ['Error adding budget item', null];
    }
    const res = await response.json();
    return [null, res.data];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}