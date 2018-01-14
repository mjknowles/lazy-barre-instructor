<template>
  <b-row>
    <b-button @click="btnClicked" variant="success">{{playing ? 'Pause' : 'Play'}}</b-button>
  </b-row>
</template>

<script>
  export default {
    name: 'track-player',
    props: [ 'accessToken', 'track', 'userId' ],
    data () {
      return {
        playing: false
      }
    },
    watch: {
      'tracks': function () { this.localTracks = this.tracks }
    },
    methods: {
      btnClicked () {
        console.log(this.track.uri)
        if (this.track.uri === '') return
        this.playing = !this.playing
        this.$http.put('https://api.spotify.com/v1/me/player/play',
          { 'uris': [ this.track.uri ] },
          {
            headers: {
              'Authorization': 'Bearer ' + this.accessToken,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }).then((response) => {
            console.log('request play')
          })
      }
    }
  }
</script>
