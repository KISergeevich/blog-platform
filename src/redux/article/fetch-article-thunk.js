import { createAsyncThunk } from '@reduxjs/toolkit'

import Api from '../../services/api'

const fetchArticle = createAsyncThunk('articles/fetchArticle', async (payload) => {
  const api = new Api()
  const response = await api.getArticle(payload.slug)
  return response
})

export default fetchArticle
