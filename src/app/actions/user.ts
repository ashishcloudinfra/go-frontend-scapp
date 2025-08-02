import { goFetch } from "../../goFetch";
import { setUserDetail } from "../features/user";
import { AppDispatch, RootState } from "../store";

export const fetchUserDetails = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { data: tokenData } = getState().token;
  if (!tokenData?.id) {
    return ['Token Id not present', null];
  }
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/pd/${tokenData.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return ['Error fetching personal details', null];
    }
    const res = await response.json();
    dispatch(setUserDetail(res.data));
  } catch (error) {
    console.error('Error:', error);
    return ['Something went wrong', null];
  }
}
