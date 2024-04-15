import { createAsyncThunk } from '@reduxjs/toolkit'

import Api from '../../services/api'

const fetchArticle = createAsyncThunk('articles/fetchArticle', async (slug) => {
  const api = new Api()
  const response = await api.getArticle(slug)
  return response
})

export default fetchArticle
