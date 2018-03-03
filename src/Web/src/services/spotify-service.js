import $ from 'jquery'

function getTracksFromPlaylist (playlistId, userId, accessToken) {
  return new Promise((resolve, reject) =>
    $.get({
      url: `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
      headers: { 'Authorization': 'Bearer ' + accessToken },
      success: resp => resolve(resp.items.map(item => item.track)) })
  )
}

function getTrackFeatures (trackIds, accessToken) {
  return new Promise((resolve, reject) =>
    $.get({
      url: `https://api.spotify.com/v1/audio-features/`,
      data: 'ids=' + trackIds.join(','),
      headers: { 'Authorization': 'Bearer ' + accessToken },
      success: resp => resolve(resp.audio_features)
    })
  )
}

var SpotifyService = {
  getTracksFromPlaylist: getTracksFromPlaylist,
  getTrackFeatures: getTrackFeatures
}

export default SpotifyService
