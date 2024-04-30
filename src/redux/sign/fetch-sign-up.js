import { createAsyncThunk } from '@reduxjs/toolkit'

import Api from '../../services/api'

const fetchSignUp = createAsyncThunk('signUp/fetchSignUp', async (user) => {
  const api = new Api()
  const response = await api.signUp(user)
  return response
})

export default fetchSignUp
