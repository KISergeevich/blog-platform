import { createAsyncThunk } from '@reduxjs/toolkit'

import Api from '../../services/api'

const createArticle = createAsyncThunk('createArticle/createArticle', async ({ params, token }) => {
  const api = new Api()
  const createdArticle = await api.createArticle(params, token)
  return createdArticle
})

export default createArticle
