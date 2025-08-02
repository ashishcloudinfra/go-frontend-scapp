import { goFetch } from "../../../goFetch";
import { MenuItemRequestBody } from "../../../types/Restaurant/MenuItem";
import { AppDispatch, RootState } from "../../store";

export const registerMenuItem = (data: MenuItemRequestBody) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const selectedCompany = getState().companies.selectedCompany;
  if (!selectedCompany) {
    return ['Company not present', null];
  }
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/c/${selectedCompany.id}/menuItem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (!response.ok) {
      return ['Something failed', null];
    }
    return [null, res.data];
  } catch (error) {
    console.error('Error:', error);
    return ['Something failed', null];
  }
}

export const registerBulkMenuItem = (data: MenuItemRequestBody[]) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const selectedCompany = getState().companies.selectedCompany;
  if (!selectedCompany) {
    return ['Company not present', null];
  }
  // sanitise data
  data.forEach(d => {
    if (!d.photo) d.photo = '';
  });
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/c/${selectedCompany.id}/menuItem/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (!response.ok) {
      return ['Something failed', null];
    }
    return [null, res.data];
  } catch (error) {
    console.error('Error:', error);
    return ['Something failed', null];
  }
}

export const getAllMenuItems = (companyId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/c/${companyId}/menuItems`, {
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

export const getMenuItemWithId = (companyId: string, menuItemId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/c/${companyId}/menuItem/${menuItemId}`, {
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

export const deleteMenuItemWithId = (menuItemId: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const selectedCompany = getState().companies.selectedCompany;
  if (!selectedCompany) {
    return ['Company not present', null];
  }
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/c/${selectedCompany.id}/menuItem/${menuItemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await response.json();
    if (!response.ok) {
      return ['Something failed while deleting', null];
    }
    return [null, res.data];
  } catch (error) {
    console.error('Error:', error);
    return ['Something failed', null];
  }
}

export const updateMenuItem = (data: MenuItemRequestBody, menuItemId: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const selectedCompany = getState().companies.selectedCompany;
  if (!selectedCompany) {
    return ['Company not present', null];
  }
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/c/${selectedCompany.id}/menuItem/${menuItemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (!response.ok) {
      return ['Something failed while updating', null];
    }
    return [null, res.data];
  } catch (error) {
    console.error('Error:', error);
    return ['Something failed', null];
  }
}
