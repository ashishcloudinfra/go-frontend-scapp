import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type Page = 'FULL_APP';
interface LoadingInfo {
  requests: number;
  error: boolean;
}
export type IncomingRequestsLoadingMap = Record<Page, number>;
export type ComponentsLoadingMap = Record<string, LoadingInfo>;
export interface Loading {
  activePage: Page | null;
  incomingRequests: IncomingRequestsLoadingMap;
  components: ComponentsLoadingMap;
}

const initComponentLoadingState = () => ({
  requests: 0,
  error: false,
});

export const initialLoadingState: Loading = {
  activePage: null,
  incomingRequests: {
    FULL_APP: 0,
  },
  components: {},
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState: initialLoadingState,
  reducers: {
    addLoadingRequest(state, action: PayloadAction<Page[]>) {
      return (action.payload || []).reduce((currentState, page) => {
        const newIncomingRequests = {
          ...currentState.incomingRequests,
        };
        newIncomingRequests[page] += 1;
        return { ...currentState, incomingRequests: newIncomingRequests };
      }, { ...state });
    },

    removeLoadingRequest(state, action: PayloadAction<Page[]>) {
      return (action.payload || []).reduce((currentState, page) => {
        const newIncomingRequests = { ...currentState.incomingRequests,
        };

        if (newIncomingRequests[page] > 0) {
          newIncomingRequests[page] -= 1;
        }

        return { ...currentState, incomingRequests: newIncomingRequests };
      }, { ...state });
    },

    addLocalizedLoadingRequest(state, action: PayloadAction<string[]>) {
      return (action.payload || []).reduce((currentState, component) => {
        const newComponents = { ...currentState.components,
        };
        const newLoadingInfo = newComponents[component] != null ? { ...newComponents[component],
        } : initComponentLoadingState();
        newLoadingInfo.requests += 1;
        newComponents[component] = newLoadingInfo;
        return { ...currentState, components: newComponents };
      }, { ...state });
    },

    removeLocalizedLoadingRequest(state, action: PayloadAction<string[]>) {
      return (action.payload || []).reduce((currentState, component) => {
        const newComponents = { ...currentState.components,
        };
        const newLoadingInfo = newComponents[component] != null ? { ...newComponents[component],
        } : initComponentLoadingState();

        if (newLoadingInfo.requests > 0) {
          newLoadingInfo.requests -= 1;
        }

        newComponents[component] = newLoadingInfo;
        return { ...currentState, components: newComponents };
      }, { ...state });
    },

    addLocalizedError(state, action: PayloadAction<string[]>) {
      return (action.payload || []).reduce((currentState, component) => {
        const newComponents = { ...currentState.components,
        };
        const newLoadingInfo = newComponents[component] != null ? { ...newComponents[component],
        } : initComponentLoadingState();
        newLoadingInfo.error = true;
        newComponents[component] = newLoadingInfo;
        return { ...currentState, components: newComponents };
      }, { ...state });
    },

    removeLocalizedError(state, action: PayloadAction<string>) {
      const component = action.payload;
      const newComponents = { ...state.components };
      const newLoadingInfo = newComponents[component] != null ? { ...newComponents[component],
      } : initComponentLoadingState();
      newLoadingInfo.error = false;
      newComponents[component] = newLoadingInfo;
      return {
        ...state,
        components: newComponents,
      };
    },

    setActivePage(state, action: PayloadAction<Page>) {
      return {
        ...state,
        activePage: action.payload,
      };
    },
  },
});

export const { addLoadingRequest, removeLoadingRequest, addLocalizedLoadingRequest, removeLocalizedLoadingRequest, addLocalizedError, removeLocalizedError, setActivePage } = loadingSlice.actions;

export default loadingSlice.reducer;

export const isPageLoading = (loading: Loading) => {
  const { incomingRequests, activePage } = loading;
  if (incomingRequests.FULL_APP > 0) return true;
  return activePage ? incomingRequests[activePage] > 0 : false;
};
export const didComponentError = (state: RootState, componentName: string) => state.loading.components[componentName] != null && state.loading.components[componentName].error === true;
export const isComponentLoading = (state: RootState, componentName: string) => state.loading.components[componentName] != null && state.loading.components[componentName].requests > 0;
