<template>
    <Layout>
        <main class="author">
          <section class="author-info">
            <g-image :src="$page.author.image" />
            <h1 v-text="$page.author.name" />
            <h3 v-text="$page.author.bio" />
            <div class="author-icons">
              <g-link v-if="$page.author.website" :to="$page.author.website"><g-image src="~/assets/icons/website.svg" alt="website icon" /></g-link>
              <g-link v-if="$page.author.twitter" :to="'https://twitter.com/' + $page.author.twitter"><g-image src="~/assets/icons/twitter.svg" alt="twitter icon" /></g-link>
              <g-link v-if="$page.author.github" :to="'https://github.com/' + $page.author.github"><g-image src="~/assets/icons/github.svg" alt="github icon" /></g-link>
            </div>
          </section>
          <section class="author-posts">
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z"/></svg>
            <h4>{{ $page.author.name.split(' ')[0] }}'s latest posts</h4>
            <PostCardRoll
              :posts="$static.posts.edges"
              :authorid="$page.author.id"
            />    
          </section>
        </main>
    </Layout>
</template>

<page-query>
query ($id: ID!) {
  author: author (id: $id) {
    path
    id
    image
    name
    bio
    website
    twitter
    github
  }
}
</page-query>


<static-query>
query {
  posts: allPost {
    edges {
      node {
        path
        title
        image
        author {
          id
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
  components: {
    PostCardRoll
  },
  metaInfo() {
    return {
      title: this.$page.author.name + '\'s Profile'
    }
  }
}
</script>

<style lang="scss">
.author {

  @include phone {
    padding-top: 4rem;
  }

  .author-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70vh;
    padding-bottom: 3rem;
    text-align: center;

    img {
      width: 15%;
      
      @include tablet {
        width: 40%;
      }
    }

    h1 {
      font-size: 2.25rem;
      font-weight: 500;
      margin: 0;
      margin-top: 1.6rem;
      margin-bottom: 1rem;

      @include tablet {
        font-size: 2.5rem;
      }
    }

    h3 {
      color: var(--txt-secondary);
      font-weight: 300;
      font-size: 1.15rem;
      margin: 0;
      width: 30%;

      @include tablet {
        width: 50%;
        font-size: 1.25rem;
      }

      @include phone {
        width: 70%;
      }
    }

    .author-icons {
      display: flex;
      flex-direction: row;
      margin-top: 1.25rem;

      img {
        display: block;
        width: 1.8rem;
        height: 1.8rem;
        padding: .9rem 1.1rem;
        filter: grayscale(100%);
        opacity: .75;
        transition: 250ms opacity ease;

        @include tablet {
          width: 2.25rem;
          height: 2.25rem;
          padding: 1.2rem 1.3rem;
        }

        &:hover {
          opacity: 1;
        }
      }
    }
  }

  .author-posts {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 5rem;

    @keyframes arrowBob {
      55% {
        transform: translateY(-20px);
        opacity: .5;
      }

      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }

    svg {
      animation: arrowBob 2.5s infinite ease;
      margin-bottom: 5rem;
      transform: translateY(0);
      opacity: 1;
    }

    h4 {
      // transform: translateX(-5.5%);
      font-size: 1.8rem;
      margin-top: 0;
      margin-bottom: 4rem;
      font-weight: 500;

      @include tablet {
        font-size: 2rem;
      }
    }
  }
}
</style>