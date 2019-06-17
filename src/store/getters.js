const getters = {
  audioElement: state => state.audioElement,
  canplay: state => state.canplay,
  playing: state => state.playing,
  playlist: state => state.playlist,
  songurl: state => state.songurl,
  songIndex: state => state.songIndex,
  songCurrent: state => state.playlist[state.songIndex],
  songCurrentId: state =>
    state.playlist[state.songIndex] ? state.playlist[state.songIndex].id : '',
  songCurrentType: state =>
    state.playlist[state.songIndex] ? state.playlist[state.songIndex].type : ''
}

export default getters
