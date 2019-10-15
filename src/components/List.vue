<template>
  <div class="hello">
    <h2>Appartements enregistres</h2>

    <router-link to="/new">Add new reference</router-link>

    <div class="row">
      <div class="col-sm-3" v-for="(flat, index) in flats" v-bind:key="index">
        <div class="card">
          <div class="card-body">
            <h6 class="card-title">#{{index}} - <small>{{ new Date(flat.date_add).toLocaleString('en-GB', { timeZone: 'UTC' }) }}</small></h6>

            <div v-if="flat.price_pcm">£ {{flat.price_pcm}}pcm</div>
            <div v-else>£ ---</div>
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
    ...mapState(['flats']),
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
</style>
