<template>
  <b-container>
    <ul>
        <li v-for="track in tracks" :key="track.id">
          <span v-html="track.widgetPlayer"></span>
        </li>
    </ul>
  </b-container>
</template>

<script>
export default {
  name: 'track-list',
  props: [ 'tracks' ],
  watch: {
    'tracks': function () { this.$emit('input', this.tracks) }
  }
}
</script>

<style scoped>
ul
{
  list-style-type: none;
}
</style>
