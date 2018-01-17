<template>
  <b-form-input :max="trackDuration" value="positionMs" :id="`type-range`" type="range"></b-form-input>
</template>

<script>
  import EventBus from '@/event-bus.js'

  export default {
    name: 'track-seeker',
    props: [ 'accessToken', 'durationMs' ],
    data () {
      return {
        positionMs: 0,
        trackDuration: 0
      }
    },
    created () {
      if (this.durationMs) this.trackDuration = this.durationMs

      EventBus.$on('playTrack', (track) => {
        this.trackDuration = track.durationMs
      })
    },
    watch: {
      'positionMs': function () {
        this.$emit(['input', 'seekTrack'], this.positionMs)
        this.$http.put('https://api.spotify.com/v1/me/player/',
          { 'position_ms': this.positionMs },
          {
            headers: {
              'Authorization': 'Bearer ' + this.accessToken,
              'Content-Type': 'application/json'
            }
          })
      }
    }
  }
</script>
