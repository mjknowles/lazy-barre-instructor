<template>
  <b-container>
    <b-row class="my-1">
      <b-col sm="2"><label for="input-default">Enter track Ids:</label></b-col>
      <b-col sm="10">
        <b-form-input id="input-default" type="text" placeholder="comma separated" v-model="enteredTracks"></b-form-input>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'track-seed-selector',
  props: [ 'tracks' ],
  data () {
    return {
      enteredTracks: ''
    }
  },
  watch: {
    'enteredTracks': function () { this.$emit('input', this.enteredTracks) }
  },
  created () {
    this.enteredTracks = this.tracks
  }
}
</script>
