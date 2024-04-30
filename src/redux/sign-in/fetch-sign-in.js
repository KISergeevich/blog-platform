import { createAsyncThunk } from '@reduxjs/toolkit'

import Api from '../../services/api'

const fetchSignIn = createAsyncThunk('signIn/fetchSignIn', async (user) => {
  const api = new Api()
  const response = await api.signIn(user)
  return response
})

export default fetchSignIn
