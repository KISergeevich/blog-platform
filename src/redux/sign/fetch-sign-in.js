import { createAsyncThunk } from '@reduxjs/toolkit'

import Api from '../../services/api'

const fetchSignIn = createAsyncThunk('signIn/fetchSignIn', async (signIn) => {
  const api = new Api()
  const user = await api.signIn(signIn)
  localStorage.setItem('token', user.token)
  return user
})

export default fetchSignIn
