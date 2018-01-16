<template>
  <b-row>
    <b-button @click="playTrack" variant="success">{{playing ? 'Pause' : 'Play'}}</b-button>
  </b-row>
</template>

<script>
  import EventBus from '@/event-bus.js'
  
  export default {
    name: 'track-player',
    props: [ 'accessToken', 'track' ],
    data () {
      return {
        playing: false
      }
    },
    watch: {
      'tracks': function () { this.localTracks = this.tracks }
    },
    created () {
      EventBus.$on('playTrack', () => { this.playing = false; this.playTrack })
    },
    initializedAsPlaybackDevice: false,
    methods: {
      playTrack () {
        if (this.track.uri === '') return
        if (!this.initializedAsPlaybackDevice) {
          this.$http.put('https://api.spotify.com/v1/me/player/',
            { 'device_ids': [ window.spotifyDeviceId ] },
            {
              headers: {
                'Authorization': 'Bearer ' + this.accessToken,
                'Content-Type': 'application/json'
              }
            }).then((response) => {
              this.initializedAsPlaybackDevice = true
              this.playOrPause()
            })
        } else {
          this.playOrPause()
        }
      },

      playOrPause () {
        this.$http.put('https://api.spotify.com/v1/me/player/' + (this.playing ? 'pause' : 'play'),
          { 'uris': [ this.track.uri ] },
          {
            headers: {
              'Authorization': 'Bearer ' + this.accessToken,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }).then((response) => {
            this.playing = !this.playing
          })
      }
    }
  }
</script>
