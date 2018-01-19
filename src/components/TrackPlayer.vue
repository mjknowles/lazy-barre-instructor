<template>
  <b-row>
    <b-button @click="playBtnClick" variant="success">{{playing ? 'Pause' : 'Play'}}</b-button>
  </b-row>
</template>

<script>
  import EventBus from '@/event-bus.js'
  
  export default {
    name: 'track-player',
    props: [ 'accessToken' ],
    data () {
      return {
        track: { },
        playing: false,
        trackInProgress: false
      }
    },
    watch: {
      'tracks': function () { this.localTracks = this.tracks }
    },
    created () {
      EventBus.$on('selectTrack', (track) => {
        if (!this.initializedAsPlaybackDevice) this.track = track
      })
      EventBus.$on('playTrack', (track) => {
        this.offset = 0
        this.playing = false
        this.trackInProgress = false
        this.track = track
        this.playTrack(true)
      })
    },
    initializedAsPlaybackDevice: false,
    methods: {
      playBtnClick () { this.playTrack() },
      playTrack (playOverride) {
        if (Object.keys(this.track).length === 0 || this.track.uri === '') return
        var play = playOverride || window.spotifyPlayerState.paused
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
              this.playOrPause(play)
            })
        } else {
          this.playOrPause(play)
        }
      },

      playOrPause (play) {
        this.$http.put('https://api.spotify.com/v1/me/player/' + (play ? 'play' : 'pause'),
          !play || this.trackInProgress ? {} : { 'uris': [ this.track.uri ] },
          {
            headers: {
              'Authorization': 'Bearer ' + this.accessToken,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }).then((response, err) => {
            if (!this.trackInProgress) this.trackInProgress = true
            // player doesn't update in enough time:
            // this.playing = window.spotifyPlayerState && !window.spotifyPlayerState.paused
            this.playing = !this.playing
          })
      }
    }
  }
</script>
