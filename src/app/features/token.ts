import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type Role = 'admin' | 'member' | 'staff' | 'user';
export interface TokenData {
  id: string;
  username: string;
  permissions: string,
  role: Role;
  exp: number;
}

const initialState: { data: TokenData | null } = {
  data: null
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setTokenData: (state, action: PayloadAction<TokenData>) => {
      state.data = action.payload;
    },

    deleteTokenData: (state) => {
      state.data = initialState.data;
    },
  },
})

export const { setTokenData, deleteTokenData } = tokenSlice.actions

export default tokenSlice.reducer
