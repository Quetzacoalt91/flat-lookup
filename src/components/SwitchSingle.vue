<template>
  <div class="form-group row">
    <label :for="idSwitch" class="col-sm-3 col-9 col-form-label">{{ label }}</label>
    <div class="col-sm-9 col-1 custom-control custom-switch">
      <input
        v-model="value"
        v-on:input="$emit('input', $event.target.checked)"
        type="checkbox"
        class="custom-control-input"
        :id="idSwitch"
      >
      <label class="custom-control-label" :for="idSwitch" ></label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwitchSingle',
  props: [
    'label',
    'value',
  ],
  computed: {
    idSwitch() {
      return `switch${this.label}`;
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.custom-switch {
  padding-top: 7px;
}
</style>
