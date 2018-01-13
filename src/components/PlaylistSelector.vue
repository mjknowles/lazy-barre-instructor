<template>
  <select v-model="selectedId">
    <option v-for="playlist in playlists" v-bind:value="playlist.id" :key="playlist.id">
      {{ playlist.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'playlist-selector',
  props: [ 'accessToken' ],
  data () {
    return {
      selectedId: '',
      playlists: []
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
                id: p.id,
                name: p.name
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
      if (this.playlists.length > 0) {
        this.selectedId = this.playlists[0].id
      }
    })
  }

}
</script>
