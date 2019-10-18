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
                <font-awesome-icon v-if="flat.visit_status" icon="phone-volume" title="Contact obtenu" />
                <font-awesome-icon v-if="isVisitDone(flat.date_visit)" icon="calendar-check" title="Visite terminee" class="text-success" />
                <font-awesome-icon v-else-if="flat.date_visit" icon="calendar-day" title="Visite planifiee" />
              </span>
            </div>


            <span v-if="flat.Link">
              <a :href="flat.Link" target="_blank">Open Ad</a> |
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
    isVisitDone(dateString) {
      if (!dateString) {
        return false;
      }
      const date = new Date(dateString);
      const now = new Date();
      return now >date;
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
