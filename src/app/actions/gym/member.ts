import { goFetch } from "../../../goFetch";
import { MemberRequestBody } from "../../../types/MemberRequestBody";
import { AppDispatch } from "../../store";

export const fetchAllUsersByCompanyIdAndRole = (companyId: string, role: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/pd/c/${companyId}/role/${role}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return ['Error fetching all member details', null];
    }
    const res = await response.json();
    return [null, res];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}

export const fetchMemberDetail = (memberDetailId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/pd/${memberDetailId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return ['Error fetching member details', null];
    }
    const res = await response.json();
    return [null, res];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}

export const deleteMemberDetail = (memberId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/m/${memberId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return ['Error deleting member', null];
    }
    await response.json();
    return [null, "success"];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}

export const editMember = (memberDetailId: string, data: MemberRequestBody) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/pd/${memberDetailId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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

export const registerMember = (companyId: string, data: MemberRequestBody) => async (dispatch: AppDispatch) => {
  if (!companyId) return ['Please provide companyId', null];
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/pd/c/${companyId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      return ['Error adding member', null];
    }
    await response.json();
    return [null, "success"];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}

export const registerMemberWithUserNameAndPassword = (companyId: string, data: MemberRequestBody) => async (dispatch: AppDispatch) => {
  if (!companyId) return ['Please provide companyId', null];
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/register/c/${companyId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      return ['Error adding member', null];
    }
    await response.json();
    return [null, "success"];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}
