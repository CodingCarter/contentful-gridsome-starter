<template>
  <Layout>
    <main class="blog-page">
      <div class="articles">
        <PostCardRoll
          :posts="$static.posts.edges"
        />
      </div>
    </main>
  </Layout>
</template>

<static-query>
query {
  posts: allPost {
    edges {
      node {
        path
        title
        image
        author {
          name
        }
        date (format: "MMMM D, YYYY")
        excerpt
      }
    }
  }
}
</static-query>

<script>
import PostCardRoll from '~/components/PostCardRoll.vue'

export default {
  metaInfo: {
    title: 'Blog'
  },
  components: {
    PostCardRoll
  }
}
</script>

<style lang="scss">
.blog-page {
  padding: 1rem 0;
  padding-bottom: 5rem;
}
</style>