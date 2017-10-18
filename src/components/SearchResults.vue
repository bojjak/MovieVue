<template>
  <div class="search-results">
    <div class="container">
      <h3>{{ headline }}</h3>
      <div class="row">
        <div class="col-md-4" v-for="movie in searchResults">
            <div class="card d-flex align-items-stretch">
              <router-link  :to="{path: '/movie/' + movie.id}">
                <img class="card-img-top" :src="'https://image.tmdb.org/t/p/w300' + movie.poster_path" alt="Card image cap">
              </router-link>
              <div class="card-body">
                <router-link :to="{path: '/movie/' + movie.id}">
                  <h4 class="card-title">{{ movie.original_name || movie.title }}</h4>
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
  props: ['searchQuery'],
  name: 'SearchResults',
  watch: {
    // watch URL, so when you change movie from this component, content will reload
    searchQuery: function (newVal, oldVal) {
      // asd
      this.searchMovie(newVal)
    }
  },
  beforeMount () {
    // load all data before mounting this component
    this.changeHeadline()
    this.searchMovie(this.searchQuery)
  },
  data () {
    return {
      headline: 'There is no data for your search',
      searchResults: []
    }
  },
  methods: {
    changeHeadline () {
      if (this.searchQuery != null) {
        this.headline = 'Your Search Results:'
      }
    },
    searchMovie (param) {
      let that = this
      axios({
        method: 'get',
        url: 'http://api.themoviedb.org/3/search/movie?api_key=d6567c81b3f90902e0886a226056f0d6&' + param,
        responseType: 'stream'
      })
        .then(function (response) {
          console.log(response)
          that.searchResults = response.data.results
        })
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
