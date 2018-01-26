<template>
    <b-button variant="info" v-on:click="getSongs">Get (more) songs</b-button>
</template>

<script>
export default {
  name: 'track-getter',
  props: [ 'params', 'accessToken' ],
  data () {
    return {
      tracks: []
    }
  },
  watch: {
    'tracks': function () { this.$emit('input', this.tracks) }
  },
  methods: {
    getSongs () {
      var vm = this
      var myParams = {
        'min_tempo': this.params.tempo.min,
        'max_tempo': this.params.tempo.max,
        'limit': 10
      }

      if (this.params.selectedGenres && this.params.selectedGenres.length !== 0) myParams['seed_genres'] = this.params.selectedGenres.join()
      if (this.params.selectedTracks && this.params.selectedTracks.length !== 0) myParams['seed_tracks'] = this.params.selectedTracks

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
              id: t.id,
              song: t.name,
              artist: t.artists[0].name,
              uri: t.uri,
              durationMs: t.duration_ms,
              widgetPlayer: '<iframe src="https://open.spotify.com/embed?uri=' + t.uri + '"' +
                'width="250" height="80" frameborder="0" allowtransparency="true"></iframe>"'
            }
          })
        })
    }
  }
}
</script>

<style scoped>
ul
{
  list-style-type: none;
}
</style>
