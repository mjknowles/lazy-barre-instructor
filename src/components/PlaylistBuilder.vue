<template>
  <div class="playlist-builder">
    <h1>Hello, {{ msg }}!</h1>
    <playlist-selector :accessToken="accessToken" :userId="userId" v-model="playlist"></playlist-selector>
    <genre-selector :accessToken="accessToken" v-model="selectedGenres"></genre-selector>
    <bpm-selector :min="tempo.min" :max="tempo.max" v-model="tempo"></bpm-selector>
    <h2>Enter track ids (comma separated):</h2> <input v-model="selectedTracks" />  
    <b-button variant="info" v-on:click="getSongs">Get (more) songs</b-button>
    <b-button variant="success" v-on:click="saveTracksToPlaylist">Save</b-button>
    <track-list v-bind:tracks="tracks"></track-list>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import GenreSelector from '@/components/GenreSelector'
import PlaylistSelector from '@/components/PlaylistSelector'
import BpmSelector from '@/components/BpmSelector'
import TrackList from '@/components/TrackList'

export default {
  name: 'playlist-builder',
  components: { Multiselect, GenreSelector, PlaylistSelector, BpmSelector, TrackList },
  data () {
    return {
      msg: 'Welcome to your playlist',
      accessToken: '',
      tracks: [],
      userId: '',
      playlist: {},
      selectedGenres: [ 'work-out', 'dance', 'pop' ],
      selectedTracks: '1TV1Hc5kwk44GPeZEZzydc,77vWEdRG281Z5QJD6I0x7b',
      minPopularity: 0,
      maxPopularity: 100,
      minHappiness: 0,
      maxHappiness: 1,
      tempo: { min: 120, max: 125 }
    }
  },

  methods: {
    getSongs () {
      var vm = this
      var myParams = {
        'min_tempo': this.tempo.min,
        'max_tempo': this.tempo.max,
        'limit': 10
      }

      if (this.selectedGenres.length !== 0) myParams['seed_genres'] = this.selectedGenres.join()
      if (this.selectedTracks.length !== 0) myParams['seed_tracks'] = this.selectedTracks

      this.$http.get('https://api.spotify.com/v1/recommendations',
        {
          headers: {
            'Authorization': 'Bearer ' + this.accessToken
          },
          params: myParams
        }).then((response) => {
          var tracks = response.body.tracks
          vm.tracks = tracks.map(function (t) {
            return {
              song: t.name,
              artist: t.artists[0].name,
              uri: t.uri,
              player: '<iframe src="https://open.spotify.com/embed?uri=' + t.uri + '"' +
                'width="250" height="80" frameborder="0" allowtransparency="true"></iframe>"'
            }
          })
        })
    },

    getUrlParameters (location) {
      if (typeof location === 'undefined') {
        location = window.location
      }
      var hashParams = new function Params () {}()
      if (location.hash.length === 0) {
        return hashParams
      };
      var hashArray = location.hash.substring(1).split('&')
      for (var i in hashArray) {
        var keyValPair = hashArray[i].split('=')
        hashParams[keyValPair[0]] = keyValPair[1]
      }
      return hashParams
    },

    getUserId () {
      var vm = this
      this.$http.get('https://api.spotify.com/v1/me',
        {
          headers: {
            'Authorization': 'Bearer ' + this.accessToken
          }
        }).then((response) => {
          vm.userId = response.body.id
        })
    },

    saveTracksToPlaylist () {
      this.$http.post('https://api.spotify.com/v1/users/' + this.userId + '/playlists/' + this.playlist.id + '/tracks',
      { uris: this.tracks.map(function (t) { return t.uri }) },
        {
          headers: {
            'Authorization': 'Bearer ' + this.accessToken,
            'content-type': 'application/json'
          }
        }).then((response) => {
          console.log('Tracks saved')
        })
    }
  },
  created () {
    var params = this.getUrlParameters(location)
    this.accessToken = params['access_token']
    this.getUserId()

    /*eslint-disable */
    var script1 = document.createElement('script')
    script1.type = 'text/javascript'
    script1.src = 'https://sdk.scdn.co/spotify-player.js'
    document.body.appendChild(script1);
    var script2 = document.createElement('script')
    script2.type = 'text/javascript'
    script2.textContent = `
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new Spotify.Player({
          name: 'Web Playback SDK Quick Start Player',
          getOAuthToken: cb => { cb('` + this.accessToken + `') }
        })

        player.on('initialization_error', e => { console.error(e) })
        player.on('authentication_error', e => { console.error(e) })
        player.on('account_error', e => { console.error(e) })
        player.on('playback_error', e => { console.error(e) })

        player.on('player_state_changed', state => { console.log(state) })

        player.on('ready', data => {
          let { device_id } = data
          console.log('Ready with Device ID', device_id)
        })

        player.connect()
      }`
      document.body.appendChild(script2);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>

