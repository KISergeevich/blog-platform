/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

import fetchArticle from './fetch-article-thunk'

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    article: undefined,
    status: 'idle',
    error: null,
  },
  selectors: {
    selectArticle: (state) => state.article,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
  reducers: {
    changeArticle(state, action) {
      return {
        ...state,
        article: action.payload.article,
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchArticle.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.article = action.payload.article
        state.total = action.payload.total
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { changeArticle } = articleSlice.actions
export const { selectArticle, selectStatus, selectError } = articleSlice.selectors
export default articleSlice.reducer
