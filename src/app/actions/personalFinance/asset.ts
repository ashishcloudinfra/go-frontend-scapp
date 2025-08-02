import { goFetch } from "../../../goFetch";
import { AssetItemReqBody } from "../../../types/PersonalFinance/Asset";
import { setNotificationData } from "../../features/notification";
import { AppDispatch, RootState } from "../../store";

export const fetchMutualFundLatestData = async (code: string) => {
  try {
    const response = await fetch(`https://api.mfapi.in/mf/${code}/latest`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      data: [
        {
          date: '',
          nav: 0,
        }
      ]
    };
  }
}

export const fetchStockOrETFLatestData = (code: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/price/${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 0;
  }
}

export const addAssetItem = (data: AssetItemReqBody) => async (dispatch: AppDispatch, getState: () => RootState) => {
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
    const response = await goFetch(dispatch, ['FULL_APP'])(`/${tokenData.id}/asset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      dispatch(setNotificationData({
        type: 'ERROR',
        heading: 'Error adding asset item',
        description: 'Something went wrong. Please try again.',
      }));
      return ['Error adding asset item', null];
    }
    await response.json();
    dispatch(setNotificationData({
      type: 'SUCCESS',
      heading: 'Successfully added asset item',
      description: 'Yay! Asset item added successfully',
    }));
    return [null, "success"];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}

export const updateAssetItem = (assetId: string, data: AssetItemReqBody) => async (dispatch: AppDispatch, getState: () => RootState) => {
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
    const response = await goFetch(dispatch, ['FULL_APP'])(`/${tokenData.id}/asset/${assetId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      dispatch(setNotificationData({
        type: 'ERROR',
        heading: 'Error updating asset item',
        description: 'Something went wrong. Please try again.',
      }));
      return ['Error updating asset item', null];
    }
    await response.json();
    dispatch(setNotificationData({
      type: 'SUCCESS',
      heading: 'Successfully updated asset item',
      description: 'Yay! Budget item added successfully',
    }));
    return [null, "success"];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}

export const deleteAssetItem = (assetId: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
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
    const response = await goFetch(dispatch, ['FULL_APP'])(`/${tokenData.id}/asset/${assetId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      dispatch(setNotificationData({
        type: 'ERROR',
        heading: 'Error deleting asset item',
        description: 'Something went wrong. Please try again.',
      }));
      return ['Error updating asset item', null];
    }
    await response.json();
    dispatch(setNotificationData({
      type: 'SUCCESS',
      heading: 'Successfully deleted asset item',
      description: 'Yay! Asset item deleted successfully',
    }));
    return [null, "success"];
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}

export const getAllAssets = () => async (dispatch: AppDispatch, getState: () => RootState) => {
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
    const response = await goFetch(dispatch, ['FULL_APP'])(`/${tokenData.id}/assets`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      dispatch(setNotificationData({
        type: 'ERROR',
        heading: 'Error fetching assets items',
        description: 'Something went wrong. Please try again.',
      }));
      return ['Error fetching asset items', null];
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

export const getAllAssetTypes = () => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/assetTypes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      dispatch(setNotificationData({
        type: 'ERROR',
        heading: 'Error fetching assets types',
        description: 'Something went wrong. Please try again.',
      }));
      return ['Error fetching assets types', null];
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

export const refreshPortfolio = () => async (dispatch: AppDispatch, getState: () => RootState) => {
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
    const response = await goFetch(dispatch, [], ['REFRESH_PORTFOLIO'])(`/${tokenData.id}/refreshPortfolio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }, 300000);
    if (!response.ok) {
      dispatch(setNotificationData({
        type: 'ERROR',
        heading: 'Error fetching assets items',
        description: 'Something went wrong. Please try again.',
      }));
      return ['Error fetching asset items', null];
    }
    await response.json();
    dispatch(setNotificationData({
      type: 'SUCCESS',
      heading: 'Success',
      description: 'Successfully refreshed portfolio',
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

