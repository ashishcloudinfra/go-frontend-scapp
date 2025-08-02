import { goFetch } from "../../../goFetch";
import { AddInventoryDescriptionFormValues } from "../../../gym/pages/inventory/AddNewEquipment";
import { EquipmentReqBody, UpdateEquipmentReqBody } from "../../../types/Inventory";
import { AppDispatch, RootState } from "../../store";

export const registerItemDetails = (data: EquipmentReqBody) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { selectedCompany } = getState().companies;
  const companyId = selectedCompany?.id;
  if (!companyId) {
    return ['CompanyId not present', null];
  }
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/c/${companyId}/itemDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      return ['Error adding item details', null];
    }
    await response.json();
    return [null, "success"];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}

export const addItems = (data: AddInventoryDescriptionFormValues) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { selectedCompany } = getState().companies;
  const companyId = selectedCompany?.id;
  if (!companyId) {
    return ['CompanyId not present', null];
  }
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/c/${companyId}/addItems`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      return ['Error adding item details', null];
    }
    await response.json();
    return [null, "success"];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}

export const updateItemStatus = (data: UpdateEquipmentReqBody) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { selectedCompany } = getState().companies;
  const companyId = selectedCompany?.id;
  if (!companyId) {
    return ['CompanyId not present', null];
  }
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/c/${companyId}/updateStatus`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      return ['Error adding item details', null];
    }
    await response.json();
    return [null, "success"];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}

export const fetchEquipments = () => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/equipments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return ['Error getting equipments', null];
    }
    const res = await response.json();
    return [null, res.data];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}

export const getItemTypes = (selectedCompany: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/c/${selectedCompany}/itemTypes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return ['Error getting item details', null];
    }
    const res = await response.json();
    return [null, res.data];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}