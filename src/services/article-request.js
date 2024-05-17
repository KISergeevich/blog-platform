export default function toArticleRequest(params) {
  return {
    article: {
      title: params.title,
      description: params.description,
      body: params.body,
      tagList: params.tags,
    },
  }
}
