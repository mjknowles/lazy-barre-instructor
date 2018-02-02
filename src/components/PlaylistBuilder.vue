<template>
  <b-container class="playlist-builder">
    <h1>Hello, {{ msg }}!</h1>
    <b-row>
      First, select a playlist to create or add to:
    </b-row>
     <playlist-selector :accessToken="accessToken" :userId="userId" v-model="playlistToBuild"></playlist-selector>
    <br/>
    <genre-selector :accessToken="accessToken" v-model="recParams.selectedGenres"></genre-selector>
    <track-seed-selector v-model="recParams.selectedTracks"> </track-seed-selector>
    <br/>
    <b-row>(Optional) Select a playlist you would like to mimic:</b-row>
    <playlist-picker :accessToken="accessToken" v-model="playlistToAnalyze"></playlist-picker>
    <b-row><b>Select playlist attributes:</b></b-row>
    <b-row class="my-1">
      <b-col sm="6"><b>Minimums</b></b-col>
      <b-col sm="6"><b>Maximums</b></b-col>
    </b-row>
    <template v-for="attrib in recParams.tuneableAttribs">
      <tuneable-attrib-setter :attribLbl="attrib.lbl" v-model="attrib.values" :key="`${attrib.key}_setter`"></tuneable-attrib-setter>
    </template>
    <br/>
    <b-row>
      <b-col><track-player :accessToken="accessToken"></track-player></b-col>
      <b-col><track-seeker :accessToken="accessToken"></track-seeker></b-col>
      <b-col><track-getter :params="recParams" :accessToken="accessToken" v-model="tracksToConsider"></track-getter> </b-col>
      <b-col><track-saver :tracks="tracksToSave" :accessToken="accessToken" :userId="userId" :playlistId="playlistToBuild.id"></track-saver></b-col>
    </b-row>
    <b-row>
      <b-col><track-list @trackRemoved="addToTracksToSave" :tracks="tracksToConsider" :removeSymbol="'>'"></track-list></b-col>
      <b-col><track-list @trackRemoved="addToTracksToConsider" :tracks="tracksToSave" :removeSymbol="'<'"></track-list></b-col>
    </b-row>
  </b-container>
</template>

<script>
import GenreSelector from '@/components/GenreSelector'
import PlaylistSelector from '@/components/PlaylistSelector'
import TuneableAttribSetter from '@/components/TuneableAttribSetter'
import TrackList from '@/components/TrackList'
import TrackGetter from '@/components/TrackGetter'
import TrackSaver from '@/components/TrackSaver'
import TrackPlayer from '@/components/TrackPlayer'
import TrackSeeker from '@/components/TrackSeeker'
import TrackSeedSelector from '@/components/TrackSeedSelector'
import PlaylistPicker from '@/components/PlaylistPicker'
import PlaylistAnalyzer from '@/services/playlist-analyzer'

export default {
  name: 'playlist-builder',
  components: {
    GenreSelector,
    PlaylistSelector,
    TuneableAttribSetter,
    TrackList,
    TrackGetter,
    TrackSaver,
    TrackPlayer,
    TrackSeeker,
    TrackSeedSelector,
    PlaylistPicker
  },
  data () {
    return {
      msg: 'Welcome to your playlist builder',
      accessToken: '',
      tracksToConsider: [],
      tracksToSave: [],
      userId: '',
      playlistToBuild: {},
      playlistToAnalyze: {},
      recParams: {
        'selectedGenres': [ 'work-out', 'dance', 'pop' ],
        'selectedTracks': '',
        tuneableAttribs: [
          { key: 'tempo', lbl: 'BPM', values: { min: 120, max: 125 } },
          { key: 'acousticness', lbl: 'Acousticness', values: { min: 0.0, max: 1.0 } },
          { key: 'danceability', lbl: 'Danceability', values: { min: 0.0, max: 1.0 } },
          { key: 'energy', lbl: 'Energy', values: { min: 0.0, max: 1.0 } },
          { key: 'instrumentalness', lbl: 'Instrumentalness', values: { min: 0.0, max: 1.0 } },
          { key: 'liveness', lbl: 'Liveness', values: { min: 0.0, max: 1.0 } },
          { key: 'loudness', lbl: 'Loudness', values: { min: -60, max: 0 } },
          { key: 'popularity', lbl: 'Popularity', values: { min: 0, max: 100 } },
          { key: 'speechiness', lbl: 'Speechiness', values: { min: 0, max: 1 } },
          { key: 'valence', lbl: 'Valence', values: { min: 0, max: 1 } }
        ]
      }
    }
  },
  watch: {
    'playlistToAnalyze': function () {
      PlaylistAnalyzer.getMinMaxFeatures(this.playlistToAnalyze.id, this.userId,
      this.accessToken).then(features =>
        features.forEach(feature => {
          var attrib = this.recParams.tuneableAttribs.find(attrib => Object.keys(feature).includes(attrib.key))
          attrib.values = feature[attrib.key]
        })
      )
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
    },

    addToTracksToSave (track) {
      this.tracksToSave.push(track)
    },

    addToTracksToConsider (track) {
      this.tracksToConsider.push(track)
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
      window.spotifyPlayerState = {}
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new Spotify.Player({
          name: 'Lazy Barre Instructor',
          getOAuthToken: cb => { cb('` + this.accessToken + `') }
        })

        player.on('initialization_error', e => { console.error(e) })
        player.on('authentication_error', e => { console.error(e) })
        player.on('account_error', e => { console.error(e) })
        player.on('playback_error', e => { console.error(e) })

        player.on('player_state_changed', state => { 
          window.spotifyPlayerState = state
          console.log(window.spotifyPlayerState) 
        })

        player.on('ready', data => {
          let { device_id } = data
          window.spotifyDeviceId = device_id
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

