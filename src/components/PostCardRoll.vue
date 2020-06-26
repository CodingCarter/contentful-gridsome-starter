<template>
    <section class="article-roll">
        <div v-for="{ node: post } in posts" v-bind:key="post.id" :data-hidden-post="post.author.id != authorid">
            <PostCard
                :v-if="post.author.id == authorid"
                :path="post.path"
                :image="post.image"
                :date="post.date"
                :title="post.title"
                :excerpt="post.excerpt"
            />
        </div>
    </section>
</template>

<script>
import PostCard from './PostCard.vue'

export default {
    name: 'PostCardRoll',
    props: ['posts', 'authorid'],
    components: {
        PostCard
    },
    mounted() {
        var posts = document.querySelectorAll('.article-roll > div');
        
        for (var i = 0; i < posts.length; i++) {
            if (posts[i].getAttribute('data-hidden-post')) {
                posts[i].style.display = 'none';
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.article-roll {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2.5rem;
    grid-row-gap: 3rem;

    @include tablet {
        grid-template-columns: 1fr;
    }

    @include phone {
        // grid-template-columns: 1fr;
    }

    article {
        height: 31rem;
    }
}
</style>