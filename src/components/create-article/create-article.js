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
          <textarea className={classes.createArticle__inputTextarea} id="text" placeholder="Text" />
        </label>
        <div className={classes.createArticle__tagBlock}>
          <span className={classes.createArticle__tagTitle}>Tags</span>
          <div className={classes.createArticle__newTag}>
            <input type="text" className={classes.createArticle__inputTag} placeholder="Tag" />
            <button type="button" className={classes.createArticle__buttonDelete}>
              Delete
            </button>
          </div>
          <div className={classes.createArticle__newTag}>
            <input type="text" className={classes.createArticle__inputTag} placeholder="Tag" />
            <button type="button" className={classes.createArticle__buttonDelete}>
              Delete
            </button>
            <button type="button" className={classes.createArticle__addTag}>
              Add tag
            </button>
          </div>
        </div>
        <button type="submit" className={classes.createArticle__submit}>
          Send
        </button>
      </form>
    </div>
  )
}
