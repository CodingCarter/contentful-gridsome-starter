// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const siteTitle = 'Gridsome Contentful Starter'

const path = require('path')

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/scss/*.scss'),
      ],
    })
}

module.exports = {
  siteName: `Zippy Collection: The ${siteTitle}`,
  titleTemplate: `%s - ${siteTitle}`,
  plugins: [
    {
      use: 'gridsome-plugin-flexsearch',
      options: {
        searchFields: ['title'],
        collections: [
          {
            typeName: 'Post',
            indexName: 'Post',
            fields: ['id', 'path', 'title', 'excerpt']
          }
        ]
      }
    }
  ],
  templates: {
    Post: '/blog/:title',
    Author: '/authors/:name'
  },
  chainWebpack (config) {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

    types.forEach(type => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })
	}
}
