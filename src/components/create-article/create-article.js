/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { selectToken } from '../../redux/sign/sign-slice'
import createArticle from '../../redux/article/create-article-thunk'

import classes from './create-article.module.scss'
import toArticleParams from './article-form'

export default function CreateArticle() {
  const token = useSelector(selectToken)
  const dispatch = useDispatch()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })
  const onSubmit = (formValue) => {
    dispatch(createArticle({ params: toArticleParams(formValue), token }))
  }

  return (
    <div className={classes.createArticle}>
      <h4 className={classes.createArticle__title}>Create new article</h4>
      <form className={classes.createArticle__form} onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.createArticle__label} htmlFor="title">
          Title
          <input
            {...register('title', { required: true })}
            className={classes.createArticle__input}
            id="title"
            placeholder="Title"
            aria-invalid={errors.title ? 'true' : 'false'}
          />
          <span className={classes.createArticle__error}>
            {errors.title?.type === 'required' ? 'Title is required' : null}
          </span>
        </label>
        <label className={classes.createArticle__label} htmlFor="description">
          Short description
          <input
            {...register('description', { required: true })}
            className={classes.createArticle__input}
            id="description"
            placeholder="Short description"
          />
          <span className={classes.createArticle__error}>
            {errors.description?.type === 'required' ? 'Description is required' : null}
          </span>
        </label>
        <label className={classes.createArticle__label} htmlFor="text">
          Text
          <textarea
            {...register('text', { required: true })}
            className={classes.createArticle__inputTextarea}
            id="text"
            placeholder="Text"
          />
          <span className={classes.createArticle__error}>
            {errors.text?.type === 'required' ? 'Text is required' : null}
          </span>
        </label>
        <div className={classes.createArticle__tagBlock}>
          <span className={classes.createArticle__tagTitle}>Tags</span>
          {fields.map((field, index) => (
            <div key={field.id} className={classes.createArticle__itemTag}>
              <input
                type="text"
                key={field.id}
                {...register(`tags.${index}.value`)}
                className={classes.createArticle__inputTag}
                placeholder="Tag"
              />
              <button type="button" className={classes.createArticle__buttonDelete} onClick={() => remove(index)}>
                Delete
              </button>
            </div>
          ))}
          <button type="button" className={classes.createArticle__addTag} onClick={() => append({ value: '' })}>
            Add tag
          </button>
        </div>
        <button type="submit" className={classes.createArticle__submit}>
          Send
        </button>
      </form>
    </div>
  )
}
