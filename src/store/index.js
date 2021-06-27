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
      const response = await fetch('https://api.pokemontcg.io/v2/sets', { headers: new Headers({ 'X-Api-Key': 'Blank' }) });
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
