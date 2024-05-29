/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import Api from '../../services/api'

import fetchArticles from './fetch-articles-thunk'

const defaultState = {
  articles: [],
  pageNumber: 1,
  pageSize: 5,
  total: 0,
  status: 'idle',
  error: null,
}
const articlesSlice = createSlice({
  name: 'articles',
  initialState: defaultState,
  selectors: {
    selectArticles: (state) => state.articles,
    selectTotal: (state) => state.total,
    selectPageNumber: (state) => state.pageNumber,
    selectPageSize: (state) => state.pageSize,
    selectError: (state) => state.error,
    selectStatus: (state) => state.status,
  },
  reducers: {
    reset() {
      return defaultState
    },
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
    updateLikes(state, action) {
      const { slug, favorited, favoritesCount } = action.payload
      const articleToUpdate = state.articles.find((item) => item.slug === slug)
      if (articleToUpdate) {
        articleToUpdate.favorited = favorited
        articleToUpdate.favoritesCount = favoritesCount
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

export const { changeArticles, changePageNumber, updateLikes, reset } = articlesSlice.actions
export const { selectError, selectArticles, selectTotal, selectPageNumber, selectPageSize, selectStatus } =
  articlesSlice.selectors
export default articlesSlice.reducer

export const likeArticles = createAsyncThunk('likeArticles/likeArticles', async ({ slug, token }, { dispatch }) => {
  const api = new Api()
  const favoriteArticles = await api.likeArticle(slug, token)
  dispatch(updateLikes(favoriteArticles))
  return favoriteArticles
})

export const unLikeArticles = createAsyncThunk(
  'unLikeArticles/unLikeArticles',
  async ({ slug, token }, { dispatch }) => {
    const api = new Api()
    const unFavoriteArticles = await api.unLikeArticle(slug, token)
    dispatch(updateLikes(unFavoriteArticles))
    return unFavoriteArticles
  }
)
