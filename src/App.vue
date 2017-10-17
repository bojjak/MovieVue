<template>
  <div id="app">
    <div class="container-fluid">
      <img src="./assets/logo.png">

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link :to="{ name: 'Home' }" class="navbar-brand">Navbar</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link :to="{ name: 'Home' }" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <li><router-link :to="{ name: 'Movies' }" class="nav-link">Movies</router-link></li>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" v-model="IbSearch">
          <button class="btn btn-outline-success my-2 my-sm-0" type="button" @click="searchMovie(IbSearch)">Search</button>
        </form>
      </div>
    </nav>


    <router-view/>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import router from './router'

export default {
  name: 'app',
  data () {
    return {
      IbSearch: ''
    }
  },
  methods: {
    searchMovie (param) {
      axios({
        method: 'get',
        url: 'http://api.themoviedb.org/3/search/movie?api_key=d6567c81b3f90902e0886a226056f0d6&query=' + param,
        responseType: 'stream'
      })
        .then(function (response) {
          console.log(response)
          router.push({name: 'SearchResults', params: {'searchResponse': response.data}})
        })
    }
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
