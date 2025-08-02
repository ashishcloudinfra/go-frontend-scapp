import { goFetch } from "../../../goFetch";
import { StaffFormValues, StaffRequestBody } from "../../../types/Staff";
import { AppDispatch, RootState } from "../../store";

export const fetchAllStaff = (companyId: string, role: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/pd/c/${companyId}/role/${role}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return ['Error fetching staff members', null];
    }
    const res = await response.json();
    return [null, res];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}

export const fetchStaffDetailById = (staffDetailId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/pd/${staffDetailId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return ['Error fetching staff members', null];
    }
    const res = await response.json();
    return [null, res];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}

export const registerStaffByAdmin = (data: StaffRequestBody) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { selectedCompany } = getState().companies;
  const companyId = selectedCompany?.id;
  if (!companyId) {
    return ['CompanyId not present', null];
  }
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/pd/c/${companyId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      return ['Error adding staff', null];
    }
    await response.json();
    return [null, "success"];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}

export const editStaffDetail = ({
  staffId,
  staffDetailId,
  status,
  data,
}: {
  staffId: string,
  staffDetailId: string,
  status: string;
  data: StaffFormValues
}) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/s/${staffId}/sd/${staffDetailId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metadata: data,
        status,
      }),
    });
    if (!response.ok) {
      return ['Error editing member', null];
    }
    await response.json();
    return [null, "success"];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}
