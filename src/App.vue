<template>
  <div id="app">
    <div class="container">
      <Alerts/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Alerts from '@/components/Alerts';

export default {
  name: 'app',
  components: {
    Alerts,
  },
  created() {
    if (this.$store.state.flats.length == 0) {
      this.$store.dispatch('loadFlatsList');
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 15px;
}
.header-links {
  margin-bottom: 10px;
}
</style>
