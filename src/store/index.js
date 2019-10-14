import Vue from 'vue';
import {sheetApiUrl} from './config.json';

export default {
  state: {
    api: {
      sheetsError: false,
    },
    flats: [],
  },
  mutations: {
    setFlatsList(state, payload) {
      state.flats = payload.flats;
    },
    resetApiError(state, api) {
      state.api[api] = false;
    },
  },
  actions: {
    loadFlatsList({ commit, state }) {
      //Avoid API limits
      commit('setFlatsList', {
        flats: JSON.parse('[{"Link":"https://www.zoopla.co.uk/to-rent/details/53001378"},{"Link":"g"},{}]'),
      });
      return;
      Vue.http.get(sheetApiUrl).then((response) => {
        commit('setFlatsList', {
          flats: response.body,
        });
      }).catch((response) => {
        state.api.sheetsError = response.body.detail || "Unreachable API";
      });
    },
    saveFlat({ state }, payload) {
      Vue.http.post(sheetApiUrl, [payload.form]).then(() => {
      }).catch((response) => {
        // eslint-disable-next-line
        console.log(response);
        state.api.sheetsError = response.body.detail || "Unreachable API";
      });
    },
  },
};