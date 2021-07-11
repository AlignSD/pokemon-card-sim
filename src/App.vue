<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <router-link to="/about">Contact</router-link>
  </div>
  <router-view/>
</template>

<script>
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    store.dispatch('getSets');
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  // @ open packs page h3 text
  h3 {
    color: black;
  }
}

body {
  background-color: #396182;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #09E8D5;

    &.router-link-exact-active {
      color: #EB6244;
    }
  }
}
</style>
