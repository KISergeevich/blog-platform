export default class Api {
  baseURL = 'https://blog.kata.academy/api/'

  async getArticles(pageNumber, pageSize) {
    const offset = (pageNumber - 1) * pageSize
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    }
    const response = await fetch(`${this.baseURL}articles?offset=${offset}&limit=${pageSize}`, options)
    if (response.ok) {
      const result = await response.json()
      return {
        articles: result.articles,
        total: result.articlesCount,
      }
    }
    throw new Error('Something wrong')
  }

  async getArticle(slug) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    }
    const response = await fetch(`${this.baseURL}articles/${slug}`, options)
    if (response.ok) {
      const result = await response.json()
      return result
    }
    throw new Error('Can not find article')
  }
}
