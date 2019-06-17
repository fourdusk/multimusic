<template>
  <v-layout
    wrap
    v-touch="{ left: () => slide('left'), right: () => slide('right') }"
  >
    <v-flex xs12>
      <v-container fluid py-0 :style="typeNavigationStyle" ref="typeNavigation">
        <v-layout wrap justify-space-between>
          <v-flex xs12>
            <v-tabs centered fixed-tabs grow light>
              <v-tab
                exact
                v-for="(nav, index) in navs"
                :key="index"
                :to="{ name: nav.name }"
                class="subheading"
                >{{ nav.text }}</v-tab
              >
            </v-tabs>
          </v-flex>
          <v-flex xs12>
            <v-layout justify-space-between pt-4>
              <v-flex
                v-for="(icon, index) in icons"
                :key="index"
                xs4
                sm4
                md2
                lg2
                @click.stop="switchList(icon.type)"
              >
                <v-card flat tag="a">
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-layout justify-center>
                        <v-flex xs4 class="text-xs-center">
                          <v-img :src="icon.src" @load="imgLoad"></v-img>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12>
                      <v-card-text
                        class="text-xs-center caption"
                        :class="icon.style"
                        >{{ icon.text }}</v-card-text
                      >
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout>
              <v-flex xs12>
                <v-card @click.stop="playSonglist">
                  <v-card-title>
                    <v-icon>mdi-play-circle-outline</v-icon>
                    <span class="pl-2 font-weight-bold">播放全部</span>
                    <span class="pl-1 caption">(共{{ songscount }}首)</span>
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
    <v-flex
      xs12
      :style="{
        paddingTop: typeNavigatioHeight + 'px',
        paddingBottom: musicHeight + 'px'
      }"
      v-if="showSonglist"
    >
      <v-layout>
        <v-flex xs12>
          <v-card flat>
            <v-list two-line>
              <v-list-tile
                v-for="(song, index) in songs"
                :key="index"
                @click.stop="playSong({ id: song.songid, type: song.type })"
              >
                <template v-if="songCurrentId == song.songid">
                  <v-list-tile-action>
                    <v-icon color="cyan">mdi-volume-high</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title class="cyan--text">
                      {{ song.songname }}
                    </v-list-tile-title>
                    <v-list-tile-sub-title class="cyan--text">{{
                      song.artist
                    }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-action>{{ index + 1 }}</v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ song.songname }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{
                      song.artist
                    }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </template>
                <v-list-tile-action>
                  <v-badge color="warning" :value="!song.hasplayurl">
                    <template v-slot:badge>
                      <v-icon dark small>mdi-cancel</v-icon>
                    </template>
                    <v-icon>mdi-play-box-outline</v-icon>
                  </v-badge>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<style lang="stylus"></style>

<script>
import { mapGetters } from 'vuex'
import api from './../../api'

export default {
  created() {
    api[this.activeType].getHotList().then(response => {
      let list = response.data.data.list
      this.songs = list.songs.map(value => {
        for (let v in value) {
          if (v === 'artist') {
            value.artist = value.artist.join(' / ')
            break
          }
        }
        return value
      })
      this.songscount = list.songs.length
      this.listcover = list.listcover
      this.listname = list.listname
      this.creatorname = list.creatorname
      this.creatoravatar = list.creatoravatar
      this.listdescription = list.listdescription
    })
  },
  data() {
    return {
      activeType: 'netease',
      typeNavigatioHeight: null,
      songs: null,
      songscount: 0,
      listcover: '',
      listname: '',
      creatorname: '',
      creatoravatar: '',
      listdescription: '',
      showSonglist: false,
      navs: [
        { name: 'recommendlist', text: '推荐歌单' },
        { name: 'newlist', text: '新歌榜' },
        { name: 'hotlist', text: '热歌榜' }
      ]
    }
  },
  props: {
    toolbarHeight: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters(['songCurrentId', 'playlist']),
    typeNavigationStyle: function() {
      return {
        position: 'fixed',
        top: this.toolbarHeight + 'px',
        left: 0,
        background: '#fff',
        zIndex: 1
      }
    },
    active: {
      get() {
        return this.navs.findIndex(value => {
          const routeName = this.$route.name
          return value.name == routeName
        })
      },
      set() {}
    },
    icons: function() {
      return [
        {
          type: 'netease',
          text: '网易云音乐',
          style:
            this.activeType === 'netease' ? 'cyan--text font-weight-bold' : '',
          src:
            'https://wx4.sinaimg.cn/large/0068bOvsgy1g3cdvv4angj303k03kq2u.jpg'
        },
        {
          type: 'qq',
          text: 'QQ音乐',
          style: this.activeType === 'qq' ? 'cyan--text font-weight-bold' : '',
          src:
            'https://ws2.sinaimg.cn/large/0068bOvsgy1g3cdvuxnohj303k03ka9x.jpg'
        },
        {
          type: 'kugou',
          text: '酷狗音乐',
          style:
            this.activeType === 'kugou' ? 'cyan--text font-weight-bold' : '',
          src:
            'https://wx4.sinaimg.cn/large/0068bOvsgy1g3cdvuzwr3j303k03kt8m.jpg'
        }
      ]
    },
    musicHeight: function() {
      if (this.playlist.length > 0) {
        return 60
      } else {
        return 0
      }
    }
  },
  methods: {
    switchList(type) {
      this.activeType = type
    },
    slide(direction) {
      const parsed = parseInt(this.active)
      const active = isNaN(parsed) ? 0 : parsed
      if (active <= this.navs.length - 1 && active >= 0) {
        switch (direction) {
          case 'left':
            if (active + 1 <= this.navs.length - 1) {
              this.$router.push({ name: this.navs[active + 1].name })
              this.active = active + 1
            }
            break
          case 'right':
            if (active - 1 >= 0) {
              this.$router.push({ name: this.navs[active - 1].name })
              this.active = active - 1
            }
            break
        }
      }
    },
    imgLoad() {
      this.typeNavigatioHeight = this.$refs.typeNavigation.clientHeight
      this.showSonglist = true
    },
    playSong({ id, type }) {
      this.$bus.$emit('playSong', { id, type })
    },
    playSonglist() {
      this.$bus.$emit('playSonglist', this.songs)
    }
  },
  watch: {
    activeType: function() {
      this.songscount = 0
      this.songs.length = 0
      api[this.activeType].getHotList().then(response => {
        let list = response.data.data.list
        this.songs = list.songs.map(value => {
          for (let v in value) {
            if (v === 'artist') {
              value.artist = value.artist.join(' / ')
            }
          }
          return value
        })
        this.songscount = list.songs.length
        this.listcover = list.listcover
        this.listname = list.listname
      })
    }
  }
}
</script>
