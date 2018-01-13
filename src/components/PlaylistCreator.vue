<template>
  <div>
    <input v-model="playlistName" placeholder="enter playlist name" />
    <button v-on:click="createPlaylist">Create</button>
  </div>
</template>

<script>
export default {
  name: 'playlist-creator',
  props: [ 'accessToken', 'userId' ],
  data () {
    return {
      playlistId: '',
      playlistName: ''
    }
  },
  watch: {
    'playlistId': function () { this.$emit('input', this.playlistId) }
  },
  methods: {
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
    }
  }
}
</script>
