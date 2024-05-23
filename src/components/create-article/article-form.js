export function toArticleParams(form) {
  return {
    title: form.title,
    description: form.description,
    body: form.text,
    tags: form.tags.filter((tag) => tag.value !== '').map((tag) => tag.value), // form.tags,
  }
}

export function toArticleForm(article) {
  return {
    title: article.title,
    description: article.description,
    text: article.body,
    tags: article.tags.map((tag) => ({
      value: tag,
    })),
  }
}
