<template>
  <div id="app">
    <div class="container-fluid">
      <div class="text-center">
        <img src="./assets/logo.png" alt="Made with Vue.js">
      </div>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link :to="{ name: 'Home' }" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Movies' }" class="nav-link">Movies</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Series' }" class="nav-link">Tv Series</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Actors' }" class="nav-link">Actors</router-link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" v-model="IbSearch">
          <router-link  :to="{path: '/search-results/' + searchQuery}" class="btn btn-outline-success my-2 my-sm-0">
            Search
          </router-link>
        </form>
      </div>
    </nav>


    <router-view/>
    </div>

    <footer class="footer">
      <div class="container text-right">
        <span class="text-muted">Bojan Jakic, made with Vue.js and The Movie DB API</span>
      </div>
    </footer>

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      IbSearch: ''
    }
  },
  computed: {
    searchQuery () {
      return 'query=' + this.IbSearch
    }
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
.footer{
  bottom: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #f5f5f5;
}
</style>
