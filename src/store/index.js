import Vue from 'vue';
import router from '../router';
import {sheetApiUrls, imagePreviewUrl} from './config.json';

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
      const flats = [];
      state.api.sheetsInProgress = true;
      sheetApiUrls.forEach((url, urlKey) => {
        const functionCall = () => {
          Vue.http.get(url).then((response) => {
            response.body.forEach((flat, flatKey) => {
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
              flats[flatKey] = Object.assign({}, flats[flatKey] || {}, flat);
            });
            if (0 === urlKey) {
              dispatch('getFlatsPreview');
            }
            // If the API call was the last one to do
            if (urlKey === (sheetApiUrls.length - 1)) {
              commit('setFlatsList', {
                flats: flats,
              });
              state.api.sheetsInProgress = false;
            }
          }).catch((response) => {
            state.api.sheetsInProgress = false;
            if (response.body && response.body.detail) {
              state.api.sheetsError = response.body.detail;
            } else {
              state.api.sheetsError = response || "Unreachable API";
            }
          });
        };
        setTimeout(functionCall, (urlKey * 500));

      });
    },
    getFlatsPreview({ state }) {
      state.flats.forEach((flat, index) => {
        // Do not reload existing images
        if (undefined === flat.preview_image) {
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
      const flatResponse = {};
      state.api.sheetsInProgress = true;
      sheetApiUrls.forEach((url, urlKey) => {
        Vue.http.patch(`${url}/${payload.id}`, payload.form).then((response) => {
          Object.assign(flatResponse, response.body[0]);
          
          // If the API call was the last one to do
          if (urlKey === (sheetApiUrls.length - 1)) {
            state.api.sheetsInProgress = false;
            commit('setFlat', {
              id: payload.id,
              flat: flatResponse,
            });
            router.push({'path': '/'});
          }
        }).catch((response) => {
          state.api.sheetsInProgress = false;
          // eslint-disable-next-line
          console.error(response);
          state.api.sheetsError = response.body.detail || "Unreachable API";
        });
      });
    },
    saveFlat({ dispatch, state }, payload) {
      state.api.sheetsInProgress = true;
      sheetApiUrls.forEach((url, urlKey) => {
        Vue.http.post(url, [payload.form]).then(() => {
          // If the API call was the last one to do
          if (urlKey === (sheetApiUrls.length - 1)) {
            state.api.sheetsInProgress = false;
            dispatch('loadFlatsList');
            router.push({'path': '/'});
          }
        }).catch((response) => {
          state.api.sheetsInProgress = false;
          // eslint-disable-next-line
          console.error(response);
          state.api.sheetsError = response.body.detail || "Unreachable API";
        });
      });
    },
  },
};