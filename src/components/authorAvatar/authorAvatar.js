import React from 'react'
import { format } from 'date-fns'

import icon from '../../assets/img/icon.png'

import classes from './authorAvatar.module.scss'

export default function AuthorAvatar({ author, postDate }) {
  const timeCreate = format(new Date(postDate), 'MMMM d, y')
  let avatar
  if (author.image.length > 0) {
    avatar = author.image
  } else {
    avatar = icon
  }

  return (
    <div className={classes.authorAvatar__userBlock}>
      <div className={classes.authorAvatar__nameBlock}>
        <div className={classes.authorAvatar__name}>{author.username}</div>
        <div className={classes.authorAvatar__data}>{timeCreate}</div>
      </div>
      <img src={avatar} alt="icon-logo" className={classes.authorAvatar__icon} />
    </div>
  )
}
