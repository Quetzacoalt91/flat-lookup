import Vue from 'vue';
import router from '../router';
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
      // eslint-disable-next-line
      Vue.http.get(sheetApiUrl).then((response) => {
        commit('setFlatsList', {
          flats: response.body,
        });
      }).catch((response) => {
        state.api.sheetsError = response.body.detail || "Unreachable API";
      });
    },
    editFlat({ state }, payload) {
      Vue.http.patch(`${sheetApiUrl}/${payload.id}`, payload.form).then(() => {
      }).catch((response) => {
        // eslint-disable-next-line
        console.error(response);
        state.api.sheetsError = response.body.detail || "Unreachable API";
      });
    },
    saveFlat({ state }, payload) {
      Vue.http.post(sheetApiUrl, [payload.form]).then(() => {
        router.push({'path': '/'});
      }).catch((response) => {
        // eslint-disable-next-line
        console.error(response);
        state.api.sheetsError = response.body.detail || "Unreachable API";
      });
    },
  },
};