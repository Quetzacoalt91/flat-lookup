import Vue from 'vue';
import router from '../router';
import {sheetApiUrl, imagePreviewUrl} from './config.json';

export default {
  state: {
    api: {
      sheetsError: false,
      sheetsInProgress: false,
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
      state.api.sheetsInProgress = true;
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
          // Enable computed attr
          flat.preview_image = undefined;
        });
        commit('setFlatsList', {
          flats: response.body,
        });
        state.api.sheetsInProgress = false;
        dispatch('getFlatsPreview');
      }).catch((response) => {
        state.api.sheetsInProgress = false;
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
        if ((flat.hasOwnProperty('preview_image')
          && undefined !== flat.preview_image)
          || !flat.Link.length
        ) {
          return;
        }
        const link = encodeURIComponent(flat.Link);
        Vue.http.get(`${imagePreviewUrl}${link}`).then((response) => {
          if (response.body && response.body.length) {
            state.flats[index].preview_image = response.body;
          }
        });
      });
    },
    editFlat({ commit, state }, payload) {
      state.api.sheetsInProgress = true;
      Vue.http.patch(`${sheetApiUrl}/${payload.id}`, payload.form).then((response) => {
        state.api.sheetsInProgress = false;
        commit('setFlat', {
          id: payload.id,
          flat: response.body[0],
        });
        router.push({'path': '/'});
      }).catch((response) => {
        state.api.sheetsInProgress = false;
        // eslint-disable-next-line
        console.error(response);
        state.api.sheetsError = response.body.detail || "Unreachable API";
      });
    },
    saveFlat({ dispatch, state }, payload) {
      state.api.sheetsInProgress = true;
      Vue.http.post(sheetApiUrl, [payload.form]).then(() => {
        state.api.sheetsInProgress = false;
        dispatch('loadFlatsList');
        router.push({'path': '/'});
      }).catch((response) => {
        state.api.sheetsInProgress = false;
        // eslint-disable-next-line
        console.error(response);
        state.api.sheetsError = response.body.detail || "Unreachable API";
      });
    },
  },
};