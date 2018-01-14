<template>
  <b-table show-empty hover :items="localTracks" :fields="fields" @row-clicked="trackSelected"></b-table>
</template>

<script>
  export default {
    name: 'track-list',
    props: [ 'tracks' ],
    data () {
      return {
        localTracks: [],
        fields: [ 'song', 'artist' ],
        index: -1,
        selectedTrack: {}
      }
    },
    watch: {
      'tracks': function () { this.localTracks = this.tracks },
      'index': function () {
        this.selectedTrack = this.tracks[this.index]
        this.$emit('input', this.selectedTrack)
      }
    },
    methods: {
      trackSelected (item, index, event) {
        if (this.index !== -1) this.localTracks[this.index]._rowVariant = ''
        this.index = index
        this.localTracks[index]._rowVariant = 'info'
        this.$forceUpdate()
      }
    }
  }
</script>
