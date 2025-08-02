import { configureStore } from '@reduxjs/toolkit'
import token from './features/token'
import companies from './features/companies'
import loading from './features/loading'
import user from './features/user'
import modal from './features/modal'
import toast from './features/toast'
import companyTypes from './features/companyTypes'
import notification from './features/notification'

export const store = configureStore({
  reducer: {
    token,
    companies,
    loading,
    user,
    modal,
    toast,
    companyTypes,
    notification,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
