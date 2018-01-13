<template>
  <b-container>
      <multiselect 
        v-model="selectedGenres" 
        :options="genres"
        :multiple="true">
      </multiselect>
  </b-container>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  name: 'genre-selector',
  components: { Multiselect },
  props: [ 'accessToken', 'value' ],
  data () {
    return {
      genres: [],
      selectedGenres: []
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
    this.selectedGenres = this.value
    this.getGenres()
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
