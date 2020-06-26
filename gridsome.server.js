// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const { markdown } = require('markdown')
const excerptHtml = require('excerpt-html')
const contentful = require('contentful')

const contentfulInfo = {
  spaceId: 'ckrw9j41yx0s',
  apiAccessKey: '4aZN7aJA-tixTABqZYY6kRpr5a-xw6ZchjiLxb5e0os',
  postIdentifier: 'blogPost',
  authorIdentifier: 'person'
}

const client = contentful.createClient({
  space: contentfulInfo.spaceId,
  accessToken: contentfulInfo.apiAccessKey
})

module.exports = async function (api) {
  api.loadSource(async ({ addCollection }) => {
    const posts = addCollection('Post')
    const authors = addCollection('Author')

    const contents = await client.getEntries()

    contents.items.forEach(content => {
      switch (content.sys.contentType.sys.id) {

        case contentfulInfo.postIdentifier:
          const { fields: post } = content                 
          
          posts.addNode({
            id: post.slug,
            title: post.title,
            author: {
              path: '/authors/' + post.author.fields.name.toLowerCase().split(' ').join('-') + '/',
              id: post.author.sys.id,
              name: post.author.fields.name,
              bio: post.author.fields.shortBio,
              website: post.author.fields.website,
              twitter: post.author.fields.twitter,
              github: post.author.fields.github,
              image: post.author.fields.image.fields.file.url
            },
            date: post.publishDate,
            description: post.description,
            image: post.heroImage.fields.file.url,
            content: markdown.toHTML(post.body).split('<a').join('<a target="_blank"'),
            excerpt: excerptHtml(
              markdown.toHTML(post.body),
              {
                pruneLength: 200
              }
            )
          })

          break

        case contentfulInfo.authorIdentifier:
          const { fields: author } = content
          
          authors.addNode({
            id: content.sys.id,
            name: author.name,
            image: author.image.fields.file.url,
            bio: author.shortBio,
            website: author.website,
            twitter: author.twitter,
            github: author.github
          })                  
          
          break

        default:
          break
      }
      
    })

  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
