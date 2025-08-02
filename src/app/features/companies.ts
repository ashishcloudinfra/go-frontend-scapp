import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Company } from '../../types/Company';

interface CompaniesState {
  selectedCompany: Company | null,
  companies: Company[] | null
}

const initialState: CompaniesState = {
  selectedCompany: null,
  companies: null
}

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setCompanies: (state, action: PayloadAction<Company[]>) => {
      state.companies = action.payload;
      state.selectedCompany = action.payload.find(c => c.isDefault) || action.payload[0];
    },

    setSelectedCompany: (state, action: PayloadAction<Company>) => {
      state.selectedCompany = action.payload;
    },

    resetCompanies: (state) => {
      state.selectedCompany = null;
      state.companies = null;
    },
  },
})

export const { setCompanies, setSelectedCompany, resetCompanies } = companiesSlice.actions

export default companiesSlice.reducer
