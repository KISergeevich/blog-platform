import React from 'react'

import classes from './create-article.module.scss'

export default function CreateArticle() {
  return (
    <div className={classes.createArticle}>
      <h4 className={classes.createArticle__title}>Create new article</h4>
      <form className={classes.createArticle__form}>
        <label className={classes.createArticle__label} htmlFor="title">
          Title
          <input className={classes.createArticle__input} id="title" placeholder="Title" />
        </label>
        <label className={classes.createArticle__label} htmlFor="description">
          Short description
          <input className={classes.createArticle__input} id="description" placeholder="Short description" />
        </label>
        <label className={classes.createArticle__label} htmlFor="text">
          Text
          <textarea className={classes.createArticle__input} id="text" placeholder="Text" />
        </label>
      </form>
    </div>
  )
}
