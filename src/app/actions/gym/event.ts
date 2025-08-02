import { goFetch } from "../../../goFetch";
import { EventFormValues } from "../../../types/Event";
import { AppDispatch, RootState } from "../../store";

export const registerEvent = (data: EventFormValues) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { selectedCompany } = getState().companies;
  const companyId = selectedCompany?.id;
  if (!companyId) {
    return ['CompanyId not present', null];
  }
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/c/${companyId}/event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      return ['Error adding event', null];
    }
    await response.json();
    return [null, "success"];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}

export const fetchAllEvents = (companyId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/c/${companyId}/events`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return ['Error fetching events', null];
    }
    const res = await response.json();
    return [null, res];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}