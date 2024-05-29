import { toArticle } from './article-dto'
import toArticleRequest from './article-request'

function toUser(dto) {
  return {
    email: dto.email,
    token: dto.token,
    username: dto.username,
    image: dto.image === null || dto.image === '' ? undefined : dto.image,
  }
}

export default class Api {
  baseURL = 'https://blog.kata.academy/api/'

  async getArticles(pageNumber, pageSize) {
    const offset = (pageNumber - 1) * pageSize
    const token = localStorage.getItem('token')
    let options
    if (token !== undefined) {
      options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      }
    } else {
      options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      }
    }

    try {
      const response = await fetch(`${this.baseURL}articles?offset=${offset}&limit=${pageSize}`, options)
      if (response.ok) {
        const result = await response.json()
        return {
          articles: result.articles.map(toArticle),
          total: result.articlesCount,
        }
      }
      throw new Error()
    } catch (error) {
      throw new Error(error.body[0])
    }
  }

  async getArticle(slug) {
    const token = localStorage.getItem('token')
    let options
    if (token !== undefined) {
      options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      }
    } else {
      options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      }
    }
    try {
      const response = await fetch(`${this.baseURL}articles/${slug}`, options)
      if (response.ok) {
        const result = await response.json()
        return toArticle(result.article)
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
      const result = await response.json()
      const [key, value] = Object.entries(result.errors)[0]
      const message = `${key} ${value}`

      throw new Error(message)
    } catch (error) {
      throw new Error(error)
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

  async updateUser(user, token) {
    const options = {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ user }),
    }
    try {
      const response = await fetch(`${this.baseURL}user`, options)
      if (response.ok) {
        const result = await response.json()
        return toUser(result.user)
      }
      const result = await response.json()
      throw new Error(result.errors.body[0])
    } catch (error) {
      throw new Error(error)
    }
  }

  async createArticle(params, token) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(toArticleRequest(params)),
    }
    try {
      const response = await fetch(`${this.baseURL}articles`, options)
      if (response.ok) {
        const result = await response.json()
        return toArticle(result.article)
      }
      const result = await response.json()
      throw new Error(result.errors.body[0])
    } catch (error) {
      throw new Error(error)
    }
  }

  async editArticle(params, token, slug) {
    const options = {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(toArticleRequest(params)),
    }
    try {
      const response = await fetch(`${this.baseURL}/articles/${slug}`, options)
      if (response.ok) {
        const result = await response.json()
        return toArticle(result.article)
      }
      const result = await response.json()
      throw new Error(result.errors.body[0])
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteArticle(slug, token) {
    const options = {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    }
    try {
      const response = await fetch(`${this.baseURL}articles/${slug}`, options)
      if (response.ok) {
        const result = await response.json()
        return result
      }
      const result = await response.json()
      throw new Error(result.errors.body[0])
    } catch (error) {
      throw new Error(error)
    }
  }

  async likeArticle(slug, token) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    }
    try {
      const response = await fetch(`${this.baseURL}articles/${slug}/favorite`, options)
      if (response.ok) {
        const result = await response.json()
        return toArticle(result.article)
      }
      const result = await response.json()
      throw new Error(result.errors.body[0])
    } catch (error) {
      throw new Error(error)
    }
  }

  async unLikeArticle(slug, token) {
    const options = {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    }
    try {
      const response = await fetch(`${this.baseURL}articles/${slug}/favorite`, options)
      if (response.ok) {
        const result = await response.json()
        return toArticle(result.article)
      }
      const result = await response.json()
      throw new Error(result.errors.body[0])
    } catch (error) {
      throw new Error(error)
    }
  }
}
