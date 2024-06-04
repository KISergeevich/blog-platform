import React, { useEffect } from 'react'
import Markdown from 'markdown-to-jsx'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch, useSelector } from 'react-redux'

import { selectLogInStatus, selectToken } from '../../redux/sign/sign-slice'
import grayHeart from '../../assets/img/nonliked.png'
import redHeart from '../../assets/img/liked.png'
import Tags from '../tags/tags'
import AuthorAvatar from '../author-avatar/author-avatar'
import { likeArticles, unLikeArticles } from '../../redux/articles/articles-slice'

import classes from './article-item.module.scss'

export default function ArticleItem({ article }) {
  const { tags, favorited, slug } = article
  const { author, description, title } = article
  const token = useSelector(selectToken)
  const loggedIn = useSelector(selectLogInStatus)

  const chekedDescription = description === null ? '' : description
  const chekedTitle = title === null || title.trim() === '' ? 'Title Post' : title
  const dispatch = useDispatch()
  useEffect(() => {}, [favorited, article.favoritesCount])
  const handleLike = () => {
    if (!favorited) {
      dispatch(likeArticles({ slug, token }))
    } else {
      dispatch(unLikeArticles({ slug, token }))
    }
  }
  return (
    <div className={classes.articleItem}>
      <div className={classes.articleItem__post}>
        <div className={classes.articleItem__informationBlock}>
          <div className={classes.articleItem__titlePost}>
            <Link to={`/articles/${article.slug}`} className={classes.articleItem__title}>
              {chekedTitle}
            </Link>
            <form className={classes.articleItem__form}>
              {loggedIn ? (
                <button onClick={handleLike} className={classes.articleItem__button} type="button">
                  <img src={favorited ? redHeart : grayHeart} alt="like" className={classes.articleItem__like} />
                </button>
              ) : (
                <button className={classes.articleItem__button} type="button">
                  <img src={grayHeart} alt="like" className={classes.articleItem__like} />
                </button>
              )}
            </form>
            <span className={classes.articleItem__span}>{article.favoritesCount}</span>
          </div>
          <Tags tags={tags} />
        </div>
        <AuthorAvatar author={author} postDate={article.createdAt} />
      </div>
      <div className={classes.articleItem__textPost}>
        <Markdown>{chekedDescription}</Markdown>
      </div>
    </div>
  )
}
