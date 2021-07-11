import { createStore } from 'vuex';

export default createStore({
  state: {
    loading: false,
    loadingCards: false,
    sets: [],
    cards: [],
  },
  getters: {
    setsByRelease(state) {
      return state.sets.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    },
    setsById(state) {
      // return state.sets.reduce((byId, set) => {
      //   byId.set(set.id, set);
      //   return byId;
      // }, new Map());
      return new Map(state.sets.map((set) => [set.id, set]));
    },
    cardsById(state) {
      // return state.sets.reduce((byId, set) => {
      //   byId.set(set.id, set);
      //   return byId;
      // }, new Map());
      return state
        .cards
        .reduce((byId, card) => {
          byId.set(card.id, card);
          return byId;
        }, new Map());
    },
    cardsByRarity(state) {
      return state
        .cards
        .reduce((byId, card) => {
          let { rarity } = card;
          if (rarity.match(/rare/i)) {
            rarity = 'Rare';
          }
          if (!byId.has(rarity)) {
            byId.set(rarity, []);
          }
          byId.get(rarity).push(card);
          return byId;
        }, new Map());
    },
  },
  mutations: {},
  actions: {
    async getCards({ state }, setid) {
      state.loadingCards = true;
      // TODO: get all pages of data if there are more
      const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${setid}`, { headers: new Headers({ 'X-Api-Key': '70681ba2-3e30-409e-bf96-dd7afb31d2eb' }) });
      const json = await response.json();
      console.log(json, 'getCards');
      state.cards = json.data;
      state.loadingCards = false;
    },
    async getSets({ state }) {
      state.loading = true;
      const response = await fetch('https://api.pokemontcg.io/v2/sets', { headers: new Headers({ 'X-Api-Key': '70681ba2-3e30-409e-bf96-dd7afb31d2eb' }) });
      // console.log(response);
      // console.log(response.headers.append({ headers: 'Headers', value: 'afafafaf' }));
      // console.log(response.headers.set());
      const json = await response.json();
      console.log(json, 'getSets');
      state.sets = json.data;
      state.loading = false;
    },
  },
  modules: {},
});
