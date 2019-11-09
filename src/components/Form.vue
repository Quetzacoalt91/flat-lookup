<template>
  <div class="form-rent">
    <h2>Flat details</h2>
    
    <div class="row header-links">
      <div class="col-md-12">
        <router-link to="/">
          <font-awesome-icon icon="arrow-left" />
          Back to the list
        </router-link>
      </div>
    </div>

    <form @submit="saveFlat">
      <SwitchSingle  v-if="id" v-model="form.active" label="Actif" />

      <div class="form-group row">
        <label for="flatFormLink" class="col-sm-2 col-form-label">Lien annonce</label>
        <div class="col-sm-10 input-group">
          <input v-model="form.Link" type="text" class="form-control"
            id="flatFormLink" placeholder="URL"
          >
          <div v-if="form.Link" class="input-group-append">
            <a :href="form.Link" target="_blank" class="btn btn-outline-primary">Open Ad</a>
          </div>
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
        <label for="flatPostalCode" class="col-sm-2 col-form-label">Code postal</label>
        <div class="col-sm-10 input-group">
          <input v-model="form.postal_code" type="text" class="form-control" id="flatPostalCode">
          <div v-if="form.postal_code" class="input-group-append">
            <a :href="googleMapsLink(form.postal_code)" target="_blank" class="btn btn-outline-primary">Open map</a>
          </div>
        </div>
      </div>
      <div class="form-group row">
        <label for="flatAgency" class="col-sm-2 col-form-label">Agency</label>
        <div class="col-sm-10">
          <input v-model="form.agency"  type="text" class="form-control" id="flatAgency">
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

      <SwitchSingle v-model="form.furnished" label="Meublé" />
      <SwitchSingle v-model="form.bills_included" label="Charges incluses" />

      <SaveButton />

      <h2>Chauffage</h2>
      <SwitchSingle v-model="form.chauffage_centralise" label="Chauffage centralisé" />

      <div v-if="!form.chauffage_centralise" class="form-group row">
        <label for="chauffageSelect" class="col-sm-2 col-form-label">Type de chauffage</label>
        <div class="col-sm-10">
          <select v-model="form.chauffage_type" id="chauffageSelect" class="custom-select">
            <option disabled>Choisir...</option>
            <option value="gaz">Gaz</option>
            <option value="electricite">Electricite</option>
          </select>
        </div>
      </div>

      <h2>Rangements</h2>
      <SwitchSingle v-model="form.storage_enough" label="Espaces de rangement suffisants" />
      <SwitchSingle v-model="form.storage_possible" label="Espace dispo pour rangements" />

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

      <div class="row separator">
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
          <div class="custom-control custom-switch">
            <input v-model="form.ci_entree_secure" type="checkbox" class="custom-control-input" id="switchEntreeSecure">
            <label class="custom-control-label" for="switchEntreeSecure">Entree securisee</label>
          </div>
          <div class="custom-control custom-switch">
            <input v-model="form.ci_concierge" type="checkbox" class="custom-control-input" id="switchConcierge">
            <label class="custom-control-label" for="switchConcierge">Concierge</label>
          </div>
          <div class="custom-control custom-switch">
            <input v-model="form.ci_jardin" type="checkbox" class="custom-control-input" id="switchJardin">
            <label class="custom-control-label" for="switchJardin">Jardin / Parc</label>
          </div>
        </div>
      </div>

      <h2>Autres infos</h2>
      <div class="form-group row">
        <label for="flatPositive" class="col-sm-2 col-form-label">Points positifs</label>
        <div class="col-sm-10">
          <textarea v-model="form.Positive" type="text" class="form-control" id="flatPositive"></textarea>
        </div>
      </div>
      <div class="form-group row">
        <label for="flatNegative" class="col-sm-2 col-form-label">Points negatifs</label>
        <div class="col-sm-10">
          <textarea v-model="form.Negative" type="text" class="form-control" id="flatNegative"></textarea>
        </div>
      </div>

      <h2>Visite</h2>

      <div class="form-group row">
        <label for="visitStatus" class="col-sm-2 col-form-label">Progression</label>
        <div class="col-sm-10">
          <select v-model="form.visit_status" id="visitStatus" class="custom-select">
            <option value="0">Visite non demandee</option>
            <option value="1">Visite demandee</option>
          </select>
        </div>
      </div>
      <div v-if="0 < form.visit_status">
        <div class="form-group row">
          <label for="visitDate" class="col-sm-2 col-form-label">Date de visite</label>
          <div class="col-sm-10">
            <input v-model="form.date_visit" @change="iOsDateFix()" type="datetime-local" class="form-control" id="visitDate">
          </div>
        </div>

        <div class="form-group row">
          <label for="visitDate" class="col-sm-2 col-form-label">Contact</label>
          <div class="col-sm-10">
            <textarea v-model="form.visit_contact"  type="datetime-local" class="form-control" id="visitDate"></textarea>
          </div>
        </div>

        <div v-if="dateIsInFuture(form.date_visit)" class="form-group row">
          <label for="visitOpinion" class="col-sm-2 col-form-label">Avis final</label>
          <div class="col-sm-10">
            <select v-model="form.opinion" id="visitOpinion" class="custom-select">
              <option value="1">NOPE</option>
              <option value="2">Meh</option>
              <option value="3">Valide</option>
            </select>
          </div>
        </div>
      </div>

      <SaveButton />
    </form>

  </div>
</template>

<script>
import SaveButton from '@/components/SaveButton';
import SwitchSingle from '@/components/SwitchSingle';
import { dateIsInFuture, googleMapsLink } from '../common/methods';

export default {
  name: 'Form',
  components: {
    SaveButton,
    SwitchSingle,
  },
  props: ['id'],
  data() {
    return {
      newForm: {
        active: true,
        type: '1bedroom',
        price_pcm: 0,
        price_pw: 0,
        chauffage_centralise: false,
        visit_status: 0,
      },
    };
  },
  computed: {
    form() {
      if (undefined !== this.id) {
        return this.$store.state.flats[this.id] || this.newForm;
      }
      return this.newForm;
    },
  },
  methods: {
    dateIsInFuture,
    googleMapsLink,
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
    iOsDateFix() {
      // Without this, the form cannot be submitted on iOS
      this.form.date_visit = this.form.date_visit.substr(0, 16);
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flat-preview {
  max-width: 200px;
  max-height: 200px;
}
.separator {
  margin-top: 10px;
}
</style>
