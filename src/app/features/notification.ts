import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface NotificationData {
  type: 'SUCCESS' | 'ERROR' | 'WARNING';
  heading: string;
  description: string;
}

const initialState: { data: NotificationData | null } = {
  data: null
}

export const notificationSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setNotificationData: (state, action: PayloadAction<NotificationData>) => {
      state.data = action.payload;
    },

    deleteNotificationData: (state) => {
      state.data = initialState.data;
    },
  },
})

export const { setNotificationData, deleteNotificationData } = notificationSlice.actions

export default notificationSlice.reducer
