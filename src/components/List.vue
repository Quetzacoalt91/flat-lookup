<template>
  <div class="hello">
    <h2>Appartements enregistres</h2>

    <div class="row header-links">
      <div class="col-md-12">
        <router-link to="/new">
          <font-awesome-icon icon="plus" />
          Add new reference
        </router-link>
      </div>
    </div>

    <div class="row">
      <div v-if="apiBusy" class="col-sm-12">
        <div class="mx-auto refresh">
          Refreshing <font-awesome-icon icon="circle-notch" spin />
        </div>
      </div>
      <div class="col-sm-4" v-for="(flat, index) in flats" v-bind:key="index">
        <div class="card" :class="{ 'disabled': !flat.active }">
          <div class="card-body">
            <img :src="flat.preview_image" class="flat-preview float-right" />
            <h6 class="card-title">#{{index}} - <small>{{ new Date(flat.date_add).toLocaleString('en-GB', { timeZone: 'UTC' }) }}</small></h6>

            <div>
              <span v-if="flat.price_pcm">£ {{flat.price_pcm}}pcm</span>
              <span v-else>£ ---</span>

              <span class="status-icons">
                <font-awesome-icon v-if="flat.visit_status" icon="phone-volume" v-tooltip:bottom="'Contact obtenu'" />
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
            <router-link v-bind:to="'/edit/' + index">Edit</router-link>
          </div>
        </div>
      </div>
    </div>
    <Links/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Links from '@/components/Links';
import { dateIsInFuture, googleMapsLink } from '../common/methods';

export default {
  name: 'List',
  components: {
    Links,
  },
  computed: {
    apiBusy() {
      return this.$store.state.api.sheetsInProgress;
    },
    ...mapState(['flats']),
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
