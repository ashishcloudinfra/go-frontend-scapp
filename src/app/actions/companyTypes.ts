import { goFetch } from "../../goFetch";
import { setCompanyTypes } from "../features/companyTypes";
import { AppDispatch } from "../store";

export const fetchCompanyTypes = () => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'], [], false)('/companyTypes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return ['Error fetching company types', null];
    }
    const res = await response.json();
    dispatch(setCompanyTypes(res.data))
  } catch (error) {
    console.error('Error:', error);
  }
}