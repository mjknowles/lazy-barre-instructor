<template>
  <b-input-group>
    <b-input-group-addon>Name</b-input-group-addon>
    <b-form-input v-model="playlistName" :disabled="nameStateDisabled" placeholder="enter playlist name" />
    <b-input-group-button slot="right">    
      <b-btn v-on:click="btnClick" v-bind:variant="variant" v-text="createLbl"></b-btn>
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
      playlistName: '',
      createLbl: 'Create',
      nameStateDisabled: false,
      variant: 'info'
    }
  },
  watch: {
    'playlistId': function () { this.$emit('input', { id: this.playlistId, name: this.playlistName }) }
  },
  methods: {
    btnClick () {
      if (this.nameStateDisabled) {
        this.createLbl = 'Create'
        this.nameStateDisabled = false
        this.variant = 'info'

        // order important until refactored
        this.playlistName = ''
        this.playlistId = ''
      } else {
        this.createPlaylist()
      }
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
          this.createLbl = 'Back'
          this.nameStateDisabled = true
          this.variant = 'danger'
        })
    }
  }
}
</script>
