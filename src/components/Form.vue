<template>
  <div class="form-rent">
    <router-link to="/">Back to the list</router-link>
    <h1>Flat details</h1>

    <form @submit="saveFlat">
      <div class="form-group row">
        <label for="flatFormLink" class="col-sm-2 col-form-label">Lien annonce</label>
        <div class="col-sm-10">
          <input v-model="form.Link" type="text" class="form-control"
            id="flatFormLink" placeholder="http://"
          >
        </div>
      </div>
      <h2>Chauffage</h2>
      <div class="form-group row">
        <label for="customSwitch1" class="col-sm-3 col-form-label">Chauffage centralise</label>
        <div class="col-sm-9 custom-control custom-switch">
          <input v-model="form.chauffage_centralise" type="checkbox" class="custom-control-input" id="customSwitch1">
          <label class="custom-control-label" for="customSwitch1" ></label>
        </div>
      </div>
      <h2>Rangements</h2>
      <div class="form-group row">
        <label for="switchStorageEnough" class="col-sm-3 col-form-label">Espaces de rangement suffisants</label>
        <div class="col-sm-9 custom-control custom-switch">
          <input v-model="form.storage_enough" type="checkbox" class="custom-control-input" id="switchStorageEnough">
          <label class="custom-control-label" for="switchStorageEnough" ></label>
        </div>
      </div>
      <div class="form-group row">
        <label for="switchStoragePossible" class="col-sm-3 col-form-label">Espace dispo pour rangements</label>
        <div class="col-sm-9 custom-control custom-switch">
          <input v-model="form.storage_possible" type="checkbox" class="custom-control-input" id="switchStoragePossible">
          <label class="custom-control-label" for="switchStoragePossible" ></label>
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
  computed: {
    form() {
      if (undefined !== this.id) {
        return this.$store.state.flats[this.id] || this.defaultForm();
      }
      return this.defaultForm();
    },
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
    defaultForm() {
      return {
        form: {
          Link: '',
        },
      };
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
