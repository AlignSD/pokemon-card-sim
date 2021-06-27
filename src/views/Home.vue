<template>
  <div class='home'>
    <form class="form">
      <input v-model="filter">
    </form>
    <transition-group name="list" tag="div" class="sets">
      <router-link
        class="set list-item"
        v-for="set in sets"
        :key="set.id"
        :to="{ name: 'Pack', params: { setid: set.id } }">
        <img class="set-logo" :src="set.images.logo" >
        <h3>{{set.name}}</h3>
      </router-link>
    </transition-group>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';

export default {
  setup() {
    const filter = ref('');
    const store = useStore();
    const sets = computed(() => {
      if (!filter.value) {
        return store
          .getters
          .setsByRelease;
      }
      const regex = new RegExp(filter.value, 'i');
      return store
        .getters
        .setsByRelease
        .filter((set) => set.name.match(new RegExp(regex)));
    });

    return {
      sets,
      filter,
    };
  },
};
</script>

<style lang="scss">

.sets {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.set {
  // margin: 1rem;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 175ms ease-in-out;
  text-decoration: none;
  color: black;
}

.set:hover {
  transform: scale(1.05);
}

.set-logo {
  height:100px;
  max-width:300px
}

.form {
  width: 90%;
  margin: auto;
  input {
    width: 40%;
    font-size: 2.5rem;
    font-family: sans-serif;
  }
}

.list-enter-active, .list-leave-active {
  transition: all .5s ease-in-out;
}

.list-enter, .list-leave-to {
  opacity: 0;
  // transform: translateY(30px);
  transform: scale(0);
}
</style>
