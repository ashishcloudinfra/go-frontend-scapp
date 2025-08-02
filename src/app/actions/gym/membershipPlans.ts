import { goFetch } from "../../../goFetch";
import { MembershipPlanFormValues } from "../../../gym/pages/membershipPlans/Add";
import { setNotificationData } from "../../features/notification";
import { AppDispatch, RootState } from "../../store";

export const addMembershipPlan = (data: MembershipPlanFormValues) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { selectedCompany } = getState().companies;
  const companyId = selectedCompany?.id;
  if (!companyId) {
    return ['CompanyId not present', null];
  }
  try {
    const response = await goFetch(dispatch, ['FULL_APP'], [])(`/membershipPlan/${companyId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      return ['Invalid username or password', null];
    }
    await response.json();
    return [null, "success"];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}

export const editMembershipPlan = (planId: string, data: MembershipPlanFormValues) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'], [])(`/membershipPlan/${planId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      return ['Error editing', null];
    }
    await response.json();
    return [null, "success"];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}

export const deleteMembershipPlan = (planId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'], [])(`/membershipPlan/${planId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await response.json();
    if (!response.ok) {
      dispatch(setNotificationData({
        type: 'ERROR',
        heading: 'Error deleting membership plan',
        description: res.data
      }))
      return ['Error deleting', null];
    }
    return [null, "success"];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}

export const getAllMembershipPlan = (companyId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'], [])(`/membershipPlan/${companyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return ['Error fetching membership plans', null];
    }
    const result = await response.json();
    return [null, result.data];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}

export const getMembershipPlanById = (companyId: string, membershipPlanId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'], [])(`/c/${companyId}/mp/${membershipPlanId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return ['Error fetching membership plans', null];
    }
    const result = await response.json();
    return [null, result.data];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}
