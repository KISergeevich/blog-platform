import { createAsyncThunk } from '@reduxjs/toolkit'

import Api from '../../services/api'

const fetchSignUp = createAsyncThunk('signUp/fetchSignUp', async (signUp) => {
  const api = new Api()
  const user = await api.signUp(signUp)
  localStorage.setItem('token', user.token)
  return user
})

export default fetchSignUp
