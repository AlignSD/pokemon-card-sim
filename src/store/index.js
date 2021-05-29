import { createStore } from 'vuex';

export default createStore({
  state: {
    sets: [
    ],
  },
  mutations: {},
  actions: {
    async getSets({ state }) {
      const response = await fetch('https://api.pokemontcg.io/v2/sets');
      const json = await response.json();
      state.sets = json.data;
    },
  },
  modules: {},
});
