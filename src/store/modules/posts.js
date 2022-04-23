import axios from "axios";

export default {
  state: {
    adverts: [],
  },
  getters: {
    allAdverts(state) {
      return state.adverts;
    }
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
    }
  },
  mutations: {
    createAdvert(state, newAdverts) {
      state.adverts.unshift(newAdverts);
    },
    updateAdverts(state, adverts) {
      state.adverts = adverts;
    }
  },
};
