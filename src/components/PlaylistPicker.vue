<template>
  <b-form-select v-model="playlistId" :options="playlists" class="mb-3"></b-form-select>
</template>

<script>
export default {
  name: 'playlist-picker',
  props: [ 'accessToken', 'initializeSelected' ],
  data () {
    return {
      playlistId: '',
      playlists: []
    }
  },
  watch: {
    'playlistId': function () {
      this.$emit('input', {
        id: this.playlistId,
        name: function () {
          var pl = this.playlists.find((p) => p.id === this.playlistId)
          return pl ? pl.text : ''
        }
      })
    }
  },
  methods: {
    getPlaylists () {
      return new Promise((resolve, reject) => {
        this.$http.get('https://api.spotify.com/v1/me/playlists',
          {
            headers: {
              'Authorization': 'Bearer ' + this.accessToken
            },
            params: {
              'limit': 50
            }
          }).then((response) => {
            resolve(response.body.items.map(function (p) {
              return {
                value: p.id,
                text: p.name
              }
            }))
          })
      })
    }
  },
  created () {
    var vm = this
    this.getPlaylists().then((playlists) => {
      vm.playlists = playlists
      if (vm.playlists.length > 0 && this.initializeSelected) {
        vm.playlistId = vm.playlists[0].value
      }
    })
  }

}
</script>
