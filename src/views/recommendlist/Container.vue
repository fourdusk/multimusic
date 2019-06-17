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
            <v-layout wrap justify-space-between pt-4>
              <v-flex
                v-for="(icon, index) in icons"
                :key="index"
                xs4
                sm4
                md2
                lg2
                @click.stop="switchType(icon.type)"
              >
                <v-card flat tag="a">
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-layout wrap justify-center>
                        <v-flex xs4 class="text-xs-center">
                          <img :src="icon.src" @load="imgLoad" width="100%" />
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
        </v-layout>
      </v-container>
    </v-flex>
    <v-flex
      xs12
      :style="{ paddingTop: typeNavigatioHeight + 'px' }"
      v-if="!hidden"
    >
      <recommend-list :activeType="activeType"></recommend-list>
    </v-flex>
  </v-layout>
</template>

<style lang="stylus"></style>

<script>
import { mapGetters } from 'vuex'
import RecommendList from './List'
import netease from '../../assets/netease.jpg'
import qq from '../../assets/qq.jpg'
import kugou from '../../assets/kugou.jpg'

export default {
  components: {
    RecommendList
  },
  methods: {
    switchType(type) {
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
      this.hidden = false
    }
  },
  data() {
    return {
      activeType: 'netease',
      typeNavigatioHeight: null,
      hidden: true,
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
    ...mapGetters(['audioElement']),
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
          src: netease
        },
        {
          type: 'qq',
          text: 'QQ音乐',
          style: this.activeType === 'qq' ? 'cyan--text font-weight-bold' : '',
          src: qq
        },
        {
          type: 'kugou',
          text: '酷狗音乐',
          style:
            this.activeType === 'kugou' ? 'cyan--text font-weight-bold' : '',
          src: kugou
        }
      ]
    }
  }
}
</script>
