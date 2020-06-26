<template>
    <header>
        <span class="logo">
            <g-link to="/">{{ $static.metadata.siteName }}</g-link>
        </span>
        <nav>
            <g-link to="/">Home</g-link>
            <g-link to="/blog/">Blog</g-link>
            <div class="search">
                <input
                    v-model="searchTerm"
                    class="input"
                    id="search"
                    type="text"
                    placeholder="Search for posts..."
                >

                <div class="results" id="results">
                    <div v-for="result in searchResults" v-bind:key="result.id">
                        <g-link class="result" :to="result.path">
                            <h3 v-text="result.title" />
                        </g-link>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
    name: 'Header',
    data: () => ({
        searchTerm: ''
    }),
    computed: {
        searchResults () {
            var searchTerm = this.searchTerm
            // var resultsEl = document ? document.querySelector('#results') : undefined;
            var resultsElTransition = '300ms ease opacity';

            if (searchTerm.length < 3) {
                // if (resultsEl) {
                //     resultsEl.style.transition = 'none';
                //     resultsEl.style.opacity = 0;
                //     resultsEl.style.pointerEvents = 'none';
                // }
                return []
            } else {
                // if (resultsEl && this.$search.search({ query: searchTerm, limit: 5 }).length > 0) {
                //     resultsEl.style.transition = resultsElTransition;
                //     resultsEl.style.opacity = 1;
                //     resultsEl.style.pointerEvents = 'all';
                // }

                return this.$search.search({ query: searchTerm, limit: 5 })
            }
        }
    },
    mounted() {
        document.onkeypress = function (e) {
            e = e || window.event;
            if (e.key == '/' || e.code == 'Slash' || e.keyCode == 47) {
                // Avoid entering slash into input
                setTimeout(function() {
                    document.querySelector('.search input').focus();
                }, 1);
            }
        };
        document.querySelector('input#search').addEventListener('input', function() {
            if (this.value.length <= 3) {
                document.querySelector('.results').style.opacity = 0;
            } else {
                document.querySelector('.results').style.opacity = 1;
            }
        });
    }
}
</script>

<style lang="scss">
header {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 7rem;
    justify-content: space-between;

    @include phone {
        display: none;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    a:hover, svg:hover {
        color: var(--txt-accent);
        transition: 200ms;
    }

    .logo {
        font-size: 1.4rem;
    }

    nav {
        display: flex;
        flex-direction: row;

        a {
            font-size: 1.2rem;
            padding: 1rem;

            &:last-of-type {
                margin-right: -1rem; // fixes padding offset
            }
        }

        div.theme-icons {
            display: flex;
            align-items: center;
            margin-left: .8rem;

            .theme-icon {
                cursor: pointer;
                position: relative;
                top: .35rem;
                padding: .5rem;
                display: none;
                height: 2rem;
                width: 2rem;

                &:last-of-type {
                    display: block;
                }
            }

            .theme-icon-active {
                display: flex;
            }
        }

        .search {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            margin-left: 2rem;

            input {
                padding: .5rem .5rem;
                width: 12rem;
                padding-left: 1.5rem;
                border-radius: 2rem;
                font-size: 1.2rem;
                outline: none;
                border: 1px solid rgba(100, 100, 100, .2);
                font-family: inherit;

                &:hover {
                    border: 1px solid rgba(75, 75, 75, .35)
                }

                &:focus {
                    border: 1px solid rgba(25 , 25 , 25 , .5)
                }
            }

            .results {
                transition: opacity 300ms;
                width: 100%;
                position: absolute;
                top: 5rem;
                background: rgba(255, 255, 255, .99);
                box-shadow: 0 1px 0 0 rgba(0,0,0,.2), 0 2px 3px 0 rgba(0,0,0,.1);
                border-top: rgba(65, 40, 40, 0.05) 1px solid;
                display: grid;
                flex-direction: column;
                grid-template-rows: auto;
                opacity: 0;
                // pointer-events: none;
                border-radius: .2rem;
                z-index: 100;

                div {
                    border-bottom: rgba(100, 100, 100, .4) 1px dashed;

                    &:last-of-type {
                        border-bottom: none;
                    }
                    
                    a {
                        display: block;
                        width: 100%;
                        height: 100%;
                        transition: 250ms ease;

                        &:hover {
                            color: var(--txt-accent);
                        }

                        h3 {
                            margin: 0;
                            font-size: 1.2rem;
                            font-weight: 500;
                        }
                    }
                }
            }

        }
    }
}
</style>
