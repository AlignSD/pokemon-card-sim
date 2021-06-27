import { createStore } from 'vuex';

export default createStore({
  state: {
    sets: [
    ],
  },
  getters: {
    setsByRelease(state) {
      return state.sets.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    },
  },
  mutations: {},
  actions: {
    async getSets({ state }) {
      const response = await fetch('https://api.pokemontcg.io/v2/sets', { headers: new Headers({ 'X-Api-Key': '70681ba2-3e30-409e-bf96-dd7afb31d2eb' }) });
      // console.log(response);
      // console.log(response.headers.append({ headers: 'Headers', value: 'afafafaf' }));
      // console.log(response.headers.set());
      const json = await response.json();
      console.log(json);
      state.sets = json.data;
    },
  },
  modules: {},
});
