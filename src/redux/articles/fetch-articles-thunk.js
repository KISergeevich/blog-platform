import { createAsyncThunk } from '@reduxjs/toolkit'

import Api from '../../services/api'

const fetchArticles = createAsyncThunk('articles/fetchArticles', async (payload) => {
  const api = new Api()
  const response = await api.getArticles(payload.pageNumber, payload.pageSize, payload.token)
  return response
})

export default fetchArticles
