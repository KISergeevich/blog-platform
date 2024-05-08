/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import Api from '../../services/api'

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
          ...action.payload,
        },
      }
    },
    changeErrorUserLogOut(state) {
      return {
        ...state,
        user: undefined,
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
        state.user = action.payload
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
        state.user = action.payload
      })
      .addCase(fetchSignUp.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase('curentUser/fetchCurentUser/pending', (state) => {
        state.status = 'loading'
      })
      .addCase('curentUser/fetchCurentUser/fulfilled', (state) => {
        state.status = 'succeeded'
      })
      .addCase('curentUser/fetchCurentUser/rejected', (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { changeStatus, changeError, changeUser, changeErrorUserLogOut } = signSlice.actions
export const { selectError, selectStatus, selectUser, selectIsSignedIn } = signSlice.selectors
export default signSlice.reducer

// этот вариант написания тоже работает как вариант использования танки внутри слайса

export const fetchCurentUser = createAsyncThunk('curentUser/fetchCurentUser', async (token, { dispatch }) => {
  const api = new Api()
  const user = await api.getUser(token)
  dispatch(changeUser(user))
  return user
})

export const deleteToken = createAsyncThunk('token/deleteToken', (_, { dispatch }) => {
  localStorage.removeItem('token')
  dispatch(changeErrorUserLogOut())
})

export const updateProfile = createAsyncThunk('update/updateProfile', async ({ user, token }, { dispatch }) => {
  const api = new Api()
  const updateProfileResult = await api.updateUser(user, token)
  dispatch(changeUser(updateProfileResult))
  return updateProfileResult
})
