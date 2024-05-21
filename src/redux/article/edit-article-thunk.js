import { createAsyncThunk } from '@reduxjs/toolkit'

import Api from '../../services/api'

const editArticle = createAsyncThunk('editArticle/editArticle', async ({ params, token, slug }) => {
  const api = new Api()
  const editedArticle = await api.editArticle(params, token, slug)
  return editedArticle
})

export default editArticle
