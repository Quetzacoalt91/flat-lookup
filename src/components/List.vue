<template>
  <div class="hello">
    <h2>Appartements enregistres</h2>

    <div class="row header-links">
      <div class="col-12 col-sm-6">
        <router-link to="/new">
          <font-awesome-icon icon="plus" />
          Add new reference
        </router-link>
        <button class="btn btn-link" @click="synchronizeList()">
          <font-awesome-icon icon="sync" />
          Synchronize
        </button>
      </div>
      <div class="col-12 col-sm-6 text-right">
        <SwitchSingle
          v-model="displayDisabledAds"
          label="Afficher les annonces désactivées"
          classLabel="col-9 col-form-label"
          classSwitch="col-1 custom-control custom-switch"
        />
      </div>
    </div>

    <div class="row">
      <div v-if="apiBusy" class="col-sm-12">
        <div class="mx-auto refresh">
          Refreshing <font-awesome-icon icon="circle-notch" spin />
        </div>
      </div>
      <div class="col-sm-4" v-for="(flat, index) in flats" v-bind:key="index" :class="{ 'd-none': !displayDisabledAds && !flat.active }">
        <div class="card" :class="{ 'disabled': !flat.active }">
          <div class="card-body">
            <a :href="flat.Link" target="_blank">
              <img :src="flat.preview_image" class="flat-preview float-right" />
            </a>
            <h6 class="card-title">#{{ idFromReversedList(index) }} - <small>{{ new Date(flat.date_add).toLocaleString('en-GB', { timeZone: 'UTC' }) }}</small></h6>

            <div>
              <span v-if="flat.price_pcm">£ {{flat.price_pcm}}pcm</span>
              <span v-else>£ ---</span>

              <span class="status-icons">
                <font-awesome-icon v-if="0 < flat.visit_status" icon="phone-volume" v-tooltip:bottom="'Contact obtenu'" />
                <font-awesome-icon v-if="dateIsInFuture(flat.date_visit)" icon="calendar-check" v-tooltip:bottom="'Visite terminee: '+ displayDateTime(flat.date_visit)" class="text-success" />
                <font-awesome-icon v-else-if="flat.date_visit" icon="calendar-day" v-tooltip:bottom="'Visite planifiee: '+ displayDateTime(flat.date_visit)" />
                <font-awesome-icon v-if="flat.opinion" icon="gavel" :class="opinionColor(flat.opinion)" />
              </span>
            </div>


            <span v-if="flat.Link">
              <a :href="flat.Link" target="_blank">Open Ad</a> |
            </span>
            <span v-if="flat.postal_code">
              <a :href="googleMapsLink(flat.postal_code)" target="_blank">
                <font-awesome-icon icon="map-marked-alt" />
              </a> |
            </span>
            <router-link v-bind:to="'/edit/' + idFromReversedList(index)">Edit</router-link>
          </div>
        </div>
      </div>
    </div>
    <Links/>
  </div>
</template>

<script>
import Links from '@/components/Links';
import SwitchSingle from '@/components/SwitchSingle';
import { dateIsInFuture, googleMapsLink } from '../common/methods';

export default {
  name: 'List',
  components: {
    Links,
    SwitchSingle,
  },
  props: {
    displayDisabledAds: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    apiBusy() {
      return this.$store.state.api.sheetsInProgress;
    },
    listLength() {
      return this.$store.state.flats.length;
    },
    flats() {
      return this.$store.state.flats.slice().reverse();
    },
  },
  methods: {
    dateIsInFuture,
    googleMapsLink,
    displayDateTime(dateString) {
      if (!dateString) {
        return false;
      }
      const date = new Date(dateString);
      return date.toLocaleString();
    },
    opinionColor(opinion) {
      if (1 === parseInt(opinion)) {
        return 'text-danger';
      }
      if (2 === parseInt(opinion)) {
        return 'text-warning';
      }
      return 'text-success';
    },
    idFromReversedList(index) {
      return this.listLength - 1 - index;
    },
    synchronizeList() {
      this.$store.dispatch('loadFlatsList');
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.card {
  margin-bottom: 5px;
}
.disabled {
  color: grey;
  background-color: #f2f2f2;
}
.disabled a {
  color: lightblue;
}
.flat-preview {
  max-width: 100px;
  max-height: 100px;
}
.disabled img {
  opacity: 0.4;
}
.disabled:hover img {
  opacity: unset;
}
.refresh {
  width: 200px;
}
.status-icons svg {
  margin-left: 10px;
}
</style>
