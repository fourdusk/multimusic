import axios from 'axios'
const baseURL = 'http://121.41.18.59:3000/'
export default {
  netease: {
    async getRecommendList(page, pagesize) {
      let url =
        '/api/netease/recommendlist/' + String(page) + '/' + String(pagesize)
      return await axios.get(url, { baseURL: baseURL }).catch(error => {
        console.log(error)
      })
    },
    async getNewList() {
      let url = '/api/netease/newlist'
      return await axios.get(url, { baseURL: baseURL }).catch(error => {
        console.log(error)
      })
    },
    async getHotList() {
      let url = '/api/netease/hotlist'
      return await axios.get(url, { baseURL: baseURL }).catch(error => {
        console.log(error)
      })
    },
    async getSongList(id) {
      let url = '/api/netease/songlist/' + String(id)
      return await axios.get(url, { baseURL: baseURL }).catch(error => {
        console.log(error)
      })
    },
    async getSongDetail(ids) {
      let url = '/api/netease/songdetail/' + String(ids)
      return await axios.get(url, { baseURL: baseURL }).catch(error => {
        console.log(error)
      })
    }
  },
  qq: {
    async getRecommendList(page, pagesize) {
      let url = '/api/qq/recommendlist/' + String(page) + '/' + String(pagesize)
      return await axios.get(url, { baseURL: baseURL }).catch(error => {
        console.log(error)
      })
    },
    async getNewList() {
      let url = '/api/qq/newlist'
      return await axios.get(url, { baseURL: baseURL }).catch(error => {
        console.log(error)
      })
    },
    async getHotList() {
      let url = '/api/qq/hotlist'
      return await axios.get(url, { baseURL: baseURL }).catch(error => {
        console.log(error)
      })
    },
    async getSongList(id) {
      let url = '/api/qq/songlist/' + String(id)
      return await axios.get(url, { baseURL: baseURL }).catch(error => {
        console.log(error)
      })
    },
    async getSongDetail(ids) {
      let url = '/api/qq/songdetail/' + String(ids)
      return await axios.get(url, { baseURL: baseURL }).catch(error => {
        console.log(error)
      })
    }
  },
  kugou: {
    async getRecommendList(page, pagesize) {
      let url =
        '/api/kugou/recommendlist/' + String(page) + '/' + String(pagesize)
      return await axios.get(url, { baseURL: baseURL }).catch(error => {
        console.log(error)
      })
    },
    async getNewList() {
      let url = '/api/kugou/newlist'
      return await axios.get(url, { baseURL: baseURL }).catch(error => {
        console.log(error)
      })
    },
    async getHotList() {
      let url = '/api/kugou/hotlist'
      return await axios.get(url, { baseURL: baseURL }).catch(error => {
        console.log(error)
      })
    },
    async getSongList(id) {
      let url = '/api/kugou/songlist/' + String(id)
      return await axios.get(url, { baseURL: baseURL }).catch(error => {
        console.log(error)
      })
    },
    async getSongDetail(ids) {
      let url = '/api/kugou/songdetail/' + String(ids)
      return await axios.get(url, { baseURL: baseURL }).catch(error => {
        console.log(error)
      })
    }
  }
}
