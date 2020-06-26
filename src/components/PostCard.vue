<template>
    <article class="article">
        <g-link :to="path">
            <g-image :src="image" alt="post image" />
            <div class="article-info">
                <span class="article-date">Published on {{ date }}</span>
                <h2 v-text="title" />
                <p v-text="excerpt.split('').slice(0, 150).join('').split(' ').slice(0, excerpt.split('').slice(0, 150).join('').split(' ').length-1).join(' ') + '...'" />
            </div>
        </g-link>
    </article>
</template>

<script>
export default {
    name: 'PostCard',
    props: ['path', 'image', 'date', 'title', 'excerpt']
}
</script>

<style lang="scss">
.article {
    transform: translateY(0) scale(1);
    box-shadow: 0px 3px 13px 0px rgba(0,0,0,0.3);
    transition: 300ms;

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0px 7px 24px -1px rgba(0,0,0,0.5);
    }

    a {
        color: inherit;
        text-decoration: none;

        img {
            width: 100%;
            height: 13.5rem;
            object-fit: cover;
        }

        .article-info {
            padding: 2rem;
            padding-top: 1rem;

            .article-date {
                display: block;
                font-weight: 300;
                color: var(--txt-secondary);
                margin-bottom: .5rem;
            }

            h2 {
                margin: 0;
                font-weight: 700;
            }

            p {
                font-weight: 300;
                color: var(--txt-secondary);
            }
        }
    }
}
</style>