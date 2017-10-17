<template>
  <div class="container">
    <h1>{{ msg }}</h1>

    <div class="row">

      
        <div class="col-md-4 d-flex align-items-stretch" v-for="movie in movieList">
          <div class="card" style="width: 20rem;">
            <router-link  :to="{path: '/movie/' + movie.id}">
              <img class="card-img-top" :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="Card image cap">
            </router-link>
            <div class="card-body">
              <router-link :to="{path: '/movie/' + movie.id}">
                <h4 class="card-title">{{ movie.title }}</h4>
              </router-link> 
              <p class="card-text">{{ movie.overview }}</p>
            </div>
          </div>
        </div>
      

        
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Movies',
  beforeMount () {
    this.myMethod()
  },
  data () {
    return {
      msg: 'Popular movies',
      movieList: []
    }
  },
  methods: {
    myMethod () {
      let that = this
      axios({
        method: 'get',
        url: 'http://api.themoviedb.org/3/movie/popular?api_key=d6567c81b3f90902e0886a226056f0d6&page=1',
        responseType: 'stream'
      })
        .then(function (response) {
          that.movieList = response.data.results
        })
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card{
    margin-bottom: 25px;
  }
</style>
