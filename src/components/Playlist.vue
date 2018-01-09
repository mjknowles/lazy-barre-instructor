<template>
  <div class="playlist">
    <h1>Hello, {{ msg }}!</h1>
    <h2>Name your playlist:</h2> <input v-model="playlistName" placeholder="enter playlist name" />
<!--Minimum popularity: <input v-model="min_popularity" />
    Maximum popularity: <input v-model="max_popularity" />
    Minimum happiness: <input v-model="min_happiness" />
    Maximum happiness: <input v-model="max_happiness" />-->
    <genre-selector :accessToken="accessToken" :initialGenres="initialGenres"></genre-selector>
    <h2>Enter track ids (comma separated):</h2> <input v-model="selectedTracks" />  
    <button v-on:click="setPlaylist">Add (more) songs</button>
    <ul id="example-1">
        <li v-for="track in tracks" :key="track.id">
        {{ track.song }} - {{ track.artist }}
        </li>
    </ul>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import GenreSelector from '@/components/GenreSelector'
export default {
  name: 'playlist',
  components: { Multiselect, GenreSelector },
  data () {
    return {
      msg: 'Welcome to your playlist',
      tracks: [],
      playlistName: '',
      initialGenres: [ 'work-out', 'dance', 'pop' ],
      selectedTracks: '1TV1Hc5kwk44GPeZEZzydc,77vWEdRG281Z5QJD6I0x7b',
      minPopularity: 0,
      maxPopularity: 100,
      minHappiness: 0,
      maxHappiness: 1
    }
  },
  accessToken: '',
  userId: '',
  playlistId: '',
  allPlaylists: [],
  methods: {
    getSongs () {
      var vm = this
      this.$http.get('https://api.spotify.com/v1/recommendations',
        {
          headers: {
            'Authorization': 'Bearer ' + this.accessToken
          },
          params: {
            'seed_tracks': this.selectedTracks,
            'seed_genres': this.GenreSelector.selectedGenres.join(),
            'min_tempo': 120,
            'max_tempo': 125,
            'limit': 100
          }
        }).then((response) => {
          var tracks = response.body.tracks
          vm.tracks = tracks.map(function (t) {
            return {
              song: t.name,
              artist: t.artists[0].name,
              uri: t.uri
            }
          })
          vm.saveTracksToPlaylist(this.playlistId)
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

    createPlaylist () {
      this.$http.post('https://api.spotify.com/v1/users/' + this.userId + '/playlists',
        { name: this.playlistName },
        {
          headers: {
            'Authorization': 'Bearer ' + this.accessToken,
            'content-type': 'application/json'
          }
        }).then((response) => {
          this.playlistId = response.body.id
        })
    },

    setPlaylist () {
      var vm = this
      this.$http.get('https://api.spotify.com/v1/me/playlists',
        {
          headers: {
            'Authorization': 'Bearer ' + this.accessToken
          },
          params: {
            'limit': 50
          }
        }).then((response) => {
          var playlists = response.body.items
          vm.allPlaylists = playlists.map(function (p) {
            return {
              id: p.id,
              name: p.name
            }
          })
          var existing = this.allPlaylists.filter(function (p) { return p.name === vm.playlistName })
          if (existing && existing.length !== 0) {
            this.playlistId = existing[0].id
          } else {
            this.createPlaylist()
          }
          this.getSongs()
        })
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

    saveTracksToPlaylist (playlistId) {
      this.$http.post('https://api.spotify.com/v1/users/' + this.userId + '/playlists/' + this.playlistId + '/tracks',
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul
{
  list-style-type: none;
}
</style>

