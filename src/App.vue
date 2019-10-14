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
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
