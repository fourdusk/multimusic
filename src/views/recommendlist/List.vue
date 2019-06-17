<template>
  <v-layout wrap justify-center v-scroll="onScroll">
    <v-flex x12>
      <v-layout wrap>
        <v-flex
          pa-2
          v-for="(value, index) in recommendList"
          :key="index"
          xs4
          sm4
          md2
          lg2
        >
          <v-card
            flat
            :to="{
              name: 'songlist',
              params: { type: activeType, id: value.listid }
            }"
          >
            <v-img :src="value.listcover" style="border-radius: 4%;"></v-img>
            <v-card-title class="caption px-0 text-truncate">
              {{ value.listname }}
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12>
      <v-layout wrap>
        <v-flex xs12 class="text-xs-center" v-if="loading">
          <v-progress-circular indeterminate></v-progress-circular>
        </v-flex>
        <v-flex xs12 class="text-xs-center" v-if="!hasMore">没有更多了</v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<style lang="stylus"></style>

<script>
import $ from 'jquery'
import api from './../../api'
export default {
  data() {
    return {
      recommendList: [],
      page: 1,
      pagesize: 12,
      loading: false,
      hasMore: true
    }
  },
  props: {
    activeType: {
      type: String,
      required: true
    }
  },
  watch: {
    activeType: {
      handler() {
        this.recommendList.length = 0
        this.page = 1
        this.loadMore()
      }
    }
  },
  created() {
    this.loadMore()
  },
  methods: {
    onScroll() {
      let scrollTop = $(window).scrollTop()
      let documentHeight = $(document).height()
      let clientHeight = $(window).height()
      if (documentHeight - scrollTop - clientHeight < 10) {
        if (this.hasMore) {
          this.loadMore()
        }
      }
    },
    loadMore() {
      this.loading = true
      api[this.activeType]
        .getRecommendList(this.page, this.pagesize)
        .then(response => {
          if (!response) {
            this.hasMore = false
            return false
          }
          for (let v of response.data.data.songlist) {
            this.recommendList.push(v)
          }
          this.loading = false
          this.page++
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
