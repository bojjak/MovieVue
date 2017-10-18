<template>
  <div class="Single">
    <div class="jumbotron jumbotron-fluid" :style="{ 'background-image': 'url(\'https://image.tmdb.org/t/p/w500' + movie.poster_path + '\')' }">
    </div>

    <div class="container">
      <h1 v-text="movie.title"></h1>
      <h4> {{ movie.tagline }} </h4>
      <span><i class="fa fa-star-o" aria-hidden="true"></i> {{ movie.vote_average }} <i class="fa fa-star-o" aria-hidden="true"></i></span>

      <p>Genres: <span class="badge badge-pill badge-light" v-for="genre in movie.genres"> {{ genre.name }} </span></p>


      <p>Summary: <p>{{ movie.overview }}</p> </p>

      <p>Cast:</p>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>Name</th>
            <th>Character</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cast, index) in casts.slice(0, 10)">
            <th scope="row">{{ index + 1 }}</th>
            <td><img :src="'https://image.tmdb.org/t/p/w500' + cast.profile_path" alt="Img not available" class="rounded-circle"></td>
            <td>
                <router-link :to="{path: '/actor/' + cast.id}">
                  {{ cast.name }}
                </router-link>
            </td>
            <td>{{ cast.character }}</td>
          </tr>
        </tbody>
      </table>

    </div>

    <hr>

    <div class="container">
      <h3>Suggestions:</h3>
      <div class="row">
        <div class="col-md-4" v-for="movie in movieSuggestions.slice(0, 3)">
            <div class="card">
              <router-link  :to="{path: '/movie/' + movie.id}">
                <img class="card-img-top" :src="'https://image.tmdb.org/t/p/w250_and_h141_bestv2' + movie.backdrop_path" alt="Card image cap">
              </router-link>
              <div class="card-body">
                <router-link :to="{path: '/movie/' + movie.id}">
                  <h4 class="card-title">{{ movie.title }}</h4>
                </router-link> 
              </div>
            </div>
          </div>
      </div>
    </div>
    

  </div>
</template>

<script>
import axios from 'axios' // enable axios api requests
export default {
  props: ['id'],

  name: 'SingleMovie',

  watch: {
    // watch URL, so when you change movie from this component, content will reload
    '$route' (to, from) {
      this.getThisMovie(to.params.id)
      this.getSuggestions(to.params.id)
      this.getMovieCast(to.params.id)
    }
  },

  beforeMount () {
    // load all data before mounting this component
    this.getThisMovie(this.id)
    this.getSuggestions(this.id)
    this.getMovieCast(this.id)
  },

  data () {
    return {
      movie: [],
      movieSuggestions: [],
      casts: []
    }
  },

  methods: {
    getThisMovie (paramId) {
      // get this movie info API
      let that = this
      axios({
        method: 'get',
        url: 'http://api.themoviedb.org/3/movie/' + paramId + '?api_key=d6567c81b3f90902e0886a226056f0d6&page=1',
        responseType: 'stream'
      })
        .then(function (response) {
          that.movie = response.data
        })
    },
    getSuggestions (param) {
      // get suggested movies API
      let that = this
      axios({
        method: 'get',
        url: 'http://api.themoviedb.org/3/movie/' + param + '/similar?api_key=d6567c81b3f90902e0886a226056f0d6',
        responseType: 'stream'
      })
        .then(function (response) {
          that.movieSuggestions = response.data.results
        })
    },
    getMovieCast (param) {
      let that = this
      axios({
        method: 'get',
        url: 'http://api.themoviedb.org/3/movie/' + param + '/credits?api_key=d6567c81b3f90902e0886a226056f0d6',
        responseType: 'stream'
      })
        .then(function (response) {
          console.log(response)
          that.casts = response.data.cast
        })
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .jumbotron{
    height: 500px;
  }
  tbody td {
    text-align: left;
  }
  tbody td img {
    height: 100px;
  }
</style>
