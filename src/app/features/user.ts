import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserDetail } from '../../types/User';

interface UserState {
  data: UserDetail | null,
}

const initialState: UserState = {
  data: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetail: (state, action: PayloadAction<UserDetail>) => {
      state.data = action.payload;
    },

    resetUserDetail: (state) => {
      state.data = null;
    },
  },
})

export const { setUserDetail, resetUserDetail } = userSlice.actions

export default userSlice.reducer
