/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

import getArticle from './get-article-thunk'
import createArticle from './create-article-thunk'
import editArticle from './edit-article-thunk'

const defaultState = {
  article: undefined,
  getArticleStatus: 'idle',
  createArticleStatus: 'idle',
  editArticleStatus: 'idle',
  error: null,
}

const articleSlice = createSlice({
  name: 'article',
  initialState: defaultState,
  selectors: {
    selectArticle: (state) => state.article,
    selectGetArticleStatus: (state) => state.getArticleStatus,
    selectCreateArticleStatus: (state) => state.createArticleStatus,
    selectEditArticleStatus: (state) => state.editArticleStatus,
    selectError: (state) => state.error,
  },
  reducers: {
    reset() {
      return { ...defaultState }
    },
    changeArticle(state, action) {
      return {
        ...state,
        article: action.payload,
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
        state.getArticleStatus = 'loading'
      })
      .addCase(getArticle.fulfilled, (state, action) => {
        state.getArticleStatus = 'succeeded'
        state.article = action.payload
      })
      .addCase(getArticle.rejected, (state, action) => {
        state.getArticleStatus = 'failed'
        state.error = action.error.message
      })
      .addCase(createArticle.pending, (state) => {
        state.createArticleStatus = 'loading'
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.createArticleStatus = 'succeeded'
        state.article = action.payload.article
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.createArticleStatus = 'failed'
        state.error = action.error.message
      })
      .addCase(editArticle.pending, (state) => {
        state.editArticleStatus = 'loading'
      })
      .addCase(editArticle.fulfilled, (state, action) => {
        state.editArticleStatus = 'succeeded'
        state.article = action.payload.article
      })
      .addCase(editArticle.rejected, (state, action) => {
        state.editArticleStatus = 'failed'
        state.error = action.error.message
      })
  },
})

export const { reset, changeArticle, deleteStatus } = articleSlice.actions
export const {
  selectArticle,
  selectGetArticleStatus,
  selectCreateArticleStatus,
  selectEditArticleStatus,
  selectError,
} = articleSlice.selectors
export default articleSlice.reducer
