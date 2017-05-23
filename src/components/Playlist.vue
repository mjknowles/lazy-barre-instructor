<template>
  <div class="playlist">
    <h1>Hello, {{ msg }}!</h1>

    <ul id="example-1">
        <li v-for="track in tracks">
        {{ track.song }} - {{ track.artist }}
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'playlist',
  data () {
    return {
      msg: 'Welcome to your playlist',
      tracks: []
    }
  },
  methods: {
    getSongs () {
      var vm = this
      var params = this.getUrlParameters(location)
      var accessToken = params['access_token']
      this.$http.get('https://api.spotify.com/v1/recommendations',
        {
          headers: {
            'Authorization': 'Bearer ' + accessToken
          },
          params: {
            'seed_genres': 'dance',
            'min_tempo': 120,
            'max_tempo': 125
          }
        }).then((response) => {
          var tracks = response.body.tracks
          vm.tracks = tracks.map(function (t) {
            return {
              song: t.name,
              artist: t.artists[0].name
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
    }
  },
  created () {
    this.getSongs()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
