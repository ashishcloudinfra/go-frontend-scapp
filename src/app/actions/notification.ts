import { goFetch } from "../../goFetch";
import { EmailNotificationRequestPayload } from "../../types/Notification";
import { setNotificationData } from "../features/notification";
import { AppDispatch } from "../store";

export const sendEmailNotification = (data: EmailNotificationRequestPayload) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])('/notification/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      dispatch(setNotificationData({
        type: 'ERROR',
        heading: 'Error sending email notification',
        description: 'Error sending email notification'
      }))
      return ['Error sending email notification', null];
    }
    await response.json();
    return [null, "success"];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}