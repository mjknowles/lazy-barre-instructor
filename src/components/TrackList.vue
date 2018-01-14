<template>
  <b-table show-empty hover :items="tracks" :fields="fields"></b-table>
</template>

<script>
  export default {
    name: 'track-list',
    props: [ 'tracks' ],
    data () {
      return {
        fields: [ 'song', 'artist' ]
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
