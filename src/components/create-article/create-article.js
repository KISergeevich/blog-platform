/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'

import { selectToken } from '../../redux/sign/sign-slice'
import createArticle from '../../redux/article/create-article-thunk'
import {
  changeArticle,
  reset,
  selectArticle,
  selectCreateArticleStatus,
  selectEditArticleStatus,
} from '../../redux/article/article-slice'
import getArticle from '../../redux/article/get-article-thunk'
import editArticle from '../../redux/article/edit-article-thunk'

import classes from './create-article.module.scss'
import { toArticleParams, toArticleForm } from './article-form'

export default function CreateArticle() {
  const token = useSelector(selectToken)
  const statusCreate = useSelector(selectCreateArticleStatus)
  const statusEdit = useSelector(selectEditArticleStatus)
  const dispatch = useDispatch()
  const { slug } = useParams()
  useEffect(() => {
    if (slug !== undefined) {
      dispatch(getArticle(slug))
    } else {
      dispatch(changeArticle(undefined))
    }

    return () => {
      dispatch(reset())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const article = useSelector(selectArticle)
  const isEditing = slug !== undefined && article !== undefined
  const defaultformValue = isEditing
    ? toArticleForm(article)
    : {
        title: '',
        description: '',
        text: '',
        tags: [{ value: '' }],
      }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultformValue,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })
  const onSubmit = (formValue) => {
    if (isEditing) {
      dispatch(editArticle({ params: toArticleParams(formValue), token, slug }))
    } else {
      dispatch(createArticle({ params: toArticleParams(formValue), token }))
    }
  }

  useEffect(() => {
    dispatch(reset())
    return () => dispatch(reset())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const history = useHistory()
  useEffect(() => {
    if (statusCreate === 'succeeded' || statusEdit === 'succeeded') {
      history.push('/articles')
    }
  }, [statusCreate, statusEdit, history])
  return (
    <div className={classes.createArticle}>
      <h4 className={classes.createArticle__title}>{isEditing ? 'Edit article' : 'Create new article'}</h4>
      <form className={classes.createArticle__form} onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.createArticle__label} htmlFor="title">
          Title
          <input
            type="text"
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
            type="text"
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
          <div className={classes.createArticle__tags}>
            <div className={classes.createArticle__tagInputs}>
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
            </div>
            <button type="button" className={classes.createArticle__addTag} onClick={() => append({ value: '' })}>
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
