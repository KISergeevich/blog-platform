import React from 'react'

import classes from './tags.module.scss'

export default function Tags({ tags }) {
  let sortTags
  if (tags.length > 0) {
    sortTags = tags.map((tag) => {
      return (
        <div key={`${tag}+${Math.round(Math.random() * 100)}`} className={classes.tags__tagPost}>
          {tag}
        </div>
      )
    })
  } else {
    sortTags = <span className={classes.tags__noTags}>This post has not tags</span>
  }
  return <div className={classes.tags__tagList}>{sortTags}</div>
}
