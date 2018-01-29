<template>
  <b-container>
    <b-row class="my-1">
      <b-col sm="2"><label for="input-default">Min {{attribLbl}}:</label></b-col>
      <b-col sm="4">
        <b-form-input id="input-default" type="text" placeholder="Min BPM" v-model="minBpm"></b-form-input>
      </b-col>
      <b-col sm="2"><label for="input-default">Max {{attribLbl}}:</label></b-col>
      <b-col sm="4">
        <b-form-input id="input-default" type="text" placeholder="Max BPM" v-model="maxBpm"></b-form-input>
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
      minBpm: 0,
      maxBpm: 1000
    }
  },
  watch: {
    'minBpm': function () { this.$emit('input', this.buildValues()) },
    'maxBpm': function () { this.$emit('input', this.buildValues()) }
  },
  methods: {
    buildValues () {
      return { 'min': this.minBpm, 'max': this.maxBpm }
    }
  },
  created () {
    if (this.min && this.min !== 0) this.minBpm = this.min
    if (this.max && this.max !== 0) this.maxBpm = this.max
  }
}
</script>
