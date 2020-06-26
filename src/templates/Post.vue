<template>
    <Layout>
        <article class="post">
            <section class="post-info">
                <h1 v-text="$page.post.title" />
                <div>
                    <span>by <g-link :to="$page.post.author.path" rel="author">{{ $page.post.author.name }}</g-link> on {{ $page.post.date }}</span>
                </div>
                <g-image class="hero-image" :src="$page.post.image" />
            </section>

            <section class="post-content" v-html="$page.post.content" />
        </article>
    </Layout>
</template>

<page-query>
query ($id: ID!) {
  post: post (id: $id) {
    id
    path
    title
    date (format: "MMMM D, YYYY")
    author {
        path
        name
    }
    image
    excerpt
    content
  }
}
</page-query>

<script>
export default {
    metaInfo() {
        return {
            title: this.$page.post.title,
            meta: [
                {
                    name: 'description',
                    content: this.$page.post.excerpt
                }
            ]
        }
    },
    mounted() {
        for (var i = document.querySelectorAll('.post-content a').length-1; i >= 0; i--) {
            if (document.querySelectorAll('.post-content a')[i].getAttribute('href').split('')[0] == '/') {
                document.querySelectorAll('.post-content a')[i].removeAttribute('target')
            }
        }
    }
}
</script>

<style lang="scss">
.post {
    padding: 5rem 0;

    .post-info {

        h1 {
            width: 80%;
            margin: 0 auto;
            text-align: center;
            font-size: 3.25rem;
            font-weight: 500;

            @include tablet {
                width: 90%;
            }

            @include phone {
                width: 95%;
                font-size: 2.8rem;
            }
        }

        div {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            font-size: 1.125rem;
            font-weight: 400;
            margin-top: 1.7rem;
            color: var(--txt-secondary);

            @include phone {
                font-size: 1.1rem;
            }

            a {
                text-decoration: none;
                color: inherit;
            }
        }

        & > .hero-image {
            padding-top: 3.5rem;
            width: 100%;
            max-height: 80vh;
            object-fit: cover;
        }
    }

    .post-content {
        font-size: 1.3rem;
        line-height: 1.8;
        width: 66%;
        margin: 0 auto;
        padding-top: 5rem;
        color: var(--txt-secondary);

        @include tablet {
            width: 92.5%;
            font-size: 1.25rem;
        }

        @include phone {
            width: 95%;
            font-size: 1.1rem;
            padding-top: 1rem;
        }

        h2 {
            font-size: 2.8rem;
            margin-top: 2rem;
            margin-bottom: 1.25rem;

            @include phone {
                font-size: 2.3rem;
            }
        }

        h3 {
            font-size: 2rem;
            margin-top: 2rem;
            margin-bottom: 1.25rem;

            @include phone {
                font-size: 1.75rem;
            }
        }

        h4 {
            font-size: 1.6rem;

            @include phone {
                font-size: 1.3rem;
            }
        }

        a {
            color: var(--txt-accent);
            text-decoration: none;
        }

        img {
            display: block;
            width: 75%;
            margin: 2rem auto;

            @include tablet {
                width: 100%;
            }
        }
    }

}
</style>