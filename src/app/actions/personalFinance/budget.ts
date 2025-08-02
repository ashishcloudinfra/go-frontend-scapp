import { goFetch } from "../../../goFetch";
import { BudgetCategoryReqBody, BudgetItemReqBody, CopyBudgetReqBody } from "../../../types/PersonalFinance/Budget";
import { setNotificationData } from "../../features/notification";
import { AppDispatch, RootState } from "../../store";

export const addBudgetItem = (data: BudgetItemReqBody) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const tokenData = getState().token.data;
  if (!tokenData?.id) {
    dispatch(setNotificationData({
      type: 'ERROR',
      heading: 'User not authenticated',
      description: 'User is not authenticated.',
    }));
    return ['User not authenticated', null];
  }
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/${tokenData.id}/budgetItem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      dispatch(setNotificationData({
        type: 'ERROR',
        heading: 'Error adding budget item',
        description: 'Something went wrong. Please try again.',
      }));
      return ['Error adding budget item', null];
    }
    await response.json();
    dispatch(setNotificationData({
      type: 'SUCCESS',
      heading: 'Successfully added budget item',
      description: 'Yay! Budget item added successfully',
    }));
    return [null, "success"];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}

export const addBudgetCategory = (data: BudgetCategoryReqBody) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const tokenData = getState().token.data;
  if (!tokenData?.id) {
    dispatch(setNotificationData({
      type: 'ERROR',
      heading: 'User not authenticated',
      description: 'User is not authenticated.',
    }));
    return ['User not authenticated', null];
  }
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/${tokenData.id}/budgetCategory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      dispatch(setNotificationData({
        type: 'ERROR',
        heading: 'Error adding budget category',
        description: 'Something went wrong. Please try again.',
      }));
      return ['Error adding budget category', null];
    }
    await response.json();
    dispatch(setNotificationData({
      type: 'SUCCESS',
      heading: 'Successfully added budget category',
      description: 'Yay! Budget category added successfully',
    }));
    return [null, "success"];
  } catch (error) {
    console.error('Error:', error);
    dispatch(setNotificationData({
      type: 'ERROR',
      heading: 'Oh! Snap',
      description: 'Something went wrong. Please try again.',
    }));
    return ['Something went wrong', null];
  }
}

export const copyBudget = (data: CopyBudgetReqBody) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const tokenData = getState().token.data;
  if (!tokenData?.id) {
    dispatch(setNotificationData({
      type: 'ERROR',
      heading: 'User not authenticated',
      description: 'User is not authenticated.',
    }));
    return ['User not authenticated', null];
  }
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/${tokenData.id}/copyBudget`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      dispatch(setNotificationData({
        type: 'ERROR',
        heading: 'Error copying budget',
        description: 'Something went wrong. Please try again.',
      }));
      return ['Error adding budget category', null];
    }
    await response.json();
    dispatch(setNotificationData({
      type: 'SUCCESS',
      heading: 'Successfully copied budget',
      description: 'Yay! Budget category added successfully',
    }));
    return [null, "success"];
  } catch (error) {
    console.error('Error:', error);
    dispatch(setNotificationData({
      type: 'ERROR',
      heading: 'Oh! Snap',
      description: 'Something went wrong. Please try again.',
    }));
    return ['Something went wrong', null];
  }
}

export const getAllBudgetCategories = (month: number, year: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const tokenData = getState().token.data;
  if (!tokenData?.id) {
    dispatch(setNotificationData({
      type: 'ERROR',
      heading: 'User not authenticated',
      description: 'User is not authenticated.',
    }));
    return ['User not authenticated', null];
  }
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/${tokenData.id}/budgetCategories/m/${month}/y/${year}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      dispatch(setNotificationData({
        type: 'ERROR',
        heading: 'Error fetching budget categories',
        description: 'Something went wrong. Please try again.',
      }));
      return ['Error adding budget categories', null];
    }
    const result = await response.json();
    return [null, result.data];
  } catch (error) {
    console.error('Error:', error);
    dispatch(setNotificationData({
      type: 'ERROR',
      heading: 'Oh! Snap',
      description: 'Something went wrong. Please try again.',
    }));
    return ['Something went wrong', null];
  }
}

export const getAllBudgetCategoryTypes = () => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/budgetCategoryTypes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      dispatch(setNotificationData({
        type: 'ERROR',
        heading: 'Error fetching budget category types',
        description: 'Something went wrong. Please try again.',
      }));
      return ['Error adding budget category types', null];
    }
    const result = await response.json();
    return [null, result.data];
  } catch (error) {
    console.error('Error:', error);
    dispatch(setNotificationData({
      type: 'ERROR',
      heading: 'Oh! Snap',
      description: 'Something went wrong. Please try again.',
    }));
    return ['Something went wrong', null];
  }
}

export const getAllBudgetItems = (month: number, year: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const tokenData = getState().token.data;
  if (!tokenData?.id) {
    dispatch(setNotificationData({
      type: 'ERROR',
      heading: 'User not authenticated',
      description: 'User is not authenticated.',
    }));
    return ['User not authenticated', null];
  }
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/${tokenData.id}/budgetItems/m/${month}/y/${year}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      dispatch(setNotificationData({
        type: 'ERROR',
        heading: 'Error fetching budget items',
        description: 'Something went wrong. Please try again.',
      }));
      return ['Error fetching budget items', null];
    }
    const result = await response.json();
    return [null, result.data];
  } catch (error) {
    console.error('Error:', error);
    dispatch(setNotificationData({
      type: 'ERROR',
      heading: 'Oh! Snap',
      description: 'Something went wrong. Please try again.',
    }));
    return ['Something went wrong', null];
  }
}

export const getBudgetStatsByMonthAndYear = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const tokenData = getState().token.data;
  if (!tokenData?.id) {
    dispatch(setNotificationData({
      type: 'ERROR',
      heading: 'User not authenticated',
      description: 'User is not authenticated.',
    }));
    return ['User not authenticated', null];
  }
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/${tokenData.id}/budgetStats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      dispatch(setNotificationData({
        type: 'ERROR',
        heading: 'Error fetching budget stats',
        description: 'Something went wrong. Please try again.',
      }));
      return ['Error fetching budget items', null];
    }
    const result = await response.json();
    return [null, result.data];
  } catch (error) {
    console.error('Error:', error);
    dispatch(setNotificationData({
      type: 'ERROR',
      heading: 'Oh! Snap',
      description: 'Something went wrong. Please try again.',
    }));
    return ['Something went wrong', null];
  }
}

export const getRawStats = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const tokenData = getState().token.data;
  if (!tokenData?.id) {
    dispatch(setNotificationData({
      type: 'ERROR',
      heading: 'User not authenticated',
      description: 'User is not authenticated.',
    }));
    return ['User not authenticated', null];
  }
  try {
    const response = await goFetch(dispatch, [])(`/${tokenData.id}/rawStats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      dispatch(setNotificationData({
        type: 'ERROR',
        heading: 'Error fetching budget stats',
        description: 'Something went wrong. Please try again.',
      }));
      return ['Error fetching budget items', null];
    }
    const result = await response.json();
    return [null, result.data];
  } catch (error) {
    console.error('Error:', error);
    dispatch(setNotificationData({
      type: 'ERROR',
      heading: 'Oh! Snap',
      description: 'Something went wrong. Please try again.',
    }));
    return ['Something went wrong', null];
  }
}

export const deleteBudgetItem = (budgetItemId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/budgetItem/${budgetItemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      dispatch(setNotificationData({
        type: 'ERROR',
        heading: 'Error deleting budget item',
        description: 'Something went wrong. Please try again.',
      }));
      return ['Error deleting budget item', null];
    }
    await response.json();
    dispatch(setNotificationData({
      type: 'SUCCESS',
      heading: 'Successfully deleted budget item',
      description: 'Yay! Budget item deleted successfully',
    }));
    return [null, "success"];
  } catch (error) {
    console.error('Error:', error);
    dispatch(setNotificationData({
      type: 'ERROR',
      heading: 'Oh! Snap',
      description: 'Something went wrong. Please try again.',
    }));
    return ['Something went wrong', null];
  }
}

export const deleteBudgetCategory = (categoryId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/budgetCategory/${categoryId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      dispatch(setNotificationData({
        type: 'ERROR',
        heading: 'Error deleting budget category',
        description: 'Something went wrong. Please try again.',
      }));
      return ['Error deleting budget category', null];
    }
    await response.json();
    dispatch(setNotificationData({
      type: 'SUCCESS',
      heading: 'Successfully deleted budget category',
      description: 'Yay! Budget category deleted successfully',
    }));
    return [null, "success"];
  } catch (error) {
    console.error('Error:', error);
    dispatch(setNotificationData({
      type: 'ERROR',
      heading: 'Oh! Snap',
      description: 'Something went wrong. Please try again.',
    }));
    return ['Something went wrong', null];
  }
}

export const updateBudgetItem = (budgetItemId: string, data: BudgetItemReqBody) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/budgetItem/${budgetItemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      dispatch(setNotificationData({
        type: 'ERROR',
        heading: 'Error updating budget item',
        description: 'Something went wrong. Please try again.',
      }));
      return ['Error updating budget item', null];
    }
    await response.json();
    dispatch(setNotificationData({
      type: 'SUCCESS',
      heading: 'Successfully updated budget item',
      description: 'Yay! Budget item updated successfully',
    }));
    return [null, "success"];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}

export const updateBudgetCategory = (categoryId: string, data: BudgetCategoryReqBody) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/budgetCategory/${categoryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      dispatch(setNotificationData({
        type: 'ERROR',
        heading: 'Error updating budget category',
        description: 'Something went wrong. Please try again.',
      }));
      return ['Error updating budget category', null];
    }
    await response.json();
    dispatch(setNotificationData({
      type: 'SUCCESS',
      heading: 'Successfully updated budget category',
      description: 'Yay! Budget category updated successfully',
    }));
    return [null, "success"];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}
