<template>
  <b-input-group>
    <b-input-group-addon>Name</b-input-group-addon>
    <b-form-input v-model="playlistName" placeholder="enter playlist name" />
    <b-input-group-button slot="right">    
      <b-btn v-on:click="createPlaylist" variant="info">Create</b-btn>
    </b-input-group-button>
  </b-input-group>
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
    'playlistId': function () { this.$emit('input', { id: this.playlistId, name: this.playlistName }) }
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
