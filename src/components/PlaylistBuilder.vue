<template>
  <b-container class="playlist-builder">
    <h1>Hello, {{ msg }}!</h1>
    <playlist-selector :accessToken="accessToken" :userId="userId" v-model="playlist"></playlist-selector>
    <genre-selector :accessToken="accessToken" v-model="recParams.selectedGenres"></genre-selector>
    <bpm-selector :min="recParams.tempo.min" :max="recParams.tempo.max" v-model="recParams.tempo"></bpm-selector>
    <h2>Enter track ids (comma separated):</h2> <input v-model="recParams.selectedTracks" />
    <track-getter :params="recParams" :accessToken="accessToken" v-model="tracks"></track-getter> 
    <track-saver :tracks="tracks" :accessToken="accessToken" :userId="userId" :playlistId="playlist.id"></track-saver> 
    <track-list :tracks="tracks"></track-list>
  </b-container>
</template>

<script>
import Multiselect from 'vue-multiselect'
import GenreSelector from '@/components/GenreSelector'
import PlaylistSelector from '@/components/PlaylistSelector'
import BpmSelector from '@/components/BpmSelector'
import TrackList from '@/components/TrackList'
import TrackGetter from '@/components/TrackGetter'
import TrackSaver from '@/components/TrackSaver'
export default {
  name: 'playlist-builder',
  components: { Multiselect, GenreSelector, PlaylistSelector, BpmSelector, TrackList, TrackGetter, TrackSaver },
  data () {
    return {
      msg: 'Welcome to your playlist',
      accessToken: '',
      tracks: [],
      userId: '',
      playlist: {},
      minPopularity: 0,
      maxPopularity: 100,
      minHappiness: 0,
      maxHappiness: 1,
      recParams: {
        'selectedGenres': [ 'work-out', 'dance', 'pop' ],
        'selectedTracks': '1TV1Hc5kwk44GPeZEZzydc,77vWEdRG281Z5QJD6I0x7b',
        'tempo': { min: 120, max: 125 }
      }
    }
  },

  methods: {
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
          name: 'Lazy Barre Instructor',
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

