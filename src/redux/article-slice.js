/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

import fetchArticles from './fetch-articles-thunk'

const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    pageNumber: 1,
    pageSize: 5,
    total: 0,
    status: 'idle',
    error: null,
  },
  selectors: {
    selectArticles: (state) => state.articles,
    selectTotal: (state) => state.total,
    selectPageNumber: (state) => state.pageNumber,
    selectPageSize: (state) => state.pageSize,
    selectError: (state) => state.error,
    selectStatus: (state) => state.status,
  },
  reducers: {
    changeArticles(state, action) {
      return {
        ...state,
        articles: action.payload.articles,
        total: action.payload.total,
      }
    },
    changePageNumber(state, action) {
      return {
        ...state,
        pageNumber: action.payload,
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.articles = action.payload.articles
        state.total = action.payload.total
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { changeArticles, changePageNumber } = articleSlice.actions
export const { selectError, selectArticles, selectTotal, selectPageNumber, selectPageSize, selectStatus } =
  articleSlice.selectors
export default articleSlice.reducer
