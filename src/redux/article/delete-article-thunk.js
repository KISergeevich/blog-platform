import { createAsyncThunk } from '@reduxjs/toolkit'

import Api from '../../services/api'

const deleteArticle = createAsyncThunk('deleteArticle/deleteArticle', async ({ slug, token }) => {
  const api = new Api()
  const removeArticle = await api.deleteArticle(slug, token)
  return removeArticle
})

export default deleteArticle
