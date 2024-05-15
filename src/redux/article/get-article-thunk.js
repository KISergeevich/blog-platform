import { createAsyncThunk } from '@reduxjs/toolkit'

import Api from '../../services/api'

const getArticle = createAsyncThunk('articles/getArticle', async (slug) => {
  const api = new Api()
  const article = await api.getArticle(slug)
  return article
})

export default getArticle
