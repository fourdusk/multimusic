<template>
  <v-layout v-show="showMusic">
    <v-flex xs12>
      <v-slide-y-reverse-transition>
        <v-layout align-center :style="musicBarStyle">
          <v-dialog
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
            v-model="showSongControl"
          >
            <template v-slot:activator="{ on }">
              <v-flex xs8 v-on="on">
                <v-layout>
                  <v-flex xs4 px-2>
                    <v-avatar>
                      <img :src="listcover" />
                    </v-avatar>
                  </v-flex>
                  <v-flex xs8 class="text-truncate">
                    <v-layout wrap fill-height align-content-space-around>
                      <v-flex xs12 class="text-truncate">{{ songname }}</v-flex>
                      <v-flex xs12 class="caption text-truncate grey--text">
                        {{ artist }}
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>
            </template>
            <v-card>
              <v-layout column :style="{ height: screenHeight + 'px' }">
                <v-flex xs1>
                  <v-layout align-center>
                    <v-flex shrink>
                      <v-btn icon @click.stop="showSongControl = false">
                        <v-icon>mdi-arrow-left</v-icon>
                      </v-btn>
                    </v-flex>
                    <v-flex>
                      <v-layout wrap>
                        <v-flex xs12>{{ songname }}</v-flex>
                        <v-flex xs12 class="grey--text caption">
                          {{ artist }}
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs9 @click.stop="switchCover = !switchCover">
                  <v-layout column justify-center fill-height>
                    <v-flex xs6>
                      <v-layout justify-center>
                        <v-flex xs8>
                          <v-layout justify-center>
                            <v-flex v-show="switchCover">
                              <v-img
                                max-width="300"
                                max-height="300"
                                style="border-radius:50%;margin:auto;"
                                :src="listcover"
                              ></v-img>
                            </v-flex>
                            <v-flex v-show="!switchCover">
                              <div class="lyric-container">
                                <div class="lyric-content">
                                  <template v-for="(v, i) in lyric">
                                    <div
                                      class="cyan--text"
                                      v-if="v.light"
                                      :key="i"
                                    >
                                      {{ v.content }}
                                    </div>
                                    <div v-else :key="i">{{ v.content }}</div>
                                  </template>
                                </div>
                              </div>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs2>
                  <v-layout wrap fill-height align-center>
                    <v-flex xs12 class="play-slider">
                      <v-layout align-center>
                        <v-flex shrink>
                          <div class="pl-4 pr-2">{{ songCurrentTime }}</div>
                        </v-flex>
                        <v-flex>
                          <v-slider
                            class="progress"
                            v-model="progress"
                            thumb-size="20"
                            :max="progressLength"
                            @mousedown="progressDown"
                            @click="progressClick"
                            @touchstart.native="progressDown"
                          ></v-slider>
                        </v-flex>
                        <v-flex shrink>
                          <div class="pl-2 pr-4">{{ songTotalTime }}</div>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12>
                      <v-layout justify-space-around align-center>
                        <v-flex xs2 text-xs-center>
                          <v-btn icon>
                            <v-icon>mdi-repeat</v-icon>
                          </v-btn>
                        </v-flex>
                        <v-flex xs2 text-xs-center>
                          <v-btn icon @click.stop="playPrevMusic">
                            <v-icon>mdi-skip-previous</v-icon>
                          </v-btn>
                        </v-flex>
                        <v-flex xs2 text-xs-center>
                          <v-btn icon @click.stop="switchPlay">
                            <v-icon v-if="playing">mdi-pause</v-icon>
                            <v-icon v-if="!playing"
                              >mdi-play-circle-outline</v-icon
                            >
                          </v-btn>
                        </v-flex>
                        <v-flex xs2 text-xs-center>
                          <v-btn icon @click.stop="playNextMusic">
                            <v-icon>mdi-skip-next</v-icon>
                          </v-btn>
                        </v-flex>
                        <v-flex xs2 text-xs-center>
                          <v-btn icon @click.stop="showPlaylist = true">
                            <v-icon>mdi-playlist-music-outline</v-icon>
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-dialog>
          <v-flex xs4>
            <v-btn icon @click.stop="switchPlay">
              <v-icon v-if="playing">mdi-pause</v-icon>
              <v-icon v-if="!playing">mdi-play-circle-outline</v-icon>
            </v-btn>
            <v-bottom-sheet v-model="showPlaylist">
              <template v-slot:activator>
                <v-btn icon @click.stop="showPlaylist = true">
                  <v-icon>mdi-playlist-music-outline</v-icon>
                </v-btn>
              </template>
              <v-card style="border-radius: 20px 20px 0 0">
                <v-list>
                  <v-list-tile>
                    <v-list-tile-content
                      >共({{ playlistCount }}首)</v-list-tile-content
                    >
                    <v-list-tile-action @click.stop="removeAll">
                      <v-icon>mdi-trash-can-outline</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
                <v-divider></v-divider>
                <div class="playlist-container">
                  <v-list class="playlist-content" id="playlist-wrap">
                    <v-list-tile
                      v-for="(v, i) in playlist"
                      :key="i"
                      @click.stop="
                        playMusicFromPlayist({ id: v.id, type: v.type })
                      "
                    >
                      <template v-if="songCurrentId == v.id">
                        <v-list-tile-action>
                          <v-icon color="cyan">mdi-volume-high</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title class="cyan--text">
                            {{ v.name }}
                            <span class="caption px-2">-</span>
                            <span class="caption">{{ v.artist }}</span>
                          </v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action @click.stop="removeOne(v.id)">
                          <v-icon medium>mdi-alpha-x</v-icon>
                        </v-list-tile-action>
                      </template>
                      <template v-else>
                        <v-list-tile-content>
                          <v-list-tile-title>
                            {{ v.name }}
                            <span class="caption grey--text px-2">-</span>
                            <span class="caption grey--text">
                              {{ v.artist }}
                            </span>
                          </v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action @click.stop="removeOne(v.id)">
                          <v-icon medium>mdi-alpha-x</v-icon>
                        </v-list-tile-action>
                      </template>
                    </v-list-tile>
                  </v-list>
                </div>
              </v-card>
            </v-bottom-sheet>
          </v-flex>
        </v-layout>
      </v-slide-y-reverse-transition>
    </v-flex>
  </v-layout>
</template>

<style lang="stylus">
.play-slider
  .v-input--slider
    margin-top 0

    .v-input__slot
      margin-bottom 0

      .v-slider
        height auto

    .v-messages
      display none

.playlist-container
  overflow hidden
  height 300px

  .playlist-content
    height 300px
    overflow-y scroll
    margin-right -18px
    padding-right 18px

.lyric-container
  overflow hidden
  max-width 300px
  max-height 300px
  margin auto
  text-align center

  .lyric-content
    max-height 300px
    overflow-y scroll
    margin-right -18px
    padding-right 18px
</style>

<script>
import { mapGetters, mapActions } from 'vuex'
import api from './../api'

export default {
  name: 'Music',
  mounted() {
    this.screenHeight = document.documentElement.clientHeight
    // 绑定事件
    this.bindEvents()

    // 接受 bus 发送的事件
    this.$bus.$on('playSong', ({ id, type }) => {
      if (this.songCurrentId !== id) {
        this.playMusic({ id, type })
      } else {
        if (this.playing === false) {
          this.audioElement.play()
          this.setPlaying(true)
        }
      }
    })

    // 接受 bus 发送的事件
    this.$bus.$on('playSonglist', songs => {
      let playlist = []
      for (let i = 0; i < songs.length; i++) {
        playlist.push({
          id: songs[i].songid,
          name: songs[i].songname,
          artist: songs[i].artist,
          hasplayurl: songs[i].hasplayurl,
          type: songs[i].type
        })
      }
      this.playMusic({ id: playlist[0].id, type: playlist[0].type })
      this.addSongs(playlist)
    })

    this.$nextTick(() => {
      // 监听当前歌曲播放结束后，自动播放下一首
      this.audioElement.onended = () => {
        if (this.playlist[this.songIndex + 1]) {
          this.playMusic({
            id: this.playlist[this.songIndex + 1].id,
            type: this.playlist[this.songIndex + 1].type
          })
        } else {
          if (this.playlist[0]) {
            this.playMusic({
              id: this.playlist[0].id,
              type: this.playlist[0].type
            })
          }
        }
      }

      // 监听当期歌曲可以播放了，显示歌曲的总时间
      this.audioElement.oncanplay = () => {
        let duration = Math.round(this.audioElement.duration)
        let hour = Math.floor(duration / 3600)
        let minute = Math.floor((duration - hour * 3600) / 60)
        let second = duration - hour * 3600 - minute * 60
        let m = minute < 10 ? '0' + minute : minute
        let s = second < 10 ? '0' + second : second
        this.progressLength = duration
        this.songTotalTime = m + ':' + s
      }

      // 监听歌曲正在播放，显示正在播放的时间和更新进度条
      this.audioElement.ontimeupdate = () => {
        let currentTime = Math.round(this.audioElement.currentTime)
        let hour = Math.floor(currentTime / 3600)
        let minute = Math.floor((currentTime - hour * 3600) / 60)
        let second = currentTime - hour * 3600 - minute * 60
        let m = minute < 10 ? '0' + minute : minute
        let s = second < 10 ? '0' + second : second
        this.songCurrentTime = m + ':' + s
        if (this.progressMoving === false) {
          this.progress = currentTime
        }
        for (let i = 0; i < this.lyric.length; i++) {
          this.lyric[i].light = false
          if (this.audioElement.currentTime >= this.lyric[i].time) {
            if (this.lyric[i - 1]) {
              this.lyric[i - 1].light = false
            } else {
              this.lyric[0].light = false
            }
            this.lyric[i].light = true
            var currentLyricIndex = i
          }
        }

        let lyricLineHeight = document.querySelector('.lyric-content>div')
          .clientHeight
        document.querySelector('.lyric-content').scrollTop =
          lyricLineHeight * (currentLyricIndex - 6)
      }
    })
  },
  beforeDestroy() {
    // 移除事件
    this.removeEvents()
  },
  data() {
    return {
      showMusic: false,
      showPlaylist: false,
      showSongControl: false,
      switchCover: true,
      progressMoving: false,
      songname: '',
      artist: '',
      listcover: '',
      lyric: [],
      screenHeight: '',
      songCurrentTime: '',
      songTotalTime: '',
      playlistCount: 0,
      progress: 0,
      progressLength: 0,
      musicBarStyle: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        height: '60px',
        borderTop: 'thin solid rgba(0,0,0,0.12)',
        background: '#fff'
      }
    }
  },
  computed: {
    ...mapGetters([
      'audioElement',
      'playing',
      'playlist',
      'songIndex',
      'songCurrentId',
      'songCurrentType',
      'canplay'
    ])
  },
  watch: {
    // 监听播放列表显示后，当前播放歌曲居中显示
    showPlaylist: function() {
      this.$nextTick(() => {
        if (this.showPlaylist === true) {
          document.querySelector('#playlist-wrap').scrollTop =
            document.querySelector('#playlist-wrap .v-list__tile')
              .clientHeight *
            (this.songIndex - 2)
        }
      })
    }
  },
  methods: {
    ...mapActions([
      'addSong',
      'addSongs',
      'removeSong',
      'clearPlaylist',
      'setPlaying'
    ]),
    // 绑定事件
    bindEvents() {
      document.addEventListener('mouseup', this.progressUp)
      document.addEventListener('touchend', this.progressUp)
    },
    // 移除事件
    removeEvents() {
      document.removeEventListener('mouseup', this.progressUp)
      document.removeEventListener('touchend', this.progressUp)
    },
    // 按下进度条的滑块
    progressDown() {
      this.progressMoving = true
    },
    // 松开进度条的滑块
    progressUp(event) {
      event.stopPropagation()
      if (this.progressMoving) {
        this.progressMoving = false
        let progress = document.querySelector('input[role=slider]').value

        this.audioElement.currentTime = progress
      }
    },
    // 点击进度条
    progressClick() {
      this.audioElement.currentTime = this.progress
    },
    // 切换歌曲播放或者暂停
    switchPlay() {
      if (this.playing) {
        this.audioElement.pause()
        this.setPlaying(false)
      } else {
        this.audioElement.play()
        this.setPlaying(true)
      }
    },
    // 从播放列表中点击歌曲播放
    playMusicFromPlayist({ id, type }) {
      if (this.songCurrentId !== id) {
        this.playMusic({ id, type })
      } else {
        if (this.playing === false) {
          this.audioElement.play()
          this.setPlaying(true)
        }
      }
    },
    // 播放歌曲
    playMusic({ id, type }, autoPlay = true) {
      api[type]
        .getSongDetail(id)
        .then(response => {
          let song = response.data.data.song
          if (song.playurl !== '') {
            this.songname = song.name
            this.artist = song.artist.join(' / ')
            this.listcover = song.cover
            this.lyric = this.parseLyric(song.lyric)
            this.audioElement.src = song.playurl
            if (autoPlay) {
              this.audioElement.play()
              this.setPlaying(true)
            }
            this.addSong({
              id: song.id,
              name: song.name,
              artist: song.artist.join(' / '),
              hasplayurl: song.hasplayurl,
              type: song.type
            })
            this.playlistCount = this.playlist.length
            this.showMusic = true
            this.switchCover = true
          } else {
            if (this.playlist.findIndex(value => value.id === id) !== -1) {
              this.removeOne(id)
            }
          }
        })
        .catch(error => console.log(error))
    },
    // 播放上一首歌曲
    playPrevMusic() {
      if (this.playlist[this.songIndex - 1]) {
        this.playMusic({
          id: this.playlist[this.songIndex - 1].id,
          type: this.playlist[this.songIndex - 1].type
        })
      } else {
        if (this.playlist.length - 1 !== 0) {
          this.playMusic({
            id: this.playlist[this.playlist.length - 1].id,
            type: this.playlist[this.playlist.length - 1].type
          })
        }
      }
    },
    // 播放下一首歌曲
    playNextMusic() {
      if (this.playlist[this.songIndex + 1]) {
        this.playMusic({
          id: this.playlist[this.songIndex + 1].id,
          type: this.playlist[this.songIndex + 1].type
        })
      } else {
        if (this.songIndex !== 0) {
          this.playMusic({
            id: this.playlist[0].id,
            type: this.playlist[0].type
          })
        }
      }
    },
    // 从播放列表中删除一首歌曲
    removeOne(id) {
      if (this.songCurrentId === id) {
        this.audioElement.src = ''
      }
      let currentId = this.songCurrentId
      this.removeSong(id)

      this.playlistCount = this.playlist.length
      if (this.playlist.length > 0 && currentId === id) {
        if (this.playing) {
          this.playMusic({ id: this.songCurrentId, type: this.songCurrentType })
        } else {
          this.playMusic(
            { id: this.songCurrentId, type: this.songCurrentType },
            false
          )
        }
      }

      if (this.playlist.length === 0) {
        this.showMusic = false
        this.showPlaylist = false
        this.showSongControl = false
        this.switchCover = true
      }
    },
    // 清空播放列表
    removeAll() {
      this.audioElement.src = ''
      this.clearPlaylist()

      this.playlistCount = this.playlist.length
      if (this.playlist.length === 0) {
        this.showMusic = false
        this.showPlaylist = false
        this.showSongControl = false
        this.switchCover = true
      }
    },
    // 解析歌词
    parseLyric(lyric) {
      let lyricArray = lyric.split(/\n/g)
      let lyricResult = []
      for (let i = 0; i < lyricArray.length; i++) {
        let v = lyricArray[i]
          .trim()
          .substr(1)
          .split(']')
        if (v[1] === '') {
          continue
        } else {
          let timeArray = v[0].split(':')
          let second = parseInt(timeArray[0]) * 60 + Number(timeArray[1])
          lyricResult.push({
            time: second,
            content: v[1],
            light: false
          })
        }
      }
      return lyricResult
    }
  }
}
</script>
