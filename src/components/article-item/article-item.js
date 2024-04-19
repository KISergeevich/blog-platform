import React from 'react'
import Markdown from 'markdown-to-jsx'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

import grayHeart from '../../assets/img/nonliked.png'
import Tags from '../tags/tags'
import AuthorAvatar from '../author-avatar/author-avatar'

import classes from './article-item.module.scss'

export default function ArticleItem({ article }) {
  const { tagList } = article
  const { author, description, title } = article
  const chekedDescription = description === null ? '' : description
  const chekedTitle = title === null || title.trim() === '' ? 'Title Post' : title

  return (
    <div className={classes.articleItem}>
      <div className={classes.articleItem__post}>
        <div className={classes.articleItem__informationBlock}>
          <div className={classes.articleItem__titlePost}>
            <Link to={`/articles/${article.slug}`} className={classes.articleItem__title}>
              {chekedTitle}
            </Link>
            <form className={classes.articleItem__form}>
              <button className={classes.articleItem__button} type="button">
                <img src={grayHeart} alt="notLiked" className={classes.articleItem__like} />
              </button>
            </form>
            <span className={classes.articleItem__span}>{article.favoritesCount}</span>
          </div>
          <Tags tagList={tagList} />
        </div>
        <AuthorAvatar author={author} postDate={article.createdAt} />
      </div>
      <div className={classes.articleItem__textPost}>
        <Markdown>{chekedDescription}</Markdown>
      </div>
    </div>
  )
}
