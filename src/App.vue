<template>
  <div id="app">
    <v-app>
      <!-- 侧边导航 begin -->
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>mdi-home</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <!-- 侧边导航 end -->

      <!-- 工具栏 begin -->
      <v-toolbar dark flat fixed tabs color="cyan" ref="toolbar">
        <v-btn icon v-if="showArrow" @click="routerBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn small block round depressed light>
          <v-icon small>mdi-magnify</v-icon>搜索
        </v-btn>
        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon>mdi-account-outline</v-icon>
        </v-btn>
      </v-toolbar>
      <!-- 工具栏 end -->

      <!-- 主要内容 begin -->
      <v-content :style="{ paddingTop: toolbarHeight + 'px' }">
        <v-container fluid>
          <router-view
            :toolbarHeight="toolbarHeight"
            @addArrow="addArrow"
            @removeArrow="removeArrow"
          ></router-view>
        </v-container>
      </v-content>
      <!-- 主要内容 end -->
    </v-app>
    <music></music>
    <audio ref="audio"></audio>
  </div>
</template>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  background #fff
</style>

<script>
import { mapMutations } from 'vuex'
import Music from './components/Music'

export default {
  components: {
    Music
  },
  data() {
    return {
      drawer: null,
      toolbarHeight: null,
      showArrow: false
    }
  },
  mounted() {
    this.toolbarHeight = this.$refs.toolbar.$el.clientHeight
    this.setAudioElement(this.$refs.audio)
  },
  methods: {
    ...mapMutations({
      setAudioElement: 'SET_AUDIOELEMENT'
    }),
    addArrow(value) {
      this.showArrow = value
    },
    removeArrow(value) {
      this.showArrow = value
    },
    routerBack() {
      this.$router.go(-1)
    }
  }
}
</script>
