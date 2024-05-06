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
    try {
      const response = await fetch(`${this.baseURL}articles?offset=${offset}&limit=${pageSize}`, options)
      if (response.ok) {
        const result = await response.json()
        return {
          articles: result.articles,
          total: result.articlesCount,
        }
      }
      throw new Error()
    } catch (error) {
      throw new Error(error.body[0])
    }
  }

  async getArticle(slug) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    }
    try {
      const response = await fetch(`${this.baseURL}articles/${slug}`, options)
      if (response.ok) {
        const result = await response.json()
        return result
      }
      throw new Error()
    } catch (error) {
      throw new Error(error.body[0])
    }
  }

  async signUp(user) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ user }),
    }
    try {
      const response = await fetch(`${this.baseURL}users`, options)
      if (response.ok) {
        const result = await response.json()
        return result.user
      }
      throw new Error('Sign Up error!')
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async signIn(user) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ user }),
    }
    try {
      const response = await fetch(`${this.baseURL}users/login`, options)
      if (response.ok) {
        const result = await response.json()
        return result.user
      }
      throw new Error('Sign In error!')
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getUser(token) {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const response = await fetch(`${this.baseURL}user`, options)
      if (response.ok) {
        const result = await response.json()
        return result.user
      }
      throw new Error(response.body[0])
    } catch (error) {
      throw new Error(error)
    }
  }
}
