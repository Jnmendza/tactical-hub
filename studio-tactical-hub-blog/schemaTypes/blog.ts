export default {
  name: 'blog',
  type: 'document',
  title: 'Blog',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title of blog article',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug of your blog article',
      options: {
        source: 'title',
      },
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
    },
    {
      name: 'smallDescription',
      type: 'text',
      title: 'Small description',
    },
    {
      name: 'coverImage',
      type: 'image',
      title: 'Cover image',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [{type: 'block'}],
    },
  ],
}
