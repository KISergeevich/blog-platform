export default function toArticleParams(form) {
  return {
    title: form.title,
    description: form.description,
    body: form.text,
    tags: [], // form.tags,
  }
}
