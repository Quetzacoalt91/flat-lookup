<template>
  <div class="hello">
    <h1>Flats list</h1>

    <router-link to="/new">Add new reference</router-link>

    <div class="row">
      <div class="col-sm-3">
        <div v-for="(flat, index) in flats" v-bind:key="index" class="card">
          <div class="card-body">
            <h5 class="card-title">#{{index}}</h5>

            <a v-if="flat.Link" :href="flat.Link" class="btn btn-primary">Open Ad</a>
            <a v-if="flat.Link" href="#" class="btn btn-primary">Edit</a>
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
  methods: {
    loadFlats() {
      this.$store.dispatch('loadFlatsList');
    },
  },
  created() {
    this.loadFlats();
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
a {
  color: #42b983;
}
</style>
