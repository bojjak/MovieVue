<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div class="container">
      <div class="row">

        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3>Aired shows</h3>
            </div>
            <div class="card-body">
              <div class="row">
                <MovieBox v-for="airMovie in airedSeries.slice(0, 4)" :movie="airMovie"></MovieBox>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3>In theaters</h3>
            </div>
            <div class="card-body">
              <div class="row">
                <MovieBox v-for="airMovie in currentMovies.slice(0, 4)" :movie="airMovie"></MovieBox>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <h3></h3>
          <div class="row">
          </div>
        </div>

        <div class="col-md-12">
          <h3>Upcoming movies: </h3>
          <div class="row">
            <MovieBox v-for="airMovie in upcomingMovies.slice(0, 8)" :movie="airMovie"></MovieBox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieBox from '@/components/MovieBox'
import axios from 'axios' // enable axios api requests

export default {
  name: 'Home',
  components: {
    'MovieBox': MovieBox
  },
  mounted () {
    this.getCurrentSeries()
    this.getCurrentMovies()
    this.getUpcomingMovies()
  },
  data () {
    return {
      msg: 'Welcome to Movie moving info site',
      airedSeries: [],
      currentMovies: [],
      upcomingMovies: []
    }
  },
  methods: {
    getCurrentMovies () {
      axios({
        method: 'get',
        url: 'http://api.themoviedb.org/3/movie/now_playing?api_key=d6567c81b3f90902e0886a226056f0d6',
        responseType: 'stream'
      })
        .then(response => {
          console.log(response)
          this.currentMovies = response.data.results
        })
    },
    getCurrentSeries () {
      axios({
        method: 'get',
        url: 'http://api.themoviedb.org/3/tv/on_the_air?api_key=d6567c81b3f90902e0886a226056f0d6',
        responseType: 'stream'
      })
        .then(response => {
          console.log(response)
          this.airedSeries = response.data.results
        })
    },
    getUpcomingMovies () {
      axios({
        method: 'get',
        url: 'http://api.themoviedb.org/3/movie/upcoming?api_key=d6567c81b3f90902e0886a226056f0d6',
        responseType: 'stream'
      })
        .then(response => {
          console.log(response)
          this.upcomingMovies = response.data.results
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
