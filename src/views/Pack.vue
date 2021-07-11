<template>
  <div>
    <h1>Open a Pack!</h1>
    <div v-if="loading">
      <h1>Loading...</h1>
    </div>
    <div v-if="!loading && !currentSet">
      <h1>Set id not found!</h1>
    </div>
    <div v-if="!loading && currentSet">
      <img class="set-logo" :src="currentSet.images.logo" />
        <h3>{{currentSet.name}}</h3>
    </div>
    <div v-if="!loadingCards && cards.length > 0" class="cards" >
      <div class="card" v-for="card in cards" :key="card.id" >
      <img :src="card.images.large" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
    const cards = ref([]);
    const route = useRoute();
    const store = useStore();
    const loading = computed(() => store.state.loading);
    const loadingCards = computed(() => store.state.loadingCards);
    const currentCards = computed(() => store.getters.cardsByRarity);
    const currentSet = computed(() => store.getters.setsById.get(route.params.setid));
    const cardsById = computed(() => store.getters.cardsById);
    console.log(route.params);
    console.log(currentSet, 'currentSet');
    watch(route, () => {
      if (route.params.setid) {
        console.log('getting cards for set', route.params.setid);
        store.dispatch('getCards', route.params.setid);
      }
    }, {
      immediate: true,
    });

    function getRandomCards(count, cards1) {
      const cardsWithoutEnergy = cards1.filter((card) => card.supertype !== 'Energy');
      const randomCards = new Set();
      while (randomCards.size < count) {
        console.log(randomCards, 'lookhererererer');
        const randomCard = cardsWithoutEnergy[Math.floor(Math
          .random() * cardsWithoutEnergy.length - 1)];
        randomCards.add(randomCard.id);
      }
      return [...randomCards].map((id) => cardsById.value.get(id));
    }

    watch(currentCards, () => {
      const commons = getRandomCards(5, currentCards.value.get('Common'));
      cards.value = cards.value.concat(commons);
      const uncommons = getRandomCards(3, currentCards.value.get('Uncommon'));
      cards.value = cards.value.concat(uncommons);
      const rares = getRandomCards(1, currentCards.value.get('Rare'));
      cards.value = cards.value.concat(rares);
      // add revese holos

      // add rares
      console.log(commons, 'commons');
    });
    return {
      loading,
      loadingCards,
      currentSet,
      cards,
    };
  },
};
</script>

<style lang="scss">
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.card {
  width: 300px;
  img {
    width: 100%;
  }
}
</style>
