<template>
    <b-button variant="success" v-on:click="saveTracksToPlaylist">Save</b-button>
</template>

<script>
export default {
  name: 'track-saver',
  props: [ 'accessToken', 'userId', 'playlistId', 'tracks' ],
  methods: {
    saveTracksToPlaylist () {
      if (!this.playlistId || this.playlistId === '') {
        console.warn('Please create or select a playlist before saving.')
        return
      }
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

  }
}
</script>

<style scoped>
ul
{
  list-style-type: none;
}
</style>
