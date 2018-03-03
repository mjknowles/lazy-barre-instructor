<template>
  <b-form-input @change="positionChanged" :max="trackDuration" v-model="positionMs" :id="`type-range`" type="range"></b-form-input>
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
    methods: {
      positionChanged () {
        this.$emit('input', this.positionMs)
        this.$emit('seekTrack', this.positionMs)
        this.$http.put('https://api.spotify.com/v1/me/player/seek',
          { },
          {
            headers: {
              'Authorization': 'Bearer ' + this.accessToken
            },
            params: { 'position_ms': this.positionMs }
          })
      }
    }
  }
</script>
