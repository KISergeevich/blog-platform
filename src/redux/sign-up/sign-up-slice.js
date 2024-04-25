/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

import fetchSignUp from './fetch-sign-up'

const signUpSlice = createSlice({
  name: 'signUp',
  initialState: {
    status: 'idle',
    error: null,
  },
  selectors: {
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
  reducers: {
    changeStatus(state, action) {
      return {
        ...state,
        status: action.payload.status,
      }
    },
    changeError(state, action) {
      return {
        ...state,
        error: action.payload.error,
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSignUp.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchSignUp.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(fetchSignUp.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { changeStatus, changeError } = signUpSlice.actions
export const { selectError, selectStatus } = signUpSlice.selectors
export default signUpSlice.reducer
