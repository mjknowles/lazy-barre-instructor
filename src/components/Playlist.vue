<template>
  <div class="playlist">
    <h1>Hello, {{ msg }}!</h1>
  </div>
</template>

<script>
export default {
  name: 'playlist',
  data () {
    return {
      msg: 'Welcome to your playlist'
    }
  },
  methods: {
    getSongs () {
      console.log(this.$route.query.hashFragment)
      this.$http.get('https://api.spotify.com/v1/recommendations',
        {
          headers: {
            'Authorization': 'Bearer ' + this.$route.query.hashFragment
          },
          data: {
            'seed_genres': ['dance'],
            'min_tempo': 120,
            'max_tempo': 125
          }
        }).then((response) => {
          console.log(response.body)
        })
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
