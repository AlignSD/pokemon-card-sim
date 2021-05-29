<template>
  <div class='home'>
    <div v-for="set in sets" :key="set.id">{{set.name}}</div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  setup() {
    const store = useStore();
    const sets = computed(() => store.state.sets);

    store.dispatch('getSets');
    return {
      sets,
    };
  },
};
</script>
