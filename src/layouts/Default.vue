<template>
  <div name="theme" class="theme-light">
    <Header />
    <transition name="fade" appear>
      <div>
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import Header from '~/components/partials/Header.vue'

export default {
  components: {
    Header
  }
}
</script>

<style lang="scss">
.theme-light {
  --bg-primary: #fff;

  --txt-primary: #333;
  --txt-secondary: #444;

  --txt-accent: #0075F2;
}

div[name="theme"] {
  font-family: 'Jost';
  width: calc(100% - 20rem);
  padding: 0 10rem;
  min-height: 100vh;
  transition: color 350ms ease, background-color 350ms ease;

  @include phone {
    width: calc(100% - 3rem);
    padding: 0 1.5rem;
  }

  &.theme-light {
    color: var(--txt-primary);
    background-color: var(--bg-primary);
  }
}

.fade-enter-active {
  transition: all 300ms;
}

.fade-enter {
  transform: scale(.975) translateY(.25rem);
  opacity: 0;
}

body {
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  margin:0;
  padding:0;
  line-height: 1.5;
  background-color: var(--bg-primary);
  color: var(--txt-primary);
}
</style>
