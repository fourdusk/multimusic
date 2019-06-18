import axios from 'axios'
const baseURL = 'http://121.41.18.59:3000'
export default {
  netease: {
    async getRecommendList(page, pagesize) {
      let url =
        baseURL +
        '/api/netease/recommendlist/' +
        String(page) +
        '/' +
        String(pagesize)
      return await axios.get(url)
    },
    async getNewList() {
      let url = baseURL + '/api/netease/newlist'
      return await axios.get(url)
    },
    async getHotList() {
      let url = baseURL + '/api/netease/hotlist'
      return await axios.get(url)
    },
    async getSongList(id) {
      let url = baseURL + '/api/netease/songlist/' + String(id)
      return await axios.get(url)
    },
    async getSongDetail(ids) {
      let url = baseURL + '/api/netease/songdetail/' + String(ids)
      return await axios.get(url)
    }
  },
  qq: {
    async getRecommendList(page, pagesize) {
      let url =
        baseURL +
        '/api/qq/recommendlist/' +
        String(page) +
        '/' +
        String(pagesize)
      return await axios.get(url)
    },
    async getNewList() {
      let url = baseURL + '/api/qq/newlist'
      return await axios.get(url)
    },
    async getHotList() {
      let url = baseURL + '/api/qq/hotlist'
      return await axios.get(url)
    },
    async getSongList(id) {
      let url = baseURL + '/api/qq/songlist/' + String(id)
      return await axios.get(url)
    },
    async getSongDetail(ids) {
      let url = baseURL + '/api/qq/songdetail/' + String(ids)
      return await axios.get(url)
    }
  },
  kugou: {
    async getRecommendList(page, pagesize) {
      let url =
        baseURL +
        '/api/kugou/recommendlist/' +
        String(page) +
        '/' +
        String(pagesize)
      return await axios.get(url)
    },
    async getNewList() {
      let url = baseURL + '/api/kugou/newlist'
      return await axios.get(url)
    },
    async getHotList() {
      let url = baseURL + '/api/kugou/hotlist'
      return await axios.get(url)
    },
    async getSongList(id) {
      let url = baseURL + '/api/kugou/songlist/' + String(id)
      return await axios.get(url)
    },
    async getSongDetail(ids) {
      let url = baseURL + '/api/kugou/songdetail/' + String(ids)
      return await axios.get(url)
    }
  }
}
