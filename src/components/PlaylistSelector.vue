<template>
  <b-input-group>
    <b-form-radio-group id="btnRadios"
      buttons
      buttons-variant="outline-primary"
      size="lg"
      v-model="selected"
      :options="options"
      name="radioBtnOutline" />
    <playlist-picker v-if="selected == 0" :accessToken="accessToken" v-model="playlist"></playlist-picker>
    <playlist-creator v-if="selected == 1" :accessToken="accessToken" :userId="userId" v-model="playlist"></playlist-creator>
  </b-input-group>
</template>

<script>
import PlaylistCreator from '@/components/PlaylistCreator'
import PlaylistPicker from '@/components/PlaylistPicker'

export default {
  name: 'playlist-selector',
  components: { PlaylistCreator, PlaylistPicker },
  props: [ 'accessToken', 'userId' ],
  data () {
    return {
      playlist: {},
      selected: 0,
      options: [
        { text: 'Existing', value: '0' },
        { text: 'New', value: '1' }
      ]

    }
  },
  watch: {
    'playlist': function () { this.$emit('input', this.playlist) }
  }
}
</script>
