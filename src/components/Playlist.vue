<template>
  <div class="playlist">
    <h1>Hello, {{ msg }}!</h1>
    <h2>Name your playlist:</h2> <input v-model="playlistName" placeholder="enter playlist name"><button v-on:click="setPlaylist">Set Playlist</button>
    <multiselect v-model="selected" :options="genres"></multiselect>
    <button v-on:click="getSongs">Add (more) songs</button>
    <ul id="example-1">
        <li v-for="track in tracks">
        {{ track.song }} - {{ track.artist }}
        </li>
    </ul>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  name: 'playlist',
  components: { Multiselect },
  data () {
    return {
      msg: 'Welcome to your playlist',
      tracks: [],
      playlistName: '',
      genres: []
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
            'seed_genres': 'work-out',
            'min_tempo': 120,
            'max_tempo': 125
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
          this.getSongs()
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
    },

    getGenres () {
      var vm = this
      this.$http.get('https://api.spotify.com/v1/recommendations/available-genre-seeds',
        {
          headers: {
            'Authorization': 'Bearer ' + this.accessToken
          }
        }).then((response) => {
          vm.genres = response.body.genres
        })
    }
  },
  created () {
    var params = this.getUrlParameters(location)
    this.accessToken = params['access_token']
    this.getUserId()
    this.getGenres()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul
{
  list-style-type: none;
}
</style>

