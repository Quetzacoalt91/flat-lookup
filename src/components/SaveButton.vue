<template>
  <div class="save-button">
    <button v-if="!apiBusy" class="btn btn-primary" type="submit">Save</button>
    <button v-else class="btn btn-primary" type="button" disabled>
      <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
      Saving...
    </button>
  </div>
</template>

<script>
export default {
  name: 'SaveButton',
  computed: {
    apiBusy() {
      return this.$store.state.api.sheetsInProgress;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.save-button {
  margin-bottom: 10px;
}
</style>
