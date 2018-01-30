import $ from 'jquery'

function getTracksFromPlaylist (playlistId, userId, accessToken) {
  $.get({
    url: `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
    headers: { 'Authorization': 'Bearer ' + accessToken },
    success: (tracks) => console.log(tracks)})
}

var SpotifyService = {
  getTracksFromPlaylist: getTracksFromPlaylist
}

export default SpotifyService
