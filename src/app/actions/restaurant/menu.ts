import { goFetch } from "../../../goFetch";
import { AppDispatch, RootState } from "../../store";
import { registerBulkMenuItem } from "./menuItem";

export const scanMenu = (files: File[]) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const selectedCompany = getState().companies.selectedCompany;
  if (!selectedCompany) {
    return ['Company not present', null];
  }

  const formData = new FormData();
  for (const file of files) {
    formData.append("files", file);
  }
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])(`/c/${selectedCompany.id}/scan`, {
      method: 'POST',
      body: formData,
    });
    const res = await response.json();
    if (!response.ok) {
      return ['Something failed', null];
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res.data.forEach((d: any) => {
      result = [
        ...result,
        ...(JSON.parse(d.replace('```json', '').replace('```', '').replaceAll('\n', '')))
      ]
    });
    const [err] = await dispatch(registerBulkMenuItem(result))
    if (err) {
      return ['Something failed', null];
    }
    return [null, result];
  } catch (error) {
    console.error('Error:', error);
    return ['Something failed', null];
  }
}