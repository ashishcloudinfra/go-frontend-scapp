import { goFetch } from "../../goFetch";
import { setCompanies, setSelectedCompany } from "../features/companies";
import { AppDispatch, RootState } from "../store";

export const fetchAllCompanies = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { data: tokenData } = getState().token;
  if (!tokenData?.id) {
    return ['CompanyId not present', null];
  }
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/companies/${tokenData.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return ['Error fetching companies', null];
    }
    const res = await response.json();
    dispatch(setCompanies(res.data));
  } catch (error) {
    console.error('Error:', error);
  }
}

export const fetchCompanyByCompanyId = (companyId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/cd/${companyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return ['Error fetching companies', null];
    }
    const res = await response.json();
    dispatch(setSelectedCompany(res.data));
  } catch (error) {
    console.error('Error:', error);
  }
}
