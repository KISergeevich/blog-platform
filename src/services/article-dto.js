export function toArticle(dto) {
  return {
    slug: dto.slug,
    title: dto.title,
    description: dto.description,
    body: dto.body,
    tags: dto.tagList,
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
    favorited: dto.favorited,
    favoritesCount: dto.favoritesCount,
    author: {
      username: dto.author.username,
      bio: dto.author.bio,
      image: dto.author.image,
      following: dto.author.following,
    },
  }
}

export function toArticleDto(model) {
  return {
    slug: model.slug,
    title: model.title,
    description: model.description,
    body: model.body,
    tagList: model.tags,
    createdAt: model.createdAt.toISOString(),
    updatedAt: model.updatedAt.toISOString(),
    favorited: model.favorited,
    favoritesCount: model.favoritesCount,
    author: {
      username: model.author.username,
      bio: model.author.bio,
      image: model.author.image,
      following: model.author.following,
    },
  }
}
