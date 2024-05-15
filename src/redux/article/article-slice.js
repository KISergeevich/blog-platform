/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

import getArticle from './get-article-thunk'
import createArticle from './create-article-thunk'

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
    deleteStatus(state) {
      return {
        ...state,
        status: 'idle',
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getArticle.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getArticle.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.article = action.payload
      })
      .addCase(getArticle.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(createArticle.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.article = action.payload.article
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { changeArticle, deleteStatus } = articleSlice.actions
export const { selectArticle, selectStatus, selectError } = articleSlice.selectors
export default articleSlice.reducer
