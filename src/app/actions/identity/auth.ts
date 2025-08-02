import { jwtDecode } from "jwt-decode";
import { goFetch } from "../../../goFetch";
import { CompanyFormValues } from "../../../identity/pages/CompanyDetails";
import { SignupFormValues } from "../../../identity/pages/Signup";
import { AppDispatch } from "../../store";
import { setTokenData, TokenData } from "../../features/token";
import { AuthNavigator } from "../../../Modal/Auth";
import { setNotificationData } from "../../features/notification";

export const loginUser = (values: { username: string, password: string }) => async (dispatch: AppDispatch): Promise<[string | null, { landingUrl: string } | null]> => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'], [], false)('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      setNotificationData({
        type: 'ERROR',
        heading: "Invalid credentials",
        description: 'Invalid username or password',
      })
      return ['Invalid username or password', null];
    }
    const result = await response.json();
    const tokenData = jwtDecode(result.token) as TokenData;
    // amazonq-ignore-next-line
    window.localStorage.setItem('sctoken', result.token);
    dispatch(setTokenData(tokenData));
    const defaultCompanyResponse = await goFetch(dispatch, ['FULL_APP'])(`/company/${tokenData.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!defaultCompanyResponse.ok) {
      setNotificationData({
        type: 'ERROR',
        heading: "oh snap!",
        description: 'Error fetching details',
      })
      return ['Invalid id recieved', null];
    }
    const comResult = await defaultCompanyResponse.json();
    return [null, {
      landingUrl: (new AuthNavigator(comResult.data, tokenData.role)).getLandingPath(),
    }];
  } catch (error) {
    setNotificationData({
      type: 'ERROR',
      heading: "Something went wrong",
      description: 'Please try again',
    })
    console.log('Error during login:', error);
    return ['Something went wrong', null];
  }
}

export const signupUser = (values: SignupFormValues) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'], [], false)('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      return ['Invalid username or password', null];
    }
    const result = await response.json();
    return [null, result.token];
  } catch (error) {
    console.log(error);
    return ['Something went wrong', null];
  }
}

export const postCompanyDetails = (values: CompanyFormValues) => async (dispatch: AppDispatch) => {
  try {
    const response = await goFetch(dispatch, ['FULL_APP'])('/company', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...values,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        ownerId: jwtDecode(localStorage.getItem('sctoken') || { id: '' }).id,
      }),
    });
    await response.json();
    return [null, 'Successfully added company details'];
  } catch (error) {
    console.log(error);
    return ['Something went wrong', null];
  }
}
