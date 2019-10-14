<template>
  <div class="form-rent">
    <router-link to="/">Back to the list</router-link>
    <h1>Flat details</h1>

    <form @submit="saveFlat">
      <div class="form-group row">
        <label for="flatFormLink" class="col-sm-2 col-form-label">Link</label>
        <div class="col-sm-10">
          <input v-model="form.Link" type="text" class="form-control"
            id="flatFormLink" placeholder="Link to the ad"
          >
        </div>
      </div>
      <button class="btn btn-primary" type="submit">Save</button>
    </form>

  </div>
</template>

<script>
export default {
  name: 'Form',
  props: ['id'],
  data() {
    return {
      form: {
        Link: '',
      },
    }
  },
  methods: {
    saveFlat() {
      if (undefined !== this.id) {
        this.$store.dispatch(
          'editFlat', {
            id: this.id,
            form: this.form,
          },
        );
      } else {
        this.$store.dispatch(
          'saveFlat', {
            form: this.form,
          },
        );
      }
    },
  },
  mounted() {
    if (undefined !== this.id) {
      this.form = this.$store.state.flats[this.id];
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
