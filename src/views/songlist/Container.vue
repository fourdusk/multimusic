<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-container fluid py-0 :style="typeNavigationStyle" ref="typeNavigation">
        <v-layout wrap justify-space-between>
          <v-flex xs12 py-4>
            <v-card flat>
              <v-layout wrap justify-center>
                <v-flex xs5>
                  <v-layout justify-center>
                    <v-flex xs10>
                      <div style="max-width:300px;max-heigt:300px;">
                        <img
                          width="100%"
                          :src="listcover"
                          style="border-radius: 10px;"
                          @load="imgLoad"
                        />
                      </div>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs7>
                  <v-layout wrap column justify-space-between fill-height>
                    <v-flex>
                      <div class="subheading">{{ listname }}</div>
                    </v-flex>
                    <v-flex>
                      <img
                        :src="creatoravatar"
                        @load="imgLoad"
                        width="24"
                        height="24"
                        style="border-radius:50%;vertical-align:middle;"
                      />
                      <span class="pl-2 caption grey--text">
                        {{ creatorname }}
                      </span>
                    </v-flex>
                    <v-flex>
                      <v-tooltip bottom max-width="300px">
                        <template v-slot:activator="{ on }">
                          <div
                            class="text-truncate caption grey--text"
                            v-on="on"
                          >
                            {{ listdescription }}
                          </div>
                        </template>
                        <span v-html="listdescription"></span>
                      </v-tooltip>
                    </v-flex>
                  </v-layout>
                  <div></div>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>

          <v-flex xs12>
            <v-layout wrap>
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
      <v-layout wrap>
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
import api from './../../api'
import { mapGetters } from 'vuex'

export default {
  created() {
    api[this.$route.params.type]
      .getSongList(this.$route.params.id)
      .then(response => {
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
      .catch(error => error)
    this.$emit('addArrow', true)
  },
  beforeDestroy() {
    this.$emit('removeArrow', false)
  },
  data() {
    return {
      typeNavigatioHeight: null,
      songs: null,
      songscount: 0,
      listcover: '',
      listname: '',
      creatorname: '',
      creatoravatar: '',
      listdescription: '',
      showSonglist: false
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
    musicHeight: function() {
      if (this.playlist.length > 0) {
        return 60
      } else {
        return 0
      }
    }
  },
  methods: {
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
  }
}
</script>
