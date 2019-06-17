import * as types from './mutation-types'

const mutations = {
  [types.SET_AUDIOELEMENT](state, audioElement) {
    state.audioElement = audioElement
  },
  [types.SET_PLAYING](state, playing) {
    state.playing = playing
  },
  [types.SET_SONGINDEX](state, songIndex) {
    state.songIndex = songIndex
  },
  [types.ADD_SONG_TO_PLAYLIST](state, { song, songIndex }) {
    state.playlist.splice(songIndex, 0, song)
  },
  [types.ADD_SONGS_TO_PLAYLIST](state, songs) {
    state.playlist = songs
  },
  [types.REMOVE_SONG_IN_PLAYLIST](state, songid) {
    let index = state.playlist.findIndex(value => {
      return value.id == songid
    })
    state.playlist.splice(index, 1)
  },
  [types.CLEAR_PLAYLIST](state) {
    state.playlist.length = 0
  }
}

export default mutations
