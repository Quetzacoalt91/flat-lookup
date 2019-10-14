<template>
  <div>
    <div v-if="api.sheetsError" class="alert alert-danger alert-dismissible fade show" role="alert">
      {{ api.sheetsError }}
      <button @click="resetError('sheetsError')" type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Form',
  computed: {
    ...mapState(['api']),
  },
  methods: {
    resetError(api) {
      this.$store.commit('resetApiError', api);
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
