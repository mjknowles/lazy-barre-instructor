<template>
  <b-container>
    <b-row class="my-1">
      <b-col sm="2"><label for="input-default">Min BPM:</label></b-col>
      <b-col sm="10">
        <b-form-input id="input-default" type="text" placeholder="Min BPM" v-model="minBpm"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="2"><label for="input-default">Max BPM:</label></b-col>
      <b-col sm="10">
        <b-form-input id="input-default" type="text" placeholder="Max BPM" v-model="maxBpm"></b-form-input>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'bpm-selector',
  props: [ 'min', 'max' ],
  data () {
    return {
      minBpm: 0,
      maxBpm: 1000
    }
  },
  watch: {
    'minBpm': function () { this.$emit('input', this.buildBpm()) },
    'maxBpm': function () { this.$emit('input', this.buildBpm()) }
  },
  methods: {
    buildBpm () {
      return { 'min': this.minBpm, 'max': this.maxBpm }
    }
  },
  created () {
    if (this.min && this.min !== 0) this.minBpm = this.min
    if (this.max && this.max !== 0) this.maxBpm = this.max
  }
}
</script>
