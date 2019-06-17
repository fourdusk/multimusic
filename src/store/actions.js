import * as types from './mutation-types'

/**
 * 添加一首歌曲到播放列表
 */

export const addSong = ({ commit, state }, song) => {
  let index = state.playlist.findIndex(value => {
    return value.id === song.id
  })
  if (index === -1) {
    let songIndex = state.songIndex + 1
    commit(types.ADD_SONG_TO_PLAYLIST, { song, songIndex })
    commit(types.SET_SONGINDEX, songIndex)
  } else {
    if (state.playlist[state.songIndex].id !== song.id) {
      commit(types.SET_SONGINDEX, index)
    }
  }
}

/**
 * 添加多首歌曲到播放列表
 */

export const addSongs = ({ commit }, songs) => {
  commit(types.ADD_SONGS_TO_PLAYLIST, songs)
  commit(types.SET_SONGINDEX, 0)
}

/**
 * 从播放列表删除一首歌曲
 */
export const removeSong = ({ commit, state }, songid) => {
  let index = state.playlist.findIndex(value => {
    return value.id === songid
  })
  commit(types.REMOVE_SONG_IN_PLAYLIST, songid)
  if (index < state.songIndex) {
    commit(types.SET_SONGINDEX, state.songIndex - 1)
  }
  if (state.playlist.length === 0) {
    commit(types.SET_SONGINDEX, -1)
  }
}

/**
 * 清空播放列表
 */

export const clearPlaylist = ({ commit }) => {
  commit(types.CLEAR_PLAYLIST)
  commit(types.SET_SONGINDEX, -1)
}

/**
 * 设置音乐播放状态，播放或者暂停
 */
export const setPlaying = ({ commit }, playing) => {
  commit(types.SET_PLAYING, playing)
}
