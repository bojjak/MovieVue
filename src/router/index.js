import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/HelloWorld'
import Movies from '@/components/movies/Movies'
import SingleMovie from '@/components/movies/SingleMovie'
import Series from '@/components/series/Series'
import SingleSeries from '@/components/series/SingleSeries'
import Actors from '@/components/actors/Actors'
import SingleActor from '@/components/actors/SingleActor'
import SearchResults from '@/components/search/SearchResults'

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
      path: '/series',
      name: 'Series',
      component: Series
    },
    {
      path: '/show/:id',
      name: 'SingleSeries',
      component: SingleSeries,
      props: true
    },
    {
      path: '/actors',
      name: 'Actors',
      component: Actors
    },
    {
      path: '/actor/:id',
      name: 'SingleActor',
      component: SingleActor,
      props: true
    },
    {
      path: '/search-results/:searchQuery',
      name: 'SearchResults',
      component: SearchResults,
      props: true
    }
  ],
  mode: 'history' // use to remove # from path
})
