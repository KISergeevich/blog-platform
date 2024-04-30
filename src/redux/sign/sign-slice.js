/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

import fetchSignIn from './fetch-sign-in'
import fetchSignUp from './fetch-sign-up'

const signSlice = createSlice({
  name: 'sign',
  initialState: {
    user: undefined,

    status: 'idle',
    error: null,
  },
  selectors: {
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
    selectUser: (state) => state.user,
    selectIsSignedIn: (state) => state.user !== undefined,
  },
  reducers: {
    changeUser(state, action) {
      return {
        ...state,
        user: {
          email: action.payload.email,
          token: action.payload.token,
          username: action.payload.username,
          bio: action.payload.bio,
          image: action.payload.image,
        },
      }
    },
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
      .addCase(fetchSignIn.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
      })
      .addCase(fetchSignIn.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchSignUp.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchSignUp.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
      })
      .addCase(fetchSignUp.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { changeStatus, changeError, changeUser } = signSlice.actions
export const { selectError, selectStatus, selectUser, selectIsSignedIn } = signSlice.selectors
export default signSlice.reducer
