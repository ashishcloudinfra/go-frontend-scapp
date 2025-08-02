import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ToastData {
  type: 'SUCCESS' | 'ERROR' | 'WARNING';
  text: string;
}

const initialState: { data: ToastData | null } = {
  data: null
}

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToastData: (state, action: PayloadAction<ToastData>) => {
      state.data = action.payload;
    },

    deleteToastData: (state) => {
      state.data = initialState.data;
    },
  },
})

export const { setToastData, deleteToastData } = toastSlice.actions

export default toastSlice.reducer
