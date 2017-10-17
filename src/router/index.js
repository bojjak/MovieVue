import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/HelloWorld'
import Movies from '@/components/Movies'
import SingleMovie from '@/components/SingleMovie'
import SearchResults from '@/components/SearchResults'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/movies',
      name: 'Movies',
      component: Movies
    },
    {
      path: '/movie/:id',
      name: 'Movie',
      component: SingleMovie,
      props: true
    },
    {
      path: '/search-results',
      name: 'SearchResults',
      component: SearchResults,
      props: true
    }
  ],
  mode: 'history' // use to remove # from path
})
