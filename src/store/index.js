import Vue from 'vue';
import router from '../router';
import {sheetApiUrl, imagePreviewUrl} from './config.json';

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
    setFlat(state, payload) {
      state.flats[payload.id] = payload.flat;
    },
    resetApiError(state, api) {
      state.api[api] = false;
    },
  },
  actions: {
    loadFlatsList({ dispatch, commit, state }) {
      Vue.http.get(sheetApiUrl).then((response) => {
        response.body.forEach((flat) => {
          // For each row from the spreadsheet ...
          Object.keys(flat).forEach(function(key) {
            // .. replace all occurences of stringified boolean values
            // in the proper type 
            if (flat[key] === 'TRUE') {
              flat[key] = true;
            }
            if (flat[key] === 'FALSE') {
              flat[key] = false;
            }
          });
        });
        commit('setFlatsList', {
          flats: response.body,
        });
        dispatch('getFlatsPreview');
      }).catch((response) => {
        if (response.body && response.body.detail) {
          state.api.sheetsError = response.body.detail;
        } else {
          state.api.sheetsError = "Unreachable API";
        }
      });
    },
    getFlatsPreview({ state }) {
      state.flats.forEach((flat, index) => {
        // Do not reload existing images
        if (undefined === flat.preview_image) {
          return;
        }
        const link = encodeURIComponent(flat.Link);
        console.log(`${imagePreviewUrl}${link}`);
        Vue.http.get(`${imagePreviewUrl}${link}`).then((response) => {
          if (response.body && response.body.length) {
            state.flats[index].preview_image = response.body;
          }
        });
      });
    },
    editFlat({ commit, state }, payload) {
      Vue.http.patch(`${sheetApiUrl}/${payload.id}`, payload.form).then((response) => {
        commit('setFlat', {
          id: payload.id,
          flat: response.body[0],
        });
        router.push({'path': '/'});
      }).catch((response) => {
        // eslint-disable-next-line
        console.error(response);
        state.api.sheetsError = response.body.detail || "Unreachable API";
      });
    },
    saveFlat({ state }, payload) {
      Vue.http.post(sheetApiUrl, [payload.form]).then(() => {
        dispatch('loadFlatsList');
        router.push({'path': '/'});
      }).catch((response) => {
        // eslint-disable-next-line
        console.error(response);
        state.api.sheetsError = response.body.detail || "Unreachable API";
      });
    },
  },
};