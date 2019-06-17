import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'recommendlist',
      component: () =>
        import(/* webpackChunkName: "recommendlist" */ './../views/recommendlist/Container.vue')
    },
    {
      path: '/newlist',
      name: 'newlist',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "newlist" */ './../views/newlist/Container.vue')
    },
    {
      path: '/hotlist',
      name: 'hotlist',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "hotlist" */ './../views/hotlist/Container.vue')
    },
    {
      path: '/songlist/:type/:id',
      name: 'songlist',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "songlist" */ './../views/songlist/Container.vue')
    },
    {
      path: '*',
      name: 'notfound',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "notfound" */ './../components/NotFound.vue')
    }
  ]
})
