import { useSearchParams, useNavigate } from "react-router";

/**
 * Custom hook for handling query parameters in React Router
 */
const useNavigateWithQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  /**
   * Gets the value of a specific query parameter
   * @param key - The query parameter key
   * @returns The value of the query parameter or null if not found
   */
  const getQueryParam = (key: string): string | null => {
      return searchParams.get(key);
  };

  const getAllQueryParams = (): { [key: string]: string } => {
    const params: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
        params[key] = value;
    });
    return params;
  };

  /**
   * Updates a specific query parameter and navigates to the updated URL
   * @param key - The query parameter key
   * @param value - The value to set for the query parameter
   */
  const setQueryParam = (key: string, value: string): void => {
      const params = new URLSearchParams(searchParams);
      params.set(key, value);
      setSearchParams(params);
  };

  /**
   * Removes a specific query parameter and navigates to the updated URL
   * @param key - The query parameter key to remove
   */
  const removeQueryParam = (key: string): void => {
      const params = new URLSearchParams(searchParams);
      params.delete(key);
      setSearchParams(params);
  };

  /**
   * Clears all query parameters and navigates to the base URL
   */
  const clearQueryParams = (): void => {
      navigate("?");
  };

  const setQueryParamsToNewUrlAndNavigate = (newUrl: string) => {
    const params = getAllQueryParams();
    const newParams = new URLSearchParams(params);
    navigate(`${newUrl}?${newParams.toString()}`);
  };

  const getNewUrlWithQueryParams = (newUrl: string) => {
    const params = getAllQueryParams();
    const newParams = new URLSearchParams(params);
    return `${newUrl}?${newParams.toString()}`;
  };

  return { getQueryParam, setQueryParam, removeQueryParam, clearQueryParams, getAllQueryParams, setQueryParamsToNewUrlAndNavigate, getNewUrlWithQueryParams };
};

export default useNavigateWithQueryParams;
