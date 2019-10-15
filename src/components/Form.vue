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

      <div class="form-group row">
        <label for="flatFormType" class="col-sm-2 col-form-label">Type appartement</label>
        <div class="col-sm-10">
          <select v-model="form.type" class="custom-select">
            <option value="studio">Studio</option>
            <option value="1bedroom">1 Bedroom flat</option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <label for="flatFormType" class="col-sm-2 col-form-label">Code postal</label>
        <div class="col-sm-10">
          
        </div>
      </div>
      <div class="form-group row">
        <label for="flatRent" class="col-sm-2 col-form-label">Loyer</label>
        <div class="col-sm-5">
          <div class="input-group mb-3">
            <!-- Price per month -->
            <div class="input-group-prepend">
              <span class="input-group-text">£</span>
            </div>
            <input v-model="form.price_pcm" type="number" class="form-control">
            <div class="input-group-append">
              <span class="input-group-text">pcm</span>
            </div>
          </div>
        </div>
        <div class="col-sm-5">
          <div class="input-group mb-3">
            <!-- Price per week -->
            <div class="input-group-prepend">
              <span class="input-group-text">£</span>
            </div>
            <input v-model="form.price_pw" @input="convertPwToPcm()" type="number" class="form-control">
            <div class="input-group-append">
              <span class="input-group-text">pw</span>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group row">
        <label for="switchFurnished" class="col-sm-3 col-form-label">Meublé</label>
        <div class="col-sm-9 custom-control custom-switch">
          <input v-model="form.furnished" type="checkbox" class="custom-control-input" id="switchFurnished">
          <label class="custom-control-label" for="switchFurnished" ></label>
        </div>
      </div>
      <div class="form-group row">
        <label for="switchBillsIncluded" class="col-sm-3 col-form-label">Charges incluses</label>
        <div class="col-sm-9 custom-control custom-switch">
          <input v-model="form.bills_included" type="checkbox" class="custom-control-input" id="switchBillsIncluded">
          <label class="custom-control-label" for="switchBillsIncluded" ></label>
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
      <div class="row">
        <label for="switchStoragePossible" class="col-sm-3 col-form-label">Espace dispo pour rangements</label>
        <div class="col-sm-9 custom-control custom-switch">
          <input v-model="form.storage_possible" type="checkbox" class="custom-control-input" id="switchStoragePossible">
          <label class="custom-control-label" for="switchStoragePossible"></label>
        </div>
      </div>

      <h2>Confort</h2>
      <div class="row">
        <label class="col-sm-3 col-form-label">Dans l'appartement</label>
        <div class="col-sm-9">
          <div class="custom-control custom-switch">
            <input v-model="form.ca_balcon" type="checkbox" class="custom-control-input" id="switchBalcon">
            <label class="custom-control-label" for="switchBalcon">Balcon</label>
          </div>
          <div class="custom-control custom-switch">
            <input v-model="form.ca_double_vitrage" type="checkbox" class="custom-control-input" id="switchDoubleVitrage">
            <label class="custom-control-label" for="switchDoubleVitrage">Double vitrage</label>
          </div>
          <div class="custom-control custom-switch">
            <input v-model="form.ca_toilettes_sep" type="checkbox" class="custom-control-input" id="switchToilettesSeparees">
            <label class="custom-control-label" for="switchToilettesSeparees">Toilettes separees</label>
          </div>
        </div>
      </div>

      <div class="row">
        <label class="col-sm-3 col-form-label">Dans l'immeuble</label>
        <div class="col-sm-9">
          <div class="custom-control custom-switch">
            <input v-model="form.ci_piscine" type="checkbox" class="custom-control-input" id="switchImmeublePiscine">
            <label class="custom-control-label" for="switchImmeublePiscine">Piscine</label>
          </div>
          <div class="custom-control custom-switch">
            <input v-model="form.ci_gym" type="checkbox" class="custom-control-input" id="switchImmeubleGym">
            <label class="custom-control-label" for="switchImmeubleGym">Salle de sport</label>
          </div>
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
    convertPwToPcm() {
      this.form.price_pcm = parseInt(parseInt(this.form.price_pw) * 52 / 12);
    },
    saveFlat() {
      this.form.date_update = new Date(Date()).toISOString();
      if (undefined !== this.id) {
        this.$store.dispatch(
          'editFlat', {
            id: this.id,
            form: this.form,
          },
        );
      } else {
        // New flat
        this.form.date_add = this.form.date_update;
        this.$store.dispatch(
          'saveFlat', {
            form: this.form,
          },
        );
      }
    },
    defaultForm() {
      return {
        type: '1bedroom',
        price_pcm: 0,
        price_pw: 0,
      };
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
