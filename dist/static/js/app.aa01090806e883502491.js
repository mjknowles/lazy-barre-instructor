webpackJsonp([1],{100:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(293),n=a.n(s),r=a(298),i=a.n(r),o=a(292),c=a.n(o),l=a(300),u=a.n(l),p=a(299),d=a.n(p),m=a(302),h=a.n(m),f=a(301),v=a.n(f),k=a(303),y=a.n(k);e.default={name:"playlist-builder",components:{GenreSelector:n.a,PlaylistSelector:i.a,BpmSelector:c.a,TrackList:u.a,TrackGetter:d.a,TrackSaver:h.a,TrackPlayer:v.a,TrackSeeker:y.a},data:function(){return{msg:"Welcome to your playlist",accessToken:"",tracksToConsider:[],tracksToSave:[],userId:"",playlist:{},minPopularity:0,maxPopularity:100,minHappiness:0,maxHappiness:1,recParams:{selectedGenres:["work-out","dance","pop"],selectedTracks:"1TV1Hc5kwk44GPeZEZzydc,77vWEdRG281Z5QJD6I0x7b",tempo:{min:120,max:125}}}},methods:{getUrlParameters:function(t){void 0===t&&(t=window.location);var e=new function(){};if(0===t.hash.length)return e;var a=t.hash.substring(1).split("&");for(var s in a){var n=a[s].split("=");e[n[0]]=n[1]}return e},getUserId:function(){var t=this;this.$http.get("https://api.spotify.com/v1/me",{headers:{Authorization:"Bearer "+this.accessToken}}).then(function(e){t.userId=e.body.id})},addToTracksToSave:function(t){this.tracksToSave.push(t)},addToTracksToConsider:function(t){this.tracksToConsider.push(t)}},created:function(){var t=this.getUrlParameters(location);this.accessToken=t.access_token,this.getUserId();var e=document.createElement("script");e.type="text/javascript",e.src="https://sdk.scdn.co/spotify-player.js",document.body.appendChild(e);var a=document.createElement("script");a.type="text/javascript",a.textContent="\n      window.spotifyPlayerState = {}\n      window.onSpotifyWebPlaybackSDKReady = () => {\n        const player = new Spotify.Player({\n          name: 'Lazy Barre Instructor',\n          getOAuthToken: cb => { cb('"+this.accessToken+"') }\n        })\n\n        player.on('initialization_error', e => { console.error(e) })\n        player.on('authentication_error', e => { console.error(e) })\n        player.on('account_error', e => { console.error(e) })\n        player.on('playback_error', e => { console.error(e) })\n\n        player.on('player_state_changed', state => { \n          window.spotifyPlayerState = state\n          console.log(window.spotifyPlayerState) \n        })\n\n        player.on('ready', data => {\n          let { device_id } = data\n          window.spotifyDeviceId = device_id\n          console.log('Ready with Device ID', device_id)\n        })\n\n        player.connect()\n      }",document.body.appendChild(a)}}},101:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"playlist-creator",props:["accessToken","userId"],data:function(){return{playlistId:"",playlistName:"",createLbl:"Create",nameStateDisabled:!1,variant:"info"}},watch:{playlistId:function(){this.$emit("input",{id:this.playlistId,name:this.playlistName})}},methods:{btnClick:function(){this.nameStateDisabled?(this.createLbl="Create",this.nameStateDisabled=!1,this.variant="info",this.playlistName="",this.playlistId=""):this.createPlaylist()},createPlaylist:function(){var t=this;this.$http.post("https://api.spotify.com/v1/users/"+this.userId+"/playlists",{name:this.playlistName},{headers:{Authorization:"Bearer "+this.accessToken,"content-type":"application/json"}}).then(function(e){t.playlistId=e.body.id,t.createLbl="Back",t.nameStateDisabled=!0,t.variant="danger"})}}}},102:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(110),n=a.n(s);e.default={name:"playlist-picker",props:["accessToken"],data:function(){return{playlistId:"",playlists:[]}},watch:{playlistId:function(){this.$emit("input",{id:this.playlistId,name:function(){var t=this,e=this.playlists.find(function(e){return e.id===t.playlistId});return e?e.text:""}})}},methods:{getPlaylists:function(){var t=this;return new n.a(function(e,a){t.$http.get("https://api.spotify.com/v1/me/playlists",{headers:{Authorization:"Bearer "+t.accessToken},params:{limit:50}}).then(function(t){e(t.body.items.map(function(t){return{value:t.id,text:t.name}}))})})}},created:function(){var t=this;this.getPlaylists().then(function(e){t.playlists=e,t.playlists.length>0&&(t.playlistId=t.playlists[0].value)})}}},103:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(296),n=a.n(s),r=a(297),i=a.n(r);e.default={name:"playlist-selector",components:{PlaylistCreator:n.a,PlaylistPicker:i.a},props:["accessToken","userId"],data:function(){return{playlist:{},selected:0,options:[{text:"New",value:"0"},{text:"Existing",value:"1"}]}},watch:{playlist:function(){this.$emit("input",this.playlist)}}}},104:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"track-getter",props:["params","accessToken"],data:function(){return{tracks:[]}},watch:{tracks:function(){this.$emit("input",this.tracks)}},methods:{getSongs:function(){var t=this,e={min_tempo:this.params.tempo.min,max_tempo:this.params.tempo.max,limit:10};0!==this.params.selectedGenres.length&&(e.seed_genres=this.params.selectedGenres.join()),0!==this.params.selectedTracks.length&&(e.seed_tracks=this.params.selectedTracks),this.$http.get("https://api.spotify.com/v1/recommendations",{headers:{Authorization:"Bearer "+this.accessToken},params:e}).then(function(e){var a=e.body.tracks;t.tracks=a.map(function(t){return{id:t.id,song:t.name,artist:t.artists[0].name,uri:t.uri,durationMs:t.duration_ms,widgetPlayer:'<iframe src="https://open.spotify.com/embed?uri='+t.uri+'"width="250" height="80" frameborder="0" allowtransparency="true"></iframe>"'}})})}}}},105:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(24);e.default={name:"track-list",props:["tracks","allowDelete","removeSymbol"],data:function(){return{localTracks:[],fields:[{key:"remove",label:" "},"song","artist"],index:-1,selectedTrack:{}}},watch:{tracks:function(){this.localTracks=this.tracks},index:function(){this.selectedTrack=this.tracks[this.index],this.$emit("input",this.selectedTrack),s.a.$emit("selectTrack",this.selectedTrack)},localTracks:function(){this.$emit("tracks",this.localTracks)}},methods:{trackSelected:function(t,e,a){-1!==this.index&&(this.localTracks[this.index]._rowVariant=""),this.index=e,this.localTracks[e]._rowVariant="info",this.$forceUpdate()},deleteTrack:function(t){this.localTracks.splice(t,1)},removeTrack:function(t){this.$emit("trackRemoved",this.localTracks.splice(t,1)[0])},playTrack:function(t,e,a){s.a.$emit("playTrack",this.selectedTrack)}}}},106:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(109),n=a.n(s),r=a(24);e.default={name:"track-player",props:["accessToken"],data:function(){return{track:{},playing:!1,trackInProgress:!1}},watch:{tracks:function(){this.localTracks=this.tracks}},created:function(){var t=this;r.a.$on("selectTrack",function(e){t.initializedAsPlaybackDevice||(t.track=e)}),r.a.$on("playTrack",function(e){t.offset=0,t.playing=!1,t.trackInProgress=!1,t.track=e,t.playTrack(!0)})},initializedAsPlaybackDevice:!1,methods:{playBtnClick:function(){this.playTrack()},playTrack:function(t){var e=this;if(0!==n()(this.track).length&&""!==this.track.uri){var a=t||window.spotifyPlayerState.paused;this.initializedAsPlaybackDevice?this.playOrPause(a):this.$http.put("https://api.spotify.com/v1/me/player/",{device_ids:[window.spotifyDeviceId]},{headers:{Authorization:"Bearer "+this.accessToken,"Content-Type":"application/json"}}).then(function(t){e.initializedAsPlaybackDevice=!0,e.playOrPause(a)})}},playOrPause:function(t){var e=this;this.$http.put("https://api.spotify.com/v1/me/player/"+(t?"play":"pause"),!t||this.trackInProgress?{}:{uris:[this.track.uri]},{headers:{Authorization:"Bearer "+this.accessToken,Accept:"application/json","Content-Type":"application/json"}}).then(function(t,a){e.trackInProgress||(e.trackInProgress=!0),e.playing=!e.playing})}}}},107:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"track-saver",props:["accessToken","userId","playlistId","tracks"],methods:{saveTracksToPlaylist:function(){if(!this.playlistId||""===this.playlistId)return void console.warn("Please create or select a playlist before saving.");this.$http.post("https://api.spotify.com/v1/users/"+this.userId+"/playlists/"+this.playlistId+"/tracks",{uris:this.tracks.map(function(t){return t.uri})},{headers:{Authorization:"Bearer "+this.accessToken,"content-type":"application/json"}}).then(function(t){console.log("Tracks saved")})}}}},108:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(24);e.default={name:"track-seeker",props:["accessToken","durationMs"],data:function(){return{positionMs:0,trackDuration:0}},created:function(){var t=this;this.durationMs&&(this.trackDuration=this.durationMs),s.a.$on("playTrack",function(e){t.trackDuration=e.durationMs})},methods:{positionChanged:function(){this.$emit("input",this.positionMs),this.$emit("seekTrack",this.positionMs),this.$http.put("https://api.spotify.com/v1/me/player/seek",{},{headers:{Authorization:"Bearer "+this.accessToken},params:{position_ms:this.positionMs}})}}}},24:function(t,e,a){"use strict";var s=a(23),n=new s.a;e.a=n},270:function(t,e){},271:function(t,e){},272:function(t,e){},273:function(t,e){},274:function(t,e){},275:function(t,e){},276:function(t,e){},277:function(t,e){},278:function(t,e){},279:function(t,e){},280:function(t,e){},285:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk2QkI4RkE3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk2QkI4Rjk3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjU2QTEyNzk3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjU2QTEyN0E3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5WHowqAAAXNElEQVR42uxda4xd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"},287:function(t,e,a){a(275);var s=a(5)(a(91),null,null,null);t.exports=s.exports},288:function(t,e,a){a(279);var s=a(5)(a(92),null,null,null);t.exports=s.exports},289:function(t,e,a){a(271);var s=a(5)(a(93),null,null,null);t.exports=s.exports},290:function(t,e,a){a(274);var s=a(5)(a(94),null,null,null);t.exports=s.exports},291:function(t,e,a){a(277);var s=a(5)(a(95),null,null,null);t.exports=s.exports},292:function(t,e,a){var s=a(5)(a(97),a(307),null,null);t.exports=s.exports},293:function(t,e,a){a(273);var s=a(5)(a(98),a(311),null,null);t.exports=s.exports},294:function(t,e,a){a(276);var s=a(5)(a(99),a(312),"data-v-68c524a4",null);t.exports=s.exports},295:function(t,e,a){a(278);var s=a(5)(a(100),a(314),"data-v-782cc58a",null);t.exports=s.exports},296:function(t,e,a){var s=a(5)(a(101),a(305),null,null);t.exports=s.exports},297:function(t,e,a){var s=a(5)(a(102),a(306),null,null);t.exports=s.exports},298:function(t,e,a){var s=a(5)(a(103),a(313),null,null);t.exports=s.exports},299:function(t,e,a){a(280);var s=a(5)(a(104),a(316),"data-v-fc35eef0",null);t.exports=s.exports},300:function(t,e,a){var s=a(5)(a(105),a(309),null,null);t.exports=s.exports},301:function(t,e,a){var s=a(5)(a(106),a(315),null,null);t.exports=s.exports},302:function(t,e,a){a(272);var s=a(5)(a(107),a(310),"data-v-459583a8",null);t.exports=s.exports},303:function(t,e,a){var s=a(5)(a(108),a(304),null,null);t.exports=s.exports},304:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("b-form-input",{attrs:{max:t.trackDuration,id:"type-range",type:"range"},on:{change:t.positionChanged},model:{value:t.positionMs,callback:function(e){t.positionMs=e},expression:"positionMs"}})},staticRenderFns:[]}},305:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-input-group",[a("b-input-group-addon",[t._v("Name")]),t._v(" "),a("b-form-input",{attrs:{disabled:t.nameStateDisabled,placeholder:"enter playlist name"},model:{value:t.playlistName,callback:function(e){t.playlistName=e},expression:"playlistName"}}),t._v(" "),a("b-input-group-button",{attrs:{slot:"right"},slot:"right"},[a("b-btn",{attrs:{variant:t.variant},domProps:{textContent:t._s(t.createLbl)},on:{click:t.btnClick}})],1)],1)},staticRenderFns:[]}},306:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("b-form-select",{staticClass:"mb-3",attrs:{options:t.playlists},model:{value:t.playlistId,callback:function(e){t.playlistId=e},expression:"playlistId"}})},staticRenderFns:[]}},307:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-container",[a("b-row",{staticClass:"my-1"},[a("b-col",{attrs:{sm:"2"}},[a("label",{attrs:{for:"input-default"}},[t._v("Min BPM:")])]),t._v(" "),a("b-col",{attrs:{sm:"10"}},[a("b-form-input",{attrs:{id:"input-default",type:"text",placeholder:"Min BPM"},model:{value:t.minBpm,callback:function(e){t.minBpm=e},expression:"minBpm"}})],1)],1),t._v(" "),a("b-row",{staticClass:"my-1"},[a("b-col",{attrs:{sm:"2"}},[a("label",{attrs:{for:"input-default"}},[t._v("Max BPM:")])]),t._v(" "),a("b-col",{attrs:{sm:"10"}},[a("b-form-input",{attrs:{id:"input-default",type:"text",placeholder:"Max BPM"},model:{value:t.maxBpm,callback:function(e){t.maxBpm=e},expression:"maxBpm"}})],1)],1)],1)},staticRenderFns:[]}},308:function(t,e,a){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("img",{attrs:{src:a(285)}}),t._v(" "),s("router-view")],1)},staticRenderFns:[]}},309:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-table",{attrs:{"show-empty":"",hover:"",items:t.localTracks,fields:t.fields},on:{"row-clicked":t.trackSelected,"row-dblclicked":t.playTrack},scopedSlots:t._u([{key:"remove",fn:function(e){return[a("b-button",{attrs:{variant:"info"},on:{click:function(a){a.stopPropagation(),t.removeTrack(e.index)}}},[t._v(t._s(t.removeSymbol))]),t._v(" "),t.allowDelete?a("b-button",{attrs:{variant:"danger"},on:{click:function(a){a.stopPropagation(),t.deleteTrack(e.index)}}},[t._v("X")]):t._e()]}}])})},staticRenderFns:[]}},310:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("b-button",{attrs:{variant:"success"},on:{click:t.saveTracksToPlaylist}},[t._v("Save")])},staticRenderFns:[]}},311:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-container",[a("multiselect",{attrs:{options:t.genres,multiple:!0},model:{value:t.selectedGenres,callback:function(e){t.selectedGenres=e},expression:"selectedGenres"}})],1)},staticRenderFns:[]}},312:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"hello"},[a("h1",[t._v(t._s(t.msg))]),t._v(" "),a("h2",[t._v("Essential Links")]),t._v(" "),t._m(0),t._v(" "),a("h2",[t._v("Ecosystem")]),t._v(" "),t._m(1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",[a("li",[a("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[t._v("Core Docs")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[t._v("Forum")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://gitter.im/vuejs/vue",target:"_blank"}},[t._v("Gitter Chat")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[t._v("Twitter")])]),t._v(" "),a("br"),t._v(" "),a("li",[a("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[t._v("Docs for This Template")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",[a("li",[a("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[t._v("vue-router")])]),t._v(" "),a("li",[a("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[t._v("vuex")])]),t._v(" "),a("li",[a("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[t._v("vue-loader")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[t._v("awesome-vue")])])])}]}},313:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-container",[a("b-input-group",[a("b-form-radio-group",{attrs:{id:"btnRadios",buttons:"","buttons-variant":"outline-primary",size:"sm",options:t.options,name:"radioBtnOutline"},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}})],1),t._v(" "),0==t.selected?a("playlist-creator",{attrs:{accessToken:t.accessToken,userId:t.userId},model:{value:t.playlist,callback:function(e){t.playlist=e},expression:"playlist"}}):t._e(),t._v(" "),1==t.selected?a("playlist-picker",{attrs:{accessToken:t.accessToken},model:{value:t.playlist,callback:function(e){t.playlist=e},expression:"playlist"}}):t._e()],1)},staticRenderFns:[]}},314:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-container",{staticClass:"playlist-builder"},[a("h1",[t._v("Hello, "+t._s(t.msg)+"!")]),t._v(" "),a("playlist-selector",{attrs:{accessToken:t.accessToken,userId:t.userId},model:{value:t.playlist,callback:function(e){t.playlist=e},expression:"playlist"}}),t._v(" "),a("genre-selector",{attrs:{accessToken:t.accessToken},model:{value:t.recParams.selectedGenres,callback:function(e){t.$set(t.recParams,"selectedGenres",e)},expression:"recParams.selectedGenres"}}),t._v(" "),a("bpm-selector",{attrs:{min:t.recParams.tempo.min,max:t.recParams.tempo.max},model:{value:t.recParams.tempo,callback:function(e){t.$set(t.recParams,"tempo",e)},expression:"recParams.tempo"}}),t._v(" "),a("h2",[t._v("Enter track ids (comma separated):")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.recParams.selectedTracks,expression:"recParams.selectedTracks"}],domProps:{value:t.recParams.selectedTracks},on:{input:function(e){e.target.composing||t.$set(t.recParams,"selectedTracks",e.target.value)}}}),t._v(" "),a("track-getter",{attrs:{params:t.recParams,accessToken:t.accessToken},model:{value:t.tracksToConsider,callback:function(e){t.tracksToConsider=e},expression:"tracksToConsider"}}),t._v(" "),a("track-saver",{attrs:{tracks:t.tracksToSave,accessToken:t.accessToken,userId:t.userId,playlistId:t.playlist.id}}),t._v(" "),a("b-row",[a("b-col",[a("track-player",{attrs:{accessToken:t.accessToken}})],1),t._v(" "),a("b-col",[a("track-seeker",{attrs:{accessToken:t.accessToken}})],1)],1),t._v(" "),a("b-row",[a("b-col",[a("track-list",{attrs:{tracks:t.tracksToConsider,removeSymbol:">",allowDelete:!0},on:{trackRemoved:t.addToTracksToSave}})],1),t._v(" "),a("b-col",[a("track-list",{attrs:{tracks:t.tracksToSave,removeSymbol:"<"},on:{trackRemoved:t.addToTracksToConsider}})],1)],1)],1)},staticRenderFns:[]}},315:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-row",[a("b-button",{attrs:{variant:"success"},on:{click:t.playBtnClick}},[t._v(t._s(t.playing?"Pause":"Play"))])],1)},staticRenderFns:[]}},316:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("b-button",{attrs:{variant:"info"},on:{click:t.getSongs}},[t._v("Get (more) songs")])},staticRenderFns:[]}},320:function(t,e){},84:function(t,e,a){"use strict";var s=a(23),n=a(318),r=a(294),i=a.n(r),o=a(295),c=a.n(o);s.a.use(n.a),e.a=new n.a({mode:"history",routes:[{path:"/",name:"Hello",component:i.a},{path:"/playlist",name:"PlaylistBuilder",component:c.a}]})},86:function(t,e){},87:function(t,e){},88:function(t,e,a){a(270);var s=a(5)(a(96),a(308),null,null);t.exports=s.exports},90:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(23),n=a(88),r=a.n(n),i=a(84),o=a(89),c=a(85),l=a(87),u=(a.n(l),a(86));a.n(u);s.a.use(o.a),s.a.use(c.a),s.a.config.productionTip=!1,new s.a({el:"#app",router:i.a,template:"<App/>",components:{App:r.a}})},91:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(138);e.default=s.a},92:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(143);e.default=s.a},93:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(171);e.default=s.a},94:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(190);e.default=s.a},95:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(193);e.default=s.a},96:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app"}},97:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"bpm-selector",props:["min","max"],data:function(){return{minBpm:0,maxBpm:1e3,options:[{text:"Existing",value:"0"},{text:"New",value:"1"}]}},watch:{min:function(){this.buildBpm()},max:function(){this.buildBpm()}},methods:{buildBpm:function(){return{min:this.minBpm,max:this.maxBpm}}},created:function(){this.min&&0!==this.min&&(this.minBpm=this.min),this.max&&0!==this.max&&(this.maxBpm=this.max)}}},98:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(317),n=a.n(s);e.default={name:"genre-selector",components:{Multiselect:n.a},props:["accessToken","value"],data:function(){return{genres:[],selectedGenres:[]}},watch:{selectedGenres:function(){this.$emit("input",this.selectedGenres)}},methods:{getGenres:function(){var t=this;this.$http.get("https://api.spotify.com/v1/recommendations/available-genre-seeds",{headers:{Authorization:"Bearer "+this.accessToken}}).then(function(e){t.genres=e.body.genres})}},created:function(){this.selectedGenres=this.value,this.getGenres()}}},99:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"hello",data:function(){return{msg:"Welcome to Your Vue.js App"}},created:function(){window.location.replace("https://accounts.spotify.com/authorize?client_id=***REMOVED***&redirect_uri="+encodeURIComponent(window.location.href)+"playlist&response_type=token&scope=playlist-modify-public%20playlist-read-private%20streaming%20user-read-birthdate%20user-read-email%20user-read-private&20user-modify-playback-state")}}}},[90]);
//# sourceMappingURL=app.aa01090806e883502491.js.map