import { goFetch } from "../../../goFetch";
import { EventRoomFormFormValues } from "../../../types/EventRoom";
import { AppDispatch, RootState } from "../../store";

export const registerEventRoom = (data: EventRoomFormFormValues) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { selectedCompany } = getState().companies;
  const companyId = selectedCompany?.id;
  if (!companyId) {
    return ['CompanyId not present', null];
  }
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/c/${companyId}/eventRoom`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      return ['Error adding event room', null];
    }
    await response.json();
    return [null, "success"];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}

export const editEventRoom = (eventRoomId: string, data: EventRoomFormFormValues) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/eventRoom/${eventRoomId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      return ['Error adding event room', null];
    }
    await response.json();
    return [null, "success"];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}

export const fetchAllEventRooms = (companyId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/c/${companyId}/eventRooms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return ['Error adding event room', null];
    }
    const res = await response.json();
    return [null, res];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}

export const fetchEventRoomById = (id: string, companyId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/c/${companyId}/eventRoom/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return ['Error adding event room', null];
    }
    const res = await response.json();
    return [null, res];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}
