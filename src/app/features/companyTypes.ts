import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CompanyTypesState {
  data: string[];
}

const initialState: CompanyTypesState = {
  data: []
}

export const companyTypesSlice = createSlice({
  name: 'companyTypes',
  initialState,
  reducers: {
    setCompanyTypes: (state, action: PayloadAction<string[]>) => {
      state.data = action.payload;
    },

    resetCompanyTypes: (state) => {
      state.data = [];
    },
  },
})

export const { setCompanyTypes, resetCompanyTypes } = companyTypesSlice.actions

export default companyTypesSlice.reducer
