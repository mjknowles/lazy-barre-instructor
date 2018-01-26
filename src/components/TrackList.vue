<template>
  <b-table show-empty hover :items="localTracks" :fields="fields" @row-clicked="trackSelected" @row-dblclicked="playTrack">
    <template slot="delete" slot-scope="row">
      <b-button v-if="!disAllowDelete" @click.stop="deleteTrack(row.index)" variant="danger">X</b-button>
    </template>
    <template slot="remove" slot-scope="row">
      <b-button @click.stop="removeTrack(row.index)" variant="info">{{ removeSymbol }}</b-button>
    </template>
  </b-table>
</template>

<script>
  import EventBus from '@/event-bus.js'
  
  export default {
    name: 'track-list',
    props: [ 'tracks', 'disAllowDelete', 'removeSymbol' ],
    data () {
      return {
        localTracks: [],
        fields: [ { key: 'delete', label: ' ' }, { key: 'remove', label: ' ' }, 'song', 'artist' ],
        index: -1,
        selectedTrack: {}
      }
    },
    watch: {
      'tracks': function () { this.localTracks = this.tracks },
      'index': function () {
        this.selectedTrack = this.tracks[this.index]
        this.$emit('input', this.selectedTrack)
        EventBus.$emit('selectTrack', this.selectedTrack)
      },
      'localTracks': function () { this.$emit('tracks', this.localTracks) }
    },
    methods: {
      trackSelected (item, index, event) {
        if (this.index !== -1) this.localTracks[this.index]._rowVariant = ''
        this.index = index
        this.localTracks[index]._rowVariant = 'info'
        this.$forceUpdate()
      },
      deleteTrack (index) {
        this.localTracks.splice(index, 1)
      },
      removeTrack (index) {
        this.$emit('trackRemoved', this.localTracks.splice(index, 1)[0])
      },
      playTrack (item, index, event) {
        EventBus.$emit('playTrack', this.selectedTrack)
      }
    }
  }
</script>
