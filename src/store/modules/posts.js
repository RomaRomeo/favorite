import axios from "axios";

export default {
  state: {
    adverts: [],
    promotions: [],
  },
  getters: {
    allAdverts(state) {
      return state.adverts;
    },
    allPromotions(state) {
      return state.promotions;
    },
  },
  actions: {
    fetchAdverts({ commit }) {
      axios
        .get(
          "https://api.themoviedb.org/3/discover/movie?api_key=ef817d509d5dbf9ce8b44c73e7bb30b4"
        )
        .then((response) => {
          const adverts = response.data.results;

          commit("updateAdverts", adverts);
          console.log("Adverts successfully received", adverts);
        })
        .catch((error) => {
          console.warn("Error while fetching adverts", error);
        });
    },
    fetchPromotions({ commit }) {
      axios
        .get("https://jsonplaceholder.typicode.com/posts?_limit=10")
        .then((response) => {
          const promotions = response.data;

          commit("updatePromotions", promotions);
          console.log("Promotions successfully received", promotions);
        })
        .catch((error) => {
          console.warn("Error while fetching promotions", error);
        });
    },
  },
  mutations: {
    updateAdverts(state, adverts) {
      state.adverts = adverts;
    },
    createAdvert(state, newAdverts) {
      state.adverts.unshift(newAdverts);
    },
    updatePromotions(state, promotions) {
      state.promotions = promotions;
    },
  },
};
