import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Playlist from '@/components/PlaylistBuilder'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/playlist',
      name: 'PlaylistBuilder',
      component: Playlist
    }
  ]
})

