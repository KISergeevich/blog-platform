import { createAsyncThunk } from '@reduxjs/toolkit'

import Api from '../../services/api'

const createArticle = createAsyncThunk('createArticle/createArticle', async ({ article, token }) => {
  const api = new Api()
  const createdArticle = await api.createArticle(article, token)
  return createdArticle
})

export default createArticle
