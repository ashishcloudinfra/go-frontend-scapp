import { removeLocalizedLoadingRequest, removeLoadingRequest, Page, addLocalizedLoadingRequest, addLoadingRequest } from "./app/features/loading";
import { AppDispatch } from "./app/store";
import appConfig from '../config'
import { jwtDecode } from "jwt-decode";
import { TokenData } from "./app/features/token";

function isValidToken(token: number){
  const cTs = Math.floor(Date.now() / 1000);
  return (token >= cTs);
}

function validateUser(path: string, options: RequestInit) {
  const authToken = window.localStorage.getItem('sctoken');
  if (!authToken) {
    window.location.assign(`${window.location.origin}`);
    return {
      message: 'Invalid user',
      ok: false,
      json: () => Promise.resolve({
        message: 'Invalid user',
      }),
      status: 401,
      statusText: 'Unauthorized user',
      path,
      options,
    };
  }

  // check if token is valid
  const tokenData = jwtDecode(authToken) as TokenData;
  if (!isValidToken(tokenData.exp)) {
    window.location.assign(`${window.location.origin}`);
    return {
      message: 'Token expired',
      ok: false,
      json: () => Promise.resolve({
        message: 'Token expired',
      }),
      status: 401,
      statusText: 'Unauthorized user',
      path,
      options,
    };
  }
}

const env = import.meta.env.VITE_APP_ENV || 'local';
export const BACKEND_URL = appConfig[env as keyof typeof appConfig].backendUrl || 'http://localhost:8080'

export const goFetch = (dispatch: AppDispatch, pages: Array<Page> = [], components: Array<string> = [], shouldValidate: boolean = true) => async (path: string, options: RequestInit, TIMEOUT: number = 60000) => {
  if (shouldValidate) validateUser(path, options);

  dispatch(addLoadingRequest(pages));
  dispatch(addLocalizedLoadingRequest(components));

  const timeout: Promise<Response> = new Promise((resolve) => {
    const message = 'Failed to fetch';
    const response = {
      message,
      ok: false,
      json: () => Promise.resolve({
        message,
      }),
      status: 504,
      statusText: 'Gateway Timeout',
      path,
      options,
    };
    setTimeout(resolve, TIMEOUT, response);
  });

  const response = await Promise.race([
    timeout,
    fetch(`${BACKEND_URL}${path}`, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${window.localStorage.getItem('sctoken')}`,
      }
    }),
  ]);

  setTimeout(() => dispatch(removeLocalizedLoadingRequest(components)), 1);
  setTimeout(() => dispatch(removeLoadingRequest(pages)), 1);

  return response;
}
