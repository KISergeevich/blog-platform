import React from 'react'

import icon from '../../assets/img/icon.png'
import grayHeart from '../../assets/img/nonliked.png'

import classes from './article-item.module.scss'

export default function ArticleItem({ article }) {
  return (
    <div className={classes.articleItem}>
      <div className={classes.articleItem__post}>
        <div className={classes.articleItem__informationBlock}>
          <div className={classes.articleItem__titlePost}>
            <div className={classes.articleItem__title}>{article.title}</div>
            <form className={classes.articleItem__form}>
              <button className={classes.articleItem__button} type="button">
                <img src={grayHeart} alt="notLiked" className={classes.articleItem__like} />
              </button>
            </form>
            <span className={classes.articleItem__span}>12</span>
          </div>
          <div className={classes.articleItem__tagPost}>Tag1</div>
          <div className={classes.articleItem__textPost}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </div>
        </div>
        <div className={classes.articleItem__userBlock}>
          <div className={classes.articleItem__nameBlock}>
            <div className={classes.articleItem__name}>John Doe</div>
            <div className={classes.articleItem__data}>March 5 , 2020</div>
          </div>
          <img src={icon} alt="icon-logo" className={classes.articleItem__icon} />
        </div>
      </div>
    </div>
  )
}
