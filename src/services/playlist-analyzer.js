import SpotifyService from '@/services/spotify-service'

function getMinMaxFeatures (playlistId, userId, accessToken) {
  return new Promise((resolve, reject) =>
  SpotifyService.getTracksFromPlaylist(playlistId, userId, accessToken).then(tracks =>
    SpotifyService.getTrackFeatures(tracks.map(track => track.id), accessToken).then(features => {
      return resolve(createFeaturePairs(['danceability', 'energy', 'loudness', 'speechiness', 'acousticness',
        'instrumentalness', 'liveness', 'valence', 'tempo'], features))
    }))
  )
}

function createFeaturePairs (featureNames, features) {
  return featureNames.map(featureName => {
    var feature = { }
    feature[featureName] = {
      min: Math.min.apply(Math, features.map(feature => feature[featureName])),
      max: Math.max.apply(Math, features.map(feature => feature[featureName]))
    }
    return feature
  })
}

var PlaylistAnalyzer = {
  getMinMaxFeatures: getMinMaxFeatures
}

export default PlaylistAnalyzer
