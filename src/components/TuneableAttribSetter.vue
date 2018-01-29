<template>
  <b-container>
    <b-row class="my-1">
      <b-col sm="2"><label for="input-default">{{attribLbl}}:</label></b-col>
      <b-col sm="5">
        <b-form-input id="input-default" type="text" placeholder="Min" v-model="minVal"></b-form-input>
      </b-col>
      <b-col sm="5">
        <b-form-input id="input-default" type="text" placeholder="Max" v-model="maxVal"></b-form-input>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'tuneable-attrib-setter',
  props: [ 'min', 'max', 'attribLbl' ],
  data () {
    return {
      minVal: 0,
      maxVal: 1000
    }
  },
  watch: {
    'minVal': function () { this.$emit('input', this.buildValues()) },
    'maxVal': function () { this.$emit('input', this.buildValues()) }
  },
  methods: {
    buildValues () {
      return { 'min': this.minVal, 'max': this.maxVal }
    }
  },
  created () {
    if (this.min && this.min !== 0) this.minVal = this.min
    if (this.max && this.max !== 0) this.maxVal = this.max
  }
}
</script>
