import { useEffect } from "react";
import { fetchAllCompanies } from "../app/actions/company";
import { fetchUserDetails } from "../app/actions/user";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { fetchCompanyTypes } from "../app/actions/companyTypes";
import { jwtDecode } from "jwt-decode";
import { Role, setTokenData } from "../app/features/token";

function isPathMatched(currentPath: string, regexPatterns: string[]) {
  return regexPatterns.some(pattern => new RegExp(`^${pattern.replace('*', '.*')}$`).test(currentPath));
}

const regexPaths = [
  "/gym/memberRegistration/*",
];

export default function BootstrapApp({ WrappedComponent }: { WrappedComponent: React.FunctionComponent<unknown> }) {
  const token = useAppSelector(s => s.token.data);
  const dispatch = useAppDispatch();

  function initApp(role: Role) {
    dispatch(fetchCompanyTypes());
    if (role === 'admin') {
      dispatch(fetchAllCompanies());
    }
    dispatch(fetchUserDetails());
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const bypassAuth = urlParams.get('bypassAuth');
    if (bypassAuth === 'true') {
      return;
    }
    if (isPathMatched(window.location.pathname, regexPaths)) {
      return;
    }
    if (!token) {
      const sctoken = localStorage.getItem("sctoken");
      if (sctoken) {
        dispatch(setTokenData(jwtDecode(sctoken)));
      }
    }
    initApp(token?.role || 'user');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return <WrappedComponent />;
}
