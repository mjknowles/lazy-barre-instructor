<template>
    <multiselect 
      v-model="selectedGenres" 
      :options="genres"
      :multiple="true">
    </multiselect>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  name: 'genre-selector',
  components: { Multiselect },
  props: [ 'accessToken', 'initialGenres' ],
  data () {
    return {
      genres: [],
      selectedGenres: this.initialGenres
    }
  },
  watch: {
    'selectedGenres': function () { this.$emit('input', this.selectedGenres) }
  },
  methods: {
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
    this.getGenres()
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
