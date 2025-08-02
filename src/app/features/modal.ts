/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ModalData {
  isOpen: boolean;
  description?: string;
  confirmBtnText?: string;
  cancelBtnText?: string;
  btnActions: {
    onConfirm: any;
    onCancel: any;
  };
}

const initialState: { data: ModalData } = {
  data: {
    isOpen: false,
    description: 'Are you sure you want to proceed with this operation?',
    confirmBtnText: 'Yes, I\'m sure',
    cancelBtnText: 'No, cancel',
    btnActions: {
      onConfirm: null,
      onCancel: null,
    }
  }
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalData: (state, action: PayloadAction<ModalData>) => {
      state.data = {
        ...initialState.data,
        ...action.payload,
      };
    },

    resetModalData: (state) => {
      state.data = initialState.data;
    },
  },
})

export const { setModalData, resetModalData } = modalSlice.actions

export default modalSlice.reducer
